import { Dep } from './Dep'
import { arrayMethods } from './array'
import { isObject, hasOwn, isArray, isPlainObject, def, hasProto } from '../util/index'
import { WObject } from '../types/index'

/**直接覆盖原型 */
function protoAugment(target, src: object) {
  target.__proto__ = src
}

function copyAugment(target, src: object) {
  for (const key in src) {
    if (src.hasOwnProperty(key)) {
      def(target, key, src[key])
    }
  }
}

export class Observer {
  value: any;
  dep: Dep;
  constructor(value) {
    this.value = value;
    this.dep = new Dep()
    /**将Observer实例绑定到data的__ob__属性上面去，之前说过observe的时候会先检测是否已经有__ob__对象存放Observer实例了 */
    def(value, "__ob__", this)
    /**
     * 如果是数组，将修改后可以截获响应的数组方法替换掉该数组的原型中的原生方法，达到监听数组数据变化响应的效果。
     * 这里如果当前浏览器支持__proto__属性，则直接覆盖当前数组对象原型上的原生数组方法，如果不支持该属性，则直接覆盖数组对象的原型。
     */
    const augment = hasProto ? protoAugment : copyAugment
    if (isArray(value)) {
      augment(value, arrayMethods)
      /*如果是数组则需要遍历数组的每一个成员进行observe*/
      this.observeArray(value)
    } else {
      /*如果是对象则直接walk进行绑定*/
      this.walk(value)
    }
  }
  walk(value: object) {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        defineReactive(value, key, value[key])
      }
    }
  }
  observeArray(array: Array<any>) {
    for (let i = 0; i < array.length; i++) {
      observe(array[i])
    }
  }
}
/**
 * 对data数据递归的进行劫持
 * @param data 
 * @param isRoot 
 */
export function observe(data: WObject, isRoot?: boolean): Observer {
  // 递归的终止条件
  if (!isObject(data)) return
  let ob: Observer
  if (hasOwn(data, "__ob__") && data.__ob__ instanceof Observer) {
    ob = data.__ob__
  } else {
    if ((isArray(data) || isPlainObject(data)) && !data._isW) {
      ob = new Observer(data)
    }
  }
  return ob;
}

/*为对象defineProperty上在变化时通知的属性*/
export function defineReactive(target: object, key: string, val: any) {
  const proto = Object.getOwnPropertyDescriptor(target, key)
  if (proto && !proto.configurable) {
    return
  }
  const dep = new Dep()
  const getter = proto && proto.get
  const setter = proto && proto.set
  // 深度遍历target对象直到所有属性都被劫持了数据getter，setter
  let childOb = observe(val)
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      val = getter ? getter.call(target) : val
      if (Dep.target) {
        /**进行依赖收集将当前dep加入当前Watcher */
        dep.depend()
        if (childOb) {
          /*子对象进行依赖收集，其实就是将同一个watcher观察者实例放进了两个depend中，一个是正在本身闭包中的depend，另一个是子元素的depend*/
          childOb.dep.depend()
        }
        if (isArray(val)) {
          /*是数组则需要对每一个成员都进行依赖收集，如果数组的成员还是数组，则递归。*/
          dependArray(val)
        }
      }
      return val
    },
    set: function (newVal) {
      const value = getter ? getter.call(target) : val
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      if (setter) {
        val = setter.call(target, newVal)
      } else {
        val = newVal
      }
      /*新的值需要重新进行observe，保证数据响应式*/
      childOb = observe(newVal)
      /*dep对象通知所有的观察者*/
      dep.notify()
    }
  })
}

/**递归收集数组的依赖 */
function dependArray(array: any[]) {
  array.forEach(e => {
    /*通过对象上的观察者进行依赖收集*/
    e && e.__ob__ && e.__ob__.dep.depend()
    /*当数组成员还是数组的时候地柜执行该方法继续深层依赖收集，直到是对象为止。*/
    if (isArray(e)) {
      dependArray(e)
    }
  });
}

