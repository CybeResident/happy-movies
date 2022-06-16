import { request } from './request'

export function getDetailInfo(doubanId) {
  return request(
    { params: { id: doubanId } }, 'id')
}