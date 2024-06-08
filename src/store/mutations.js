import { CHANGE_SCREENCATE, CHANGE_SORT, CHANGE_ISJUMPING } from './mutation-types'

export const mutations = {
  [CHANGE_SCREENCATE](state, payload) {
    let screenCategory = JSON.parse(JSON.stringify(payload.screenCategory))
    state.screenCategory = screenCategory
  },
  [CHANGE_SORT](state, payload) {
    state.topSortType = payload.topSortType
  },
  [CHANGE_ISJUMPING](state, payload) {
    state.isJumping = payload.isJumping
  }
}