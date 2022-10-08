<template>
  <div class="category-container">
    <el-radio-group
      v-for="(value, key) in categories"
      :key="key"
      v-model="categoryCheck[key]"
      size="medium"
      class="category-list"
    >
      <el-radio-button
        v-for="item in value"
        :key="item"
        :label="item"
      ></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import { debounce } from 'common/utils'

import { CHANGE_SCREENCATE } from 'store/mutation-types'

export default {
  name: 'CategoryContainer',
  data() {
    return {
      categoryCheck: {},
    }
  },
  props: {
    categories: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    // 获取 Top250 的初始分类选择：默认选择每个分类的第一项“全部xx”
    getCateDefault() {
      let keyValuePair = Object.entries(this.categories)
      let categoryCheck = {}
      for (let [key, value] of keyValuePair) {
        Object.defineProperty(categoryCheck, key, {
          value: value[0],
          enumerable: true,
          writable: true,
          configurable: true,
        })
      }
      this.categoryCheck = categoryCheck
      this.mutateCateCheck()
    },
    // 改变在 Vuex 中的 screenCategory
    mutateCateCheck() {
      // console.log('mutateCateCheck')
      this.$store.commit(CHANGE_SCREENCATE, {
        screenCategory: this.categoryCheck,
      })
    },
    // 在 mounted 时设置
    debounceMutateCateCheck() {
      void 0
    },
  },
  watch: {
    categories: {
      handler: 'getCateDefault',
      immediate: true,
    },
    categoryCheck: {
      handler() {
        this.debounceMutateCateCheck()
      },
      deep: true,
    },
  },
  mounted() {
    // 设置防抖后的 mutateCond
    this.debounceMutateCateCheck = debounce(this.mutateCateCheck, 500)
  },
  components: {},
}
</script>

<style scoped lang="scss">
.category-list {
  margin-bottom: 25px;

  ::v-deep .el-radio-button__inner {
    padding: 7px 10px;
  }

  ::v-deep .el-radio-button__inner,
  ::v-deep .el-radio-button:first-child .el-radio-button__inner {
    border: none;
    border-radius: 4px;
  }

  ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: var(--color-high-text);
    background-color: var(--color-tint);
    box-shadow: none;
  }
}
</style>
