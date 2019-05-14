<template>
  <div class="header">
    <div class="button left">
      <div
        v-if="mode === 'main'"
        :class="['menu-button', value ? 'cross' : '']"
        @click="onMenuClicked"
      >
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <div v-else class="goback button" @click="$emit('onBack')">
        <i class="pif icon-xiangzuojiantou"></i>
      </div>
    </div>
    <div class="title">{{ title | capitalize }}</div>
    <div @click="$emit('onDone')" class="button right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    title: String,
    mode: {
      type: String,
      default: 'main'
    },
    showQuery: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onMenuClicked (evt) {
      evt.preventDefault()
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    z-index: 3;
    border-bottom: .5px solid $bg-minor;
    height: 10vw;
    line-height: 10vw;
    box-shadow: 0 0 2px 0 $bg-minor;
    background: $color-bg;
    z-index: 999;
    text-align: center;
    .title {
      z-index: 0;
      width: 100vw;
      position: absolute;
      left: 0;
      top: 0;
      display: inline-block;
      font-weight: bold;
      font-size: 36px;
    }
    .button {
      position: relative;
      z-index: 1;
      height: inherit;
      display: inline-block;
      width: 120px;
      color: $fc-minor;
      &.left {
        float: left;
      }
      &.right {
        float: right;
      }
      i {
        font-size: 40px;
      }
    }
  }
  .menu-button {
    padding: 15px;
    cursor: pointer;
    -webkit-transition: .3s;
    transition: .3s;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /*margin: 14px;
    border-radius: 5px;*/
  }
  .menu-button .bar:nth-of-type(1) {
    margin-top: 0px;
  }
  .menu-button .bar:nth-of-type(3) {
    margin-bottom: 0px;
  }
  .bar {
    position: relative;
    display: block;
    width: 50px;
    height: 5px;
    margin: 5px auto;
    background-color: $fc-main;
    border-radius: 10px;
    -webkit-transition: .3s;
    transition: .3s;
  }
  .cross .bar:nth-of-type(1) {
    -webkit-transform: translateY(15px) rotate(-45deg);
    -ms-transform: translateY(15px) rotate(-45deg);
    transform: translateY(15px) rotate(-45deg);
  }
  .cross .bar:nth-of-type(2) {
    opacity: 0;
  }
  .cross .bar:nth-of-type(3) {
    -webkit-transform: translateY(-15px) rotate(45deg);
    -ms-transform: translateY(-15px) rotate(45deg);
    transform: translateY(-15px) rotate(45deg);
  }
</style>
