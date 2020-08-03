import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
const service = axios.create({
  baseURL: '',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  transformRequest: (data, config) => {
    if (!config['Content-Type']) { return qs.stringify(data) }
    switch (config['Content-Type'].toLowerCase()) {
      case 'application/json;charset=utf-8': {
        return JSON.stringify(data)
      }
      case 'multipart/form-data;charset=utf-8': {
        return data
      }
      default: {
        return qs.stringify(data)
      }
    }
  }
})
// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    console.log(1, config)
    const token = localStorage.getItem('token')
    token && (config.headers.token = token)
    Toast.loading({
      forbidClick: true
    })
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器
    Toast.clear()
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      Toast({
        message: response.data.message,
        duration: 2000
      })
      return Promise.reject(response)
    }
  },
  error => {
    Toast.clear()
    console.log(error)
    const responseCode = error.response.status
    switch (responseCode) {
      // 401：未登录
      case 401:
        Toast({
          message: '未登录',
          position: 'middle',
          duration: 2000
        })
        break
      // 404请求不存在
      case 404:
        Toast({
          message: '网络请求不存在',
          position: 'middle',
          duration: 2000
        })
        break
      default:
        Toast({
          message: error.response.data.message,
          position: 'middle',
          duration: 2000
        })
    }
    return Promise.reject(error.response)
  }
)

/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
  // 或者return axios.get();
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post (url, params = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)// qs.stringify()将对象 序列化成URL的形式，以&进行拼接。
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export { get, post, service }
