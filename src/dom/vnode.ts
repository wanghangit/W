import { WObject } from "../types/index"
import { W } from "../instance/index";

export class VNode {
  tag: string; // 表示元素的类型
  data: WObject; // 
  children?: VNode[]; // 子元素
  text: string; // 文本元素
  elm: any; // 指向原生的dom节点
  key?: string | number; // 用来加快同级diff的标识
  parent: VNode | void; // 指向父元素
  context: W; // 指向的W实例上下文
  isStatic: boolean; // 是否是静态标签
  isComment: boolean; // 是否是注释节点
  isRootInsert: boolean; // 是否作为根节点插入
  constructor(
    tag?: string,
    data?: WObject,
    children?: VNode[],
    text?: string,
    elm?: any,
    context?: W
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.context = context
    this.key = data && data.key
    this.parent = undefined
    this.isStatic = false
    this.isComment = false
    this.isRootInsert = false
  }
}

/**
 * 创建空节点
 */
export function createEmptyVNode() {
  const node = new VNode()
  node.text = '';
  node.isComment = true
  return node;
}

/**
 * 创建文本节点
 * @param val 
 */
export function createTextVNode(val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}