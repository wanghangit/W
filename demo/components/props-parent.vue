<template>
  <div>
    <p>下边是子组件</p>
    <child :number="number"></child>
  </div>  
</template>
<script>
import child from './props-child.vue'

export default {
  props: ['number'],
  data: function(){
    return {
      number: 12
    }
  },
  components: {
    child
  }
}
</script>
<style scoped>

</style>