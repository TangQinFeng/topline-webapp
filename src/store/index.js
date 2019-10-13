import Vue from 'vue'
import Vuex from 'vuex'
import { getItem } from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {

  }
})
