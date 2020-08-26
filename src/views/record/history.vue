<template>
<div class="history" :style="{'padding-top':(tabActive!==1?'54px':'124px')}">
  <div class="historyHead" :style="{'height':(tabActive!==1?'54px':'124px')}">
    <div class="historyTitle flex-x-between">
      <span :class="[tabActive===0?'active':'']" @click="tabChange(0)">数据曲线</span>
      <span :class="[tabActive===1?'active':'']" @click="tabChange(1)" >历史记录</span>
      <span :class="[tabActive===2?'active':'']" @click="tabChange(2)">报警记录</span>
    </div>
    <div class="historyDate flex-y-center" @click="dateShow=true" v-if="tabActive===1">
      <span class="dateWord">日期</span>
      <div class="dateTime flex-y-center">
        <img src="@/assets/images/date.png" class="dateIcon"/>
        <span>{{nowDate|setTime}}</span>
         <img src="@/assets/images/down.png" class="sanjiao">
      </div>
    </div>
  </div>
  <div class="picContent" v-if="tabActive===0">
    <div class="picChoose flex-y-center ">
      <span>曲线图</span>
      <div :class="['btn flex-y-center flex-x-between',hotOrCold===0?'active':'']" @click="changeHotOrCold(0)">
        <img :src="hotOrCold===0?require('@/assets/images/Tem.png'):require('@/assets/images/TemNo.png')"/>
<!--        <img src="@/assets/images/TemNo.png"/>-->
        <span>温度</span>
      </div>
      <div :class="['btn flex-y-center flex-x-between',hotOrCold===1?'active':'']" @click="changeHotOrCold(1)">
        <img :src="hotOrCold===1?require('@/assets/images/waterMore.png'):require('@/assets/images/waterBlack.png')"/>
        <span>湿度</span>
      </div>
    </div>
    <div class="picEcharts">
      <tempLine ref="tempLine" :dateList="dateList" :dataList="dataList" :hotOrCold="hotOrCold" v-if="showPic"/>
    </div>
    <div class="dateFormater flex-y-center">
      <span>时间段</span>
      <div class="downMenu">
        <div class="timeDetail flex-y-center" @click="monthShow=!monthShow">
          <img src="@/assets/images/clock.png" class="clock"/>
          <span>{{timeModel|timeFilter}}</span>
          <div class="sanjiao">
          <img src="@/assets/images/down.png" :class="[monthShow?'rotate':'']"/>
          </div>
        </div>
        <div class="downMenuList flex-y-around" v-show="monthShow">
          <div :class="[timeModel===0?'actives':'']" @click="selectTime(0)">今日</div>
          <div :class="[timeModel===1?'actives':'']" @click="selectTime(1)">本月</div>
          <div :class="[timeModel===2?'actives':'']" @click="selectTime(2)">前一个月</div>
        </div>
      </div>

    </div>
  </div>
  <div class="deviceList" v-if="tabActive===1">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="deviceList.length"
    >
    <div class="deviceTemp flex-y-center " v-for="(item,index) in deviceList" :key="index" @click="goHistoryDetail(item)">
      <div class="tempHead flex">
        <div class="redTemp">
          <div class="tempTitle">温度</div>
          <div class="num">{{item.temperature}}</div>
        </div>
        <div class="tempIcon">
          <!--         <img src="@/assets/images/TemRed.png"/>-->
          <img src="@/assets/images/TemNo.png"/>
          <div>℃</div>
        </div>
      </div>
      <div class="tempHead flex">
        <div class="redTemp">
          <div class="tempTitle">湿度</div>
          <div class="num">{{item.humidity}}</div>
        </div>
        <div class="tempIcon" >
          <img src="@/assets/images/waterBlack.png"/>
          <div>%RH</div>
        </div>
      </div>
      <div class="tempTime">{{item.createTime|timeSFM}}</div>
    </div>
    </van-list>
    <van-empty description="暂无数据" v-else/>
  </div>
  <div class="policeList" v-if="tabActive===2">
    <van-list
      v-model="policeLoading"
      :finished="policeFinished"
      finished-text="没有更多了"
      @load="policeOnLoad"
      v-if="policeList.length"
    >
    <div class="policeDetail flex-x-between flex-y-center" v-for="(item,index) in policeList" :key="index">
      <div>{{item.warnType}}</div>
      <div>{{item.createTime|timeSFM}}</div>
    </div>
    </van-list>
    <div v-else>
      <van-empty description="暂无数据" />
    </div>
  </div>

  <van-popup v-model="dateShow" position="bottom">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirmTime"
      @cancel="dateShow=false"
    />
  </van-popup>

