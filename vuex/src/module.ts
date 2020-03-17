import { forEachValue } from './util'

export default class Module{
  runtime: boolean;
  _children: any;
  state: any;
  rawModule: any;
  constructor(rawModule, runtime){
    this.runtime= runtime
    this._children = Object.create(null)
    this.rawModule = rawModule
    const state = rawModule.state
    this.state = (typeof state === 'function' ? state() : state) || {}
  }
  appendChild(key,module){
    this._children[key] = module
  }
  getChild(key){
    return this._children[key]
  }
}