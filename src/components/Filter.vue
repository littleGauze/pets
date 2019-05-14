<template>
  <div class="filter">
    <FilterHeader
      mode="nav"
      @onBack="$emit('onBack')"
      @onDone="$emit('onDone', filters)"
    >
      Done
    </FilterHeader>
    <div class="filter-container">
      <div class="filter-wrap">
        <div class="filter-item">
          <div class="title">Picture Types</div>
          <div class="items">
            <span
              v-for="type in types"
              :key="type.id"
              @click="toggleTags('types')(type.id)"
              :class="{ active: isActive('types')(type.id) }"
            >{{ type.name }}</span>
          </div>
        </div>
        <div v-if="categories.length" class="filter-item">
          <div class="title">Categories</div>
          <div class="items">
            <span
              v-for="cate in categories"
              :key="cate.id"
              @click="toggleTags('cate')(cate.id)"
              :class="{ active: isActive('cate')(cate.id) }"
            >{{ cate.name }}</span>
          </div>
        </div>
        <div class="filter-item">
          <div class="title">Breeds</div>
          <div class="items">
            <span
              v-for="breed in breeds"
              :key="breed.id"
              @click="toggleTags('breed')(breed.id)"
              :class="{ active: isActive('breed')(breed.id) }"
            >{{ breed.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import FilterHeader from '@/components/Header.vue'

export default {
  props: {
    value: Boolean,
    breeds: Array,
    categories: Array,
    types: Array
  },
  components: {
    Avatar,
    FilterHeader
  },
  created () {
  },
  data () {
    return {
      filters: {
        cate: null,
        breed: null,
        types: []
      }
    }
  },
  methods: {
    isActive (type) {
      const datas = this.filters[type]
      if (['breed', 'cate'].includes(type)) {
        return data => data === datas
      }
      return datas.includes.bind(datas)
    },
    toggleTags (type) {
      return data => {
        if (['breed', 'cate'].includes(type)) {
          this.filters[type] = this.filters[type] === data ? null : data
          return
        }
        const datas = this.filters[type]
        let idx = datas.indexOf(data)
        if (idx > -1) {
          datas.splice(idx, 1)
          this.filters[type] = datas
        } else {
          this.filters[type] = [...datas, data]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter {
    width: 100vw;
    height: 100vh;
    .filter-header {
      z-index: 3;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      padding: 0 30px;
      height: 10vw;
      line-height: 10vw;
      border-bottom: .5px solid $bg-minor;
      div {
        display: inline-block;
        &.done {
          float: right;
          font-weight: bold;
        }
      }
      i {
        font-size: 35px;
        font-weight: bold;
      }
    }
    .filter-container {
      position: relative;
      top: 10vw;
      height: calc(100vh - 10vw);
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .filter-wrap {
       padding: 0 40px;
    }
    .filter-item {
      margin: 40px 0;
      .title {
        font-weight: bold;
      }
      .items {
        display: flex;
        flex-wrap: wrap;
        span {
          border-radius: 20px;
          padding: 10px 25px;
          margin: 10px 5px;
          color: $fc-main;
          border: .5px solid $fc-minor;
          &.active {
            color: #fff;
            background-color: $fc-minor;
          }
        }
      }
    }
  }
</style>
