import { CHANGE_SCREENCATE, CHANGE_SORT, CHANGE_ISJUMPING } from './mutation-types'

export const mutations = {
  [CHANGE_SCREENCATE](state, payload) {
    // console.log('change_screencate');
    let screenCategory = JSON.parse(JSON.stringify(payload.screenCategory))
    state.screenCategory = screenCategory
  },
  [CHANGE_SORT](state, payload) {
    state.topSortVal = payload.topSortVal
  },
  [CHANGE_ISJUMPING](state, payload) {
    state.isJumping = payload.isJumping
  }
}