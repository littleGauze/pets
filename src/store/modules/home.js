import api from '@/lib/service.js'
import wrap from '@/lib/storeWrap.js'

export default wrap({
  namespaced: true,
  state: {
    params: {},
    posts: [],
    page: 0,
    limit: 10,
    allLoaded: false
  },
  actions: {
    loadPosts ({ commit, state, rootState }, { refresh = false, type = 'search', ...payload }) {
      let { page, limit, posts } = state
      const { user } = rootState
      if (refresh) {
        page = 0
      }
      if (type === 'search') {
        delete payload.order
      }
      if (type === 'my posts') {
        type = 'myPosts'
      }
      if (user) {
        payload.sub_id = user._id
      }
      const query = { page, limit, ...payload }
      return api[type](query).then(({ data, pageCount }) => {
        let allLoaded = false
        let pics
        if (page === 0) {
          pics = data
        } else {
          pics = posts.concat(data)
        }
        page += 1
        if (page >= pageCount) {
          allLoaded = true
        }
        commit('updateState', [
          {
            prop: 'page',
            payload: page
          },
          {
            prop: 'posts',
            payload: pics
          },
          {
            prop: 'allLoaded',
            payload: allLoaded
          }
        ])
      })
    },
    createVotes ({ commit, state }, params) {
      return api.createVotes(params)
    },
    doCollect ({ commit, state }, params) {
      return api.doCollect(params)
    },
    delCollect ({ commit, state }, id) {
      return api.delCollect(id)
    },
    deletePost ({ commit }, id) {
      return api.deletePost(id)
    }
  }
})
