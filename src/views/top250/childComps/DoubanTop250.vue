<template>
  <div class="douban-top">
    <!-- <p>{{ screenCond }}</p> -->
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
      @current-change="sectionRank"
    ></el-pagination>
  </div>
</template>

<script>
import MovieRank from 'components/content/movieRank/MovieRank'

import doubanRank from 'top250/doubanTop250.json'

export default {
  name: 'DoubanTop250',
  data() {
    // 将实体字符转换成相应的字符，对于中文的双引号，则直接消除
    const originalRank = JSON.parse(
      JSON.stringify(doubanRank).replace(/&#39;/g, "'").replace(/&#34;/g, '')
    )
    const processedRank = originalRank.concat()

    return {
      doubanRank,
      originalRank,
      processedRank,

      section: [],
      sortVal: 'default',

      currentPage: 1,
      pageSize: 25,
      // rankTotal: this.getTotal,
    }
  },
  computed: {
    getTotal() {
      return this.processedRank.length
    },
    // 计算 分页 与 排名 的基数
    getBase() {
      return this.pageSize * (this.currentPage - 1)
    },
    screenCond() {
      return this.$store.state.screenCond
    },
  },
  methods: {
    // 结果排序
    sortRank() {
      // 升序排序
      switch (this.sortVal) {
        case 'rate': {
          this.processedRank.sort((preVal, laVal) => {
            return laVal.doubanRating - preVal.doubanRating
          })
          break
        }
        case 'time': {
          this.processedRank.sort((preVal, laVal) => {
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

    getRank(index) {
      return index + 1 + this.getBase
    },

    screen(newVal) {
      let flagGenre = true
      let flagCountry = true
      let flagYear = true
      this.processedRank = this.originalRank.concat()
      if (!newVal.genre.toLowerCase().includes('全部')) {
        this.processedRank = this.processedRank.filter((element) => {
          flagGenre = element.data[0].genre.toLowerCase().includes(newVal.genre)
          return flagGenre
        })
      }
      if (!newVal.country.toLowerCase().includes('全部')) {
        this.processedRank = this.processedRank.filter((element) => {
          flagCountry = element.data[0].country
            .toLowerCase()
            .includes(newVal.country)
          return flagCountry
        })
      }
      if (!newVal.year.toLowerCase().includes('全部')) {
        // 如果以“年代”结尾，则需要进行年份计算
        // 如果以“更早”结尾，则意味着年份早于1960
        // 其他情况，则可以直接使用newVal.year进行判断
        if (newVal.year.toLowerCase().endsWith('年代')) {
          let startYear = +newVal.year.slice(0, -2)
          let endYear = startYear + 10
          this.processedRank = this.processedRank.filter((element) => {
            flagYear = +element.year < endYear && +element.year >= startYear
            return flagYear
          })
        } else if (newVal.year.toLowerCase().endsWith('更早')) {
          let endYear = 1960
          this.processedRank = this.processedRank.filter((element) => {
            flagYear = +element.year < endYear
            return flagYear
          })
        } else {
          this.processedRank = this.processedRank.filter((element) => {
            flagYear = element.year.toLowerCase().includes(newVal.year)
            return flagYear
          })
        }
      }
      this.sortRank()
    },
  },
  watch: {
    sortVal: {
      handler: 'sortRank',
      immediate: true,
    },
    screenCond: {
      handler(newVal) {
        this.screen(newVal)
      },
    },
  },
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
