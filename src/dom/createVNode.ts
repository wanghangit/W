import { W } from "../instance/index";
import { WObject } from "../types/index";
import { isUndef, isPrimitive, isDef, isHTMLTag } from "../util/index";
import { createEmptyElement, createHtmlElement, createTextNode } from "./node-ops";
import { addAttrs } from "./modules/attr";
import { VNode, createEmptyVNode } from "./vnode"

export function createVNode(
  context: W,
  tag?: string,
  data?: WObject | any[],
  children?: any
): VNode {
  if (isUndef(tag)) {
    return createEmptyVNode()
  }
  // 如果没传data，但是传了children，重置参数
  if (Array.isArray(data) && isUndef(children)) {
    children = data
    data = {}
  }
  // 格式化children参数
  children = normalizeChildren(children)
  let vnode: VNode
  /**保留标签说明是原生标签 */
  if (isHTMLTag(tag)) {
    vnode = new VNode(tag, data, children, undefined, undefined, context)
  } else {
    // TODO: 增加组件化
  }
  // let elm = createHtmlElement(tag)
  // /**绑定属性 */
  // addAttrs(elm, data)
  // if(isDef(children)){
  //   children = normalizeChildren(children)
  //   children.map(child => {
  //     if(isPrimitive(child)){
  //       elm.appendChild(createTextNode(child))
  //     }else{
  //       elm.appendChild(child)
  //     }
  //   });
  // }
  return vnode
}

function normalizeChildren(children) {
  if (isUndef(children)) {
    return []
  }
  if (isPrimitive(children)) {
    return [children]
  }
  return children
}

export function createTextVNode(text: string){
  return new VNode(undefined,undefined,undefined,String(text))
}