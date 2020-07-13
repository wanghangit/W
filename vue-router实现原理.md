# vue-router

这个是用来 vue 生态官方推荐解决路由问题的插件。可能帮我们完成前端路由的功能。这个库是通过 vue 的插件机制实现的

## 基本使用

```js
import Vue from "vue/dist/vue.esm";
import VueRouter from "vue-router";

Vue.use(VueRouter); // 安装插件

const foo = { template: `<div>foo</div>` };
const bar = { template: "<div>bar</div>" };

const routes = [
  { path: "/foo", component: foo },
  { path: "/bar", component: bar }
];

const router = new VueRouter({
  // 定制路由
  routes
});

new Vue({
  el: "#root",
  router,
  template: `<div>
    <div>
      <router-link to='/foo'>foo</router-link>
      <router-link to='/bar'>bar</router-link>
    </div>
    <router-view></router-view>
  </div>`
});
```

上边给了一个最基本的使用案例，我们定义一个路由的实例，在我们实例化 Vue 的时候，将路由传入，我们在模版中使用`router-link和router-view`来实现组件跳转和显示的功能

## 安装插件

既然是插件就都有安装过程。`Vue.use(VueRouter)`来完成安装过程，这个方法会调用插件的 install 方法并注入 Vue 函数，我们来看看这个过程做了什么

```js
function install(Vue) {
  if (install.installed && _Vue === Vue) return; // 如果已经安装过插件
  install.installed = true;
  _Vue = Vue;
  const isDef = v => v !== undefined;
  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode; // 获取父的vnode
    if (
      isDef(i) &&
      isDef((i = i.data)) &&
      isDef((i = i.registerRouteInstance))
    ) {
      i(vm, callVal);
    }
  };
  Vue.mixin({
    beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this; // 路由的根就是根组件
        this._router = this.$options.router;
        this._router.init(this); // 初始化router
        Vue.util.defineReactive(this, "_route", this._router.history.current); // _route设为响应式对像
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this; // 子组件会从父组件取实例
      }
      registerInstance(this, this); // 注册router-view实例
    },
    destroyed() {
      registerInstance(this);
    }
  });
  Object.defineProperty(Vue.prototype, "$router", {
    // 获取当前路由配置
    get() {
      return this._routerRoot._router;
    }
  });
  Object.defineProperty(Vue.prototype, "$route", {
    // 获取当前路径信息
    get() {
      return this._routerRoot._route;
    }
  });
  // 全局注册组件
  Vue.component("RouterView", View);
  Vue.component("RouterLink", Link);
  const strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate =
    strats.created; // 使用生命周期的merge方式
}
```

这里有几个关键步骤

1. 首先我们会检测是否已经安装过插件了，如果安装过了就直接 return
2. 使用`Vue.mixin`来扩展每一个组件的能力`beforeCreate`在创建前将 router 注入到 vue 组件实例，这样每个组件都能取到 router 配置
3. 为了方便使用原型上定义了`$router`和`$route`来获取 router 配置和当前 router 数据
4. 最后注册了两个全局组件，方便我们使用，我们实现这两个组件就可以完成跳转和显示当前页面的功能

## VueRouter 类的实例化

我们通常使用会传入一个`routes`参数,下边来看下这个过程会实现什么样的逻辑

```js
constructor (options: RouterOptions = {}) {
  this.app = null
  this.apps = []
  this.options = options
  this.beforeHooks = []
  this.resolveHooks = []
  this.afterHooks = []
  this.matcher = createMatcher(options.routes || [], this) // 创建一个matcher对象

  let mode = options.mode || 'hash' // 不传默认使用hash
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false // 如果不支持historyApi使用降级方案
  if (this.fallback) {
    mode = 'hash'
  }
  if (!inBrowser) {
    mode = 'abstract'
  }
  this.mode = mode

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base)
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback)
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base)
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, `invalid mode: ${mode}`)
      }
  }
```

这个初始化主要的功能其实就有2个，一个生成matcher对象，还有一个根据路由模式生成相应的路由实例。

### matcher生成过程

