import { request } from '@/utils/myrequest'

const baseUrl = 'https://tea.qingnian8.com/api/bizhi'

export function apiGetBanner<T>() {
  return request<T>({ url: `${baseUrl}/homeBanner`, method: 'POST' })
}

export function apiGetDayRandom<T>() {
  return request<T>({ url: `${baseUrl}/randomWall`, method: 'POST' })
}

export function apiGetNotice<T>(data: { select: boolean }) {
  return request<T>({ url: `${baseUrl}/wallNewsList`, method: 'POST', data })
}

export function apiGetClassify<T>(data: { page: number, pageSize: number }) {
  return request<T>({ url: `${baseUrl}/classify`, method: 'POST', data })
}

export function apiGetClassifyList<T>(data: { classid: string }) {
  return request<T>({ url: `${baseUrl}/wallList`, data })
}
