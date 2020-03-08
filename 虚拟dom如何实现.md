# 虚拟 dom

前边说完了响应式数据，我们可以监测到数据变化，数据怎么反映到真是 dom 上，前边说了我们有负责渲染的`Watcher`,每当触发修改时，都会重新触发这个渲染 Watcher 的回调，在第一个章节中我们在 mount 方法中展示过，在挂载的方法中，我们会实例化一个负责渲染的 Wathcer。这个过程主要两个步骤

1. 通过编译生成的 render 方法生成 vnode
2. 根据生成的 vnode，通过 diff 算法更新到 dom 上

```ts
// mount方法中的方法
updateComponent = () => {
    // Wathcher监测到数据变化后的渲染方法
    this._update(this._render()); // 根据render方法
  };
this._watcher = new Watcher(this, updateComponent, noop); // 实例化负责渲染的
// 主类W中的方法
/**将节点更新到dom上 */
_update(vnode: VNode) {
  const w = this;
  const preVNode = w._vnode;
  w._vnode = vnode;
  /**如果之前没有vnode */
  if (!preVNode) {
    w._el = w._patch(null, vnode, w._el);
  } else {
    w._el = w._patch(preVNode, vnode);
  }
}
/**根据render函数生成vnode */
_render() {
  const { render } = this._options;
  let html: VNode;
  try {
    html = render.call(this, this._createElement);
  } catch (error) {
    warn(`render error:${error}`);
  }
  return html;
}
```

## 如何生成 VNode

1. 什么是 VNode？

我们在经常会操作 dom，但我们修改 dom 的属性，都是比较耗费性能的。如果逻辑复杂，我们操作 dom 写起来很痛苦，比较像面向过程编程。我们点击任意一个标签，如果我们想操作，都要精准的匹配到当前元素。我认为这个增加了编程的复杂度，VNode 就是用来解决这个问题的，浏览器在绘制页面的时候会有一个 dom 树，我们使用 js 模拟这个 dom 树，当修改完之后，我们可以统一用一次渲染更新到页面上。并且我们只关注对 VNode 的修改，我们看一下 VNode 的数据结构,每一个 dom 元素都可以映射成这样一个 VNode

```ts
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
  componentOptions: WObject; // 组件的属性
  componentInstance: WObject;
  constructor(
    tag?: string,
    data?: WObject,
    children?: VNode[],
    text?: string,
    elm?: any,
    context?: W,
    componentOptions?: WObject
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.context = context;
    this.key = data && data.key;
    this.parent = undefined;
    this.isStatic = false;
    this.isComment = false;
    this.isRootInsert = false;
    this.componentOptions = componentOptions;
  }
}
```

2. 如何创建 VNode

用我们在编译那个章节的例子，我们编译完的render函数看上去是下边这样的通过调用_c生成VNode,_c就是`createVNode`方法,下边来看下这个方法，这个方法首先会对传入的参数进行纠正，对原生的dom标签，直接实例化VNode。这样`createVNode`方法会递归的执行，最终会生成一棵VNode的树

```ts
_c("div", [
  isShow ? _c("div", { on: { click: clickLi } }, [_v("这是w-if内容")]) : _e(),
  _c("div", [_v(_s(person.name))])
]);
```

```ts
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
    vnode = createComponentVNode(Ctor, data, children, context, tag)
  }
  return vnode
}
```

3. 如何将VNode比对挂载到dom上

在前边执行update()方法的时候会判断之前有没有过vnode，如果没有会传入要挂载的dom元素，这个也是第一次挂载和更新的区别。

我们看一看更新dom执行的patch方法,如果是相同的vnode类型，这里涉及了一个react中也有的差分算法，主要是key和tag一样，就认为是同样的VNode。进行patch比对，如果不是就直接将旧的VNode直接移除生成新的，这样能提高在树的深度遍历的效率，剩去了对每一个元素的每一个数据项进行比对。

```ts
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
    const parentElm = parentNode(oldElement) // 获取传入el的父元素用来挂载dom使用
    createElement(vnode, insertedVnodeQueue, parentElm, nextSibling(oldElement)) // 生成dom元素插入到合适的位置
    if(isDef(parentElm)){ // 将传入的el元素移除
      removeVNodes(parentElm, [oldVNode], 0,0)
    }
  }
  return vnode.elm // 返回新生成的dom
}
```

## vnode不相同或初次渲染

先来看比较简单的操作假如不是相同的VNode或者第一次挂载的情况。如果有传如dom元素说明是第一次挂载我们就要生成一个oldVNode，剩下的操作相同，生成新的dom元素并且将旧的dom元素移除，我们用到了`createElement`方法来实现vnode转化成dom并挂载的过程，从代码流程可以看出来，这是一个深度递归的过程。

```ts
/**
 * 根据vnode创建dom元素
 * @param vnode Vnode数据
 * @param insert 
 * @param parentElm 父元素
 * @param sibling 生成元素的下一个元素
 * @param nested 是不是一个root
 */
function createElement(vnode: VNode, insert: any[], parentElm: Node, sibling: Node, nested?: boolean) {
  vnode.isRootInsert = !nested
  /**创建组件类型 */
  if(createComponent(vnode, insert, parentElm, sibling)){
    return
  }
  const { data, children, tag}  = vnode
  if(isDef(tag)){ // 如果是原生标签
    vnode.elm = createHtmlElement(tag)
    createChildren(vnode,children,insert) // 根据vnode的children将子vnode转化成dom挂载到当前dom上
    if(vnode.data){
      invokeCreateHooks(vnode) // 执行生命周期方法create
    }
    insertDom(parentElm, vnode.elm, sibling) // 执行真正的挂载dom操作
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
```

## VNode相同需要执行diff算法

我们先来看一看`patchVNode`的方法,首先vnode如果有text说明是一个文本节点，不具有children属性，当然如果需要直接更新文本就好了。如果没有text说明具有新的vnode具有children属性，我们就需要分情况对children进行比较

1. 如果新旧都有vnode这个最复杂之后说，我们要遍历去对比每一个属性
2. 如果只有新的vnode有说明是新增的，说明旧的节点是文本节点，我们要先移除文本再生成新的dom挂载到当前元素
3. 如果只有旧的vnode，我们直接将旧的vnode移除就好了
4. 最后一种情况，如果旧的vnode有text属性，直接将文本清除

```ts
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
```

前边说了当比较vnode时都有children，如果对比children看看那些可以复用，这样就可以减少dom的生成添加删除操作。提高性能，现在问题就转化成了2个数组，把key相同的找出来放到对应的位置上，这也是为什么key要是唯一的原因，如果我们对数组有移动操作，那么用索引当key就可能会出现bug。这里用4个指针一次遍历就能高效的比较出差异

1. 首先我们要定义4个指针，我们先比对两个头部和2个尾部能不能复用
2. 我们再比对头尾和尾头是否相同，这种针对的是将头部元素移动到尾部，或将尾部移动到头部的操作，这种都直接移动dom元素就可以，实现了元素的复用
3. 能直接复用的元素已经比较完了，为了提高查找效率，我们将old中的剩下的vnode转化成一个map类型。我们在新的vnode中一个个查找，如果找到了就，根据vnode类型判断能不能复用。如果不能复用和在old中没找到创建新的dom元素。
4. 还差最后一步循环结束后还有两种情况，新的vnode还有的化直接新建dom，旧的vnode还有的话直接删除

```ts
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
```

到这里能看到，比如当我们修改了data属性，会重新生成vnode从上到下比较，也只会对我们修改属性有关的dom元素进行修改，提高了运行效率
