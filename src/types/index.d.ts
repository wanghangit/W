/**初始化组件使用的options参数 */
export interface WOptions {
  data: object | Function, // 组件内数据
  methods?: object, // 组件内的方法
  render?: any, // 组件的render函数
  components?: WObject, // 当前组件的子组件
  template?: string // 模版字符串
}
/**为了兼容一些不常用的obj的类型检查 */
export interface WObject extends Object {
  [key: string]: any
}

export interface AstElement extends Object {
  type: number, // 存贮元素的类型与HtmlELement的type几乎一样
  tag: string, // 存贮元素的标签名
  attrsList: WObject[], // 存贮属性列表
  attrsMap: Object,// 存贮属性的map
  parent: AstElement | null, // 当前父元素
  children: AstElement[], // 子元素
  hasBindings?: boolean, // 是否是v-bind元素
  if?: any, // 是否有v-if元素
  ifConditions?: any[], // if的条件表达式
  else?: any, // v-else
  elseif?: any, // v-elseif
  for?: any, // 是否有for循环
  alias?: any, 
  iterator1?: any // 是否有迭代器
  events?: any, // 事件绑定
  staticClass?: string, // 静态class
  plain?: boolean, // 是否是占位元素
  key?: any, // key值
  forProcessed?: boolean,
  ifProcessed?: boolean,
}



