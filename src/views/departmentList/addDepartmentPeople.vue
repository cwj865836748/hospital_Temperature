<template>
  <div class="app_content bgGrey">
    <div v-if="departmentList.length">
    <div class="addDepartment">选中科室管理员所在科室</div>
    <div class="departmentList flex-x-between flex-wrap">

      <div class="departmentDetail" v-for="(item,index) in departmentList" :key="index">

        <div class="departmentCheckBox flex-xy-center">
          <van-radio-group v-model="departmentId">
          <van-radio :name="item.id" icon-size="15px"/>
          </van-radio-group>
        </div>
        <div class="departmentPic">
          <img :src="item.imageUrl"/>
        </div>
        <div class="departmentTitle">{{item.departmentName}}</div>

      </div>

    </div>
    <div class="addDepartment">输入科室管理员对应的手机号码</div>
    <div class="addDepartmentPhone flex-y-center">
      <van-field v-model="phone" type="tel" placeholder="输入科室管理员对应的手机号码" />
    </div>
   <div :class="['addBtn','flex-xy-center',departmentId?'okBtn':'']" @click="addDepartmentPerson">添加</div>
    </div>
    <div v-else>
      <van-empty description="暂无数据" />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { isPhone } from '@/utils/utils'
export default {
  name: 'addDepartmentPeople',
  data () {
    return {
      departmentList: [],
      phone: '',
      departmentId: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const { result } = await api.user.addDepartmentList()
      this.departmentList = result
    },
    async addDepartmentPerson () {
      if (!isPhone(this.phone)) {
        return this.$toast('请输入正确的手机号')
      }
      const { code, desc } = await api.user.addDepartmentPerson({ departmentId: this.departmentId, phone: this.phone })
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
    padding: 0 15px;
    .addDepartment{
      font-size: 16px;
      color: #0a0d18;
      padding: 15px 0;
    }
    .departmentList {
      .departmentDetail {
        width: 168px;
        height: 154px;
        background: #ffffff;
        border-radius: 6px;
        box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
        padding: 5px 9px 0 9px;
        margin-bottom: 14px;
        .departmentCheckBox {
          margin-bottom: 6px;
        }
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
    .addDepartmentPhone {
      width: 100%;
      height: 44px;
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
      padding-left: 15px;
    }
    .addBtn {
      width: 100%;
      height: 44px;
      background: linear-gradient(160deg,#babfcb -30%, #959ba9 104%);
      border-radius: 4px;
      box-shadow: 0px 2px 7px 0px rgba(8,19,43,0.12);
      color: #ffffff;
      margin-top: 51px;
    }
    .okBtn {
      background: linear-gradient(160deg,#59a2fb -30%, #3674f6 135%);

    }
  }
</style>
