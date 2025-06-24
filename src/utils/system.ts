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
/**
 * 单个横幅项的接口定义
 */
export interface BannerItem {
  _id: string // 例如："654893ad652341d97ccbc9c7"
  sort: number // 例如：1
  target: 'self' | 'miniProgram' | string // 例如："self", "miniProgram"
  picurl: string // 例如："https://..."
  url: string // 例如："id=...&name=...", "/pages/index/index"
  appid?: string // 可选字段，例如："wxbd89d0ba67f6b6a4" 或 ""
  // 根据实际情况，如果还有其他字段，请补充
}

/**
 * API 业务响应的内部结构（即 res.data 里面的 data）
 */
export interface ApiBusinessResponse<T> {
  errCode: number // 0 表示成功，其他表示失败
  errMsg: string // 例如："查询成功", "参数错误"
  data: T // 实际的业务数据，例如 BannerItem[]
  author?: string // 可选字段，例如："接口管理员：B站咸虾米"
  timeCost?: number // 可选字段，例如：1
}

/**
 * uni.request 完整的响应结构
 * uni.request 包装了原始 HTTP 响应
 */
export interface UniRequestResponse<T> {
  data: ApiBusinessResponse<T> // 注意：这里的 data 是我们上面定义的 ApiBusinessResponse<T>
  statusCode: number // HTTP 状态码，例如 200
  header: Record<string, string> // 响应头
  cookies: string[] // cookies
  errMsg: string // uni.request 自身的错误信息，例如 "request:ok"
}

// 针对 homeBanner 接口成功时，实际业务 data 部分是 BannerItem[] 数组
export type HomeBannerActualData = BannerItem[]

// 最终定义 uni.request 返回的完整响应类型
// uni.request 返回的 Promise<res> 中的 res 结构就是 UniRequestResponse<HomeBannerActualData>
export type HomeBannerFullResponse = UniRequestResponse<HomeBannerActualData>
