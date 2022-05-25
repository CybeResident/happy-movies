<template>
  <div class="search">
    <search-box></search-box>
    <search-result></search-result>
  </div>
</template>

<script>
import SearchBox from './childComps/SearchBox.vue'
import SearchResult from './childComps/SearchResult.vue'

export default {
  name: 'Search',
  data() {
    return {}
  },
  components: {
    SearchBox,
    SearchResult,
  },
}
</script>

<style scoped>
</style>
