import { W } from "../instance/index";
import { WObject } from "../types/index";
import { isUndef, isPrimitive } from "../util/index";
import { createEmptyElement, createHtmlElement, createTextNode } from "./node-ops";


export function initRender(w: W){
  w._createElement = (a, b, c) => createElement(w, a, b, c)
}

export function createElement(
  context: W,
  tag?: string,
  data?: WObject,
  children?: any[]
){
  if(isUndef(tag)){
    return createEmptyElement()
  }
  debugger
  let elm = createHtmlElement(tag, data)
  children = normalizeChildren(children)
  const childElm = children.map(child => {
    if(isPrimitive(child)){
      elm.appendChild(createTextNode(child))
    }else{
      elm.appendChild(child)
    }

  });
  console.log(elm)
  return elm
}

function normalizeChildren(children){
  if(isPrimitive(children)){
    return [children]
  }
  return children
}