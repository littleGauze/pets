import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'
import store from './store'
import back2top from './plugins/back2top'
import ftip from './plugins/formTips'
import { toast, loading, modal, openMenu, getPrefer, getUser } from './lib/utils'
import { InfiniteScroll, Loadmore, Lazyload } from 'mint-ui'

Vue.use(InfiniteScroll)
Vue.use(Lazyload)
Vue.component(Loadmore.name, Loadmore)

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(back2top)
Vue.use(ftip)

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages: {} // set locale messages
})

Vue.prototype.$toast = toast
Vue.prototype.$loading = loading
Vue.prototype.$modal = modal
Vue.prototype.$openMenu = openMenu
Vue.prototype.$prefer = getPrefer
Vue.prototype.$user = getUser

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  store,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
