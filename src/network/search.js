import { request } from './request'

export function getSearchResult(keyword) {
  return request({
    url: '/server',
    // params: {
    //   q: keyword,
    //   lang: Cn
    // }
  })
}

