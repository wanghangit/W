document.addEventListener("DOMContentLoaded", function(){
  const w = new Vue({
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
    // template: '<div><div v-if="isShow" @click="clickif">这是v-if内容</div><ul class="demo"><li v-for="(item, index) in list" @click="clickLi" >{{item}}:{{index}}</li></ul></div>',
    template: `<div>`+
      `<div>{{person.name}}</div>`+
    `</div>`,
    methods: {
      clickLi: function(){
        console.log(this.list)
      },
      clickif: function(){
        this.isShow = false
      }
    },
  })
  window.w = w
})
