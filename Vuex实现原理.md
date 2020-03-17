# Vuex 原理

我们在开发中如果只是开发一个简单的页面可能用不到 Vuex,但当我们需求越来越复杂，我们要模块化 ui，模块化功能，会遇到很多组件共享状态的情况，这时 vue 原生支持的基于事件的机制可以满足需求，但这会造成代码的混乱，错误无从排查。主要的思想是将公共的属性提升成一个类似全局变量的概念，这样就不需要互相通知了，单向的数据流动，所有的更新都从顶部往下流动。

## 基本概念

vuex 中的所有数据存贮在`store.state`中,我们在使用时直接`store.state.a`就可以取到值。但是不支持我们直接去修改值。需要我们用`mutations`中的方法去修改，这样可以封装对数据的修改，也可以让程序更好调试，主要是为了保持规范统一。如果有一些异步的方法去修改 state 最好使用`action`来处理。`getters`类似于计算属性，我们直接使用 state 需要在每个组件中都把计算属性定义一次，这样可以有更好的一致性，而且也具有 lazy 的特性。`module`是用来解决依赖的数据太多不好维护的情况，我们可以将相关联的数据存在一个 module 中，而且不会有重复命名的问题

## 基本使用

```js
Vue.use(Vuex);

const state = {
  count: 0
};
const mutations = {
  increment(state) {
    state.count++;
  },
  decrement(state) {
    state.count--;
  }
};
const actions = {
  increment: ({ commit }) => commit("increment"),
  decrement: ({ commit }) => commit("decrement"),
  incrementIfOdd({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit("increment");
    }
  },
  incrementAsync({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit("increment");
        resolve();
      }, 1000);
    });
  }
};
const getters = {
  evenOrOdd: state => (state.count % 2 === 0 ? "even" : "odd")
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
new Vue({
  el: "#app",
  store,
  render: h => h(Counter)
});
```

```vue
<template>
  <div id="app">
    Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: mapGetters(["evenOrOdd"]),
  methods: mapActions([
    "increment",
    "decrement",
    "incrementIfOdd",
    "incrementAsync"
  ])
};
</script>
```

我们在使用时需要先将 vuex 使用插件的模式注入进来，我们先来看看这个过程做了什么

### 注册 Vuex

`install`方法的主要逻辑就如下边这样，我们会在每个组件的 context 上增加一个\$store 属性

```js
Vue.mixin({ beforeCreate: vuexInit });
function vuexInit() {
  const options = this.$options;
  // store injection
  if (options.store) {
    this.$store =
      typeof options.store === "function" ? options.store() : options.store;
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store;
  }
}
```

### 初始化 store

```js
this._committing = false;
this._actions = Object.create(null);
this._actionSubscribers = [];
this._mutations = Object.create(null);
this._wrappedGetters = Object.create(null);
this._modules = new ModuleCollection(options); // 初始化模块
this._modulesNamespaceMap = Object.create(null);
this._subscribers = [];
this._watcherVM = new Vue();

// bind commit and dispatch to self
const store = this;
const { dispatch, commit } = this;
this.dispatch = function boundDispatch(type, payload) {
  // 重写dispatch传入store实例
  return dispatch.call(store, type, payload);
};
this.commit = function boundCommit(type, payload, options) {
  // 重写commit传入store实例
  return commit.call(store, type, payload, options);
};
// strict mode
this.strict = strict;
const state = this._modules.root.state;
installModule(this, state, [], this._modules.root);
resetStoreVM(this, state);
```

这里有几个比较重要的步骤

1. 初始化模块`ModuleCollection`

2. 初始化模块中的数据`installModule`

3. 重置`resetStoreVM`

### Module 如何初始化

```js
class ModuleCollection {
  constructor(rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false); // 注册模块
  }

  get(path) {
    // 获取路径中最后一个module
    return path.reduce((module, key) => {
      return module.getChild(key);
    }, this.root);
  }

  getNamespace(path) {
    // 获取带命名空间的key值类似'a/action'
    let module = this.root;
    return path.reduce((namespace, key) => {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  }

  update(rawRootModule) {
    update([], this.root, rawRootModule);
  }
  register(path, rawModule, runtime = true) {
    const newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      // 根的情况
      this.root = newModule;
    } else {
      // 不是根的情况将module添加到父module中
      const parent = this.get(path.slice(0, -1)); // 获取父的module
      parent.addChild(path[path.length - 1], newModule);
    }
    // register nested modules
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        // 遍历递归的处理
        this.register(path.concat(key), rawChildModule, runtime);
      });
    }
  }
}
```

