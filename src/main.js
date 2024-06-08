import Vue from 'vue'
import App from './App.vue'
import router from 'router/index.js'
import store from 'store/index.js'

// 完整引入 ElementUI，样式文件需要单独引入。
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
