const _toString = Object.prototype.toString
const _hasOwn = Object.prototype.hasOwnProperty

export const hasProto: boolean = '__proto__' in {}

/**在开发模式下输出警告 */
export function warn(message:string) {
  if(process.env.NODE_ENV !== 'production'){
    console.warn(message)
  }
}

/**空函数用来占位 */
export const noop = function() {}

/**判断是不是对象 */
export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object'
}

export function isDef(v:any): boolean {
  return v!==undefined && v!==null
}

export function isUndef(v:any): boolean {
  return v===undefined || v===null
}

/**在原型链上定义属性 */
export function def(target: object, key: string, val: any, enumerable?:boolean){
  Object.defineProperty(target, key, {
    value: val,
    enumerable: !!enumerable,
    configurable: true,
    writable: true   
  })
}
/**查看本身是否存在属性 */
export function hasOwn(obj: object | Array<any>, key: string): boolean{
  return _hasOwn.call(obj, key)
}

export function isArray(obj: any): boolean{
  return _toString.call(obj) === '[object Array]'
}

export function isPlainObject(obj: any): boolean{
  return _toString.call(obj) === '[object Object]'
}

export function isPrimitive(val){
  return typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean'
}

/**交换2个元素的值 */
export function swap<T>(a: T, b:T){
  let temp = a;
  a = b;
  b = temp;
}

export function query(el: string | HTMLElement){
  if(typeof el === 'string'){
    let dom = document.querySelector(el)
    if(!dom){
      warn(`${dom} is not element`)
      return document.createElement('div')
    }
    return dom
  }
  return el
}