import { request } from './request'

export function getSearchResult(keyword) {
  return request({
    url: '/server',
    // params: {
    //   q: keyword[0],
    //   year: keyword[1],
    //   lang: Cn
    // }
  })
}

