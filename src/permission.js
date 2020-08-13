import qs from 'qs'
import router from '@/router/index'
import store from '@/store/index'
import wechatAuth from '@/plugins/wechatAuth'
import { getQueryString, processUrl } from '@/utils/utils'
// 设置APPID
wechatAuth.setAppId(process.env.VUE_APP_WECHAT_APPID)

// const whiteList = ['/departmentList', '/list']
// console.log(store)
router.beforeEach(async (to, from, next) => {
  // // 在白名单，直接进入
  // if (whiteList.indexOf(to.path) !== -1) {
  //   return next()
  // }
  const { token, userInfo } = store.state.user
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if ((to.path === '/' && from.path === '/list') || (to.path === '/' && from.path === '/departmentList')) {
    await store.dispatch('user/fedLogOut')
    window.location.href = 'http://tah.imtda.com'
  }
  // 首次登录
  if (!token) {
    if (getQueryString('code') && window.location.search.indexOf('?') !== -1) {
      await store.dispatch('user/setAppidCode', getQueryString('code'))
      next()
    } else {
      processUrl()
    }
  } else {
    if (userInfo) {
      next()
    } else {
      const { result } = await store.dispatch('user/getUserInfo')
      if (result.isHighAdmin) {
        next('/departmentList')
      } else {
        next('/list')
      }
    }
  }
})
