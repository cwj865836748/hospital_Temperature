<template>
  <div class="list">
    <div class="listItem" v-for="(item, index) in list" :key="index">
      {{ item.name }}
    </div>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
import api from 'api'
export default {
  data () {
    return {
      list: [
        { name: 'vue-cli4脚手架' },
        { name: 'vant按需引入' },
        { name: '移动端rem适配' },
        { name: 'axios拦截封装' },
        { name: 'util工具类函数封装' },
        { name: 'vue-router配置' },
        { name: '登录权限校验' },
        { name: '多环境变量配置' },
        { name: 'vue.config.js配置' },
        { name: 'toast组件封装' },
        { name: 'dialog组件封装' },
        { name: '跨域代理设置' },
        { name: 'webpack打包可视化分析' },
        { name: 'CDN资源优化' },
        { name: 'gzip打包优化' },
        { name: '首页添加骨架屏' }
      ]
    }
  },
  created () {
    this.$axios.post(api.mine.add, { a: 1, b: 3 }).then(re => {
      console.log(re)
    })
  }
}
</script>

<style scoped lang="scss">
  .list {
    height: 100%;
    width: 100%;
    .listItem {
      width: 100%;
      padding: 0 15px;
      height: 45px;
      line-height: 45px;
      position: relative;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      text-align: left;
      font-size: 10px;
    }
  }
</style>
