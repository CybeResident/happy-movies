<template>
  <div class="search" style="overflow-y: auto">
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
    <el-backtop :visibility-height="300"></el-backtop>
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
        .then((res) => {
          if (typeof res !== 'string') {
            this.searchResult = res
            this.isSucceeded = true
            this.isSearched = true
          } else {
            this.$message({
              message: '搜索太频繁了，休息一下吧！ヾ(•ω•`)o',
              type: 'warning',
              showClose: true,
            })
            this.isSucceeded = false
            // 搜索频繁时，不将 res 赋值给 searchResult，那么展示的搜索结果依旧是上一次的结果
            console.log(res)
          }
          this.isPending = false
          console.log('响应成功：', keyword)
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            message: '搜索失败，请稍后再试！_(:з)∠)_',
            type: 'error',
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
