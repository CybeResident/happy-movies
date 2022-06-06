<template>
  <div
    class="search-result"
    v-loading="isPending"
    element-loading-text="搜索中...ヾ(•ω•`)o"
  >
    <div class="result-header" v-show="isSearched">
      <p class="hint">搜索到相关结果 {{ resultNum }} 个</p>
      <div class="conditions">
        <div class="sorts">
          <el-radio-group v-model="sortVal">
            <el-radio label="rank">按评分排序</el-radio>
            <el-radio label="time">按时间排序</el-radio>
          </el-radio-group>
        </div>
        <div class="filters">
          <local-search></local-search>
        </div>
      </div>
    </div>

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
import LocalSearch from './childComps/LocalSearch.vue'

export default {
  name: 'SearchResult',
  data() {
    return {
      originResult: this.searchResult,
      currentPage: 1,
      pageSize: 8,

      sortVal: 'rank',
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
      return this.searchResult.length
    },
    //
    resultSorting() {
      // 升序排序
      if (this.sortVal === 'rank') {
        this.searchResult.sort((preVal, laVal) => {
          let comparation = laVal.doubanRating - preVal.doubanRating
          return comparation
        })
      } else if (this.sortVal === 'time') {
        this.searchResult.sort()
      }
      // console.log(this.searchResult)
      // .reverse()
      // return this.searchResult
      return void 0
    },
    resultSection() {
      let start = (this.currentPage - 1) * this.pageSize
      let end = start + this.pageSize
      let section = this.searchResult.slice(start, end)
      return section
    },
  },
  methods: {},
  watch: {
    searchResult() {
      if (this.searchResult) {
        this.searchResult.forEach((element) => {
          !element.dateReleased ? (element.dateReleased = '') : void 0
        })
      }
    },
  },
  mounted() {},
  components: {
    MovieCard,
    LocalSearch,
  },
}
</script>

<style scoped>
.search-result .result-header {
  margin-bottom: 15px;
  font-size: 14px;

  display: flex;
  justify-content: space-between;
}

.search-result .result-header .hint {
  display: flex;
  align-items: center;
}

.search-result .result-header .conditions {
  display: flex;
  align-items: center;
}

.search-result .result-header .conditions .sorts {
  flex: none;
}

.search-result .result-header .conditions .filters {
  flex: 1;

  display: flex;
  align-items: center;
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

.el-radio {
  margin-right: 10px;
}
</style>
