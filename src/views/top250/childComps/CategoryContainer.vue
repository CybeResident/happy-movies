<template>
  <!-- <el-radio-group v-model="category" class="category-list" size="medium">
    <el-radio-button
      v-for="item in list"
      :key="item"
      :label="item"
    ></el-radio-button>
  </el-radio-group> -->
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
    getCategory() {
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
    },
    screen() {
      console.log(this.categoryCheck)
    },
    getScreen() {
      void 0
    },
  },
  watch: {
    categories: {
      handler: 'getCategory',
      immediate: true,
    },
    categoryCheck: {
      // handler() {
      //   console.log('watch-categoryCheck')
      //   this.getScreen()
      // },
      handler() {
        this.getScreen()
      },
      deep: true,
    },
  },
  mounted() {
    console.log('mounted')
    this.getScreen = debounce(this.screen, 500)
  },
  components: {},
}
</script>

<style>
.category-list {
  margin-bottom: 25px;
}

.category-list .el-radio-button__inner {
  padding: 7px 10px;
}

.category-list .el-radio-button__inner,
.category-list .el-radio-button:first-child .el-radio-button__inner {
  border: none;
  border-radius: 4px;
}

.category-list .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: var(--color-high-text);
  background-color: var(--color-tint);
  box-shadow: none;
}
</style>
