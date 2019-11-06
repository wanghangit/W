import { WOptions } from '../types'

let uid = 0
export const initMixin = function (W: Function) {
  W.prototype._init = function (options: WOptions) {
    const w: Component = this
    w._uid = uid++ 
    initState()
  }
}