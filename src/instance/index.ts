import { warn, query, noop } from '../util/index'
import { initState } from './state'
import { WOptions } from '../types/index'
import { Watcher } from '../observer/Watcher'
import { createElement, initRender } from '../dom/createElement';
import { removeChild } from '../dom/node-ops';

/**库的入口文件用来实例化一个root */
export class W {
  static uid: number = 0; // 全局递增属性
  _uid: number; // 用来记录每一个实例
  _options: WOptions; // 配置对象
  _isW: boolean; // 防止自身被观察
  _data: object // 私有的data变量用来代理数据使用
  _watchers: Watcher[] // 存放所有观查器
  _watcher: Watcher; // 当前实例的渲染Watcher
  _createElement: Function
  _el: Element;
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
    // TODO 增加模版编译，目前只支持render方法
    if (!this._options.render) {
      warn('render is not define')
      return
    }
    updateComponent = () => {
      this._update(this._render())
    }
    this._watcher = new Watcher(this, updateComponent, noop)
  }
  /**将节点更新到dom上 */
  _update(htmlNode: HTMLElement) {
    /**每次更新前先将旧的清除 */
    this._el.childNodes.forEach((node) => {
      removeChild(this._el, node)
    })
    this._el.appendChild(htmlNode)
  }
  /**根据render函数生成代码 */
  _render() {
    const { render } = this._options
    let html
    try {
      html = render.call(this, this._createElement)
    } catch (error) {
      warn(`render error`)
    }
    return html
  }
}