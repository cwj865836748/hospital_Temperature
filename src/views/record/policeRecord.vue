<template>
  <div class="policeRecord">
    <van-pull-refresh v-if="policeList.length" v-model="refreshing" @refresh="onRefresh" style="height: 100%;">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="policeList" v-for="(item,index) in policeList" :key="index">
        <div class="policeTitle">{{`${item.hospitalName}/${item.departmentName}/${item.roomName}/${item.deviceName}`}}</div>
        <div class="policeStatus flex-x-between">
          <div class="policeType flex-y-between">
            <div class="title">{{item.warnType}}</div>
            <div class="type">报警类型</div>
          </div>
          <div class="policeType flex-y-between">
            <div class="time">{{item.createTime|timeSFM}}</div>
            <div class="type">发生时间</div>
          </div>
          <div class="policeType flex-y-between">
            <div >{{item.affirmTime|timeSFM}}</div>
            <div class="type">确定时间</div>
          </div>
          <div class="policeType flex-y-between">
            <div >{{item.affirmRealName?item.affirmRealName:'无'}}</div>
            <div class="type">确认人</div>
          </div>
        </div>
        <div :class="['policeBtn  flex-xy-center',item.status?'detailBtn':'']" @click="goPoliceStatus(item)">{{item.status?'查看详情':'确认报警'}}</div>
      </div>
    </van-list>
    </van-pull-refresh>
    <div v-else>
      <van-empty description="暂无数据" />
    </div>
    <tabbar ref="tabbar"/>
  </div>
</template>

<script>
import api from '@/api'
import tabbar from '@/components/tabbar'

export default {
  name: 'policeRecord',
  data () {
    return {
      policeList: [],
      loading: false,
      finished: false,
      total: 0,
      page: 1,
      pageSize: 10,
      rush: false,
      refreshing: false
    }
  },
  components: {
    tabbar
  },
  created () {
    this.getList()
  },
  mounted () {
    this.$refs.tabbar.active = 1
  },
  methods: {
    async getList () {
      const params = {
        page: this.page,
        pageSize: this.pageSize
      }
      const { result } = await api.user.warnLog(params)
      this.policeList = [...this.policeList, ...result.rows]
      this.total = result.total
      this.page++
      setTimeout(() => {
        this.rush = true
      }, 1000)
    },
    onRefresh () {
      this.refreshing = false
      this.policeList = []
      this.page = 1
      this.finished = false
      this.getList()
    },
    onLoad () {
      setTimeout(() => {
        this.loading = false
        if (this.policeList.length < this.total) {
          if (this.rush) {
            this.getList()
          }
          this.rush = false
        } else {
          this.finished = true
        }
      }, 1000)
    },
    goPoliceStatus (item) {
      if (item.status) {
        this.$router.push({
          path: '/confirmDetail',
          query: {
            detail: JSON.stringify(item)
          }
        })
      } else {
        this.$router.push({
          path: '/confirmPolice',
          query: {
            id: item.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .policeRecord {
    width: 100%;
    height: 100%;
    background: #f6f8fa;
    padding: 12px 15px;
    .policeList {
      height: 187px;
      width: 100%;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
      padding: 16px 12px;
      margin-bottom: 12px;
      &.detail {
        border: 2px solid #e8e8e9;
        background: #f6f8fa;
        box-shadow:0 0 0 0;
      }
      .policeTitle {
        color: #0f1421;
        margin-bottom: 25px;
      }
      .policeStatus {
        margin-bottom: 22px;
        .policeType {
          font-size: 15px;
          color: #0f1421;
          text-align: center;
          .title {
            font-size: 16px;
            color: #ff574e;
            margin-bottom: 8px;
          }
          .type {
            font-size: 12px;
            font-weight: 400;
            color: #8c9199;
          }
          .time {
            color: #6c758a;
          }
        }

      }
      .policeBtn {

        width: 100%;
        height: 40px;
        background: linear-gradient(160deg,#59a2fb -30%, #3674f6 135%);
        border-radius: 4px;
        box-shadow: 0px 2px 7px 0px rgba(24,88,218,0.33);
        font-size: 15px;
        color: #ffffff;
        &.detailBtn {
          background: linear-gradient(160deg,#babfcb -30%, #959ba9 104%);
          box-shadow: 0px 2px 7px 0px rgba(8,19,43,0.12);
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
