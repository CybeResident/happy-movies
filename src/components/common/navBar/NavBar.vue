<template>
  <div class="nav-bar">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="navClick">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/search">搜索</el-menu-item>
      <el-menu-item index="/top250">TOP250</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {}
  },
  computed: {
    activeIndex() {
      return '/' + this.$route.path.split('/')[1]
    },
  },
  methods: {
    navClick(index) {
      // 避免重复导航
      // 若当前路由地址有 index 的字段，那么不进行导航。通过不导航来解决 xxx/top250/xxx 跳转至 xxx/top250 的问题
      if (this.$route.path.indexOf(index) === -1) {
        this.$router.push(index)
      }
    },
  },
  components: {},
}
</script>

<style scoped>
/* .nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
} */

.nav-bar .el-menu {
  padding: 0 10px;
}
</style>