module 是一种很简单的数据结构，主要记住 2 个就可以`_children`用来存贮子模块，`state`用来存贮数据。经过注册之后 store 的树就建立起来了。然后就要经过第二步 installModule 来初始化传入的 action 等数据

```js
function installModule(store, rootState, path, module, hot) {
  const isRoot = !path.length; // 是不是根
  const namespace = store._modules.getNamespace(path); // 获取命名空间
  // register in namespace map 命名空间的映射
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }
  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1));
    const moduleName = path[path.length - 1];
    store._withCommit(() => {
      Vue.set(parentState, moduleName, module.state); // 设置响应数据
    });
  }

  const local = (module.context = makeLocalContext(store, namespace, path)); // local保证在每个module中定义的同样名的属性能找到对应的值
  // 注册定义的方法
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });
  // 注册定义的action
  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key;
    const handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });
  // 递归的处理每一个子模块的方法，action，getters
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}
```

我们可以看到我们注册的方法，action 都是带命名空间的，但我们使用的时候，只需要直接调用不带命名空间的方法。不用写`a/increment`主要就归功于 local，这个方法将我们的 dispath,commit,都重新定义了一遍，如果有 namespace 都会自动帮我们加上。对于 state 和 getters 会使用 Object.definePropertie 帮我们重新定义 get 方法，使获取的值映射到带 namespace 上的值去。

初始化的最后一步，就是要处理响应式数据,主要是利用了一个 vue 对象来处理响应式数据，state 就是 data，getters 对应的就是 computed，这里也体现了模块化的思想。这里还有`strict`的处理，这里就是用一个变量来保证我们只能使用 commit 来修改数据，使用 watch 监测数据的改动来判断。

```js
/**
 * 初始化响应数据
 * @param {*} store
 * @param {*} state
 * @param {*} hot
 */
function resetStoreVM(store, state, hot) {
  const oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  const wrappedGetters = store._wrappedGetters;
  const computed = {};
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = () => fn(store); // 定义computed方法
    Object.defineProperty(store.getters, key, {
      // 数据劫持获取响应式对象的值
      get: () => store._vm[key],
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    // 实例化一个vue对象，用来做响应式数据，
    data: {
      $$state: state
    },
    computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    // 严格模式只能用commit来修改数据
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(() => oldVm.$destroy());
  }
}

function enableStrictMode(store) {
  store._vm.$watch(
    function() {
      return this._data.$$state;
    },
    () => {
      if (process.env.NODE_ENV !== "production") {
        assert(
          store._committing,
          `do not mutate vuex store state outside mutation handlers.`
        );
      }
    },
    { deep: true, sync: true }
  );
}
```

## actions 和 mutations

这两个方法都是用来修改 state 的，但有什么区别呢，mutations 就是注册直接来修改 state 的，没什么好说的，主要来看看 actions，
actions 主要是用来做异步调用使用的，但也可以使 actions 来写异步方法啊，主要区别在于，actions 原生支持 Promise，
先看注册，这里其实就是一个发布订阅模式，一个action可以注册多次。如果返回值不是promise还会做转化处理。这里使用`Promise.all`来等待所有的异步方法都返回再执行。这就是和action的区别

```js
// 注册action
function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = []) //初始化actions队列
  entry.push(function wrappedActionHandler (payload, cb) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb)
    if (!isPromise(res)) { // 返回结果Promise化
      res = Promise.resolve(res)
    }
    return res
  })
}
// 触发action
dispatch (_type, _payload) {
  // check object-style dispatch
  const {
    type,
    payload
  } = unifyObjectStyle(_type, _payload)

  const action = { type, payload }
  const entry = this._actions[type] // 获取action注册列表
  if (!entry) {
    return
  }
  try {
    this._actionSubscribers
      .filter(sub => sub.before)
      .forEach(sub => sub.before(action, this.state))
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[vuex] error in before action subscribers: `)
      console.error(e)
    }
  }
  const result = entry.length > 1
    ? Promise.all(entry.map(handler => handler(payload))) // 处理所有的promise
    : entry[0](payload)

  return result.then(res => {
    try {
      this._actionSubscribers
        .filter(sub => sub.after)
        .forEach(sub => sub.after(action, this.state))
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[vuex] error in after action subscribers: `)
        console.error(e)
      }
    }
    return res
  })
}
```
