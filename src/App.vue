<template>
  <div id="app">
    <nav-bar :is-hidden="isHidden"></nav-bar>

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
    return {
      isHidden: false,
    }
  },
  methods: {
    // TODO: 监听全局对象的滚动，如果滚动距离文档顶部的长度超过指定值，即向下滚动超过指定值，则隐藏导航栏
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop >= 60) {
        this.isHidden = true
      } else {
        this.isHidden = false
      }
    },
  },
  components: {
    NavBar,
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped lang="scss">
@import url('./assets/css/base.css');

#app {
  min-width: 950px;
  padding: 52px 0 100px;
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