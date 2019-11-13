import { addEvent } from './event'

export function addAttrs(elm: Element, data){
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if(key === 'on'){
        addEvent(elm, data[key])
      }else{
        elm.setAttribute(key, data[key])
      }
    }
  }
}