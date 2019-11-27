import { VNode } from "../vnode";
import { isUndef } from "../../util/index";

export function addEvent(dom: Element, events){
  if(events){
    for (const key in events) {
      if (events.hasOwnProperty(key)) {
        dom.addEventListener(key, events[key], false)
      }
    }
  }
}

function updateDOMEvent(oldVNode: VNode, vnode: VNode){
  const elm = vnode.elm
  const on = vnode.data.on
  const oldOn = oldVNode.data.on
  if(isUndef(on) && isUndef(oldOn)){
    return
  }
  if(on){
    addEvent(elm, on)
  }
}
export default {
  create: updateDOMEvent
}