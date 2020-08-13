<template>
<div class="departRoomDetail">
  <div class="departRoomTemp flex-y-center flex-x-between">
    <div class="tempHead flex">
      <div class="redTemp">
        <div class="tempTitle">温度</div>
        <div :class="['num',!room.tempWarn?'':'hot']">{{room.temperature}}</div>
      </div>
      <div class="tempIcon">
        <img :src="!room.tempWarn?require('@/assets/images/TemNo.png'):require('@/assets/images/TemRed.png')">
        <div>℃</div>
      </div>
    </div>
    <div class="tempHead flex">
      <div class="redTemp">
        <div class="tempTitle">湿度</div>
        <div :class="['num',!room.humiWarn?'':'cold']">{{room.humidity}}</div>
      </div>
      <div class="tempIcon">
        <img :src="!room.humiWarn?require('@/assets/images/waterBlack.png'):require('@/assets/images/water.png')">

        <div>%RH</div>
      </div>
    </div>
  </div>
  <div class="departRoomData flex">
    <div class="data" style="margin-right: 44px">
      <span>数据更新时间:</span>
      <span>{{room.updateTime|timeSFM}}</span>
    </div>
    <div class="data">
      <span>设备状态:</span>
      <span>{{room.deviceList.length?room.deviceList.length:0}}台在线</span>
    </div>
  </div>
  <div class="abnormal">
    <span>异常原因</span>
    <span :class="abnormalReason?'hot':''">{{abnormalReason?abnormalReason:'无'}}</span>
  </div>
  <div :class="['departRoomBtn flex-xy-center',abnormalReason?'':'departRoomBtnNo']" @click="goPoliceRoom">
    确认报警
  </div>
    <div class="roomTitle">{{roomName}}设备列表</div>
    <div class="roomDeviceList">
      <div class="deviceDetail flex-y-center" v-for="(item,index) in room.deviceList" :key="index" @click="goHistory(item.deviceId)">
        <div>{{item.deviceName}}</div>
        <div>{{item.updateTime|timeSFM}}</div>
        <div :class="[item.warning?'hot':'']">{{item.warning|warning}}</div>
      </div>
    </div>
</div>
</template>

<script>
import api from '@/api'
export default {
  name: 'twoRoom',
  data () {
    return {
      room: {
        deviceList: []
      },
      abnormalReason: '',
      roomId: this.$route.query.id,
      roomName: this.$route.query.roomName
    }
  },
  created () {
    this.getList()
    document.title = this.roomName
  },
  methods: {
    async getList () {
      const { result } = await api.user.roomDetail({ roomId: this.roomId })
      this.room = result
      // 异常原因
      const warning = []
      result.deviceList.length && result.deviceList.forEach(item => {
        item.warning && warning.push(item.warning)
      })
      if (warning.length) {
        this.abnormalReason = warning.join(' ')
      }
    },
    goPoliceRoom () {
      if (!this.abnormalReason) {
        return
      }
      this.$router.push({
        path: '/policeRecordRoom',
        query: {
          roomId: this.roomId
        }
      })
    },
    goHistory (id) {
      this.$router.push({
        path: '/record',
        query: {
          id,
          roomId: this.roomId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.departRoomDetail {
  width: 100%;
  height: 100%;
  background: #f6f8fa;
  padding: 13px 15px 0;
  .departRoomTemp {
    width: 100%;
    height: 91px;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
    padding: 0 54px;
    .tempHead {
      .redTemp {
        .tempTitle {
          font-size: 13px;
          color: #666666;
          margin-bottom: 2px;
        }
        .num {
          font-size: 24px;
          font-weight: 700;
          color: #0f1421;
          &.hot {
            color: #ff574e;
          }
        }
      }
      .tempIcon {
        margin-left: 5px;
        padding-top: 9px;
        img {
          width: 12px;
          height: 16px;
        }
        div {
          font-size: 12px;
          color: #aaaaaa;
        }
      }
    }

  }
  .departRoomData {
    margin-top: 17px;
    .data {
      font-size: 12px;
      font-weight: 400;
      color: #8c9199;
      span:last-child {
        font-size: 13px;
        color: rgba(51,51,51,1);
      }
    }
  }
  .abnormal {
    margin-top: 17px;
    font-size: 14px;
    color: #0f1421;
    span:last-child {
      font-size: 16px;
      color: #333333;
      margin-left: 8px;
      &.hot {
        color: #ff574e;
      }
    }
  }
  .departRoomBtn {
    height: 44px;
    width: 100%;
    background: linear-gradient(160deg,#59a2fb -30%, #3674f6 135%);
    border-radius: 4px;
    box-shadow: 0px 2px 7px 0px rgba(24,88,218,0.33);
    color: #ffffff;
    margin-top: 20px;
    &.departRoomBtnNo {
      background: #cccccc;
      box-shadow: 0px 2px 7px 0px rgba(199,199,199,0.33);
    }
  }

  .roomTitle {
    font-size: 16px;
    color: #0a0d18;
    margin: 20px 0 15px;
  }
  .roomDeviceList {
    width: 100%;
    height: auto;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
    padding: 20px 12px;
    .deviceDetail {
      margin-bottom: 21px;
      div {
        font-size: 14px;
        font-weight: 400;
        color: #1a1d27;
        width:200px;
      }
      div:nth-child(2) {
        font-size: 13px;
        color: #8c9199;
        width: auto;
      }
      div:last-child {
        color: #0a0d18;
        font-weight: 500;
        flex-grow: 1;
        text-align: right;
        &.hot {
          color: #fe5b53;
        }
      }
    }
    .deviceDetail:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
