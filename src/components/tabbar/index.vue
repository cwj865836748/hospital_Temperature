<template>
  <van-tabbar v-model="active" active-color="#08132b" inactive-color="#8c9199">
    <van-tabbar-item v-for="(item,index) in $store.state.user.userInfo.isHighAdmin?tabbarList:tabbarList2" :key="index" :to="item.url" >
      <span>{{item.title}}</span>
      <template #icon="props">
      <img
        :src="props.active ? item.active : item.normal"
      />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      tabbarList: [
        { title: '监控平台', active: require('@/assets/images/mine.png'), normal: require('@/assets/images/mineNo.png'), url: '/departmentList' },
        { title: '报警记录', active: require('@/assets/images/policeRecord.png'), normal: require('@/assets/images/policeRecordNo.png'), url: '/policeRecord' }
      ],
      tabbarList2: [
        { title: '监控平台', active: require('@/assets/images/mine.png'), normal: require('@/assets/images/mineNo.png'), url: '/list' },
        { title: '报警记录', active: require('@/assets/images/policeRecord.png'), normal: require('@/assets/images/policeRecordNo.png'), url: '/policeRecord' }
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
