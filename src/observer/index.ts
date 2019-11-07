import { isObject } from '../util'

/**
 * 对data数据递归的进行劫持
 * @param data 
 * @param isRoot 
 */
export function observer(data: object, isRoot: boolean){
  if(!isObject(data)) return
}