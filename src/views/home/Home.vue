<template>
  <div class="home">
    <home-title></home-title>

    <home-carousel></home-carousel>
  </div>
</template>

<script>
import HomeTitle from './childComps/HomeTitle.vue'
import HomeCarousel from './childComps/HomeCarousel.vue'

export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  components: {
    HomeTitle,
    HomeCarousel,
  },
}
</script>

<style scoped lang="scss">
.home {
}
</style>
