<template>
  <div class="search-box">
    <el-form size="large" @submit.native.prevent>
      <el-form-item class="input">
        <el-input
          type="text"
          v-model="searchVal"
          placeholder="关键词格式：片名【空格】年份（可选）。如：英雄 2000"
          clearable
          maxlength="50"
          @keyup.enter.native="submit"
        ></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button
          type="primary"
          icon="el-icon-search"
          title="结果中搜索"
          @click="submit"
        ></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      searchVal: '1 2 3 4',
      // 记录当前关键词，作为下一次是否搜索的判断标识
      searchKey: {
        oldKey: null,
        newKey: null,
      },
      // 记录搜索历史
      searchHistory: [],
    }
  },
  props: {
    isPending: {
      type: Boolean,
      default: false,
    },
    isSucceeded: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 提交搜索事件与关键词
    submit(e) {
      // 点击后，自动强制失去焦点
      let target = e.target
      if (target.nodeName !== 'BUTTON') {
        target = target.parentNode
      }
      target.blur()
      // console.log('searchbox: submit done')
      // console.log(this.isPending)

      // 如果搜索时搜索框为空且处于等待响应，则不进入搜索判断
      if (this.searchVal && !this.isPending) {
        let keyArr = this.searchVal.split(' ').filter((item) => item !== '')
        // 将关键词数组变成 “片名 年份” 格式的字符串
        this.searchKey.newKey =
          keyArr.slice(0, -1).join('') + ' ' + keyArr.slice(-1)[0]

        // 如果 newKey 和 oldKey 相同，则不进行搜索（因为上一次的搜索结果和本次的相同）
        // if (this.searchKey.oldKey !== this.searchKey.newKey) {
        //   this.$emit('search', this.searchKey.newKey)
        // }
        this.searchKey.oldKey !== this.searchKey.newKey
          ? this.$emit('search', this.searchKey.newKey)
          : void 0
      }
    },
    // 改变搜索关键词的历史记录
    changeKey() {
      this.searchKey.oldKey = this.searchKey.newKey

      let keyIndex = this.searchHistory.indexOf(this.searchKey.newKey)
      keyIndex !== -1 ? this.searchHistory.splice(keyIndex, 1) : void 0
      this.searchHistory.unshift(this.searchKey.newKey)

      if (this.searchHistory.length > 20) {
        this.searchHistory.length = 20
      }

      console.log('succeed_searchHistory: ', this.searchHistory)
    },
  },
  watch: {
    // 监视isPending，只要一变化，就进入该函数
    isPending() {
      if (!this.isPending) {
        this.isSucceeded
          ? this.changeKey()
          : console.log('failed_searchHistory: ', this.searchHistory)
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

/* .el-form-item {
  margin: 0;
} */

.el-form-item.input {
  margin-right: 10px;
  flex: 1;
}

/* .el-form-item.input .el-form-item__content {
  width: 100%;
} */

.el-form-item.submit-btn {
  flex: none;
}
</style>
