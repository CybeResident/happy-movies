<template>
  <div class="top250">
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="top250-info">
          <h1>Top250</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ipsa
            distinctio atque eius iste reiciendis natus autem, eaque incidunt
            magnam minima. Sint, cupiditate pariatur quas recusandae reiciendis
            quis amet soluta!
          </p>
        </div>
        <div class="top250-list">
          <el-tabs v-model="activeName" :stretch="true" @tab-click="tabClick">
            <el-tab-pane label="豆瓣" name="douban"> </el-tab-pane>
            <el-tab-pane label="IMDb" name="imdb"> </el-tab-pane>
          </el-tabs>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Top250',
  data() {
    return {
      routePath: '',
    }
  },
  computed: {
    activeName: {
      get() {
        return this.$route.path.split('/').reverse()[0]
      },
      set(val) {
        void 0
      },
    },
  },
  methods: {
    tabClick(tabItem, event) {
      let path = '/top250/' + tabItem.name
      // 避免重复导航
      if (path !== this.$route.path) {
        this.$router.replace(path)
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    // console.log('进入TOP250之前')
    next((vm) => {
      // console.log(
      //   'TOP250导航确认: ',
      // )
      // if (vm.isFirstEnter) {
      //   // 其实可以写 vm.$route.path + 'douban'，但是考虑到比较简单的字符串，而且也是静态的，所以直接字符串拼接
      //   // 将 isFirstEnter 设为 false，即该判断代码块只执行一次，仅第一次进入时执行
      //   vm.isFirstEnter = false
      //   console.log('如果第一次进入：', vm.routePath)
      //   vm.$router.replace('/top250/' + 'douban')
      // } else {
      //   // 短路运算：如果 vm.routePath 为空字符串，则不执行后续的路由导航
      //   // vm.routePath 为空字符串，也就意味着没有执行过路由钩子 beforeRouteLeave，只有进入，没有离开过，
      //   // 也就是说，是第一次进入该路由
      //   vm.routePath && vm.$router.replace(vm.routePath)
      // }
      // 【优化】
      // 最外层的判断是为了应对直接从浏览器地址栏输入路由地址进行访问的情况
      // 因为 vm.routePath 的值也可以反映是否是第一次进入该路由，所以可以用 routePath 代替 isFirstEnter 作为判断条件
      if (vm.$route.path === '/top250') {
        if (!vm.routePath) {
          // console.log('如果第一次进入：', vm.routePath, vm.activeName)
          vm.$router.replace('/top250/' + 'douban')
        } else {
          vm.$router.replace(vm.routePath)
        }
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    this.routePath = this.$route.path
    // console.log('离开TOP250之前', this.routePath)
    next()
  },
  // created() {
  //   console.log('创建TOP250')
  // },
  // mounted() {
  //   // 第一次进入 Top250 时，跳转至 Douban，其他情况不跳转
  //   // if (this.$route.path === '/top250') {
  //   //   this.$router.replace('/top250/' + 'douban')
  //   // }

  //   console.log('加载TOP250')
  // },
  // destroyed() {
  //   console.log('销毁TOP250')
  // },
  // activated() {
  //   console.log('激活TOP250')
  // },
  // deactivated() {
  //   console.log('失活TOP250')
  // },

  components: {},
}
</script>

<style scoped>
</style>
