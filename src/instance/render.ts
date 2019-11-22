import { createElement } from "../dom/createElement"
import { W } from "./index"
import { createEmptyElement, createTextNode } from "../dom/node-ops"
import { renderList, toString } from "../compile/helper"

export function initRender(w: W){
  w._c = (a,b,c) => createElement(w, a, b, c)
  w._createElement = (a, b, c) => createElement(w, a, b, c)
}

export function renderMixin(W: Function){
  /**模版渲染辅助方法 */
  W.prototype._v = createTextNode
  W.prototype._s = toString
  W.prototype._l = renderList
  W.prototype._e = createEmptyElement
}