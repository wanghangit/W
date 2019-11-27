import { warn, query, noop } from '../util/index'
import { initState } from './state'
import { WOptions } from '../types/index'
import { Watcher } from '../observer/Watcher'
import { initRender, renderMixin } from './render'
import { createVNode } from '../dom/createVNode';
import { removeChild } from '../dom/node-ops';
import Compile from '../compile/index';
import { VNode } from '../dom/vnode'
import { patch } from '../dom/patch'

/**库的入口文件用来实例化一个root */
export class W {
  static uid: number = 0; // 全局递增属性
  _uid: number; // 用来记录每一个实例
  _options: WOptions; // 配置对象
  _isW: boolean; // 防止自身被观察
  _data: object // 私有的data变量用来代理数据使用
  _watchers: Watcher[] // 存放所有观查器
  _watcher: Watcher; // 当前实例的渲染Watcher
  _createElement: Function // 生成vnode的方法
  _el: Element; // 当前的挂载dom元素
  _vnode: VNode; // 当前的vnode元素 
  _c: Function
  constructor(options: WOptions) {
    this._init(options)
  }
  /**初始化方法 */
  _init(options) {
    this._uid = W.uid++
    this._options = options
    this._isW = true
    this._watchers = []
    initState(this)
    initRender(this)
    if (options.el) {
      this._mount(options.el)
    }
  }
  _mount(el: string) {
    const dom = query(el)
    this._el = dom
    let updateComponent
    let { render, template } = this._options
    // TODO 增加模版编译，目前只支持render方法
    if (!render) {
      if (template) {
        this._options.render = new Compile(this, template.replace(/(^\s*)|[\r\n]|(\s*$)/g, "")).render
      }
    }
    updateComponent = () => {
      this._update(this._render())
    }
    this._watcher = new Watcher(this, updateComponent, noop)
  }
  /**将节点更新到dom上 */
  _update(vnode: VNode) {
    const w = this
    const preVNode = w._vnode
    w._vnode = vnode
    /**如果之前没有vnode */
    if (!preVNode) {
      w._el = w._patch(null, vnode, w._el)
    } else {
      w._el = w._patch(preVNode, vnode)
    }
  }
  /**根据render函数生成vnode */
  _render() {
    const { render } = this._options
    let html: VNode
    try {
      html = render.call(this, this._createElement)
    } catch (error) {
      warn(`render error:${error}`)
    }
    return html
  }
  /**对比vnode生成dom元素 */
  _patch(oldVNode: VNode, vnode: VNode, oldElemet?: Element): Element {
    return patch(oldVNode, vnode, oldElemet)
  }
}
initMixin(W)
function initMixin(W: Function) {
  renderMixin(W)
}