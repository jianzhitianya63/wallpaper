export interface MyData { errCode: number, data: unknown[] }

// 自动导入 auto-import.d.ts 定义了全局导入, 所以不需要手动导入
const autoImport = ref(null)
console.log(autoImport)

// 跳过所有eslint检查, 防止eslint报错
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

/// ///////////////////强制将这个文件视为一个 ES 模块（ES Module），而不是一个全局脚本。防止全局污染/////////////////////
export {}

/// //////////////////如何定义变量/////////////////////
let str: string
let num: number
let bool: boolean

str = 'hello'
num = 123
bool = true

/// //////////////类型自动推断/////////////////////
let d = -99
// d = false; // 报错, 类型不匹配

/// //////////////////ts中function的几种写法/////////////////////
// 以下几种写法可以都不写返回值, ts会自动推断出返回值类型
// ts方法定义1 : 正常写法
function demo(x: number, y: number): number {
  return x + y
}

// ts方法定义2 : 匿名函数 匿名函数没有名字, 所以需要使用let来定义
let demo2 = function (x: number, y: number): number {
  return x + y
}

// ts方法定义3 : 箭头函数, 没有function关键字,也没有名字, 直接定义, 如果只有一行可以简写
let demo3 = (x: number, y: number): number => {
  return x + y
}
let demo4 = (x: number, y: number): number => x + y

// ts方法定义4 : 类方法
class Greeter {
  message: string

  // 构造函数
  constructor(message: string) {
    this.message = message
  }

  // 类方法
  greet(): string {
    return `Message: ${this.message}`
  }

  // 带有参数的类方法
  greetPerson(name: string): string {
    return `${this.message}, ${name}!`
  }
}

/// //////////////////联合类型和断言/////////////////////
// 联合类型
let l1: string | number // 可以是string或number
let l2: '男' | '女' // 可以是number或null

// 场景1: 限制属性值, 只能取男或女
l2 = '男'
l2 = '女'
// l3 = '人妖'; // 报错, 类型不匹配

// 场景2: 错误返回错误码, 正确返回内容
function l3(x: string): string | null {
  if (x === 'error') {
    return null
  }
  else {
    return 'success'
  }
}

// 断言: 告诉ts这个值是number类型, 不进行类型检查, 一般用于类型转换
let d1: unknown
let d2: number = d1 as number

/// //////////////////js中基本的数据类型/////////////////////
// stirng
let a1: string
// number
let a2: number
// boolean
let a3: boolean
// null:有意为之的空值；显式声明的缺失值
let a4: null
// undefined:声明了但未赋值；不存在；系统默认的缺失值
let a5: undefined
// bigint:大整数
let a6: bigint
// symbol:唯一值
let a7: symbol
// Object:包含 Array, Function, Date, RegExp, Error, Promise, Map, Set, WeakMap, WeakSet
let a8: object

/// //////////////////ts中的新增的数据类型/////////////////////
// void: 表示没有返回值, 一般用于方法返回值
let b1: void
// never: 表示永远不会返回值, 一般由TS推断出, 比如说一个永远不会满足的if条件
let b2: never

// unknown: 比any更安全的类型, 任何值都可以赋值给unknown, 但unknown不能赋值给其他类型.
// 在使用前需要进行类型判断(断言或类型收窄), 否则会提示类型未知, 因为unknown类型不能直接使用
let u1: unknown

let u2: { name: string, age: unknown } = { name: 'John', age: 30 }
let u3: number
// 类型判断
if (typeof u2.age == 'number') {
  u3 = u2.age
}
else {
  // 没有进行收窄 unknown类型不能直接使用
  // u3 = u2.age;
}

// any类型(声明let变量不赋值, 默认就是any), 任何值都可以赋值给any, any也可以赋值任何值 , 在使用前不需要进行类型断言或类型收窄, 不安全
let any1: any
let any2: { name: string, age: any } = { name: 'Jack', age: 30 }
let any3: string
// 实际age是number, 但any3是string, 运行时会报错, 但编译不会报错
any3 = any2.age

// 自定义类型, 注意这不是类, 而是类型别名, 一般用于限制对象的结构
interface CustomType {
  name: string
  age: number
}
let c1: CustomType = { name: 'John', age: 30 }
// 自定义类型也可以作为参数传递, 相比于类, 少了面向对象特性
let c3 = (x: CustomType) => {

}
// 自定义接口
interface CustomInterface {
  name: string
  age: number
  sayHello: () => void
}
// 自定义接口的实现
let c2: CustomInterface = {
  name: 'John',
  age: 30,
  sayHello: () => {
    console.log('Hello')
  },
}
c2.sayHello()

