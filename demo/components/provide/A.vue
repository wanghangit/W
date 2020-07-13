<template>
  <div>
    <p>Aname: {{name}}</p>
    <button @click="change">change</button>
    <b-c></b-c>
  </div>  
</template>
<script>
import BC from './B.vue'
export default {
  provide: () => {
    return {
      name: this
    }
  },
  data: () => {
    return {
      name: 'xiaoming'
    }
  },
  components: {
    BC
  },
  methods: {
    change(){
      
    }
  }
}
</script>
<style scoped>

</style>