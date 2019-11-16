import {isObject, hasOwn, isArray, isPlainObject, def} from '../util'

const arrayProto = Array.prototype
// 继承一份原型方法防止污染全局
export const arrayMethods = Object.create(arrayProto);

[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // 缓存原生方法
  const origin = arrayProto[method]
  def(arrayMethods, method, function () {
    // TODO 待测试
    const args = arrayProto.slice.call(arguments, 1)
    // 获得参数
    const result = origin.apply(this, args)
    const ob = this.__ob_;
    let insert;
    switch (method) {
      case 'push':
      case 'unshift':
        insert = args
        break;
      case 'splice':
        insert = args.slice(2)
        break;
    }
    // 对新添加的元素进行监听
    if (insert) {
      ob.observerArray(insert)
    }
    ob.dep.notify()
    return result
  })
})
