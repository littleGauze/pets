import crypto from 'crypto'
import { Toast, Indicator, MessageBox } from 'mint-ui'
import store from '../store'

const USER_KEY = 'PETS:USER'

const sha1 = str => crypto.createHash('sha1').update(str).digest('hex')

// cache user info
function cacheUser (userInfo) {
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo))
}

function getUser () {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

function getPrefer () {
  return (getUser() || {}).prefer || 'cat'
}

// logout
function logout () {
  localStorage.removeItem(USER_KEY)
}

const $T = opt => msg => Toast({
  message: msg,
  position: 'middle',
  duration: 2500,
  ...opt
})

const toast = $T()
toast.success = $T({ iconClass: 'pif icon-kuangzhonggou' })
toast.error = $T({ iconClass: 'pif icon-cuo' })

const loading = (close = true, text = 'loading...') => {
  if (!close) return Indicator.close()
  Indicator.open(text)
}

const MB = opt => MessageBox({
  title: 'Tips',
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
  ...opt
})

const modal = {
  alert: message => MB({ message }),
  confirm: message => MB({ message, showCancelButton: true }),
  prompt: message => MB({ message, showCancelButton: true })
}

function openMenu () {
  const upd = payload => store.commit('app/updateState', { prop: 'openMenu', payload })

  // open menu
  upd(true)

  // reset open status
  setTimeout(() => upd(false), 1000)
}

function resetPosts () {
  // reset filter options
  store.dispatch('app/loadFilters')

  // reset posts
  store.commit('home/updateState', [
    { prop: 'posts', payload: [] },
    { prop: 'page', payload: 0 },
    { prop: 'params', payload: {} }
  ])
}

export {
  sha1,
  logout,
  cacheUser,
  getUser,
  getPrefer,
  toast,
  loading,
  modal,
  openMenu,
  resetPosts
}
