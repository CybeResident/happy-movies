import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Search = () => import('views/search/Search.vue')
const Top250 = () => import('views/top250/Top250.vue')
const DoubanTop250 = () => import('views/top250/childComps/DoubanTop250.vue')
const ImdbTop250 = () => import('views/top250/childComps/ImdbTop250.vue')
const Detail = () => import('views/detail/Detail.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home
  },
  {

    path: '/search',
    component: Search
  },
  {
    path: '/top250',
    component: Top250,
    children: [
      {
        path: 'douban',
        name: 'douban',
        component: DoubanTop250
      },
      {
        path: 'imdb',
        name: 'imdb',
        component: ImdbTop250
      }
    ]
  },
  {
    path: '/detail/:doubanId',
    component: Detail
  },
  {
    path: '*',
    redirect: '/home'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // 滚动行为：如果判断前往的路由中有 hash ，即锚点，则滚动到锚点，否则回到页面左上角
  scrollBehavior(to, from, savedPosition) {
    let scroll = {};
    scroll =
      to.hash ?
        {
          selector: to.hash,
          behavior: 'smooth',
        } :
        {
          x: 0,
          y: 0,
          behavior: 'smooth'
        }

    return scroll
  },
  routes
})

export default router
