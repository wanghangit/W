import W from './index'
import { observe } from '../observer'
import { noop } from '../util'



/**
 * 初始化所有状态参数例如data
 * @param w W实例
 */
export const initState = function (w: W) {
  const _options = w._options;
  if (_options.data) {
    initData(w)
  }
}

function initData(w: W) {
  let data = w._options.data
  /**对象是引用类型，复用组件时可能会出错，所以可以用函数返回data */
  data = w._data = typeof data === 'function'
    ? data()
    : data || {}
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      proxy(w, '_data', key)
    }
  }
  // 双向绑定劫持数据
  observe(data, true)
}

let commonProperty = {
  get: null,
  set: null,
  enumerable: true,
  configurable: true,
}

/*通过proxy函数将_data（或者_props等）上面的数据代理到vm上，这样就可以用app.text代替app._data.text了。*/
function proxy(target: W, key: string, sourceKey: string){
  commonProperty.get = function getProxy(){
    return this[key][sourceKey]
  }
  commonProperty.set = function setProxy(val: any){
    this[key][sourceKey] = val
  }
  Object.defineProperty(target, key, commonProperty)
}
