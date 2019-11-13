import { W } from "../instance/index";
import { WObject } from "../types/index";
import { isUndef, isPrimitive } from "../util/index";
import { createEmptyElement, createHtmlElement, createTextNode } from "./node-ops";
import { addAttrs } from "./modules/attr";


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
  let elm = createHtmlElement(tag)
  /**绑定属性 */
  addAttrs(elm, data)
  children = normalizeChildren(children)
  children.map(child => {
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