import { parseHtml } from "./parseHtml";

export function parse(html){
  let stack = [],
      root,
      currentParent;
  parseHtml(html, start, end, chars)
  return root
  function start(tag, attrs, unary){
    const element = {
      type: 1,
      tag,
      attrsMap: makeAttrsMap(attrs),
      parent: currentParent,
      children: []
    }
    processFor(element)
    processIf(element)
    if(!root){
      root = element
    }else{
      
    }
    if(currentParent){
      currentParent.children.push(element)
      element.parent = currentParent
    }
    if(!unary){
      currentParent = element
      stack.push(element)
    }
  }
  function end(){
    stack.length -= 1
    currentParent = stack[stack.length - 1]
  }
  function chars(text: string){
    if(!currentParent) return
    let children = currentParent.children
    children.push(text)
  }
  function makeAttrsMap(attrs: any[]){
    const map = {}
    attrs.forEach((attr) => {
      map[attr.name] = attr.value 
    })
    return map
  }
  function processFor(el){
  
  }
  function processIf(el){
  
  }

}

