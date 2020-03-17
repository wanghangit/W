export default function(Vue) {
  Vue.mixin({
    // 在创建前注入$store变量
    beforeCreate: function() {
      const options = this.$options;
      if (options.store) {
        this.$store =
          typeof options.store === "function" ? options.store() : options.store;
      } else {
        this.$store = this.$parent.$store;
      }
    }
  });
}
