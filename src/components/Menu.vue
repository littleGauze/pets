<template>
  <div class="sidebar">
    <div class="menu-wrap">
      <div class="menu-item" @click="menuHandle('search')">
        <i class="pif icon-shouye"></i>
        <span>Home</span>
        <i class="pif icon-right"></i>
      </div>
      <div class="menu-item" @click="menuHandle('favourites')">
        <i class="pif icon-jushoucang"></i>
        <span>Favourites</span>
        <i class="pif icon-right"></i>
      </div>
      <div class="menu-item" @click="menuHandle('settings')">
        <i class="pif icon-shezhi"></i>
        <span>Settings</span>
        <i class="pif icon-right"></i>
      </div>
      <div class="menu-item" @click="menuHandle('upload')">
        <i class="pif icon-Cloudupload"></i>
        <span>Create a post</span>
        <i class="pif icon-right"></i>
      </div>
    </div>
    <div class="user" @click="menuHandle('my posts')">
      <div class="title">Posts</div>
      <div class="info">
        <Avatar :cate="user.prefer"/>
        <span>{{ user.nickName || user.userName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    value: Boolean,
    toggleMenu: Function
  },
  components: {
    Avatar
  },
  computed: mapState(['user']),
  methods: {
    ...mapMutations('app', ['updateState']),
    menuHandle (menu) {
      this.toggleMenu()
      let t = menu
      if (t === 'search') {
        t = this.$prefer() === 'dog' ? 'Dogs' : 'Cats'
      }
      this.updateState({ prop: 'title', payload: t })
      if (['favourites', 'search', 'my posts'].includes(menu)) {
        const params = { page: 0 }
        if (menu !== 'search') {
          params.order = 'desc'
        }
        this.updateState({ prop: 'type', payload: menu })
        this.$store.commit('home/updateState', { prop: 'params', payload: params })
        this.$router.push('/')
        return
      }

      // got to the setting page
      if (menu === 'settings') {
        this.$router.push('/settings')
      }

      // upload an image
      if (menu === 'upload') {
        this.$router.push('/upload')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar {
    padding: 0 40px;
    .menu-item {
      margin: 40px 0;
      i {
        font-size: 40px;
        font-weight: bold;
        &.icon-right {
          float: right;
          font-size: 45px;
        }
      }
      span {
        margin-left: 20px;
        vertical-align: top;
      }
    }
    .user {
      margin-top: 50px;
      .title {
        margin-bottom: 20px;
      }
      .info {
        display: flex;
        align-items: center;
        span {
          margin-left: 20px;
        }
      }
    }
  }
</style>
