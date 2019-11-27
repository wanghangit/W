import { VNode } from "./vnode";
import { isUndef, isDef, isPrimitive, isObjectText } from "../util/index";
import modules from './modules/index'
import { tagName, parentNode, nextSibling, createHtmlElement, appendChild, createTextNode, removeChild, insertBefore, setContentText } from "./node-ops";

const hooks = ["create", "update"]
const emptyVNode = new VNode("", {}, [])
/**根据hook和模块生成基础的钩子函数 */
const baseHooks = createModules(modules)

function createModules(modules){
  const cb = Object.create(null)
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i]
    for (const key in modules) {
      if(modules[key][hook]){
        if(!cb[hook]){
          cb[hook] = [modules[key][hook]]
        }else{
          cb[hook].push(modules[key][hook])
        }
      }
    }
  }
  return cb
}

export function patch(oldVNode: VNode, vnode: VNode, element?: Element): Element {
  const insertedVnodeQueue = []
  // 相同的vnode需要patch更新
  if (isUndef(element) && sameVNode(oldVNode, vnode)) {
    patchVNode(oldVNode, vnode, insertedVnodeQueue)
  } else {
    // 初次渲染会传入挂载元素
    if (isDef(element.nodeType)) {
      oldVNode = emptyVNodeAt(element)
    }
    // 不是相同类型的vnode会直接将旧的移除，生成新的元素
    const oldElement = oldVNode.elm
    const parentElm = parentNode(oldElement)
    createElement(vnode, insertedVnodeQueue, parentElm, nextSibling(oldElement))
    if(isDef(parentElm)){
      removeVNodes(parentElm, [oldVNode], 0,0)
    }
  }
  return vnode.elm
}

/**
 * 判断是不是相同的vnode
 */
function sameVNode(a: VNode, b: VNode): boolean {
  return (a.key === b.key) && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data))
}

/**
 * 对比两个相同类型的vnode
 */
function patchVNode(oldVNode: VNode, vnode: VNode, insert: any[]) {
  if(oldVNode === vnode){
    return
  }
  const elm = vnode.elm = oldVNode.elm
  const oldCh = oldVNode.children
  const ch = vnode.children
  //TODO: 调用更新钩子函数
  /**如果新的vnode没有text元素 */
  if(isUndef(vnode.text)){
    /**如果都存在子元素则需要进行diff比较 */
    if(isDef(oldCh) && isDef(ch)){
      if(oldCh !== ch){
        updateChildren(elm, oldCh, ch, insert)
      }
    }else if(isDef(ch)){
      /**如果只有新的vnode中存在，并且旧的是text节点则需要先移除 */
      if(isDef(oldVNode.text)){
        setContentText(elm, "")
      }
      addVnodes(elm, null, ch, 0, ch.length-1, insert)
    }/**如果只有旧的vnode存在移除旧的dom */
    else if(isDef(oldCh)){
      removeVNodes(elm, oldCh, 0, oldCh.length-1)
    }else if(oldVNode.text){
      setContentText(elm, "")
    }
  }/**如果新旧text不同更新 */
  else if(oldVNode.text !== vnode.text){
    setContentText(elm, vnode.text)
  }
}

/**
 * 根据旧的vnode移除dom元素
 */
function removeVNodes(parentElm: Node, oldVNodes:VNode[], start:number, end:number){
  for (let i = start; i <= end; i++) {
    const elm = oldVNodes[i].elm
    removeChild(parentElm, elm)
  }
}

/**
 * 根据vnode增加dom元素
 */
function addVnodes(parentElm: Node, refElm: Node, vnodes: VNode[], start: number, end: number, insert: any[]){
  for (let i = start; i <= end; i++) {
    createElement(vnodes[i],insert,parentElm,refElm)  
  }
}

/**
 * 根据diff算法更新children
 */
