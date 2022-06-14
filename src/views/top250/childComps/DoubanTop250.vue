<template>
  <div class="douban-top">
    <top-rank :rank="rank" :rating="rating"></top-rank>
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
      rating: 'doubanRating',
    }
  },
  computed: {},
  methods: {},
  components: {
    TopRank,
  },
}
</script>

<style scoped>
</style>
