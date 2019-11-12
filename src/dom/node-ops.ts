export function createEmptyElement() {
  return createHtmlElement("div")
}

export function createHtmlElement(tag:string, data?: object): HTMLElement {
  const elm = document.createElement(tag)
  /**遍历属性附在标签上 */
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      elm.setAttribute(key, data[key])
    }
  }
  return elm
}

export function createTextNode(text: string): Text {
  return document.createTextNode(text)
}

export function removeChild(node: Element, child: Element| ChildNode){
  node.removeChild(child)
}