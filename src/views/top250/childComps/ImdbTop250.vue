<template>
  <div class="imdb-top">
    <top-rank :rank="rank" :rating="rating"></top-rank>
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
      rating: 'imdbRating',
    }
  },
  components: {
    TopRank,
  },
}
</script>

<style scoped>
</style>
