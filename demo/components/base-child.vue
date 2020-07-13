<template>
  <div>
    <p>父组件传过来的值是:{{number}}</p>
    <button @click="handle">向父组件传值</button>
  </div>  
</template>
<script>
export default {
  props: ['number'],
  methods: {
    handle(){
       this.$emit("getChildValue", "childValue")
    }
  }
}
</script>
<style scoped>

</style>