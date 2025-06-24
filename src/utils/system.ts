export const SYSTEM_INFO = uni.getSystemInfoSync()
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15

export function getMenuButtonBoundingClientRect() {
  const { top, height } = uni.getMenuButtonBoundingClientRect()
  return { top, height }
}

export function getTitleBarHeight() {
  if (uni.getMenuButtonBoundingClientRect) {
    const { top, height } = getMenuButtonBoundingClientRect()
    // 计算标题栏高度, 为了和胶囊按钮保持一致
    // 因为标题栏我设置了statusBarHeight的高度，所以需要使用获取到的胶囊按钮的top
    // 减去statusBarHeight的高度, 然后乘以2, 因为标题栏和胶囊按钮之间有间距
    // 为什么要*2 ? 因为需要交叉轴居中
    // 也就是 statusBarHeight + height + (标题栏和胶囊按钮之间的间距 * 2)
    return height + (top - getStatusBarHeight()) * 2
  }
  else {
    return 40
  }
}
