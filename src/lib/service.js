import request, { service } from './request'

export default {
  // get all images
  search (params) {
    return request({
      url: 'images/search',
      params
    })
  },

  // get my upload images
  myPosts (params) {
    return request({
      url: 'images',
      params
    })
  },

  // create a post
  createPost (data) {
    return request({
      method: 'POST',
      url: 'images/upload',
      headers: { 'content-type': 'multipart/form-data' },
      data
    })
  },

  // delete a personal post
  deletePost (id) {
    return request({
      method: 'DELETE',
      url: `images/${id}`
    })
  },

  // list favourites posts
  favourites (params) {
    return request({
      url: 'favourites',
      params
    }).then(({ data, ...rest }) => {
      data = data.map(it => {
        it.favourite = { id: it.id }
        it.id = it.image_id
        return it
      })
      return { data, ...rest }
    })
  },

  // collect a post
  doCollect (data) {
    return request({
      method: 'POST',
      url: 'favourites',
      data
    })
  },

  // delete a favourite
  delCollect (id) {
    return request({
      method: 'DELETE',
      url: `favourites/${id}`
    })
  },

  // list voted posts
  votes (params) {
    return request({
      url: 'votes',
      params
    })
  },

  // take a vote
  createVotes (data) {
    return request({
      method: 'POST',
      url: 'votes',
      data
    })
  },

  categories () {
    return request({
      url: 'categories',
      params: { page: 0, limit: 1000 }
    })
  },

  breeds () {
    return request({
      url: 'breeds',
      params: { page: 0, limit: 1000 }
    })
  },

  login (userName, password) {
    return service({
      method: 'POST',
      url: 'user/login',
      data: { userName, password }
    })
  },

  logout () {
    return service({
      url: 'user/logout'
    })
  },

  register (userName, password) {
    return service({
      method: 'POST',
      url: 'user',
      data: { userName, password }
    })
  },

  getProfile () {
    return service({
      url: 'user'
    })
  },

  updateProfile ({ id, ...data }) {
    return service({
      method: 'PUT',
      url: `user/${id}`,
      data
    })
  }
}
