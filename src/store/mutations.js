import { CHANGE_COND, CHANGE_SORT } from './mutation-types'

export const mutations = {
  [CHANGE_COND](state, payload) {
    let screenCond = JSON.parse(JSON.stringify(payload.screenCond))
    state.screenCond = screenCond
  },
  [CHANGE_SORT](state, payload) {
    state.topSortVal = payload.topSortVal
  }
}