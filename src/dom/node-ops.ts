export function createEmptyElement() {
  return createHtmlElement("div")
}

export function createHtmlElement(tag: string): HTMLElement {
  const elm = document.createElement(tag)
  return elm
}

export function createTextNode(text: string) {
  return document.createTextNode(text)
}

export function appendChild(node: Node, child: Node){
  node.appendChild(child)
}
export function removeChild(node: Node, child: Node | ChildNode) {
  node.removeChild(child)
}

export function tagName(node: Element): string {
  return node.tagName
}

export function parentNode(node: Node): Node {
  return node.parentElement
}

export function nextSibling(node: Node): Node {
  return node.nextSibling
}

export function insertBefore(parentElement: Node, curEle:Node, sibling: Node){
  parentElement.insertBefore(curEle, sibling)
}

export function setContentText(node: Node, text: string){
  node.textContent = text
}