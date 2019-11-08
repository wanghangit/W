import { W } from "./index";
import { createElement } from "../dom/createElement";

export function initRender(w: W){
  w._createElement = (a, b, c, d) => createElement(w, a, b, c, d, true)
}