import { createVNode, createTextVNode } from "../dom/createVNode"
import { W } from "./W"
import { renderList, toString } from "../compile/helper"
import { createEmptyVNode } from "../dom/vnode"

export function initRender(w: W){
  w._c = (a,b,c) => createVNode(w, a, b, c) // 用来编译模版
  w._createElement = (a, b, c) => createVNode(w, a, b, c)
}

export function renderMixin(W: Function){
  /**模版渲染辅助方法 */
  W.prototype._v = createTextVNode
  W.prototype._s = toString
  W.prototype._l = renderList
  W.prototype._e = createEmptyVNode
}