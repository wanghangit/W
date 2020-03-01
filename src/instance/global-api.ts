import { WObject, WOptions } from "../types/index"

let cid = 1
/**
 * 子定义的组件继承W的过程
 * @param options 
 */
export function _extend(options: WObject = {}){
  const Super = this
  const SuperId = Super.cid
  const cacheCtor = options._Ctor || (options._Ctor = {})
  /**如果子组件已经继承过直接返回 */
  if(cacheCtor[SuperId]){
    return cacheCtor[SuperId]
  }
  const name = options.name || Super.name
  const Sub = function(coptions){
    this._init(coptions)
  }
  Sub.prototype = Object.create(Super.prototype)
  Sub.prototype.constructor = Sub
  Sub.cid = cid++
  Sub['super'] = Super
  cacheCtor[SuperId] = Sub
  return Sub
}

/**注册全局组件 */
export function registerComponent(id: string, component: WOptions){
  this.options.components[id] = this._extend(component)
}

export function initGolbalApi(W){
  W.options = {
    components: Object.create(null)
  }
}