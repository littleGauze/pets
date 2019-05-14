<template>
  <div class="empty">
    <i :class="['pif', iconCls]"></i>
    <span>empty...</span>
  </div>
</template>

<script>
export default {
  props: {
    prefer: {
      type: String,
      default: 'cat'
    }
  },
  computed: {
    iconCls () {
      return this.prefer === 'dog' ? 'icon-icon_datadog' : 'icon-cat1'
    }
  }
}
</script>

<style lang="scss" scoped>
  .empty {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
      margin-top: -30vh;
      font-size: 120px;
      color: $fc-minor;
    }
    span {
      color: $fc-minor;
    }
  }
</style>
