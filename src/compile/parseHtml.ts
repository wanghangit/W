import { makeMap, warn } from "../util/index"
import { WObject } from "../types/index"

const tagName = "([a-zA-Z_][\\w\\-\\.]*)"
const startTagOpen = new RegExp(`^<${tagName}`) // 捕获开始标签 <div
const startTagClose = /^\s*(\/?)>/ // 开始标签结束 /> 
const endTag = new RegExp(`^<\\/${tagName}[^>]*>`) // 结束标签 </div>
const attrIdentifier = /([^\s"'<>/=]+)/ // 属性标识
const attrAssgin = /(?:=)/ // 属性=
const attrValues = [
  /"([^"]*)"+/.source,
  /'([^']*)'+/.source,
  /([^\s"'=<>']+)/.source
] // 属性值
const attrReg = new RegExp(`^\\s*${attrIdentifier.source}(?:\\s*(${attrAssgin.source}))\\s*(?:${attrValues.join("|")})`)
const isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

/**
 * 处理html字符串生成抽象语法书
 * @param html 
 */
export function parseHtml(html: string, start: Function, end: Function, chars: Function) {
  let index=0,// 标记字符串位置
      last,
      stack = [] // 用来存放匹配的标签寻找父子关系
  while (html) {
    last = html
    let textEnd = html.indexOf("<")
    let startTagMatch, endTagMatch
    if (textEnd === 0) {
      /**匹配到结束标签 */
      endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        parseEndTag(endTagMatch[1])
        continue
      }
      /**匹配到开始标签 */
      startTagMatch = parseStartTag()
      if(startTagMatch){
        handleStartTag(startTagMatch)
        continue
      }
    }
    let rest, text, next
    /**说明有非标签的元素要处理 */
    if (textEnd > 0) {
      rest = html.slice(textEnd)
      while(!endTag.test(rest) && !startTagOpen.test(rest)){
        next = rest.indexOf("<", 1)
        if(next < 0) break
        textEnd += next
        rest = html.slice(textEnd)
      }
      text = html.substring(0, textEnd)
      advance(textEnd)
    }
    /**没有标签直接当文本处理 */
    if(textEnd < 0){
      text = html
      html = ""
    }
    if(text){
      chars(text)
    }
  }
  /**处理结束tag */
  function parseEndTag(tag){
    // if((stack[stack.length-1].tag)!= tag){
    //   warn(`${tag} is parse error`)
    // }
    end()
  }
  /**处理开始标签 */
  function parseStartTag() {
    /**匹配起始标签取出tag */
    let start = html.match(startTagOpen)
    let end, attr, match
    if (start) {
      match = {
        tagName: start[1],
        start: index,
        attrs: []
      }
      advance(start[0].length)
    }
    /**当不是结束标签时取出attr */
    while(!(end = html.match(startTagClose)) && (attr=html.match(attrReg))){
      attr.start = index;
      advance(attr[0].length)
      attr.end = index
      match.attrs.push(attr)
    }
    if(end){
      match.unarySlash = end[1]
      advance(end[0].length)
      match.end = index
      return match
    }
  }
  /**处理开始标签 */
  function handleStartTag(match: WObject){
    let { tagName, unarySlash, attrs } = match
    for (let i = 0; i < attrs.length; i++) {
      const args = attrs[i];
      attrs[i] = {
        name: args[1],
        value: args[3] || args[4] || args[5] || '',
        start: args.start + args[0].match(/\s*/).length,
        end: args.end 
      }    
    }
    let unary = isUnaryTag(tagName)
    if(!unary){
      stack.push({tag:tagName, attrs: attrs})
    }
    start(tagName, attrs, unary)
  }
  /**处理完字符串，向前移动 */
  function advance(n: number) {
    index += n
    html = html.substring(n)
  }
}
