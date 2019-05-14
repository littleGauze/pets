<template>
<div class="app-container">
  <MyHeader
    v-model="isMenuOpen"
    @onDone="handleFilter"
    @onBack="handleBack"
    :title="title"
    :mode="mode"
  >
    <i v-if="showFilter" class="pif icon-sousuo"></i>
  </MyHeader>
  <div class="app-wrapper">
    <transition name="menu">
      <div
        v-if="isMenuOpen"
        class="menu-wrapper"
        @touchmove.prevent
      >
        <Menu
          v-if="user"
          :toggleMenu="toggleMenu"
        />
        <Register v-else-if="register" />
        <Login v-else />
        <div v-if="user" class="logout">
          <button @click="logout">Logout</button>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div
        v-if="isMenuOpen"
        class="menu-mask"
        @click="isMenuOpen = false"
        @touchmove.prevent
      />
    </transition>
    <div id="content" class="content">
      <router-view/>
    </div>
  </div>
  <transition name="filter">
    <div v-if="isFilterOpen" class="filter-wrapper">
      <PicFilter
        @onBack="toggleFilter"
        @onDone="handleFilter"
        :types="types"
        :breeds="breeds"
        :categories="categories"
      />
    </div>
  </transition>
</div>
</template>

<script>
import MyHeader from '@/components/Header.vue'
import Post from '@/components/Post.vue'
import Menu from '@/components/Menu.vue'
import PicFilter from '@/components/Filter.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'app',
  components: {
    MyHeader,
    Post,
    Menu,
    PicFilter,
    Login,
    Register
  },
  data: function () {
    return {
      isMenuOpen: false,
      isFilterOpen: false,
      types: [
        { id: 'gif', name: 'gif' },
        { id: 'jpg', name: 'jpg' },
        { id: 'png', name: 'png' }
      ],
      popupVisible: true
    }
  },
  created () {
    this.loadFilters()
    this.user && this.getProfile()
    this.updateState({ prop: 'title', payload: this.defaultTitle() })
    this.$store.commit('updateState', { prop: 'user', payload: this.$user() })
  },
  watch: {
    openMenu (val, old) {
      if (val) {
        // open menu directly
        this.isMenuOpen = true
      }
    }
  },
  computed: {
    ...mapState('app', ['breeds', 'categories', 'openMenu', 'title', 'type']),
    ...mapState(['user', 'register']),
    mode () {
      return ['settings', 'upload'].includes(this.title) ? 'nav' : 'main'
    },
    showFilter () {
      return this.type === 'search' && this.mode === 'main'
    }
  },
  methods: {
    ...mapMutations('app', ['updateState']),
    ...mapActions('app', ['loadFilters']),
    ...mapActions(['logout', 'getProfile']),
    defaultTitle () {
      return this.$prefer() === 'dog' ? 'Dogs' : 'Cats'
    },
    toggleFilter () {
      this.isFilterOpen = !this.isFilterOpen
      this.isMenuOpen = false
    },
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    },
    handleFilter ({ cate, breed, types = [] } = {}) {
      const query = {}
      if (cate) {
        query['category_ids'] = cate
      }
      if (breed) {
        query['breed_id'] = breed
      }
      if (types) {
        query['mime_types'] = types.join(',')
      }

      if (!isEqual(this.$store.state.home.params, query) && !isEmpty(query)) {
        this.$back2top.homeScroll.scrollTop = 0
        this.$store.commit('home/updateState', [
          { prop: 'params', payload: query },
          { prop: 'page', payload: 0 }
        ])
      }
      this.toggleFilter()
    },
    handleBack () {
      this.$router.go(-1)

      // reset posts
      this.$store.commit('home/updateState', { prop: 'page', payload: 0 })

      // update title
      this.updateState([
        { prop: 'title', payload: this.type === 'search' ? this.defaultTitle() : this.type }
      ])
    }
  }
}
</script>

<style lang="scss">
@import '/assets/css/common.scss';
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}
.app-wrapper {
  position: relative;
  height: calc(100vh - 10vw);
}
.menu-mask {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: .8;
  background: #000;
}
.menu-wrapper {
  display: inline-block;
  position: absolute;
  z-index: 2;
  min-width: 200px;
  width: 80vw;
  height: 100vh;
  background: #fff;
  .logout {
    width: 100%;
    bottom: 15vh;
    position: absolute;
    text-align: center;
    button {
      border: none;
      outline: none;
      background: #fff;
      color: red;
      font-size: 28px;
    }
  }
}
.filter-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 200px;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  background: #fff;
}
.content {
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
.menu-enter-active {
  transition: all .2s ease;
}
.menu-leave-active {
  transition: all .2s ease;
}
.menu-enter, .menu-leave-to {
  transform: translateX(-80vw);
}
.filter-enter-active {
  transition: all .3s ease;
}
.filter-leave-active {
  transition: all .3s ease;
}
.filter-enter, .filter-leave-to {
  transform: translateX(180vw);
}
.mask-enter-active {
  transition: all .2s ease;
}
.mask-leave-active {
  transition: all .2s ease;
}
.mask-enter, .mask-leave-to {
  opacity: 0;
}
</style>
