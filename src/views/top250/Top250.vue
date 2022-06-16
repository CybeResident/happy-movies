<template>
  <div class="top250" v-loading="$store.state.isJumping">
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="top250-info">
          <h1>Top250</h1>
          <category-container :categories="categories"> </category-container>
          <div class="sorts">
            <el-radio-group v-model="sortVal" size="medium">
              <el-radio label="default" border>默认排序</el-radio>
              <el-radio label="rate" border>按评分排序</el-radio>
              <el-radio label="time" border>按时间排序</el-radio>
              <el-radio label="vote" border>按评分人数排序</el-radio>
            </el-radio-group>
          </div>
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
import CategoryContainer from './childComps/CategoryContainer.vue'

import { CHANGE_SORT } from 'store/mutation-types'

import { debounce } from 'common/utils'

export default {
  name: 'Top250',
  data() {
    return {
      routePath: '',
      sortVal: 'default',
      categories: {
        genre: [
          '全部类型',
          '剧情',
          '喜剧',
          '动作',
          '爱情',
          '科幻',
          '动画',
          '悬疑',
          '惊悚',
          '恐怖',
          '犯罪',
          '同性',
          '音乐',
          '歌舞',
          '传记',
          '历史',
          '战争',
          '西部',
          '奇幻',
          '冒险',
          '灾难',
          '武侠',
          '情色',
        ],
        country: [
          '全部地区',
          '中国大陆',

          '美国',
          '中国香港',
          '中国台湾',
          '日本',
          '韩国',
          '英国',
          '法国',
          '德国',
          '意大利',
          '西班牙',
          '印度',
          '泰国',
          '俄罗斯',
          '伊朗',
          '加拿大',
          '澳大利亚',
          '爱尔兰',
          '瑞典',
          '巴西',
          '丹麦',
        ],
        year: [
          '全部年代',
          '2022',
          '2021',
          '2020',
          '2019',
          '2010年代',
          '2000年代',
          '1990年代',
          '1980年代',
          '1970年代',
          '1960年代',
          '更早',
        ],
      },
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
    mutateSort() {
      this.$store.commit(CHANGE_SORT, {
        topSortVal: this.sortVal,
      })
    },
    debounceMutateSort() {
      void 0
    },
  },
  watch: {
    sortVal: {
      handler() {
        this.debounceMutateSort()
      },
    },
  },

  mounted() {
    this.debounceMutateSort = debounce(this.mutateSort, 500)
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

  components: {
    CategoryContainer,
  },
}
</script>

<style scoped>
.top250 {
  padding-bottom: 30px;
}
.top250 .top250-info {
  margin-bottom: 15px;
}
.el-radio {
  margin-right: 10px;
}
</style>
