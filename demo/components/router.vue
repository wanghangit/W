<template>
  <div>
    <div v-for="(item,index) in routes" :key={index}>
      <router-link></router-link>
    </div>
    <router-view></router-view>
  </div>  
</template>
<script>
export default {
  props: ['routes']
}
</script>
<style scoped>

</style>