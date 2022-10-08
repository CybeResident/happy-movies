<template>
  <div id="app">
    <nav-bar></nav-bar>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <el-backtop :visibility-height="300"></el-backtop>
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

<style lang="scss">
@import url('./assets/css/base.css');

#app {
  min-width: 950px;
}

.el-form .el-form-item {
  margin: 0;

  .el-form-item__content {
    line-height: 1;
  }
}

.el-input-group .el-input-group__prepend {
  background-color: #fff;
}
</style>