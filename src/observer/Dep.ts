import { Watcher } from './Watcher'

let wid = 0
export class Dep{
  static target?: Watcher
  id: number
  subs: Watcher[]
  constructor(){
    this.id = wid++
    this.subs = []
  }
  addSub(sub: Watcher){
    this.subs.push(sub)
  }
  removeSub(sub: Watcher){
    if(this.subs.length){
      let index = this.subs.indexOf(sub)
      if(index > -1){
        this.subs.splice(index, 1)
      }
    }
  }
  // 收集依赖
  depend(){
    if(Dep.target){
      Dep.target.addDep(this)
    }
  }
  // 通知所有Watcher更新
  notify(){
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

/*依赖收集完需要将Dep.target设为null，防止后面重复添加依赖。*/
Dep.target = null
const targetStack = []

/*将watcher观察者实例设置给Dep.target，用以依赖收集。同时将该实例存入target栈中*/
export function pushTarget(_target: Watcher){
  if(Dep.target){
    targetStack.push(Dep.target)
  }
  Dep.target = _target
}

/*将观察者实例从target栈中取出并设置给Dep.target*/
export function popTarget(){
  Dep.target = targetStack.pop()
}