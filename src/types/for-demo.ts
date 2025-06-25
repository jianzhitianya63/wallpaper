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

const arr2 = Array.from({ length: 99999 }).keys()
