import Module from "./module"
import { forEachValue } from "./util"

export default class ModuleCollection {
  root: Module
  constructor(rootModule) {
    this.register([], rootModule, false)
  }
  register(path: any[], rawModule: any, runtime: boolean = true) {
    const newModule = new Module(rawModule, runtime)
    if(path.length=0){
      this.root = newModule
    }else{
      const parent = this.get(path.slice(0,-1)) // 通过path去获取当前的父parent
      parent.appendChild(this.get(path[path.length-1]), newModule)
    }
    if(rawModule.modules){ // 递归注册所有子module
      forEachValue(rawModule.modules, (rawVaule, key) => {
        this.register(path.concat(key), rawVaule, runtime)
      })
    }
  }
  /**
   * 从树中一个节点找到叶子节点的过程
   * @param path 
   */
  get(path: any[]) :Module{
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }
} 