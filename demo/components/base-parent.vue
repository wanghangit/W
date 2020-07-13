<template>
  <div>
    <p>下边是子组件</p>
    <child :number="number" @getChildValue="getValue"></child>
    <p>子组件传过来的值{{childValue}}</p>
  </div>  
</template>
<script>
import child from './base-child.vue'

export default {
  data: function(){
    return {
      number: 12,
      childValue: 'default'
    }
  },
  methods: {
    getValue(val){
      this.childValue = val
    }
  },
  components: {
    child
  }
}
</script>
<style scoped>

</style>