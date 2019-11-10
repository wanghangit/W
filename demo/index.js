import { W } from '../src/instance/index'
console.log(W)
console.log(111)

new W({
  el: "#root",
  data: {
    text: 'this is a text'
  },
  render(h) {
    return h("div",{class: 'demo'}, [h("span",{class: 'text'}, this.text)])
  },
})