<template>
  <div>
    <p>age: {{age}}</p>
    <button @click="send">发送给C</button>
  </div>  
</template>
<script>
import { event } from './index'
export default {
  data: () => {
    return {
      age: 20
    }
  },
  methods: {
    send(){
      console.log(event)
      event.$emit("sendB", this.age)
    }
  }
}
</script>
<style scoped>

</style>