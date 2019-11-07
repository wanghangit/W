import { warn } from '../util'
import { initState } from './state'
import { WOptions } from '../types'

/**库的入口文件用来实例化一个root */
class W {
  static uid: number = 0; // 全局递增属性
  _uid: number; // 用来记录每一个实例
  _options: WOptions; // 配置对象
  _isW: boolean; // 防止自身被观察
  _data: object // 私有的data变量用来代理数据使用
  constructor(options: WOptions){
    this._init(options)
  }
  /**初始化方法 */
  _init(options){
    this._uid = W.uid++
    this._options = options
    this._isW = true
    initState(this)
  }
}

export default W