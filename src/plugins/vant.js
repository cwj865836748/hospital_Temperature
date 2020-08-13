// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, Toast, Loading, Field, Tabbar, TabbarItem, PullRefresh, RadioGroup, Radio, DatetimePicker, Popup, DropdownMenu, DropdownItem, List, Empty } from 'vant'
Vue.use(Button).use(Loading).use(Field).use(Tabbar).use(TabbarItem).use(PullRefresh).use(RadioGroup).use(Radio).use(DatetimePicker).use(Popup).use(DropdownMenu).use(DropdownItem).use(List).use(Empty)
Vue.prototype.$Toast = Toast
