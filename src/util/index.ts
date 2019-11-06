/**在开发模式下输出警告 */
export const warn = (message:string) => {
  if(process.env.NODE_ENV !== 'production'){
    console.warn(message)
  }
}