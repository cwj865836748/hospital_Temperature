<template>
  <div class="app_content bgGrey">
    <div v-if="departmentList.length">
      <div class="addDepartment">您当前可以添加科室</div>
      <div class="departmentList flex-x-between flex-wrap">
        <div class="departmentDetail" v-for="(item,index) in departmentList" :key="index">
          <div class="departmentPic">
            <img :src="item.imageUrl"/>
          </div>
          <div class="departmentTitle">{{item.departmentName}}</div>
        </div>

        <div class="addBtn  flex-xy-center" @click="addDepartment">一键添加</div>
      </div>
    </div>
    <div v-else>
      <van-empty description="暂无数据" />
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'addDepartmentList',
  data () {
    return {
      departmentList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const { result } = await api.user.addDepartmentAllList()
      this.departmentList = result
    },
    async addDepartment () {
      const list = []
      this.departmentList.forEach(item => {
        list.push(item.id)
      })
      const { code, desc } = await api.user.addDepartment(list)
      this.$toast(desc)
      if (code === 200) {
        this.$router.push('/departmentList')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .bgGrey {
    background:#f6f8fa;
    height: auto;
    min-height: 100%;
    .addDepartment{
      font-size: 16px;
      color: #0a0d18;
      padding: 15px;
    }
    .departmentList {
      padding: 0 15px;
      .departmentDetail {
        width: 168px;
        height: 138px;
        background: #ffffff;
        border-radius: 6px;
        box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
        padding: 9px 9px 0 9px;
        margin-bottom: 13px;
        .departmentPic {
          width: 100%;
          height: 80px;
          margin-bottom: 11px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .departmentTitle {
          color: #0f1421;
        }
      }
    }
    .addBtn {
      width: 100%;
      height: 44px;
      background: linear-gradient(160deg,#59a2fb -30%, #3674f6 135%);
      border-radius: 4px;
      box-shadow: 0px 2px 7px 0px rgba(8,19,43,0.12);
      color: #ffffff;
      margin-top: 50px;
    }
  }
</style>
