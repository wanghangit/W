import { W } from "../instance/index";
import { WObject } from "../types/index";


export function initRender(w: W){
  w._createElement = (a, b, c, d) => createElement(w, a, b, c, d, true)
}

export function createElement(
  context: W,
  tag: string | Function,
  data: WObject,
  children: any[],
  
){

}