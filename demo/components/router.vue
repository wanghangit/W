<template>
  <div>
    <div v-for="(item,index) in routes" :key="index">
      <router-link :to="item.path">{{item.name}}</router-link>
    </div>
    <router-view></router-view>
  </div>  
</template>
<script>
import { routes } from './routes'
export default {
  data: () => {return { routes }},
  created: () => {
  },
  mounted: () => {
  }
}
</script>
<style scoped>

</style>