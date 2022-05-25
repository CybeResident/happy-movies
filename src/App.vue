<template>
  <div id="app">
    <nav-bar></nav-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar.vue'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    NavBar,
  },
}
</script>

<style scoped>
@import url('./assets/css/base.css');
</style>