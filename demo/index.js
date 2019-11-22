import { W } from '../src/instance/index'

const w = new W({
  el: "#root",
  data: {
    list: [
      "aa","bb","cc"
    ],
    testClass: "test",
    isShow: true,
    person: {
      name: "xiaoming"
    }
  },
  methods: {
    clickLi: function(){
      console.log(this.list)
    }
  },
  template: `<div>`+
    `<div w-if="isShow" @click="clickLi">这是w-if内容</div>`+
    `<div>{{person.name}}</div>`+
    `<input />`+
    `<ul class="demo"><li w-for="(item, index) in list" @click="clickLi" >{{item}}:{{index}}</li></ul>`+
  `</div>`,
  // render(h) {
  //   return h("div", {class: 'demo'},
  //     [h("span",{class: 'text', on: {
  //       click: this.clickText
  //     }}, this.text)])
  // },
})
window.w = w