function updateChildren(parentElm: Node, oldCh: VNode[], ch: VNode[], insert: any[]){
 let oldStartIndex = 0,
     newStartIndex = 0,
     oldEndIndex = oldCh.length-1,
     oldStartNode = oldCh[oldStartIndex],
     oldEndNode = oldCh[oldEndIndex],
     newEndIndex = ch.length-1,
     newStartNode = ch[newStartIndex],
     newEndNode = ch[newEndIndex],
     oldKeyToIndex, elmToMove, indexInOld;
  /**2对首位指针遍历，直到2对首尾指针都碰撞为止,每一步都要更新指针 */
  while(oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex){
    /**下边2个条件过滤掉不存在的vnode */
    if(isUndef(oldStartNode)){
      oldStartNode = oldCh[++oldStartIndex]
    }else if(isUndef(oldEndNode)){
      oldEndNode = oldCh[--oldEndIndex]
    }/**开始位置相同直接patch2个vnode */
    else if(sameVNode(oldStartNode, newStartNode)){
      patchVNode(oldStartNode, newStartNode, insert)
      oldStartNode = oldCh[++oldStartIndex]
      newStartNode = ch[++newStartIndex]
    }/**末尾位置相同直接patch2个vnode */
    else if(sameVNode(oldEndNode, newEndNode)){
      patchVNode(oldEndNode, newEndNode, insert)
      oldEndNode = oldCh[--oldEndIndex]
      newEndNode = ch[--newEndIndex]
    }/**旧的首位和新的结束位置相同，patch元素并向右移动到end位置 */
    else if(sameVNode(oldStartNode, newEndNode)){
      patchVNode(oldStartNode, newEndNode, insert)
      insertBefore(parentElm, oldStartNode.elm, nextSibling(oldEndNode.elm))
      oldStartNode = oldCh[++oldStartIndex]
      newEndNode = ch[--newEndIndex]
    }/**旧的末尾变成了新的首部位置，patch元素并左移到start位置 */
    else if(sameVNode(oldEndNode, newStartNode)){
      patchVNode(oldEndNode, newStartNode, insert)
      insertBefore(parentElm, oldEndNode.elm, nextSibling(oldStartNode.elm))
      oldEndNode = oldCh[--oldEndIndex]
      newStartNode = ch[++newStartIndex]
    }/**直接的比较已经比较完了，接下来将首尾没有匹配到的元素根据key转化成map类型加快搜索 */
    else{
      if(isUndef(oldKeyToIndex)){
        oldKeyToIndex = {}
        for (let i = oldStartIndex; i < oldEndIndex; i++) {
          if(oldCh[i].key){
            oldKeyToIndex[oldCh[i].key] = i
          }
        }
      }
      indexInOld = isDef(newStartNode.key) ? oldKeyToIndex(newStartNode.key) : null
      /**如果未找到说明是新的元素 */
      if(isUndef(indexInOld)){
        createElement(newStartNode, insert, parentElm, oldStartNode.elm)
        newStartNode = ch[++newStartIndex]
      }else{
        /**找到了旧的元素直接移动位置并patch */
        elmToMove = oldCh[indexInOld]
        if(sameVNode(newStartNode, elmToMove)){
          patchVNode(elmToMove, newStartNode, insert)
          oldCh[indexInOld] = undefined
          insertBefore(parentElm,newStartNode.elm,oldStartNode.elm)
          newStartNode = ch[++newStartIndex]
        }else{
          createElement(newStartNode, insert,parentElm,oldStartNode.elm)
          newStartNode = ch[++newStartIndex]
        }
      }
    }
  }
  if(oldStartIndex>oldEndIndex){
    /**旧的元素比较完了，剩下的新元素都直接插入 */
    const sibling = isUndef(ch[newEndIndex+1]) ? null : ch[newEndIndex+1].elm
    addVnodes(parentElm, sibling, ch, newStartIndex, newEndIndex, insert)
  }else if(newStartIndex>newEndIndex){
    /**新的元素遍历完了，将旧的元素删除 */
    removeVNodes(parentElm,oldCh, oldStartIndex, oldEndIndex)
  }
}

/**
 * 使用html元素创建vnode
 */
function emptyVNodeAt(element: Element): VNode {
  return new VNode(tagName(element).toLowerCase(), {}, [], undefined, element)
}

function createElement(vnode: VNode, insert: any[], parentElm: Node, sibling: Node, nested?: boolean) {
  vnode.isRootInsert = !nested
  /**创建组件类型 */
  if(createComponent(vnode, insert, parentElm, sibling)){
    return
  }
  const { data, children, tag}  = vnode
  if(isDef(tag)){
    vnode.elm = createHtmlElement(tag)
    createChildren(vnode,children,insert)
    if(vnode.data){
      invokeCreateHooks(vnode)
    }
    insertDom(parentElm, vnode.elm, sibling)
  }else { // 如果是文本插入文本
    vnode.elm = createTextNode(vnode.text)
    insertDom(parentElm, vnode.elm, sibling)
  }
}

function createChildren(vnode: VNode, children: VNode[],insert: any[]){
  if(Array.isArray(children)){
    children.forEach(function(child){
      createElement(child, insert, vnode.elm,null,true)
    })
  }else if(isPrimitive(vnode.text)){
    appendChild(vnode.elm, createTextNode(vnode.text))
  }
}

function insertDom(parentElm:Node, curEle: any, sibling: Node){
  if(isDef(parentElm)){
    if(isDef(sibling)){
      if(sibling.parentElement === parentElm){
        insertBefore(parentElm, curEle, sibling)
      }
    }else{
      appendChild(parentElm, curEle)
    }
  }
}

function invokeCreateHooks(vnode: VNode){
  baseHooks.create.forEach((hook) => {
    hook(emptyVNode, vnode)
  })
  //TODO 组件生命周期调用

}

//TODO: 创建组件型组件
function createComponent(vnode: VNode, insert: any[], parentElm: Node, sibling: Node):boolean{
  return false
}