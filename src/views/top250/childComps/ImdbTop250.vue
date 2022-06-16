<template>
  <div class="imdb-top">
    <top-rank :ranking-list="rankingList" :type="type"></top-rank>
  </div>
</template>

<script>
import TopRank from 'components/content/topRank/TopRank'

import imdbRank from 'api/top250/imdbTop250.json'

export default {
  name: 'ImdbTop250',
  data() {
    return {
      rankingList: imdbRank,
      type: 'imdb',
    }
  },
  components: {
    TopRank,
  },
}
</script>

<style scoped>
</style>
