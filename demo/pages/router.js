import Vue from "vue/dist/vue.esm";
import VueRouter from "vue-router";

import base from '../components/base-parent.vue'

Vue.use(VueRouter); // 安装插件

const foo = { template: `<div>{{name}}</div>` ,data: () => {return {name: 'xiaoming'} }};
const bar = { template: "<div>bar</div>" };

const routes = [
  { path: "/foo", component: foo },
  { path: "/bar", component: bar },
  { path: "/base", component: base }
];

const router = new VueRouter({ // 定制路由
  routes
});

router.beforeEach((to,from,next) => {
  console.log(to,from,next)
  next()
})
new Vue({
  el: "#root",
  router,
  template: `<div>
  <div>
    <router-link to='/foo'>foo</router-link>
    <router-link to='/bar'>bar</router-link>
    <router-link to='/base'>base</router-link>
  </div>
  <router-view></router-view>
</div>`
});
