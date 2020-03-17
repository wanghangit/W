<template>
  <div>
    <p>父组件传过来的值是:{{number}}</p>
  </div>  
</template>
<script>
export default {
  props: ['number']
}
</script>
<style scoped>

</style>