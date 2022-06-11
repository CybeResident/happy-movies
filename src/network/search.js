import { request } from './request'

export function getSearchResult(keyword) {
  let params = {};
  keyword[1]
    ? params = {
      q: keyword[0],
      year: keyword[1],
      lang: 'Cn'
    }
    : params = {
      q: keyword[0],
      lang: 'Cn'
    }

  return request({
    // url: '/server',
    params
  })
}