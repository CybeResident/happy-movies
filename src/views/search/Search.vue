<template>
  <div class="search" style="overflow-y: auto">
    <el-row>
      <el-col :span="16" :offset="4">
        <search-box @search="getResult"></search-box>
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
import SearchResult from './childComps/SearchResult.vue'

import { getSearchResult } from 'network/search.js'

export default {
  name: 'Search',
  data() {
    return {
      searchResult: [],
      isSearched: false,
      isPending: false,
    }
  },
  methods: {
    getResult(keyword) {
      console.log('发送搜素请求：', keyword)
      // 进入下一次搜索前，关闭“已搜索”状态，直到搜索成功再重新打开
      this.isSearched = false
      // 请求结束前，开启“等待”状态
      this.isPending = true
      getSearchResult(keyword)
        .then((res) => {
          this.searchResult = res
          this.isSearched = true
          this.isPending = false
          // let _this = this
          // let timer = setTimeout(() => {
          //   _this.searchResult = res
          //   _this.isSearched = true
          //   _this.isPending = false
          // }, 5000)
        })
        .catch((err) => {
          console.log(err)
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
}
</style>
