<template>
  <div style="width: 100%;height: 100%">
  <van-pull-refresh v-if="roomList.length" v-model="refreshing" @refresh="onRefresh" style="height: 100%;">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
<div class="departRoom flex-x-between flex-wrap">

  <div class="departRoomList" v-for="(item,index) in roomList" :key="index" :style="{'background-image': 'url('+(item.tempWarn||item.humiWarn?redBg:blueBg)+')'}" @click="goRoomDetail(item)">
    <div class="departRoomNumber text-more-single">{{item.roomName}}</div>
    <div class="departRoomTemp flex">
      <div class="temperature flex">
      <div class="departTitle">
        <span>温度</span>
        <span class="unit">℃</span>
        <div :class="['num',!item.tempWarn?'':'hot']">
          <span>{{item.temperature}}</span>
          <img :src="!item.tempWarn?require('@/assets/images/TemNo.png'):require('@/assets/images/TemRed.png')">

        </div>
      </div>

    </div>
      <div class="temperature flex">
        <div class="departTitle">
          <span>湿度</span>
          <span class="unit">%RH</span>
          <div :class="['num',!item.humiWarn?'':'cold']"><span>{{item.humidity}}</span>
            <img :src="!item.humiWarn?require('@/assets/images/waterBlack.png'):require('@/assets/images/water.png')">

          </div>
        </div>
      </div>
    </div>
    <div class="departRoomStatus" style="margin: 18px 0 10px">
      <span>数据更新时间:</span>
      <span>{{item.updateTime|timeSFM}}</span>
    </div>
    <div class="departRoomStatus">
      <span>设备状态:</span>
      <span>{{item.inNum}}台在线</span>
    </div>
  </div>

</div>
    </van-list>
  </van-pull-refresh>
    <div v-if="!roomList.length">
      <van-empty description="暂无数据" />
    </div>
  <tabbar v-if="!$store.state.user.userInfo.isHighAdmin"/>
  </div>
</template>

<script>
import api from '@/api'
import tabbar from '@/components/tabbar'
export default {
  name: 'list',
  components: {
    tabbar
  },
  data () {
    return {
      roomList: [],
      loading: false,
      finished: false,
      refreshing: false,
      blueBg: require('@/assets/images/blue.png'),
      redBg: require('@/assets/images/red.png'),
      page: 1,
      pageSize: 10,
      total: 0,
      departmentId: this.$route.query.id,
      rush: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const params = {
        departmentId: this.departmentId,
        page: this.page,
        pageSize: this.pageSize
      }
      const { result } = await api.user.roomList(params)
      this.roomList = [...this.roomList, ...result.list.rows]
      this.total = result.list.total
      document.title = result.departmentName || '科室列表'
      this.page++
      setTimeout(() => {
        this.rush = true
      }, 1000)
    },
    onLoad () {
      setTimeout(() => {
        this.loading = false
        if (this.roomList.length < this.total) {
          if (this.rush) {
            this.getList()
          }
          this.rush = false
        } else {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      this.refreshing = false
      this.roomList = []
      this.page = 1
      this.finished = false
      this.getList()
    },
    goRoomDetail (item) {
      this.$store.dispatch('user/setTitle', item.roomName)
      this.$router.push({
        path: '/room',
        query: {
          id: item.id,
          roomName: item.roomName
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.departRoom {
  padding: 12px 15px 0;
  .departRoomList {
    width: 168px;
    height: 168px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-bottom: 9px;
    padding: 6px 0 14px 12px;
    .departRoomNumber {
      width: 50%;
      font-size: 14px;
      color: #999999;
      margin-bottom: 20px;
    }
    .departRoomTemp {
      .temperature {
        .departTitle {
          font-size: 13px;
          color: #666666;
          .unit {
            font-size: 12px;
            color: #aaaaaa;
          }
          .num {
            font-size: 24px;
            font-weight: 700;
            color: #0f1421;
            margin-top: 2px;
            img {
              height: 16px;
              width: 12px;
            }
            &.hot {
              color: #ff2a2a;
            }
            &.cold {
              color: #3674f6;
            }
          }
        }
        .departIcon {
          margin-left: 5px;

        }
      }
      .temperature:first-child {
        margin-right: 28px;
      }
    }
    .departRoomStatus {
      font-size: 12px;
      color: rgba(153,153,153,1);
      span:last-child {
        font-size: 13px;
        color: rgba(15,20,33,1);
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
