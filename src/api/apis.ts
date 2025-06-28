import { request } from '@/utils/myrequest'

const baseUrl = 'https://tea.qingnian8.com/api/bizhi'

export function apiGetBanner<T>() {
  return request<T>({ url: `${baseUrl}/homeBanner`, method: 'POST' })
}

export function apiGetDayRandom<T>() {
  return request<T>({ url: `${baseUrl}/randomWall`, method: 'POST' })
}

export function apiGetNotice<T>() {
  return request<T>({ url: `${baseUrl}/wallNewsList`, method: 'POST' })
}

export function apiGetClassify<T>() {
  return request<T>({ url: `${baseUrl}/classify`, method: 'POST' })
}

export function apiGetClassifyList<T>(data: { classid: string, pageNum: number, pageSize: number }) {
  return request<T>({ url: `${baseUrl}/wallList`, data })
}

export function apiConfirmScore<T>(data: { classid: string, wallId: string, userScore: string }) {
  return request<T>({ url: `${baseUrl}/setupScore`, data })
}
