import { AstElement } from "../types/index"

/**
 * 对node的type类型的说明
 * 1.astElement
 * 2.express
 * 3.text
 * 生成代码
 * @param ast 
 * 
 */
export function generate(ast: AstElement) {
  const code = ast ? genElement(ast) : '_c("div")'
  console.log(code)
  return {
    render: `with(this){return ${code} }`
  }
}

/**
 * 生成
 * @param el 
 */
function genElement(el:AstElement){
  if(el.for && !el.forProcessed){
    return genFor(el)
  }else if(el.if && !el.ifProcessed){
    return genIf(el)
  }else{
    let code
    const data = el.plain ? undefined : genData(el)
    const children = genChildren(el, true)
    code = `_c('${el.tag}'${
      data ? `,${data}` : ''
    }${children ? `,${children}` : ''})`
    return code
  }
}
function genFor(el:AstElement){
  const exp = el.for
  const alias = el.alias
  const iterator1 = el.iterator1 ? `,${el.iterator1}` : ''
  // 防止被重复标记
  el.forProcessed = true
  return `_l((${exp}),` +
    `function(${alias}${iterator1}){` +
      `return ${genElement(el)}` +
    '})'
}
function genIf(el:AstElement){
  el.ifProcessed = true
  return genIfConditions(el.ifConditions.slice())
}
function genIfConditions(conditions){
  if(!conditions.length){
    return '_e()'
  }
  const condition = conditions.shift()
  if(condition.exp){
    return `(${condition.exp})?${genTeranaryExp(condition.block)}:${genIfConditions(conditions)}`
  }else{
    return `${genTeranaryExp(condition.block)}`
  }
}
function genTeranaryExp(el){
  return genElement(el)
}
function genChildren(el:AstElement, checkSkip?: boolean){
  const children = el.children
  if(children.length){
    el = children[0]
    if(children.length === 1 && el.for){
      return genElement(el)
    }
    return `[${children.map(genNode).join(",")}]`
  }
}
function genNode(node){
  if(node.type === 1){
    return genElement(node)
  }else{
    return genText(node)
  }
}

function genText(node):string{
  return `_v(${node.type===2?node.expression:JSON.stringify(node.text)})`
}
function genData(el:AstElement){
  let data = "{"
  if(el.events){
    data+=`${getHandlers(el.events)},`
  }
  if(el.key){
    data+=`key:${el.key},`
  }
  if(el.staticClass){
    data+=`staticClass:${JSON.stringify(el.staticClass)}`
  }
  data = data.replace(/,$/, "")+'}'
  return data
}

function getHandlers(events){
  let res = "on:{"
  for (const name in events) {
    const handler = events[name]
    res+=`"${name}":${getHandler(name, handler)}`
  }
  return res.slice()+"}"
}

function getHandler(name, handler){
  if(!handler){
    return 'function(){}'
  }
  if(Array.isArray(handler)){
    return `[${handler.map(handler => getHandler(name, handler)).join(",")}]`
  }
  return handler.value
}