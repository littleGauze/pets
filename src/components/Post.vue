<template>
  <div class="post">
    <div>
      <div class="container">
        <span v-if="pic.original_filename" @click.stop="$emit('delete', pic.id)">
          <i class="pif icon-lajixiang"></i>
        </span>
        <img v-lazy="src" alt="pics">
      </div>
      <div class="footer">
        <p class="tags">
          <template v-if="tags.length">
            <i class="pif icon-tags"></i>
            <span
              v-for="tag in tags"
              :key="tag.id"
            >{{ tag.name }}</span>
          </template>
        </p>
        <div class="actions">
          <div class="action up">
            <div class="action-wrap" @click.stop="!up && $emit('voted', 1, pic.id) && toggle('up')">
              <i :class="['pif icon-zan', up && 'active']"></i>
            </div>
          </div>
          <div class="action down">
            <div class="action-wrap" @click.stop="!down && $emit('voted', -1, pic.id) && toggle('down')">
              <i :class="['pif icon-zanno', down && 'active']"></i>
            </div>
          </div>
          <div class="action like">
              <div class="action-wrap" @click.stop="$emit('collected', pic.id, pic.favourite)">
                <i :class="['pif', like ? 'icon-jushoucanggift' : 'icon-jushoucang']"></i>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'

export default {
  components: {
    Avatar
  },
  props: {
    showDelete: {
      type: Boolean,
      default: false
    },
    pic: Object,
    uid: String
  },
  data () {
    return {
      up: false,
      down: false
    }
  },
  methods: {
    toggle (type) {
      if (!this.uid) return
      this[type] = !this[type]
    }
  },
  computed: {
    tags () {
      const p = this.pic
      const tags = []
      const breed = p.breeds && p.breeds[0]
      if (breed) {
        tags.push({ id: breed.id, name: breed.name })
      }
      const category = p.categories && p.categories[0]
      if (category) tags.push(category)
      return tags
    },
    src () {
      const p = this.pic
      return p.image ? p.image.url : p.url
    },
    like () {
      return !!this.pic.favourite
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  margin: 30px 20px;
  border-radius: 10px;
  box-shadow: 0 0 30px 0 $bg-minor;
  .header {
    position: relative;
    padding: 15px;
    .time {
      position: absolute;
      top: 30px;
      right: 20px;
      display: inline-block;
      color: $fc-minor;
      font-size: 24px;
    }
  }
  .container {
    position: relative;
    left: -20px;
    width: 100vw;
    box-shadow: 0 0 2px 0 $bg-minor;
    min-height: 200px;
    background: $bg-gray;
    font-size: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      &[lazy=loading] {
        width: 300px;
        height: 500px;
        margin: auto;
      }
    }
    span {
      position: absolute;
      top: -5px;
      right: -5px;
      background: rgba(255, 255, 255, .2);
      border-radius: 10px;
      display: inline-block;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
    i {
      position: relative;
      font-size: 50px;
      color: $color-red;
    }
  }
  .footer {
    .tags {
      padding: 15px 20px;
      font-size: 28px;
      text-align: left;
      .icon-tags {
        font-size: 40px;
      }
      span {
        vertical-align: top;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
    .actions {
      padding: 0 15px 20px;
      text-align: left;
      .action {
        display: inline-block;
        margin-right: 30px;
        .action-wrap {
          display: flex;
          align-items: center;
        }
        i {
          font-size: 50px;
          &.icon-jushoucanggift {
            color: $color-red;
          }
        }
        .count {
          color: $fc-minor;
          font-size: 26px;
          margin-left: 5px;
        }
        &.up {
          margin-left: 30px;
          margin-right: 40px;
          .active {
            color: $color-green;
          }
        }
        &.down {
          .active {
            color: $color-red;
          }
        }
        &.like {
          float: right;
        }
      }
    }
  }
}
</style>
