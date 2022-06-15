<template>
  <div class="imdb-top">
    <top-rank :rank="rank" :type="type"></top-rank>
  </div>
</template>

<script>
import TopRank from 'components/content/topRank/TopRank'

import imdbRank from 'top250/imdbTop250.json'

export default {
  name: 'ImdbTop250',
  data() {
    return {
      rank: imdbRank,
      // rating: 'imdbRating',
      type: 'imdb',
      // routeChangeCount: 0,
    }
  },
  watch: {
    // $route(to, from) {
    //   console.log('imdb route change: ', this.routeChangeCount++)
    //   console.log(this.$route)
    // },
  },
  components: {
    TopRank,
  },
}
</script>

<style scoped>
</style>
