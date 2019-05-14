<template>
  <div class="avatar">
    <div class="wrapper" :style="{ width: calSize + 'vw', height: calSize + 'vw' }">
      <span class="img" alt="avatar">
        <i :class="`pif icon-${cate}`"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cate: {
      type: String,
      default: 'cat'
    },
    size: Number
  },
  computed: {
    calSize: function () {
      return (this.size / 7.5).toFixed(3)
    }
  },
  data: function () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  display: inline-block;
  align-items: center;
  .wrapper {
    overflow: hidden;
    display: inline-block;
    border: 2px solid #fff;
    box-shadow: 0 0 1px 0 $bg-minor;
    .img {
      display: inline-block;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      i {
        font-size: 80px;
      }
    }
  }
  .info {
    vertical-align: top;
    display: inline-block;
    font-size: 24px;
    margin-left: 20px;
    p {
      text-align: left;
      &.name {
        font-weight: bold;
        font-size: 26px;
      }
      &.city {
        color: $fc-minor;
        font-size: 22px;
      }
    }
  }
}
</style>
