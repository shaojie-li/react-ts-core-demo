/**
 * log装饰器 - 打印方法名和其参数
 *
 * 常用于开发调试，调式完成后，请在当前方法删除log装饰器的调用
 */
export function log() {
    return <P extends any[]>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const handler = descriptor.value!;
        descriptor.value = function(...args: P) {
            console.info(`Calling %c ${propertyKey} %c, arguments: %c ${JSON.stringify(args.length > 1 ? args : args[0] || "无参数")}`, "color: blue", "", "color: blue");
            return handler.apply(this, arguments);
        };
        return descriptor;
    };
}

/**
 * es7语法糖 - 装饰器：
 * 底层实现依赖于 ES5 的 Object.defineProperty 方法
 * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象
 * 装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升
 * 如果一定要装饰函数，可以采用高阶函数的形式直接执行，列如：const wrapped = decorator(fn);
 *
 * 装饰器本身也接收三个参数：target、propertyKey、descriptor，并返回新的 descriptor；
 * @target      类的原型对象
 * @propertyKey 所要修饰的属性名
 * @descriptor  该属性的描述对象
 *
 * descriptor对象原来的值如下：
 * {
 *  value: [specifiedFunction],
 *  enumerable: false,
 *  configurable: true,
 *  writable: true
 * }
 */
