import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import home from './modules/home'
import app from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    register: null
  },
  actions,
  mutations,
  modules: {
    app,
    home
  }
})

export default store
