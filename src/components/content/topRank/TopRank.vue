<template>
  <div class="douban-top">
    <ol class="rank-container">
      <movie-rank
        v-for="(item, index) in section"
        :key="item.id"
        :info="item"
        :rank="getRank(index)"
      ></movie-rank>
    </ol>
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="getTotal"
      :hide-on-single-page="true"
      background
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-empty v-show="section.length === 0" description="空空如也~"></el-empty>
  </div>
</template>

<script>
import MovieRank from './childComps/MovieRank.vue'

export default {
  name: 'TopRank',
  data() {
    // 获得 处理后的原始排名 和 可用于各种操作的排名
    let { originalRank, processedRank } = this.processResult(this.rankingList)

    return {
      originalRank,
      processedRank,

      section: [],
      // sortVal: 'default',

      currentPage: 1,
      pageSize: 25,

      originalIdList: [],

      // routeChangeCount: 0,
    }
  },

  props: {
    rankingList: {
      type: Array,
      default() {
        return []
      },
    },
    type: {
      type: String,
      default: '',
    },
  },

  computed: {
    getTotal() {
      return this.processedRank.length
    },
    // 计算 分页 与 排名 的基数
    getBase() {
      return this.pageSize * (this.currentPage - 1)
    },
    // 获得选中的类别
    screenCategory() {
      return this.$store.state.screenCategory
    },
    sortVal() {
      return this.$store.state.topSortVal
    },
  },

  methods: {
    // 处理原始数据
    processResult(rank) {
      let originalRank = []
      let processedRank = []

      // 深拷贝，避免影响传入的原始数据
      // this.originalResult = JSON.parse(JSON.stringify(this.searchResult))
      // this.originalResult = this.searchResult.concat()

      // 将实体字符转换成相应的字符，对于中文的双引号，则直接消除
      originalRank = JSON.parse(
        JSON.stringify(rank).replace(/&#39;/g, "'").replace(/&#34;/g, '')
      )

      // 对涉及排序标准的数据进行处理
      originalRank.forEach((element) => {
        element.dateReleased === null ? (element.dateReleased = '') : void 0
        element.doubanRating === null ? (element.doubanRating = '') : void 0
        element.imdbRating === null ? (element.imdbRating = '') : void 0
        element.doubanVotes === null ? (element.doubanVotes = '') : void 0
        element.imdbVotes === null ? (element.imdbVotes = '') : void 0
      })

      processedRank = originalRank.concat()

      return { processedRank, originalRank }
    },

    // 结果排序
    sortRank() {
      // 升序排序
      switch (this.sortVal) {
        case 'rate': {
          this.processedRank.sort((prevEle, nextEle) => {
            return nextEle[`${this.type}Rating`] - prevEle[`${this.type}Rating`]
          })
          break
        }
        case 'time': {
          this.processedRank.sort((prevEle, nextEle) => {
            let preDateTemp = prevEle.dateReleased
            let laDateTemp = nextEle.dateReleased

            let preDate = preDateTemp.split('-').join('')
            let laDate = laDateTemp.split('-').join('')

            return laDate - preDate
          })
          break
        }
        case 'vote': {
          this.processedRank.sort((prevEle, nextEle) => {
            return nextEle[`${this.type}Votes`] - prevEle[`${this.type}Votes`]
          })
          break
        }
        default: {
          if (this.originalIdList.length !== 0) {
            this.processedRank.sort((prevEle, nextEle) => {
              let first = this.originalIdList.findIndex(
                (id) => prevEle.id === id
              )
              let second = this.originalIdList.findIndex(
                (id) => nextEle.id === id
              )
              return first - second
            })
          }
        }
      }
      // 结果排序后，必定需要重新分段
      this.sectionRank()
    },

    // 结果分段
    sectionRank() {
      // let start = (this.currentPage - 1) * this.pageSize
      let start = this.getBase
      let end = start + this.pageSize
      let section = this.processedRank.slice(start, end)
      this.section = section
    },

    // 获得电影排名
    getRank(index) {
      return index + 1 + this.getBase
    },

    // 根据选中的类别进行筛选
    screen(newVal) {
      let flagGenre = true
      let flagCountry = true
      let flagYear = true
      this.processedRank = this.originalRank.concat()
      if (!newVal.genre.includes('全部')) {
        this.processedRank = this.processedRank.filter((element) => {
          flagGenre = element.data[0].genre.includes(newVal.genre)
          return flagGenre
        })
      }
      if (!newVal.country.includes('全部')) {
        this.processedRank = this.processedRank.filter((element) => {
          flagCountry = element.data[0].country.includes(newVal.country)
          return flagCountry
        })
      }
      if (!newVal.year.includes('全部')) {
        // 如果以“年代”结尾，则需要进行年份计算
        // 如果以“更早”结尾，则意味着年份早于1960
        // 其他情况，则可以直接使用newVal.year进行判断
        if (newVal.year.endsWith('年代')) {
          let startYear = +newVal.year.slice(0, -2)
          let endYear = startYear + 10
          this.processedRank = this.processedRank.filter((element) => {
            flagYear = +element.year < endYear && +element.year >= startYear
            return flagYear
          })
        } else if (newVal.year.endsWith('更早')) {
          let endYear = 1960
          this.processedRank = this.processedRank.filter((element) => {
            flagYear = +element.year < endYear
            return flagYear
          })
        } else {
          this.processedRank = this.processedRank.filter((element) => {
            flagYear = element.year.includes(newVal.year)
            return flagYear
          })
        }
      }
      this.sortRank()
    },

    handleCurrentChange() {
      // 当分页页码变化时，页面滚动至最上方，无滚动效果
      window.scroll({
        top: 0,
        behavior: 'auto',
      })
      this.sectionRank()
    },
  },

  watch: {
    sortVal: {
      handler: 'sortRank',
      immediate: true,
    },
    screenCategory: {
      handler(newVal) {
        this.screen(newVal)
      },
    },
  },

  mounted() {
    this.originalIdList = this.originalRank.map((element) => {
      return element.id
    })
  },

  // beforeRouteLeave(to, from, next) {
  //   console.log('beforeRouteLeave')
  //   next()
  // },
  // beforeRouteEnter(to, from, next) {
  //   console.log('beforeRouteEnter')
  //   next()
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforeRouteUpdate')
  //   next()
  // },

  components: {
    MovieRank,
  },
}
</script>

<style scoped>
.douban-top .rank-container {
  margin-bottom: 30px;
}

.el-pagination {
  text-align: center;
}
</style>
