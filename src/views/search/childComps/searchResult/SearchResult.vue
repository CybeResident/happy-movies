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
            <el-radio label="rate">按评分排序</el-radio>
            <el-radio label="time">按时间排序</el-radio>
          </el-radio-group>
        </div>
        <div class="filters">
          <local-search
            :isLocalPending="isLocalPending"
            :localSearchMsg="localSearchMsg"
            @local-search="localSearch"
          ></local-search>
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
        v-for="item in section"
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
      @current-change="sectionResult"
    ></el-pagination>
    <!-- @current-page="resultSection" -->
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
      // 存储 searchResult，防止误操作原始数据
      originalResult: [],
      processedResult: [],
      // 存储本地搜索关键词条
      localSearchMsg: {
        titles: [],
        places: [],
        dates: [],
      },
      // 存储分段后的数据
      section: [],

      currentPage: 1,
      pageSize: 8,

      sortVal: 'rate',

      // 标识：本地搜索是否等待中
      isLocalPending: false,
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
    // 结果数量
    resultNum() {
      return this.processedResult.length
    },
  },
  methods: {
    // 处理原始数据
    processResult() {
      // 深拷贝，避免影响传入的原始数据
      // this.originalResult = JSON.parse(JSON.stringify(this.searchResult))
      this.originalResult = this.searchResult.concat()
      // console.log(this.originalResult === this.searchResult)

      // 对涉及排序标准的数据进行处理
      this.originalResult.forEach((element) => {
        element.dateReleased === null ? (element.dateReleased = '') : void 0
        element.doubanRating === null ? (element.doubanRating = '') : void 0

        this.localSearchMsg.titles.push(element.data[0].name)
        this.localSearchMsg.places.push(element.data[0].country)
        this.localSearchMsg.dates.push(element.dateReleased)
      })

      this.processedResult = this.originalResult.concat()
    },

    // 结果排序
    sortResult() {
      // 升序排序
      switch (this.sortVal) {
        case 'rate': {
          this.processedResult.sort((preVal, laVal) => {
            return laVal.doubanRating - preVal.doubanRating
          })
          break
        }
        case 'time': {
          this.processedResult.sort((preVal, laVal) => {
            let preDateTemp = preVal.dateReleased
            let laDateTemp = laVal.dateReleased

            // 把上映日期中的 '-' 给忽略掉
            let preDate =
              preDateTemp.slice(0, 3) +
              preDateTemp.slice(5, 6) +
              preDateTemp.slice(8, 9)
            let laDate =
              laDateTemp.slice(0, 3) +
              laDateTemp.slice(5, 6) +
              laDateTemp.slice(8, 9)

            return laDate - preDate
          })
          break
        }
        default:
          void 0
      }

      // 结果排序后，必定需要重新分段
      this.sectionResult()
    },

    // 结果分段
    sectionResult() {
      let start = (this.currentPage - 1) * this.pageSize
      let end = start + this.pageSize
      let section = this.processedResult.slice(start, end)
      this.section = section
      // return section
    },

    localSearch(...params) {
      this.isLocalPending = true
      // console.log('自定义事件 localSearch')
      if (params[0]) {
        // 本地搜索后，结果必定是原先结果的子集（包含真子集），结果数量必定 ≤ 原先数量
        this.processedResult.length < this.originalResult.length
          ? (this.processedResult = this.originalResult.concat())
          : void 0

        switch (params[1]) {
          case 'titles':
            this.processedResult = this.processedResult.filter((element) => {
              return element.data[0].name.indexOf(params[0]) !== -1
            })
            break

          case 'places': {
            this.processedResult = this.processedResult.filter((element) => {
              return element.data[0].country.indexOf(params[0]) !== -1
            })
            break
          }
          case 'dates': {
            this.processedResult = this.processedResult.filter((element) => {
              return element.dateReleased.indexOf(params[0]) !== -1
            })
            break
          }
          default:
            // console.log(this.processedResult)
            break
        }
      } else {
        this.processedResult = this.originalResult.concat()
      }
      // 只要进行搜索，就必定需要对结果进行排序、分段
      this.sortResult()
      this.isLocalPending = false
    },
  },
  watch: {
    searchResult: ['processResult', 'sortResult'],
    sortVal: 'sortResult',
  },
  // beforeMount() {
  //   console.log('beforeMount')
  // },
  // mounted() {
  //   console.log('mounted')
  // },
  // beforeUpdate() {
  //   console.log('beforeUpdate')
  // },
  // updated() {
  //   console.log('updated')
  // },
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
  flex: none;
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
