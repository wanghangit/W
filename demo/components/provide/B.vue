<template>
  <div>
    <p>Bname: {{this.name}}</p>
  </div>  
</template>
<script>
export default {
  inject: ['name'],
  methods: {
    send(){
      event.$emit("sendA", this.name)
    }
  }
}
</script>
<style scoped>

</style>