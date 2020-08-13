import { service } from '@/plugins/axios'

export default {
  user: {
    wxLogin (data = {}) {
      return service({
        url: '/wxLogin',
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    registerUser (data = {}) {
      return service({
        url: '/user/register/user',
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    resetPassword (data = {}) {
      return service({
        url: '/user/reset/password',
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    userInfo () {
      return service({
        url: '/user/info',
        method: 'get'
      })
    },
    registerCode (params) {
      return service({
        url: '/user/register/code',
        method: 'get',
        params
      })
    },
    changeCode (params) {
      return service({
        url: '/user/change/code',
        method: 'get',
        params
      })
    },
    departmentList () {
      return service({
        url: '/center/department/list',
        method: 'get'
      })
    },
    addDepartmentAllList () {
      return service({
        url: '/center/add/department/list',
        method: 'get'
      })
    },
    addDepartmentList () {
      return service({
        url: '/center/admin/has/department',
        method: 'get'
      })
    },
    addDepartment (data) {
      return service({
        url: '/center/add/department',
        method: 'post',
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    addDepartmentPerson (params) {
      return service({
        url: '/center/add/departmentUser',
        method: 'get',
        params
      })
    },
    roomList (params) {
      return service({
        url: '/center/room/list',
        method: 'get',
        params
      })
    },
    roomDetail (params) {
      return service({
        url: '/center/room/detail',
        method: 'get',
        params
      })
    },
    deviceInfo (data) {
      return service({
        url: '/center/device/info',
        method: 'post',
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    deviceHistory (params) {
      return service({
        url: '/center/device/history',
        method: 'get',
        params
      })
    },
    warnLog (data) {
      return service({
        url: '/center/warn/log',
        method: 'post',
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    warnAffirm (data) {
      return service({
        url: '/center/warn/affirm',
        method: 'post',
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
}
