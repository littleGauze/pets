import service from '@/lib/service'
import { cacheUser, sha1, toast, openMenu, resetPosts, logout as localLogout } from '@/lib/utils'
import router from '@/router'

export default {
  login ({ commit }, payload) {
    const { userName, password } = payload
    return service.login(userName, sha1(password)).then(data => {
      if (data.error) return toast.error(data.message)
      commit('updateState', { prop: 'user', payload: data })
      cacheUser(data)
      resetPosts()
    })
  },
  logout ({ commit }) {
    return service.logout().then(res => {
      commit('updateState', { prop: 'user', payload: null })
      router.push('/')
      localLogout()
      resetPosts()

      // open login menu
      openMenu()
    })
  },
  register ({ commit }, payload) {
    const { userName, password } = payload
    return service.register(userName, sha1(password)).then(data => {
      if (data.error) return toast.error(data.message)

      toast.success('register success!')
      commit('updateState', { prop: 'register', payload: null })
    })
  },
  getProfile ({ commit }) {
    return service.getProfile().then(data => {
      if (data.error) return toast.error(data.message)
      commit('updateState', { prop: 'user', payload: data })
      cacheUser(data)
      resetPosts()
    })
  },
  updateProfile ({ commit, dispatch }, params) {
    const { oldpwd, password } = params
    if (oldpwd) {
      params.oldpwd = sha1(oldpwd)
      params.password = sha1(password)
    }
    return service.updateProfile(params).then(res => {
      if (res.error) {
        toast.error(res.message)
        return
      }
      const { password, ...data } = res

      // log user out
      if (password) {
        toast.success('update success, please login!')
        dispatch('logout')
        return
      }

      // update cached user info
      cacheUser(data)
      commit('updateState', { prop: 'user', payload: data })
      toast.success('update success!')
    })
  }
}
