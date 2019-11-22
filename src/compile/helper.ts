import { AstElement } from "../types/index"

export function getRemoveAttr(el: AstElement, name: string){
  let val;
  if((val = el.attrsMap[name])!== undefined){
    for (let i = 0; i < el.attrsList.length; i++) {
      if(el.attrsList[i].name === name){
        el.attrsList.splice(i, 1)
        break
      }
    }
  }
  return val
}

export function renderList(val:any, render: Function){
  let res
  if(Array.isArray(val)){
    res = []
    val.forEach(function(item, i){
      res[i] = render(item, i)
    })
  }
  return res
}

export function toString(val:any){
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val) : String(val)
}