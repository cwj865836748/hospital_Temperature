import api from '@/api'
import {
  saveToken,
  removeToken,
  loadToken,
  saveLoginStatus,
  removeLoginStatus,
  loadLoginStatus,
  getAppidCode,
  saveAppidCode,
  removeAppidCode
} from '@/utils/cache'
const state = {
  loginStatus: loadLoginStatus(), // 登录状态
  token: loadToken(), // token
  userInfo: '', // 用户登录信息
  code: getAppidCode(),
  title: ''// 路由标题
}

const getters = {
  // user
  token: state => state.token,
  userInfo: state => state.userInfo,
  loginStatus: state => state.loginStatus,
  code: state => state.code,
  title: state => state.title
}

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_LOGIN_STATUS: (state, loginStatus) => {
    state.loginStatus = loginStatus
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_CODE: (state, code) => {
    state.code = code
  },
  SET_TITLE: (state, title) => {
    state.title = title
  }
}

const actions = {
  // 登录相关，通过code获取token和用户信息，用户根据自己的需求对接后台
  loginWechatAuth ({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      api.user.wxLogin(data)
        .then(res => {
          // 存用户信息，token
          if (res.code === 200) {
            commit('SET_TOKEN', saveToken(res.result.accessToken))
            dispatch('setLoginStatus', 2)
          }

          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 获取用户信息
  getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      api.user.userInfo().then(res => {
        if (res.code === 200) {
          commit('SET_USERINFO', res.result)
          resolve(res)
        }
      })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 设置状态
  setLoginStatus ({ commit }, query) {
    if (query === 0 || query === 1) {
      // 上线打开注释，本地调试注释掉，保持信息最新
      removeToken()
    }
    // 设置不同的登录状态
    commit('SET_LOGIN_STATUS', saveLoginStatus(query))
  },
  // 设置状态
  setAppidCode ({ commit }, code) {
    // 设置不同的登录状态
    commit('SET_CODE', saveAppidCode(code))
  },
  // 设置标题
  setTitle ({ commit }, title) {
    // 设置不同的登录状态
    commit('SET_TITLE', title)
  },
  // 登出
  fedLogOut () {
    // 删除token，用户信息，登陆状态
    removeToken()
    removeLoginStatus()
    removeAppidCode()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
