import { W } from '../src/instance/index'
console.log(W)
console.log(111)

const w = new W({
  el: "#root",
  data: {
    text: 'this is a text'
  },
  methods: {
    clickText: function(){
      this.text = "text is click"
    }
  },
  render(h) {
    return h("div", {class: 'demo'},
      [h("span",{class: 'text', on: {
        click: this.clickText
      }}, this.text)])
  },
})