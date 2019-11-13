export function createEmptyElement() {
  return createHtmlElement("div")
}

export function createHtmlElement(tag:string): HTMLElement {
  const elm = document.createElement(tag)
  return elm
}

export function createTextNode(text: string): Text {
  return document.createTextNode(text)
}

export function removeChild(node: Element, child: Element| ChildNode){
  node.removeChild(child)
}