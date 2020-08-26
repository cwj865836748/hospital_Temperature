import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { get, post } from './plugins/axios'
import echarts from 'echarts'
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
import '@/permission'
import '@/filters'
// import './utils/vconsole'
Vue.prototype.$axios = { get, post }
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
