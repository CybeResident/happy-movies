<template>
  <div class="douban-top">
    <top-rank :rank="rank" :type="type"></top-rank>
  </div>
</template>

<script>
import TopRank from 'components/content/topRank/TopRank'

import doubanRank from 'top250/doubanTop250.json'

export default {
  name: 'DoubanTop250',
  data() {
    return {
      rank: doubanRank,
      // rating: 'doubanRating',
      type: 'douban',
      // routeChangeCount: 0,
    }
  },
  watch: {
    // $route(to, from) {
    //   console.log('douban route change: ', this.routeChangeCount++)
    //   console.log(this.$route)
    // },
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm
  //   })
  // },
  components: {
    TopRank,
  },
}
</script>

<style scoped>
</style>
