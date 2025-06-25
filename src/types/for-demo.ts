/// /////////数组遍历////////////
// for循环
const arr = [1, 2, 3, 4, 5]
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

// for in 数组遍历
for (const i in arr) {
  console.log(arr[i])
}

/**
 * 区别:
 *  for:
 *      - 直接操作索引, 没有其他调用产生开销, 性能最快
 *      - 可以使用break终止
 *  foreach:
 *      - 使用迭代器, 性能比for慢
 *      - 不能使用break终止
 *      - 虽然可以使用return 但是还是需要遍历完所有元素, 所以性能比for慢
 */

// 使用forEach遍历数组
const arr2 = Array.from({ length: 99999 }).keys()
arr2.forEach((item) => {
  if (item > 100) {
    return // forEach接收的是一个回调函数, 每次循环都会调用一次, return只是结束了这一次的回调方法
  }
  console.log(item)
})

// index为数组下标
arr2.forEach((item, index) => {
  console.log(item)
})

/// //////map////////////////
const arr3 = [1, 2, 3, 4, 5]
const arr4 = arr3.map((item) => {
  return item * 2 // 返回一个新的数组, 不会修改原数组
})
console.log(arr4)

// 值覆盖, 不会修改原数组
const arr9 = [{ name: '张三', age: 18 }, { name: '李四', age: 20 }]
const arr10 = arr9.map((item) => {
  return {
    ...item,
    age: item.age + 1, // 覆盖原数组中的age属性
  }
})
console.log(arr10)

// map中放入异步请求
// 请求会并发执行, 因为给map的是一个异步的函数(加了async), map调用后会立即收到返回结果(异步非阻塞)
const arr11 = [1, 2, 3, 4, 5]
const arr12 = arr11.map(async (num) => {
  const res = await uni.request({
    url: `https://api.example.com/data/${num}`,
  })
  return res.data
})
console.log(arr12)

/// //////filter////////////////
const arr5 = [1, 2, 3, 4, 5]
const arr6 = arr5.filter((item) => {
  return item > 3 // 返回一个新的数组, 不会修改原数组, 并且会过滤掉不符合条件的元素
})
console.log(arr6)

// filter同样可以过滤对象中的属性
const fobj = [{ name: '张三', age: 18 }, { name: '李四', age: 20 }]
fobj.filter(item => item.age > 18)

/// //////reduce////////////////
const arr7 = [1, 2, 3, 4, 5]
const arr8 = arr7.reduce((acc, item) => {
  return acc + item // 返回一个累加值, 不会修改原数组
}, 0)
console.log(arr8)

// 使用reduce求最大值
const max = arr7.reduce((prev, current, index, array) => {
  return prev > current ? prev : current
})

/// //////every////////////////
const arr13 = [1, 2, 3, 4, 5]
const arr14 = arr13.every((item) => {
  return item > 0 // 返回一个布尔值, 不会修改原数组, 如果所有元素都满足条件, 则返回true, 否则返回false
})
console.log(arr14)

// 场景: 当所有输入框都有值的时候才将按钮由禁用转为可用状态

/// //////some////////////////
const arr15 = [1, 2, 3, 4, 5]
const arr16 = arr15.some((item) => {
  return item > 3 // 返回一个布尔值, 不会修改原数组, 如果有一个元素满足条件, 则返回true, 否则返回false
})
console.log(arr16)

/// includes////////////////
const arr19 = [1, 2, 3, 4, 5]
const arr20 = arr19.includes(3) // 返回一个布尔值, 不会修改原数组, 如果数组中包含该元素, 则返回true, 否则返回false
console.log(arr20)

/// //////find////////////////
const arr17 = [1, 2, 3, 4, 5]
const arr18 = arr17.find((item) => {
  return item > 3 // 返回一个布尔值, 不会修改原数组, 如果有一个元素满足条件, 则返回该元素, 否则返回undefined
})
console.log(arr18)
