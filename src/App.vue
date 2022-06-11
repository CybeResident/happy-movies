<template>
  <div id="app">
    <nav-bar></nav-bar>
    <keep-alive>
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

<style>
@import url('./assets/css/base.css');

/* .el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon,
.el-pager li {
  font-size: 16px;
}

.el-pagination button,
.el-pager li {
  height: 36px;
  line-height: 36px;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  width: 40px;
}

.el-pagination button,
.el-pagination span:not([class*='suffix']) {
  vertical-align: middle;
} */

.el-form .el-form-item {
  margin: 0;
}

.el-form .el-form-item .el-form-item__content {
  line-height: 1;
}

.el-input-group .el-input-group__prepend {
  background-color: #fff;
}
</style>