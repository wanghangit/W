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
      this.person.name = this.person.name+"11"
      console.log(this.list)
    },
    add: function () {
      this.list.push(Math.floor(Math.random()*1000))
    },
    remove: function() {
      this.list.pop()
    }
  },
  template: `<div>`+
    `<div w-if="isShow" @click="clickLi">这是w-if内容</div>`+
    `<div>{{person.name}}</div>`+
    `<input />`+
    `<div @click="add">add</div>`+
    `<div @click="remove">remove</div>`+
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