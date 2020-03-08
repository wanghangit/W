import { parseHtml } from "./parseHtml";
import { getRemoveAttr } from "./helper"
import { AstElement } from "../types/index"

const forAliasRE = /(.*?)\s+(?:in)\s+(.*)/ // 例如item in list  ["item in list", "item", "list", index: 0, input: "item in list", groups: undefined]
const forIteratorRE = /\(([^,]*),([^,]*)\)/ // 匹配 (item, index) ["(item, index)", "item", " index", index: 0, input: "(item, index)", groups: undefined]
const textRE = /\{\{((?:.|\r?\n)+?)\}\}/g // {{name}}
const dirRE = /^w-|^@|^:/ // w-|@|:
const bindRE = /^w-bind:|^:/ // w-bind:|:
const onRE = /^@|^w-on:/ // @|w-on:

/**
 * 对html字符串进行编译
 * @param html 
 */
export function parse(html) {
  let stack = [], // 用来保存ast节点的栈
    root,// 树的根节点
    currentParent; // 当前的父节点
  parseHtml(html, start, end, chars) // 匹配模版字符串
  return root
  /**
   * 对开始标签的处理
   * @param tag // 标签名 
   * @param attrs // 属性
   * @param unary // 是不是自闭合标签
   */
  function start(tag, attrs, unary) {
    // 初始化ast元素
    const element: AstElement = {
      type: 1,
      tag,
      attrsList: attrs,
      attrsMap: makeAttrsMap(attrs),
      parent: currentParent,
      children: []
    }
    // 对key的处理
    processKey(element)
    // 对w-for的处理
    processFor(element)
    // 对w-if的处理
    processIf(element)
    element.plain = !element.key && !element.attrsList.length
    // 对class的处理
    processClass(element)
    // 对其他属性的处理
    processAttr(element)
    // 定义树根
    if (!root) {
      root = element
    }
    // 如果设置过父节点，定义父子关系
    if (currentParent) {
      currentParent.children.push(element)
      element.parent = currentParent
    }
    if (!unary) {
      currentParent = element
      stack.push(element)
    }
  }
  /**
   * 对结束标签的处理
   * 出栈并设置父节点
   */
  function end() {
    stack.length -= 1
    currentParent = stack[stack.length - 1]
  }
  /**
   * 对文本节点的处理
   */
  function chars(text: string) {
    if (!currentParent) return
    let children = currentParent.children
    if (text) {
      let exp
      if (text !== ' ' && (exp = parseText(text))) {
        children.push({
          type: 2,
          expression: exp.expression,
          tokens: exp.tokens,
          text,
        })
      } else if (text !== ' ' || !children.length) {
        children.push({
          type: 3,
          text,
        })
      }
    }
  }
  function makeAttrsMap(attrs: any[]) {
    const map = {}
    attrs.forEach((attr) => {
      map[attr.name] = attr.value
    })
    return map
  }
  function parseText(text): any {
    if (!textRE.test(text)) return false
    let tokens = [],
      rowTokens = [],
      lastIndex = textRE.lastIndex = 0, // 上一次索引
      match, index, tokenValue, exp
    while (match = textRE.exec(text)) {
      index = match.index
      // 匹配位置大于上次的位置说明中间有text文本
      if (index > lastIndex) {
        rowTokens.push(tokenValue = text.slice(lastIndex, index))
        tokens.push(JSON.stringify(tokenValue))
      }
      exp = match[1].trim()
      tokens.push(`_s(${exp})`)
      rowTokens.push({ "@binding": exp })
      lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
      tokens.push(tokenValue = text.slice(lastIndex))
      rowTokens.push(JSON.stringify(tokenValue))
    }
    return {
      expression: tokens.join("+"),
      tokens: rowTokens
    }
  }
  /**处理for指令 */
  function processFor(el: AstElement) {
    let exp = getRemoveAttr(el, 'w-for')
    if (exp) {
      const inMatch = exp.match(forAliasRE)
      el.for = inMatch[2]
      const alias = inMatch[1]
      const interatorMatch = alias.match(forIteratorRE)
      if (interatorMatch) {
        el.alias = interatorMatch[1].trim()
        el.iterator1 = interatorMatch[2].trim()
      } else {
        el.alias = alias
      }
    }
  }
  /**处理if指令 */
  function processIf(el: AstElement) {
    let exp = getRemoveAttr(el, 'w-if')
    if (exp) {
      el.if = exp
      if (!el.ifConditions) {
        el.ifConditions = []
      }
      el.ifConditions.push({
        exp,
        block: el
      })
    } else {
      if (getRemoveAttr(el, 'w-else') != null) {
        el.else = true
      }
      const elseif = getRemoveAttr(el, 'w-else-if')
      if (elseif) {
        el.elseif = elseif
      }
    }
  }
  function processClass(el: AstElement) {
    let staticClass = getRemoveAttr(el, 'class')
    if (staticClass) {
      el.staticClass = staticClass
    }
  }
  function processKey(el: AstElement) {
    let exp = getRemoveAttr(el, 'key')
    if (exp) {
      el.key = exp
    }
  }
  /**处理其他attr属性 */
  function processAttr(el: AstElement) {
    let list = el.attrsList
    for (let i = 0; i < list.length; i++) {
      let { name, value } = list[i]
      if (dirRE.test(name)) {
        el.hasBindings = true
        // 匹配到on事件绑定
        if (onRE.test(name)) {
          name = name.replace(onRE, "")
          addHandler(el, name, value)
        } else if (bindRE.test(name)) { // 匹配到属性绑定

        }
      }

    }
  }
  // 增加事件
  function addHandler(el: AstElement, name: string, value: string) {
    let events
    events = el.events || (el.events = {})
    let newHandler = {
      value: value.trim()
    }
    let handlers = events[name]
    if (Array.isArray(handlers)) {
      handlers.push(newHandler)
    } else if (handlers) {
      events[name] = [handlers, newHandler]
    } else {
      events[name] = newHandler
    }
    el.plain = false
  }

}

