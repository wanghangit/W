import { W } from "../instance/index";
import { WObject } from "../types/index";
import { isUndef, isPrimitive, isDef } from "../util/index";
import { createEmptyElement, createHtmlElement, createTextNode } from "./node-ops";
import { addAttrs } from "./modules/attr";

export function createElement(
  context: W,
  tag?: string,
  data?: WObject|any[],
  children?: any
){
  if(isUndef(tag)){
    return createEmptyElement()
  }
  if(Array.isArray(data)){
    children = data
    data = {}
  }
  
  let elm = createHtmlElement(tag)
  /**绑定属性 */
  addAttrs(elm, data)
  if(isDef(children)){
    children = normalizeChildren(children)
    children.map(child => {
      if(isPrimitive(child)){
        elm.appendChild(createTextNode(child))
      }else{
        elm.appendChild(child)
      }
    });
  }
  console.log(elm)
  return elm
}

function normalizeChildren(children){
  if(isPrimitive(children)){
    return [children]
  }
  return children
}