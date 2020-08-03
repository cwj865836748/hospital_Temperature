import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { get, post } from './plugins/axios'
// 全局引入按需引入UI库 vant
import '@/plugins/vant'

Vue.prototype.$axios = { get, post }
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
