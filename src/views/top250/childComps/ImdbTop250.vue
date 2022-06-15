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
