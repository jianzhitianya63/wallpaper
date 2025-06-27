import { request } from '@/utils/myrequest'

const baseUrl = 'https://tea.qingnian8.com/api/bizhi'

export function apiGetBanner(): Promise<{ errCode: number, data: unknown[] }> {
  return request({ url: `${baseUrl}/homeBanner`, method: 'POST' })
}

export function apiGetDayRandom() {
  return request({ url: `${baseUrl}/randomWall`, method: 'POST' })
}

export function apiGetNotice(data: { select: boolean }) {
  return request({ url: `${baseUrl}/wallNewsList`, method: 'POST', data })
}
