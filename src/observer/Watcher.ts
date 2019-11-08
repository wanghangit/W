import { Dep, pushTarget, popTarget } from './Dep'
import { W } from '../instance/index'
import { swap, warn, isObject } from '../util/index'

let wid = 0
export class Watcher{
  deps: Dep[]; // 上次更新的依赖项
  newDeps: Dep[]; // 当前更新新增加的依赖型
  id: number;
  depIds: Set<number>; // 都是时间换空间的思想用来加快遍历保存dep的id
  newDepIds: Set<number>;
  w: W;
  active: boolean;
  getter: Function;
  value: any;
  sync: boolean;
  cb: Function;
  constructor(
    w: W,
    exp: Function,
    cb: Function,
    options?: object
  ){
    this.w = w
    /*_watchers存放订阅者实例*/
    w._watchers.push(this)
    this.id = wid++
    this.active = true
    this.sync = true // 先不做异步更新默认是同步的
    this.cb = cb
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.getter = exp
    this.value = this.get()
  }
  get(){
    let value
    pushTarget(this)
    const w = this.w
    /*
      执行了getter操作，看似执行了渲染操作，其实是执行了依赖收集。
      在将Dep.target设置为自生观察者实例以后，执行getter操作。
      譬如说现在的的data中可能有a、b、c三个数据，getter渲染需要依赖a跟c，
      那么在执行getter的时候就会触发a跟c两个数据的getter函数，
      在getter函数中即可判断Dep.target是否存在然后完成依赖收集，
      将该观察者对象放入闭包中的Dep的subs中去。
    */
    try {
      value = this.getter.call(w, w)
    } catch (error) {
      warn(`${error} in Watcher get`)
    }
    popTarget()
    // 每次执行之后都要清楚最新的依赖留给下次使用
    this.cleanDeps()
    return value
  }
  addDep(dep: Dep){
    const id = dep.id
    // 防止重复添加
    if(!this.newDepIds.has(id)){
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if(!this.depIds.has(id)){
        dep.addSub(this)
      }
    }
  }
  cleanDeps(){
    // 对比上次更新的依赖如果最新的依赖没有就移除掉当前Watcher
    for (let i = 0; i < this.deps.length; i++) {
      const dep = this.deps[i]
      if(!this.newDepIds.has(dep.id)){
        dep.removeSub(this)
      }
    }
    // 将最新的依赖和上次更新的依赖交换，保存
    swap(this.depIds, this.newDepIds)
    this.newDepIds.clear()
    swap(this.deps, this.newDeps)
    this.newDeps.length = 0
  }
  update(){
    if(this.sync){
      this.run()
    }else{
      // TODO:
    }
  }
  run(){
    if(this.active){
      const newValue = this.get()
      /**即便值相同，拥有Deep属性的观察者以及在对象／数组上的观察者应该被触发更新，因为它们的值可能发生改变。 */
      if(newValue!==this.value || isObject(newValue)){
        const oldValue = this.value
        this.value = newValue
        this.cb.call(this.w, newValue, oldValue)
      }
    }
  }
  /*收集该watcher的所有deps依赖*/
  depend(){
    this.deps.forEach(dep => {
      dep.depend()
    });
  }
  /*将自身从所有依赖收集订阅列表删除*/
  teardown(){
    
  }
}