import { W } from "../instance/W";
import { WObject } from "../types/index";
import { isUndef, isPrimitive, isDef, isHTMLTag } from "../util/index";
import { createEmptyElement, createHtmlElement, createTextNode } from "./node-ops";
import { addAttrs } from "./modules/attr";
import { VNode, createEmptyVNode } from "./vnode"

export function createVNode(
  context: W,
  tag?: string,
  data?: WObject | any[],
  children?: any
): VNode {
  if (isUndef(tag)) {
    return createEmptyVNode()
  }
  // 如果没传data，但是传了children，重置参数
  if (Array.isArray(data) && isUndef(children)) {
    children = data
    data = {}
  }
  // 格式化children参数
  children = normalizeChildren(children)
  let vnode: VNode, Ctor
  /**保留标签说明是原生标签 */
  if (isHTMLTag(tag)) {
    vnode = new VNode(tag, data, children, undefined, undefined, context)
  }/**如果不是原生标签就是自定义组件标签 */
  else if (Ctor = W.options.components[tag]) {
    debugger
    vnode = createComponentVNode(Ctor, data, children, context, tag)
  }
  // let elm = createHtmlElement(tag)
  // /**绑定属性 */
  // addAttrs(elm, data)
  // if(isDef(children)){
  //   children = normalizeChildren(children)
  //   children.map(child => {
  //     if(isPrimitive(child)){
  //       elm.appendChild(createTextNode(child))
  //     }else{
  //       elm.appendChild(child)
  //     }
  //   });
  // }
  return vnode
}


function normalizeChildren(children) {
  if (isUndef(children)) {
    return []
  }
  if (isPrimitive(children)) {
    return [children]
  }
  return children
}

/**创建组件型的vnode */
export function createComponentVNode(Ctor: Function, data: WObject | any[], children: [], context: W, tag?: string): VNode {
  if (isUndef(Ctor)) {
    return
  }
  // Ctor = W._extend(Ctor) // 使用原型继承
  console.log(Ctor.prototype)
  data = data || {}
  const listeners = data.on
  installCompoentHooks(data)
  const vnode = new VNode(tag, data, undefined, undefined, undefined, context, { Ctor, listeners, tag, children })
  return vnode
}

function createComponenInstanceVnode(vnode: VNode){
  return new vnode.componentOptions.Ctor({
    _isComponent: true
  })
}
const componentVNodeHooks = {
  init(vnode: VNode, parentElm?: Node, silbing?: Node){
    if(!vnode.componentInstance){
      const child = vnode.componentInstance = createComponenInstanceVnode(vnode) // 执行组件的构造方法
      child._mount(vnode.elm) // 挂载
    }
  },
  prepatch(oldVnode: VNode,vnode: VNode){
    const options = vnode.componentOptions

  },
  insert(vnode: VNode){
    const { isM } = vnode.componentInstance
  }

}

function installCompoentHooks(data: WObject){
  data.hooks = componentVNodeHooks
}

export function createTextVNode(text: string) {
  return new VNode(undefined, undefined, undefined, String(text))
}