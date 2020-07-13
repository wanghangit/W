import Vue from "vue/dist/vue.esm.browser";
import VueRouter from "vue-router";
import routerApp from "../components/router.vue";
import { routes } from '../components/routes'

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

new Vue({
  el: "#root",
  template: `<div>
  <router-app></router-app>
</div>`,
  components: { routerApp },
  router
});
