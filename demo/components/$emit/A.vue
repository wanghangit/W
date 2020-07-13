<template>
  <div>
    <p>name: {{name}}</p>
    <button @click="send">发送给C</button>
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
  methods: {
    send(){
      event.$emit("sendA", this.name)
    }
  }
}
</script>
<style scoped>

</style>