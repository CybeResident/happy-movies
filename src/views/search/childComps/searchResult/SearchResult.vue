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
          <el-radio-group v-model="sortType">
            <el-radio label="rate">按评分排序</el-radio>
            <el-radio label="time">按时间排序</el-radio>
          </el-radio-group>
        </div>
        <div class="filters">
          <search-local
            :isLocalPending="isLocalPending"
            :localSearchMsg="localSearchMsg"
            @search-local="searchLocal"
          ></search-local>
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
import SearchLocal from './childComps/SearchLocal.vue'

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
      // 存储分页后的数据
      section: [],

      currentPage: 1,
      pageSize: 8,

      sortType: 'rate',

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
      this.originalResult = JSON.parse(JSON.stringify(this.searchResult))

      // 【错误】以下是浅拷贝数组，无法隔离原始数据
      // this.originalResult = this.searchResult.concat()
      // this.originalResult[0].AAA = 'AAA'
      // console.log(
      //   'this.searchResult[0]: \n',
      //   this.searchResult[0],
      //   '\nthis.originalResult: \n',
      //   this.originalResult[0],
      //   '\nthis.searchResult === this.originalResult:',
      //   this.searchResult === this.originalResult
      // )

      // 对涉及排序标准的数据进行处理
      this.originalResult.forEach((element) => {
        element.dateReleased === null ? (element.dateReleased = '') : void 0
        element.doubanRating === null ? (element.doubanRating = '') : void 0

        // 添加本地搜索的关键词条
        this.localSearchMsg.titles.push(element.data[0].name)
        this.localSearchMsg.places.push(element.data[0].country)
        this.localSearchMsg.dates.push(element.dateReleased)
      })

      this.processedResult = this.originalResult.concat()
    },

    // 结果排序
    sortResult() {
      // 升序排序
      switch (this.sortType) {
        case 'rate': {
          this.processedResult.sort((prevEle, nextEle) => {
            return nextEle.doubanRating - prevEle.doubanRating
          })
          break
        }
        case 'time': {
          this.processedResult.sort((prevEle, nextEle) => {
            let prevDateTemp = prevEle.dateReleased
            let nextDateTemp = nextEle.dateReleased

            // 把上映日期中的 '-' 给忽略掉
            // let prevDate =
            //   prevDateTemp.slice(0, 3) +
            //   prevDateTemp.slice(5, 6) +
            //   prevDateTemp.slice(8, 9)
            // let nextDate =
            //   nextDateTemp.slice(0, 3) +
            //   nextDateTemp.slice(5, 6) +
            //   nextDateTemp.slice(8, 9)
            // 【优化】因为时间格式相同，可以进行相同操作
            let prevDate = prevDateTemp.split('-').join('')
            let nextDate = nextDateTemp.split('-').join('')

            return nextDate - prevDate
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

    // 本地搜索
    searchLocal(...params) {
      this.isLocalPending = true
      // console.log('自定义事件 localSearch')
      if (params[0]) {
        // 本地搜索后，结果必定是原先结果的子集（包含真子集），结果数量必定 ≤ 原先数量
        this.processedResult.length < this.originalResult.length
          ? (this.processedResult = this.originalResult.concat())
          : void 0

        switch (params[1]) {
          case 'titles': {
            this.processedResult = this.processedResult.filter((element) => {
              return element.data[0].name.indexOf(params[0]) !== -1
            })
            break
          }

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
    sortType: 'sortResult',
  },
  components: {
    MovieCard,
    SearchLocal,
  },
}
</script>

<style scoped lang="scss">
.search-result {
  .result-header {
    margin-bottom: 15px;
    font-size: 14px;

    display: flex;
    justify-content: space-between;

    .hint {
      flex: none;
      display: flex;
      align-items: center;
    }

    .conditions {
      display: flex;
      align-items: center;

      .sorts {
        flex: none;
        margin-left: 5px;
      }

      .filters {
        flex: 1;

        // display: flex;
        // align-items: center;
      }
    }
  }

  .result-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 15px;
    row-gap: 20px;
    margin-bottom: 30px;
  }
}

.el-pagination {
  text-align: center;
}

.el-radio {
  margin-right: 10px;
}
</style>
