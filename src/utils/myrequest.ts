export function request<T>(config: { url: string, method?: 'GET' | 'POST', header?: Record<string, string>, data?: {} }): Promise<T> {
  const { url, method = 'GET', header = {}, data = {} } = config
  header['access-key'] = '597092'
  return new Promise((resolve, reject) => {
    return uni.request({
      url,
      header,
      method,
      data,
      success: (res) => {
        const data = res.data as { errCode: number, data: unknown[], errMsg: string }
        if (data.errCode === 0) {
          resolve(res.data as T)
        }
        else if (data.errCode === 400) {
          uni.showModal({
            title: '错误提示',
            content: data.errMsg,
            showCancel: false,
          })
          reject(res.data)
        }
        else {
          uni.showToast({
            title: data.errMsg,
            showCancel: false,
          })
          reject(res.data)
        }
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
