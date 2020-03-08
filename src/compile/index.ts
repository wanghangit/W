import { W } from "../instance/W";
import { parse } from './parseElement'
import { generate } from './generate'
import { AstElement } from "../types/index";
import { makeMap } from "../util/index";

// 是否是静态标签
let isStaticKey
/**负责模版编译 */
class Compile {
  _w: W;
  _template: string;
  render: Function
  constructor(w: W, template: string) {
    this._w = w; // 保存当前实例
    this._template = template; // 保存当前模版
    this._init()
  }
  _init() {
    // 生成抽象语法树
    const ast = parse(this._template);
    console.log(ast)
    // 优化语法树
    this.optimize(ast);
    // 代码生成
    const code = generate(ast);
    // 通过字符串生成render函数
    this.render = new Function(code.render)
    console.log(code)
  }
  /**
   * 主要是对语法树的优化将不会变化的节点标记成static
   * 例如class这种不会变得属性
   * 深度优先遍历只要子节点不是静态的那么父节点也不是
   * @param ast 
   */
  private optimize(ast: AstElement) {
    if(!ast) return
    isStaticKey = makeMap("type,tag,attrsList,attrsMap,plain,parent,children,attrs,staticClass,staticStyle")
    this.markStatic(ast) // 标记每一个节点是不是静态节点
    this.markStaticRoot(ast)// 标记根节点是不是静态根节点
  }
  markStatic(node){
    node.static = this.isStatic(node)
    if(node.type===1){ // 如果是HTMlELEMENT元素
      node.children.forEach(child =>{
        this.markStatic(child)
        if(!child.static){
          node.static = false
        }
      })
    }
  }
  markStaticRoot(node){
    if(node.type === 1){
      if(node.static && node.children.length && !(node.children.length===1 && node.children[0].type === 3)){
        node.staicRoot = true
        return
      }else{
        node.staticRoot = false
      }
      if(node.children){
        node.children.forEach((child) => {
          this.markStaticRoot(child)
        })
      }
    }
  }
  isStatic(node){ // 判断是不是静态标签，就是没有vue数据绑定相关的代码
    if(node.type === 2){ // 表达式
      return false
    }else if(node.type === 3){ // 表示文本节点text
      return true
    }
    return !node.if && !node.for && !node.hasBindings
  }
}

export default Compile
