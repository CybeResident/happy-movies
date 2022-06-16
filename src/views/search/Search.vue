<template>
  <div
    class="search"
    style="overflow-y: auto"
    v-loading="$store.state.isJumping"
  >
    <el-row>
      <el-col :span="16" :offset="4">
        <search-box
          @search="getResult"
          :isPending="isPending"
          :isSucceeded="isSucceeded"
        ></search-box>
        <search-result
          :searchResult="searchResult"
          :isSearched="isSearched"
          :isPending="isPending"
        ></search-result>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchBox from './childComps/SearchBox.vue'
import SearchResult from './childComps/searchResult/SearchResult.vue'

import { getSearchResult } from 'network/search.js'

export default {
  name: 'Search',
  data() {
    return {
      searchResult: [],
      // 是否搜索成功（搜索频繁和搜索失败都属于失败）
      isSucceeded: false,
      // 是否进行过一次成功的搜索（包括搜索频繁）
      isSearched: false,
      // 是否处于搜索等待状态
      isPending: false,
    }
  },
  methods: {
    getResult(keyword) {
      // 将关键词字符串分解成数组
      keyword = keyword.split(' ')
      console.log('发送搜素请求：', keyword)

      // 请求结束前，开启“等待”状态
      this.isPending = true
      getSearchResult(keyword)
        .then((response) => {
          this.searchResult = response
          this.isSucceeded = true
          this.isSearched = true
          this.isPending = false
          console.log('响应成功：', keyword)
        })
        .catch((error) => {
          console.dir(error)
          // let status = (error.response && error.response.status) || 0
          // let message = ''
          // if (status === 429) {
          //   this.$message({
          //     message: '搜索太频繁了，休息一下吧！ヾ(•ω•`)o',
          //     type: 'warning',
          //     showClose: true,
          //   })
          // } else {
          //   switch (status) {
          //     case 404:
          //       message = '404: 资源不存在！…(⊙_⊙;)…'
          //       break
          //     case 302:
          //       message = '302: 搜索功能维护中，请耐心等待... {{{(>_<)}}}'
          //       break
          //     default:
          //       message = '搜索失败，请稍后再试！_(:з)∠)_'
          //   }
          //   this.$message({
          //     message,
          //     type: 'error',
          //     showClose: true,
          //   })
          // }
          this.$message({
            message: '搜索太频繁了，休息一下吧！ヾ(•ω•`)o',
            type: 'warning',
            showClose: true,
          })
          this.isSucceeded = false
          this.isPending = false
        })
    },
  },
  components: {
    SearchBox,
    SearchResult,
  },
}
</script>

<style scoped>
.search {
  padding: 30px 0 60px;
  /* background-color: coral; */
}
</style>
