import { W } from "../instance/index";
import { parse } from './parseElement'



class Compile {
  _w: W;
  _template: string;
  constructor(w: W, template: string) {
    this._w = w;
    this._template = template;
    this._init()
  }
  _init() {
    const ast = parse(this._template);
    console.log(ast)
    this.optimize(ast);
    const code = this.generate(ast);
  }

  private generate(ast: void) {

  }

  private optimize(ast: void) {

  }
}

export default Compile
