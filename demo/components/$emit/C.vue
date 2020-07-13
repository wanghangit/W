<template>
  <div>
  </div>  
</template>
<script>
import { event } from './index'
export default {
  data: () => {
    return {
      name: 'xiaoming'
    }
  },
  created(){
    event.$on("sendA",(val) => {
      console.log('A: '+val)
    })
    event.$on("sendB",(val) => {
      console.log('B: '+val)
    })
  },
}
</script>
<style scoped>

</style>