</div>
</template>

<script>
import tempLine from './echarts/tempLine'
import api from '@/api'
import { filterTime } from '@/utils/utils'
import $ from 'jquery'
export default {
  name: 'history',
  filters: {
    timeFilter (val) {
      if (val === 0) {
        return '今日'
      } else if (val === 1) {
        return '本月'
      } else {
        return '前一个月'
      }
    }
  },
  data () {
    return {
      tabActive: 0, // 默认数据曲线
      deviceId: this.$route.query.id, // 当前设备id
      roomId: this.$route.query.roomId,
      nowDate: new Date(),
      minDate: new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()),
      currentDate: new Date(),
      maxDate: new Date(),
      dateShow: false, // 日期框
      monthShow: false, // 时间段框
      deviceList: [],
      policeList: [],
      page: 1,
      pageSize: 10,
      total: 0,
      finished: false,
      loading: false,
      rush: false,
      policePage: 1,
      policeTotal: 0,
      policeFinished: false,
      policeLoading: false,
      policeRush: false,
      timeModel: 0, // 时间段 0今日 1本月 2前一个月
      hotOrCold: 0, // 温度0 湿度1
      echarsData: null,
      dateList: [],
      dataList: [],
      showPic: false
    }
  },
  components: {
    tempLine
  },
  created () {
    this.deviceInfo()
    this.deviceHistory()
    this.warnLog()
  },
  methods: {
    tabChange (val) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.tabActive = val
    },
    // 数据曲线
    async deviceInfo () {
      const params = {
        timeModel: this.timeModel,
        deviceId: this.deviceId
      }
      const { result } = await api.user.deviceInfo(params)
      this.echarsData = result
      this.dateList = result.dateList
      this.dataList = !this.hotOrCold ? result.temperatureList : result.humidityList
      this.showPic = false
      this.$nextTick(() => {
        this.showPic = true
      })
    },
    // 切换数据曲线温湿度
    changeHotOrCold (val) {
      this.hotOrCold = val
      this.dataList = !this.hotOrCold ? this.echarsData.temperatureList : this.echarsData.humidityList
      this.showPic = false
      this.$nextTick(() => {
        this.showPic = true
      })
    },
    // 时间段切换
    selectTime (timeModel) {
      this.timeModel = timeModel
      this.monthShow = false
      this.deviceInfo()
    },
    // 历史记录
    async deviceHistory () {
      const params = {
        startTime: `${filterTime(this.nowDate)} 00:00:00`,
        deviceId: this.deviceId,
        endTime: `${filterTime(this.nowDate)} 23:59:59`,
        page: this.page,
        pageSize: this.pageSize
      }
      const { result } = await api.user.deviceHistory(params)
      this.deviceList = [...this.deviceList, ...result.rows]
      this.total = result.total
      this.page++
      setTimeout(() => {
        this.rush = true
      }, 1000)
    },
    // 历史记录动态加载
    onLoad () {
      setTimeout(() => {
        this.loading = false
        if (this.deviceList.length < this.total) {
          if (this.rush) {
            this.deviceHistory()
          }
          this.rush = false
        } else {
          this.finished = true
        }
      }, 1000)
    },
    // 日期确定
    confirmTime () {
      this.nowDate = this.currentDate
      this.dateShow = false
      this.page = 1
      this.deviceList = []
      this.deviceHistory()
    },
    goHistoryDetail (row) {
      this.$router.push({
        path: '/deviceDetails',
        query: {
          detail: JSON.stringify(row)
        }
      })
    },
    // 报警记录
    async warnLog () {
      const params = {
        roomId: this.roomId,
        page: this.policePage,
        pageSize: this.pageSize
      }
      const { result } = await api.user.warnLog(params)
      this.policeList = [...this.policeList, ...result.rows]
      this.policeTotal = result.total
      this.policePage++
      setTimeout(() => {
        this.policeRush = true
      }, 1000)
    },
    policeOnLoad () {
      setTimeout(() => {
        this.policeLoading = false
        if (this.policeList.length < this.policeTotal) {
          if (this.policeRush) {
            this.warnLog()
          }
          this.policeRush = false
        } else {
          this.policeFinished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.history {
  width: 100%;
  min-height: 100%;
  background: #f6f8fa;
  padding-top:124px ;

  .historyHead {
    width: 100%;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    padding: 17px 52px 17px 15px;

    .historyTitle {
      font-size: 14px;
      font-weight: 400;
      color: #8c9199;

      .active {
        font-size: 15px;
        font-weight: 500;
        color: #0a0d18;
        position: relative;
      }

      .active::after {
        content: '';
        position: absolute;
        top: 20px;
        left: 16px;
        width: 30px;
        height: 5px;
        background: linear-gradient(160deg, #59a2fb -30%, #3674f6 135%);
        border-radius: 4px;
        box-shadow: 0px 2px 7px 0px rgba(24, 88, 218, 0.33);
      }
    }
    .historyDate {
      margin-top: 25px;
      .dateWord {
        font-size: 14px;
        color: #0a0d18;
      }
      .dateTime {
        width: 180px;
        height: 36px;
        border: 1px solid #eeeeee;
        border-radius: 4px;
        margin-left: 12px;
        font-size: 15px;
        color: #231916;
        padding: 7px 14px 7px 20px;
        .dateIcon {
          width: 16px;
          height: 17px;
          margin-right: 8px;
        }
        .sanjiao {
          width: 11px;
          height: 7px;
          margin-left: 31px;
          /*margin-bottom: 2px;*/
        }

      }
    }
  }
  .picContent {
    padding-top: 20px;
    background: #fff;
    min-height: calc(100vh - 1px);
    .picChoose {
      width: 100%;
      padding-left: 15px;
      height: 36px;
      font-size: 14px;
      color: #0a0d18;
      .btn {
        width: 81px;
        height: 100%;
        border: 1px solid #ebebeb;
        border-radius: 4px;
        padding: 0 19px;
        margin-left: 12px;
        &.active {
          border: 2px solid #3674f6;
          box-shadow: 0px 0px 8px 0px rgba(0,35,110,0.12);
          span {
            color: #3674f6;
            font-size: 13px;

          }
        }
        img {
           width: 12px;
           height: 16px;
        }
        span {
          font-size: 13px;
          color: #231916;
        }
      }
    }
    .picEcharts {
      width: 100%;
      height: 280px;
      margin-top: 18px;
    }
    .dateFormater {
      margin-top: 24px;
      height: 36px;
      padding-left: 15px;
      color: #0a0d18;
      font-size: 14px;
      .downMenu {
        position: relative;
      }
      .timeDetail {
        margin-left: 12px;
        width: 180px;
        height: 36px;
        border: 1px solid #eeeeee;
        border-radius: 4px;
        padding:  0 19px;
        .clock {
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }
        span {
          font-size: 15px;
          color: #231916;
        }
        .sanjiao {
          text-align: right;
          flex-grow: 1;
          img {
            width: 11px;
            height: 7px;
            &.rotate {
              transform:rotate(180deg);
              -ms-transform:rotate(180deg);
              -moz-transform:rotate(180deg);
              -webkit-transform:rotate(180deg);
              -o-transform:rotate(180deg);
            }
          }

        }
      }
      .downMenuList {
        position: absolute;
        top: 36px;
        left: 12px;
        border: 1px solid #eeeeee;
        border-top: 0;
        height: 132px;
        width: 180px;
        padding-left: 42px;
        font-size: 15px;
        color: #8c9199;
        .actives {
          color: #231916;
          position: relative;

        }
        .actives::before {
          content: '';
          width: 16px;
          height: 15px;
          background: url("../../assets/images/choose.png");
          background-size: 100% 100%;
          position: absolute;
          top: 2px;
          left: -22px
        }
      }
    }
  }
  .deviceList {
    padding: 12px 15px;
    .deviceTemp {
      height: 75px;
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
      width: 100%;
      padding: 0 12px;
      margin-bottom: 12px;
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
            color: #333333;
            &.hot {
              color: #ff574e;
            }
          }
        }
        .tempIcon {
          margin-left: 5px;
          padding-top: 10px;
          img {
            width: 13px;
            height: 16px;
          }
          div {
            font-size: 12px;
            color: #aaaaaa;
          }
        }
      }
      .tempHead:first-child {
         width: 106px;
      }
      .tempTime {
        font-size: 15px;
        color: #6c758a;
        flex-grow:1;
        text-align: right;
      }
    }
    .deviceTemp:last-child {
      margin-bottom: 0;
    }
  }
  .policeList {
    padding: 14px 15px;
    min-height: calc(100vh - 54px);
    .policeDetail {
      height: 50px;
      width: 100%;
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
      padding: 0 12px;
      margin-bottom: 14px;
      div {
        font-size: 16px;
        font-weight: 400;
        color: #0f1421;
      }
      div:last-child {
        font-size: 15px;
        font-weight: 500;
        color: #6c758a;
      }
    }
    .policeDetail:last-child {
      margin-bottom: 0;
    }
  }

}
</style>
