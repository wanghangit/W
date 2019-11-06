import { warn } from '../util'
import { initMixin } from './init'
import { WOptions } from '../types'

/**库的入口文件用来实例化一个root */
function W(options: WOptions){
  this._init(options)
}

initMixin(W)