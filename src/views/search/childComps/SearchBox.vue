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
          title="点击搜索"
          @click.native="submit"
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
      searchVal: '',
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

      // 如果搜索时搜索框为空或处于等待响应，则不进入搜索判断
      if (this.searchVal && !this.isPending) {
        // 把字符串打散成数组，按空格划分元素
        // Array.filter 的作用是过滤掉由连续空格转换成的空字符串元素
        let keyArr = this.searchVal.split(' ').filter((item) => item !== '')

        // 将关键词数组变成 “片名 年份” 格式的字符串，如果只有一项，就不拼接
        // slice(0, -1) 是为了应对有多组用空格分开的字词的情况，将最后一组前的所有字词都拼接起来，当作片名，最后一组当作年份
        keyArr.length !== 1
          ? (this.searchKey.newKey =
              keyArr.slice(0, -1).join('') + ' ' + keyArr.slice(-1)[0])
          : (this.searchKey.newKey = keyArr[0])

        // 如果 newKey 和 oldKey 相同，则不进行搜索（因为上一次的搜索结果和本次的相同）
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

<style scoped lang="scss">
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

.el-form-item {
  &.input {
    margin-right: 10px;
    flex: 1;
  }

  &.submit-btn {
    flex: none;
  }
}

/* .el-form-item.input .el-form-item__content {
  width: 100%;
} */
</style>
