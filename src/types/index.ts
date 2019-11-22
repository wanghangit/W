/**初始化组件使用的options参数 */
export interface WOptions {
  data: object | Function, // 组件内数据
  methods: object, // 组件内的方法
  render?: any, // 组件的render函数
  template?: string // 模版字符串
}
/**为了兼容一些不常用的obj的类型检查 */
export interface WObject extends Object{
  [key: string]: any
}

export interface AstElement extends Object{
  type: number, // 1 
  tag: string,
  attrsList: WObject[],
  attrsMap: Object,
  parent: AstElement | null,
  children: AstElement[],
  hasBindings?: boolean,
  if?: any,
  ifConditions?: any[],
  else?: any,
  elseif?: any,
  for?: any,
  alias?: any,
  iterator1?: any
  events?: any,
  staticClass?: string,
  plain?: boolean,
  key?:any,
  forProcessed?:boolean,
  ifProcessed?:boolean,
}



