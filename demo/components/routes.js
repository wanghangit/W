import baseComponent from './base-parent.vue'
import $emit from './$emit/$emit.vue'
import provide from './provide/A.vue'

export const routes = [
  {path:'/base', component: baseComponent, name: 'props通信'},
  {path:'/$emit', component: $emit, name: '$emit发布订阅'},
  {path:'/provide', component: provide, name: 'provide/inject'}
]