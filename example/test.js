document.addEventListener("DOMContentLoaded", function(){
  new Vue({
    el: "#root",
    data: {
      list: [
        "aa","bb","cc"
      ],
      testClass: "test",
      isShow: true
    },
    template: '<div><div v-if="isShow" @click="clickLi">这是v-if内容</div><ul class="demo"><li v-for="(item, index) in list" @click="clickLi" >{{item}}:{{index}}</li></ul></div>',
    methods: {
      clickLi: function(){
        console.log(this.list)
      }
    },
  })
})
