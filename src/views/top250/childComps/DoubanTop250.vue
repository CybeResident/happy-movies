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
      :total="rankTotal"
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
      rankTotal: 250,
    }
  },
  computed: {
    // 计算 分页 与 排名 的基数
    getBase() {
      return this.pageSize * (this.currentPage - 1)
    },
    // getRank(index) {
    //   return index + this.getBase
    // },
  },
  methods: {
    // 处理原始数据
    // processRank() {
    //   this.processedRank = JSON.parse(
    //     JSON.stringify(doubanRank).replace(/&#39;/g, "'").replace(/&#34;/g, '')
    //   )
    // },

    // 结果排序
    sortRank() {
      // 升序排序
      if (this.sortVal === 'rate') {
        this.processedRank.sort((preVal, laVal) => {
          return laVal.doubanRating - preVal.doubanRating
        })
      } else if (this.sortVal === 'time') {
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
      // return section
    },

    getRank(index) {
      return index + 1 + this.getBase
    },
  },
  watch: {
    // searchResult() {
    //   this.processResult()
    //   this.sortResult()
    // },
    sortVal: {
      // handler() {
      //   this.sortRank()
      // },
      handler: 'sortRank',
      immediate: true,
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
