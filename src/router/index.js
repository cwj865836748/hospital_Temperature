import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '智一行温湿度监控系统', keepAlive: false, auth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register.vue'),
    meta: { title: '注册', keepAlive: false, auth: false }
  },
  {
    path: '/forgetPassWord',
    name: 'forgetPassWord',
    component: () => import('@/views/login/forgetPassWord.vue'),
    meta: { title: '忘记密码', keepAlive: false, auth: false }
  },
  {
    path: '/departmentList',
    name: 'departmentList',
    component: () => import('@/views/departmentList/index.vue'),
    meta: { title: '科室列表', keepAlive: false, auth: false }
  },
  {
    path: '/addDepartmentList',
    name: 'addDepartmentList',
    component: () => import('@/views/departmentList/addDepartmentList.vue'),
    meta: { title: '添加科室', keepAlive: false, auth: false }
  },
  {
    path: '/addDepartmentPeople',
    name: 'addDepartmentPeople',
    component: () => import('@/views/departmentList/addDepartmentPeople.vue'),
    meta: { title: '添加科室管理员', keepAlive: false, auth: false }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/departmentList/list.vue'),
    meta: { title: '', keepAlive: false, auth: false }
  },
  {
    path: '/room',
    name: 'room',
    component: () => import('@/views/departmentList/room.vue'),
    meta: { title: '', keepAlive: false, auth: false }
  },
  {
    path: '/twoRoom',
    name: 'twoRoom',
    component: () => import('@/views/departmentList/twoRoom.vue'),
    meta: { title: '', keepAlive: false, auth: false }
  },
  {
    path: '/deviceDetails',
    name: 'deviceDetails',
    component: () => import('@/views/departmentList/deviceDetails.vue'),
    meta: { title: '设备详情', keepAlive: false, auth: false }
  },
  {
    path: '/record',
    name: 'record',
    component: () => import('@/views/record/history.vue'),
    meta: { title: '记录', keepAlive: false, auth: false }
  },
  {
    path: '/policeRecord',
    name: 'policeRecord',
    component: () => import('@/views/record/policeRecord.vue'),
    meta: { title: '报警记录', keepAlive: false, auth: false }
  },
  {
    path: '/policeRecordRoom',
    name: 'policeRecordRoom',
    component: () => import('@/views/record/policeRecordRoom.vue'),
    meta: { title: '房间报警记录', keepAlive: false, auth: false }
  },
  {
    path: '/confirmPolice',
    name: 'confirmPolice',
    component: () => import('@/views/record/confirmPolice.vue'),
    meta: { title: '确认报警', keepAlive: false, auth: false }
  },
  {
    path: '/confirmDetail',
    name: 'confirmDetail',
    component: () => import('@/views/record/confirmDetail.vue'),
    meta: { title: '报警详情', keepAlive: false, auth: false }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
