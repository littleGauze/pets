<i18n>
{
  "en": {
    "topPullText": "pull to refresh",
    "topDropText": "release to refresh",
    "topLoadingText": "loading...",
    "contentnomore": "no more data"
  },
  "zh": {
    "topPullText": "下拉刷新",
    "topDropText": "释放刷新",
    "topLoadingText": "刷新中...",
    "contentnomore": "没有更多数据了"
  }
}
</i18n>

<template>
  <div class="home">
    <mt-loadmore
      ref="loadmore"
      :autoFill="false"
      :top-method="loadTop"
      :topPullText="$t('topPullText')"
      :topDropText="$t('topDropText')"
      :topLoadingText="$t('topLoadingText')"
      @top-status-change="handleTopChange"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="allLoaded"
      infinite-scroll-distance="10"
      :bottom-all-loaded="allLoaded"
    >
      <Post
        v-for="pic in posts"
        :uid="user && user._id"
        :key="pic.id"
        :pic="pic"
        @voted="onVoted"
        @collected="onCollected"
        @delete="onDelete"
      />
      <Empty v-if="empty" :prefer="user && user.prefer" />
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">
          <i class="loading pif icon-loading"></i>
        </span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus === 'loading'">
          <i class="loading pif icon-loading"></i>
        </span>
      </div>
      <span v-back2top:homeScroll="'#content'" class="back-to-top">
        <i class="pif icon-zhiding"></i>
      </span>
    </mt-loadmore>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Post from '@/components/Post.vue'
import Empty from '@/components/Empty.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'home',
  components: {
    Header,
    Post,
    Empty
  },
  data: function () {
    return {
      topStatus: false,
      bottomStatus: false,
      loading: false
    }
  },
  created () {
    this.loadMore(true)
  },
  watch: {
    params (val, old) {
      this.$back2top.homeScroll.scrollTop = 0
      this.loadData(true)
    }
  },
  computed: {
    ...mapState('home', ['params', 'posts', 'allLoaded']),
    ...mapState('app', ['type']),
    ...mapState(['user']),
    empty () {
      return !this.posts.length
    }
  },
  methods: {
    ...mapMutations('home', ['updateState']),
    ...mapActions('home', ['loadPosts', 'createVotes', 'doCollect', 'delCollect', 'deletePost']),
    loadData (refresh = false) {
      if (this.loading) return
      this.loading = true
      const query = {
        refresh,
        type: this.type,
        ...this.params
      }

      this.$loading()
      return this.loadPosts(query).then(res => {
        this.$loading(false)
        this.loading = false
        return res
      })
    },
    loadMore () {
      this.loadData()
    },
    loadTop () {
      this.loadData(true).then(_ => {
        this.$refs.loadmore.onTopLoaded()
      })
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    onVoted (value, id) {
      if (!this.user) return this.$openMenu()
      this.createVotes({
        image_id: id,
        sub_id: this.user._id,
        value
      }).then(res => {
        this.$toast.success(`vote success! ${value > 0 ? '+1' : '-1'}`)
      })
    },
    onCollected (id, fav) {
      if (!this.user) return this.$openMenu()
      if (fav && fav.id) {
        this.delCollect(fav.id).then(res => {
          // delete the post directly
          if (this.type === 'favourites') {
            this.updatePosts(id)
          } else {
            this.updatePosts(id, { favourite: null })
          }
          this.$toast.success(`un-fav success!`)
        })
        return
      }
      this.doCollect({
        image_id: id,
        sub_id: this.user._id
      }).then(res => {
        this.updatePosts(id, { favourite: { id: res.data.id } })
        this.$toast.success(`fav success!`)
      })
    },
    updatePosts (id, update) {
      let newPosts
      const post = this.posts.find(p => p.id === id)

      // delete it
      if (!update) {
        newPosts = this.posts.filter(p => p !== post)
      } else {
        Object.keys(update).forEach(key => {
          this.$set(post, key, update[key])
        })
        newPosts = [...this.posts]
      }
      this.updateState({ prop: 'posts', payload: newPosts })
    },
    onDelete (id) {
      this.$modal.confirm('Are you sure about this?').then(ok => {
        if (ok === 'confirm') {
          this.deletePost(id).then(res => {
            this.$toast.success('delete success!')
            this.updatePosts(id)
          }).catch(err => {
            const { data } = err.response
            this.$toast.error(data.message)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
@keyframes loading {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
@-webkit-keyframes loading {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
@-moz-keyframes loading {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
.home {
  .mint-loadmore-top {
    text-align: center;
    margin-top: -70px;
    height: 70px;
    i.loading {
      display: inline-block;
      font-size: 50px;
      animation: loading 1.2s linear infinite;
    }
    span {
      display: inline-block;
      transition: all .2s ease;
      &.rotate {
        transform: rotate(180deg);
      }
    }
  }
  .back-to-top {
    z-index: 99;
    position: fixed;
    bottom: 50px;
    right: 50px;
    i {
      font-size: 90px;
    }
  }
}
</style>
