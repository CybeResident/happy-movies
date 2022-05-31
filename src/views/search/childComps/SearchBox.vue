<template>
  <div class="search-box">
    <el-form size="large" @submit.native.prevent>
      <el-form-item class="input">
        <el-input
          type="text"
          v-model.trim="searchVal"
          placeholder="请输入电影名"
          clearable
          maxlength="50"
          @keyup.enter.native="submit"
        ></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="submit"
        ></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SearchResultVue from './SearchResult.vue'
export default {
  name: 'SearchBox',
  data() {
    return {
      searchVal: '1',
      // 记录当前关键词，作为下一次是否搜索的判断标识
      searchKey: {
        oldKey: '',
        newKey: '',
      },
      // 记录搜索历史
      searchHistory: [],
    }
  },
  methods: {
    submit(e) {
      // 点击后，自动强制失去焦点
      let target = e.target
      if (target.nodeName !== 'BUTTON') {
        target = target.parentNode
      }
      target.blur()
      // console.log('searchbox: submit done')

      // 如果搜索时搜索框为空，则不进入搜索判断
      if (this.searchVal) {
        this.searchKey.newKey = this.searchVal
          .split(' ')
          .filter((item) => item !== '')
          .join('')
        // 如果 newKey 和 oldKey 相同，则不进行搜索（因为上一次的搜索结果和本次的相同）
        if (this.searchKey.oldKey !== this.searchKey.newKey) {
          this.$emit('search', this.searchKey.newKey)

          this.searchKey.oldKey = this.searchKey.newKey

          let keyIndex = this.searchHistory.indexOf(this.searchKey.newKey)
          keyIndex !== -1 ? this.searchHistory.splice(keyIndex, 1) : void 0
          this.searchHistory.unshift(this.searchKey.newKey)
          this.searchHistory.length = 20

          console.log(this.searchHistory)
        }
      } else {
        // alert('请输入电影名')
        void 0
      }
    },
  },
  mounted() {},
  components: {},
}
</script>

<style scoped>
.search-box {
  width: 100%;
  margin-bottom: 40px;
}

.el-form {
  width: 100%;

  display: flex;
}

.el-form-item {
  margin: 0;
}

.el-form-item.input {
  margin-right: 10px;
  flex: 1;
}

.el-form-item.input .el-form-item__content {
  width: 100%;
}

.el-form-item.submit-btn {
  flex: none;
}
</style>
