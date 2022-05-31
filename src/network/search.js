import { request } from './request'

export function getSearchResult(keyword) {
  // console.log(`xxx/search?q=${keyword}`);
  return request({
    url: '/search.json'
  })
}

