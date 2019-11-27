import { VNode } from "../vnode";
import { isUndef } from "../../util/index";

/**
 * 目前只支持静态class
 */
function updateClass(oldVNode: VNode, vnode: VNode){
  const elm = vnode.elm
  const data = vnode.data
  const oldData = oldVNode.data
  if(isUndef(data.staticClass)&&isUndef(oldData.staticClass)){
    return
  }
  if(data.staticClass){
    elm.setAttribute("class", data.staticClass)
  }
}

export default {
  create: updateClass
}