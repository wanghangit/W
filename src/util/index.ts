/**在开发模式下输出警告 */
export const warn = (message:string) => {
  if(process.env.NODE_ENV !== 'production'){
    console.warn(message)
  }
}

/**空函数用来占位 */
export const noop = function() {}

/**判断是不是对象 */
export function isObject(obj: any) {
  return obj !== null && typeof obj === 'object'
}