/// //////////////////限制对象/////////////////////
// object类型范围太大了, 一般不使用
let o1: object
o1 = []
o1 = function () {}
o1 = new Date()
o1 = new Error()
o1 = new Promise((resolve, reject) => {})
o1 = new Map()
o1 = new Set()
o1 = new WeakMap()
o1 = new WeakSet()
// 限制对象一般采用以下几种方式
let person: { name: string, age?: number }// age属性可选
person = { name: '张三' }
person = { name: '张三', age: 18 }

// 限制对象的属性, 使用[k:string]: any可以添加任意属性, 但必须满足name和age是必选属性
let cat: { name: string, age: number, [k: string]: any }
cat = { name: '小猫', age: 2, color: 'red', gender: 'male', weight: 10 }

// 限制student对象的具体内容, 正常用的写法
let student: {
  name: string
  age: number
}
student = { name: '张三', age: 18 }

/// //////////////////数组/////////////////////
// 数组类型
let arr1: number[] = [1, 2, 3] // 等价于 let arr4: Array<number> = [1, 2, 3]
let arr2: string[] = ['1', '2', '3']
let arr3: (number | string)[] = [1, '2', 3]

/// //////////////////元组/////////////////////
// 元组类型, 自己定义长度固定的数组, 长度和类型都固定
let tuple1: [number, string] = [1, '2']
let tuple5: [number, string, number, number] = [1, '2', 3, 4]

/// //////////////////枚举/////////////////////
// 枚举类型, 自己定义一组常量, 常量值从0开始, 也可以自己定义
enum Color {
  Red,
  Green,
  Blue,
}
let color: Color = Color.Red
let color2: Color = Color.Green
let color3: Color = Color.Blue

/// //////////////////面向对象/////////////////////
// 类
class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  sayHello(): void {
    console.log(`Hello, my name is ${this.name}`)
  }
}
class Fly {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  sayHello(): void {
    console.log(`Hello, my name is ${this.name}`)
  }
}
let person1 = new Person('张三', 18)
person1.sayHello()

// 继承
class Student extends Person {

}
let student1 = new Student('李四', 20)
student1.sayHello()

// 多态
class Cat extends Person {
  sayHello(): void {
    console.log('喵喵喵')
  }
}
let cat1 = new Cat('小猫', 2)
cat1.sayHello()

// 抽象类, 不能实例化, 只能继承
abstract class Animal {
  abstract makeSound(): void
}
// 必须实现其抽象方法
class Dog extends Animal {
  makeSound(): void {
    console.log('汪汪汪')
  }
}
let dog1 = new Dog()
dog1.makeSound()

/// //////////////////接口/////////////////////
// 接口, 定义一个对象的结构, 不关心其具体实现
interface Person {
  // 定义属性
  name: string
  age: number
  // 定义方法
  sayHello: () => void
}
// 接口可以重复声明, 会自动合并
interface Person {
  gender: string
}

// 接口的实现
class Teacher implements Person {
  name: string
  age: number
  gender: string
  constructor(name: string, age: number, gender: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }

  sayHello(): void {
    console.log('Hello')
  }
}

/**
 * 接口与自定义类型的区别
 * 接口可以:
 *  1.当自定义类型去使用
 *  2.可以限制类的结构
 *
 * 自定义类型:
 *  1.仅仅就是自定义类型
 */
// 接⼝当成⾃定义类型去使⽤
let teacher1: Teacher = { name: '张三', age: 18, sayHello() { console.log('你好！') }, gender: 'male' }

/**
 * 接口与抽象类的区别
 * 接口:
 *  1.全部是抽象方法, 不能有具体实现
 * 抽象类:
 *  1.可以有抽象方法, 也可以有具体方法
 */

/// //////////////////属性修饰符/////////////////////
class A {
  readonly name: string
  private age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  sayHello(): void {
    console.log('Hello')
  }
}
let aObj1 = new A('动物', 1)
// aObj1.name = "动物2"; 无法修改 只读属性
// aObj1.age = 2; 无法修改 私有属性, 只能使用getter和setter修改

/// //////////////////泛型/////////////////////
// 当定义方法时, 如果方法的参数类型不确定, 可以使用泛型来定义
function fn<T>(a: T): T {
  return a
}
// 使用泛型时, TS会自动推断出泛型T的类型
fn(10)
fn('hello')
fn(true)

// 类也可以使用泛型
class MyClass<T> {
  name: T
  constructor(name: T) {
    this.name = name
  }
}
let myClass1 = new MyClass<string>('张三')
let myClass2 = new MyClass<number>(18)

// 泛型约束
interface Demo {
  length: number
}
// 泛型约束, 泛型T必须满足Demo接口的约束
function fn2<T extends Demo>(a: T): T {
  return a
}
fn2('hello')

// 泛型场景1. 使用泛型定义返回值类型
function fn3<T>(a: any) {
  return a as T
}
// 泛型给的是number 所以知道返回值是number
fn3<number>(123)
// 泛型给的是string 所以知道返回值是string
fn3<string>('hello')