调用`createMatcher`最终会返回一个Matcher对象，先来看看这个方法会做什么

```js
function createMatcher (
  routes: Array<RouteConfig>,
  router: VueRouter
): Matcher {
  // 完成对传入参数的处理，完成path和name的映射
  const { pathList, pathMap, nameMap } = createRouteMap(routes)

  function addRoutes (routes) { // 添加路由映射，在第一次初始化的基础上
    createRouteMap(routes, pathList, pathMap, nameMap)
  }

  function match (
    raw: RawLocation,
    currentRoute?: Route,
    redirectedFrom?: Location
  ): Route {
    const location = normalizeLocation(raw, currentRoute, false, router)
    const { name } = location

    if (name) {
      const record = nameMap[name]
      if (!record) return _createRoute(null, location)
      const paramNames = record.regex.keys
        .filter(key => !key.optional)
        .map(key => key.name)

      if (typeof location.params !== 'object') {
        location.params = {}
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (const key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key]
          }
        }
      }

      location.path = fillParams(record.path, location.params, `named route "${name}"`)
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {}
      for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i]
        const record = pathMap[path]
        if (matchRoute(record.regex, location.path, location.params)) {
          return _createRoute(record, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }
  function _createRoute (
    record: ?RouteRecord,
    location: Location,
    redirectedFrom?: Location
  ): Route {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match,
    addRoutes
  }
}
```

先来看看如何生成这个`RouteMap`从代码上来看主要就几行
```js
// the path list is used to control path matching priority
const pathList: Array<string> = oldPathList || []
// $flow-disable-line
const pathMap: Dictionary<RouteRecord> = oldPathMap || Object.create(null)
// $flow-disable-line
const nameMap: Dictionary<RouteRecord> = oldNameMap || Object.create(null)

routes.forEach(route => {
  addRouteRecord(pathList, pathMap, nameMap, route)
}
// ensure wildcard routes are always at the end
for (let i = 0, l = pathList.length; i < l; i++) {
  if (pathList[i] === '*') {
    pathList.push(pathList.splice(i, 1)[0])
    l--
    i--
  }
}
/**
 * 创建路由的映射
 */
function addRouteRecord (
  pathList: Array<string>,
  pathMap: Dictionary<RouteRecord>,
  nameMap: Dictionary<RouteRecord>,
  route: RouteConfig,
  parent?: RouteRecord,
  matchAs?: string
) {
  const { path, name } = route
  const pathToRegexpOptions: PathToRegexpOptions =
    route.pathToRegexpOptions || {}
  const normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict)
  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive
  }
  const record: RouteRecord = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name,
    parent,
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  }

  if (route.children) {
    // 递归的将子路由添加到当前路由中
    route.children.forEach(child => {
      const childMatchAs = matchAs
        ? cleanPath(`${matchAs}/${child.path}`)
        : undefined
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
    })
  }
  // 如果没有路由映射添加进来
  if (!pathMap[record.path]) {
    pathList.push(record.path)
    pathMap[record.path] = record
  }
  // 如果有路由别名就在执行一次添加路由的过程path为别名
  if (route.alias !== undefined) {
    const aliases = Array.isArray(route.alias) ? route.alias : [route.alias]
    for (let i = 0; i < aliases.length; ++i) {
      const alias = aliases[i]
      const aliasRoute = {
        path: alias,
        children: route.children
      }
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      )
    }
  }
  // 直接处理对name的映射
  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        `Duplicate named routes definition: ` +
          `{ name: "${name}", path: "${record.path}" }`
      )
    }
  }
}
```

在初始化的过程中都是使用默认的值，主要的过程就是将传入的routes配置生成`pathList，pathMap，nameMap`这3种数据结构方便我们查找路由,map中存放的是record对象，这里存放路由的所有信息。通过递归也建立了父子关系，这样我们可以使用嵌套路由。

这个matcher主要导出了两个方法一个是matcher用来匹配路由，一个是addRoutes用来动态匹配添加路由
matcher主要是根据name和path返回一个Route对象，这个就需要在pathMap，nameMap中去搜索


