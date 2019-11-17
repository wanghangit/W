document.addEventListener("DOMContentLoaded", function(){
  new Vue({
    el: "#root",
    data: {
      list: [
        "aa","bb","cc"
      ],
      testClass: "test"
    },
    template: '<ul class="demo"><li v-for="(item, index) in list" :class="testClass" @click="clickLi" >{{item}}:{{index}}</li></ul>',
    methods: {
      clickLi: function(){
        console.log(this.list)
      }
    },
  })
})
