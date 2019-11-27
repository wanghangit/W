import { addEvent } from './event'
import { VNode } from '../vnode'
import { isUndef } from '../../util/index'

export function addAttrs(elm: Element, data){
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if(key === 'on'){
        addEvent(elm, data[key])
      }else{
        elm.setAttribute(key, data[key])
      }
    }
  }
}

function updateAttrs(oldVNode: VNode, vnode: VNode){
  if(isUndef(oldVNode.data.attrs) && isUndef(vnode.data.attrs)){
    return
  }
  let key,cur,old
  const elm = vnode.elm
  const oldAttrs = oldVNode.data.attrs || {}
  const attrs = vnode.data.attrs || {}
  /**更新先有的属性 */
  for (key in attrs) {
    cur = attrs[key]
    old = oldAttrs[key]
    if(cur!==old){
      elm.setAttribute(key, cur)
    }
  }
  /**删除不用的属性 */
  for (key in oldAttrs) {
    if(isUndef(attrs[key])){
      elm.removeAttribute(key)
    }
  }
}

export default {
  create: updateAttrs,
  update: updateAttrs
}
