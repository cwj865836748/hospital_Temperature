<template>
  <div class="app_content bgGrey">
    <div class="departmentHead">
      <div class="flex-x-between">
        <div class="departBtn flex-xy-center" @click="$router.push('/addDepartmentList')">
<!--          <img src="@/assets/images/add.png">-->
          <span>查看科室</span>
        </div>
        <div class="departBtn flex-xy-center" @click="$router.push('/addDepartmentPeople')">
          <img src="@/assets/images/add.png">
          <span>添加科室管理员</span>
        </div>
      </div>
    </div>
    <van-pull-refresh v-if="departmentList.length" v-model="isLoading" @refresh="onRefresh" style="height: 100%">
    <div class="departmentList flex-x-between flex-wrap">
      <div class="departmentDetail" v-for="(item,index) in departmentList" :key="index" @click="goRoom(item)">
        <div class="departmentPic">
          <img :src="item.imageUrl"/>
        </div>
        <div class="departmentTitle">{{item.departmentName}}</div>
        <div class="dashLine"></div>
        <div class="flex-x-between">
          <div class="departmentStatus">
            <div class="title">异常数量</div>
            <div :class="[item.warnNum?'hot':'']">{{item.warnNum?item.warnNum:0}}</div>
          </div>
          <div class="departmentStatus">
            <div class="title">数据更新时间</div>
            <div class="time">{{item.updateTime|timeSFM}}</div>
          </div>
        </div>
      </div>
    </div>
    </van-pull-refresh>
    <div v-else>
      <van-empty description="暂无数据" />
    </div>
  <tabbar/>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar'
import api from '@/api'
export default {
  name: 'index',
  components: {
    tabbar
  },
  data () {
    return {
      departmentList: [],
      isLoading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const { result } = await api.user.departmentList()
      this.departmentList = result
    },
    onRefresh () {
      setTimeout(() => {
        this.getList()
        this.$Toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    goRoom (item) {
      this.$router.push({
        path: '/list',
        query: {
          id: item.id,
          departmentName: item.departmentName
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .bgGrey {
    background:#f6f8fa;
    height: auto;
    min-height: 100%;
    padding:74px 0  60px;
    .departmentHead {
      padding: 15px;
      background: #fff;
      width: 100%;
      height: 74px;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10000;
      .departBtn {
        background: linear-gradient(160deg,#59a2fb -30%, #3674f6 135%);
        border-radius: 4px;
        box-shadow: 0px 2px 7px 0px rgba(24,88,218,0.33);
        font-size: 15px;
        font-weight: 400;
        color: #ffffff;
        width: 168px;
        height: 44px;
        img {
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }
      }
    }
    .departmentList {
      padding: 0 15px;

      .departmentDetail {
        width: 168px;
        height: 204px;
        background: #ffffff;
        border-radius: 6px;
        box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
        padding: 9px 9px 0 9px;
        margin-top: 12px;
        .departmentPic {
          width: 100%;
          height: 80px;
          margin-bottom: 11px;
          border-radius: 4px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .departmentTitle {
          color: #0f1421;
          margin-bottom: 12px;
        }
        .dashLine {
          width: 100%;
          height: 1px;
          border: 1px dashed #eaedef;
          margin-bottom: 11px;
        }
        .departmentStatus {
          color: #333333;
          .title {
            font-size: 12px;
            font-weight: 400;
            color: #8c9199;
            margin-bottom: 10px;
          }
          .hot {
            color: #ff2a2a;
          }
          .time {
            font-size: 14px;
          }
        }

      }
    }
  }
  /deep/.van-pull-refresh {
    overflow: visible;
    -webkit-user-select: none;
    user-select: none;
  }

</style>
