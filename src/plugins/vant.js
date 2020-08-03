// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, Toast, Loading } from 'vant'
Vue.use(Button).use(Loading)
Vue.prototype.$Toast = Toast
