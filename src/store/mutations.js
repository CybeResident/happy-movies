import { CHANGE_COND } from './mutation-types'

export const mutations = {
  [CHANGE_COND](state, payload) {
    let screenCond = JSON.parse(JSON.stringify(payload.screenCond))
    state.screenCond = screenCond
  }
}