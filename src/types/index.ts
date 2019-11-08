/**初始化组件使用的options参数 */
export interface WOptions {
  data: object | Function, // 组件内数据
  methods: object, // 组件内的方法
  render?: Function, // 组件的render函数
}
/**为了兼容一些不常用的obj的类型检查 */
export interface WObject extends Object{
  [key: string]: any
}