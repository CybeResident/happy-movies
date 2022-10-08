<template>
  <div class="douban-top">
    <top-rank :ranking-list="rankingList" :type="type"></top-rank>
    <!-- <el-empty
      v-if="isSearched && resultNum === 0"
      description="空空如也~"
    ></el-empty> -->
  </div>
</template>

<script>
import TopRank from 'components/content/topRank/TopRank'

import doubanRank from 'api/top250/doubanTop250.json'

export default {
  name: 'DoubanTop250',
  data() {
    return {
      rankingList: doubanRank,
      type: 'douban',
    }
  },
  components: {
    TopRank,
  },
}
</script>

<style scoped>
</style>
