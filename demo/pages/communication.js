import Vue from 'vue'
import VueRouter from 'vue-router'

import propsComponent from '../components/props-parent.vue'

const routes = [
  {path:'props', component: propsComponent}
]
const router = new VueRouter({
  routes
})

new Vue({
  el: '#root',
  
})