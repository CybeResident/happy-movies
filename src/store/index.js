import Vue from 'vue'
import Vuex from 'vuex'

import { mutations } from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenCategory: {},
    topSortVal: 'default',
    isJumping: false
  },
  getters: {
  },
  mutations,
  actions: {
  },
  modules: {
  }
})
