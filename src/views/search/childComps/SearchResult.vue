<template>
  <div
    class="search-result"
    v-loading="isPending"
    element-loading-text="搜索中...ヾ(•ω•`)o"
  >
    <p class="hint" v-show="isSearched">搜索到相关结果 {{ resultNum }} 个</p>
    <!-- 用加载效果替代骨架屏效果 -->
    <!-- <el-skeleton
      :rows="10"
      animated
      :loading="isPending"
      :throttle="500"
    ></el-skeleton> -->
    <div class="result-container">
      <movie-card
        v-for="item in resultSection"
        :key="item.id"
        :info="item"
      ></movie-card>
    </div>
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="resultNum"
      :hide-on-single-page="true"
      background
    ></el-pagination>
    <el-empty
      v-if="isSearched && resultNum === 0"
      description="空空如也~"
    ></el-empty>
  </div>
</template>

<script>
import MovieCard from 'components/content/movieCard/MovieCard.vue'
export default {
  name: 'SearchResult',
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
    }
  },
  props: {
    // 接收搜索结果
    searchResult: {
      type: Array,
      default() {
        return []
      },
    },
    // 接收搜索状态
    isSearched: {
      type: Boolean,
      default: false,
    },
    // 接收等待状态
    isPending: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    resultNum() {
      // console.log(this.searchResult.length)
      return this.searchResult.length
    },
    resultSection() {
      let start = (this.currentPage - 1) * this.pageSize
      let end = start + this.pageSize
      // let end = this.currentPage * this.pageSize
      // let realEnd = end > this.resultNum - 1 ? this.resultNum - 1 : end
      let section = this.searchResult.slice(start, end)
      return section
    },
  },
  components: {
    MovieCard,
  },
}
</script>

<style scoped>
.search-result .hint {
  margin-bottom: 15px;
  font-size: 14px;
}

.search-result .result-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 15px;
  row-gap: 20px;
  margin-bottom: 30px;
}

.el-pagination {
  text-align: center;
}
</style>
