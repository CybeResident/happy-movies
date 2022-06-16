import { request } from './request'

export function getSearchResult(keyword) {
  let params = {
    q: keyword[0],
    year: keyword[1],
    lang: 'Cn'
  }

  return request({
    // url: '/server',
    params
  })
}