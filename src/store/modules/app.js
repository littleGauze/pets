import api from '@/lib/service.js'
import wrap from '@/lib/storeWrap.js'

export default wrap({
  namespaced: true,
  state: {
    type: 'search',
    title: '',
    openMenu: false,
    breeds: [],
    categories: []
  },
  actions: {
    loadFilters ({ commit }) {
      api.breeds().then(({ data }) => {
        const breeds = data.map(it => ({ id: it.id, name: it.name }))
        commit('updateState', { prop: 'breeds', payload: breeds })
      })
      api.categories().then(({ data }) => {
        commit('updateState', { prop: 'categories', payload: data })
      })
    },
    doUpload (_, data) {
      return api.createPost(data)
    }
  }
})
