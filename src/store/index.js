import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      state.userInfo = userInfo
    },
    logout(state) {
      state.userInfo = null
      sessionStorage.removeItem('userInfo')
    }
  },
  getters: {
    getUserInfo(state) {
      if(state.userInfo === null) {
        state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      }
      return state.userInfo
    }
  }
})
