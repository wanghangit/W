// import Vue from "vue";
// import Vuex from "../../vuex/src/index";

// Vue.use(Vuex);

// const moduleA = {
//   state: {
//     count: 1
//   },
//   mutations: {
//     increment(state) {
//       state.count++;
//     }
//   },
//   actions: {
//     increment(context) {
//       context.commit("increment");
//     }
//   },
//   getters: {
//     computedCount() {
//       return state.count + 1;
//     }
//   }
// };

// const moduleB = {
//   state: {
//     count: 1
//   },
//   mutations: {
//     increment(state) {
//       state.count++;
//     }
//   },
//   actions: {
//     increment(context) {
//       context.commit("increment");
//     }
//   },
//   getters: {
//     computedCount() {
//       return state.count + 1;
//     }
//   }
// };
// const store = new Vuex.Store({
//   modules:{
//     a: moduleA,
//     b: moduleB
//   },
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment(state) {
//       state.count++;
//     }
//   }
// });

// const w = new Vue({
//   el: "#root",
//   data: {},
//   methods: {
//     handleClick() {
//       store.commit("increment");
//     }
//   },
//   template:
//     `<div>` +
//     `<div>{{store.state.count}}</div>` +
//     `<div @click="handleClick()"></div>` +
//     `</div>`,
//   stroe
// });
