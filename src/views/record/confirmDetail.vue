<template>
  <div class="policeRecordDetail">
    <div class="policeList">
      <div class="policeTitle">{{`翔安医院/${detailObj.departmentName}/${detailObj.roomName}/${detailObj.deviceName}`}}</div>
      <div class="policeStatus flex-x-between">
        <div class="policeType flex-y-between">
          <div class="title">{{detailObj.warnType}}</div>
          <div class="type">报警类型</div>
        </div>
        <div class="policeType flex-y-between">
          <div v-if="detailObj.createTime" class="time" style="font-size: 12px;margin-bottom: 4px;">{{detailObj.createTime|timeSFM1}}/</div>
          <div class="time" style="margin-bottom: 4px;">{{detailObj.createTime|timeSFM}}</div>
          <div class="type">发生时间</div>
        </div>
        <div class="policeType flex-y-between">
          <div v-if="detailObj.affirmTime" style="font-size: 12px;margin-bottom: 4px;">{{detailObj.affirmTime|timeSFM1}}/</div>
          <div  style="margin-bottom: 4px;">{{detailObj.affirmTime|timeSFM}}</div>
          <div class="type">确定时间</div>
        </div>
        <div class="policeType flex-y-between">
          <div >{{detailObj.affirmRealName?detailObj.affirmRealName:'无'}}</div>
          <div class="type">确认人</div>
        </div>
      </div>
    </div>
    <div class="policeName">问题描述</div>
    <div class="policeContent flex-y-center">{{detailObj.question}}</div>
    <div class="policeName">处理方式</div>
    <div class="policeContent flex-y-center">{{detailObj.processMode}}</div>
  </div>
</template>

<script>
export default {
  name: 'confirmDetail',
  data () {
    return {
      detailObj: JSON.parse(this.$route.query.detail)
    }
  }
}
</script>

<style lang="scss" scoped>
  .policeRecordDetail {
    width: 100%;
    height: 100%;
    background: #f6f8fa;
    padding: 12px 15px;
    .policeList {
      width: 100%;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
      padding: 16px 12px 20px;

      .policeTitle {
        color: #0f1421;
        margin-bottom: 25px;
      }
      .policeStatus {
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
    }
    .policeName {
      font-size: 16px;
      font-weight: 400;
      color: #8c9199;
      margin: 18px 0 12px;
    }
    .policeContent {
      background: #ffffff;
      border-radius: 6px;
      box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
      height: 76px;
      padding: 11px 18px 9px 12px;
    }
  }
</style>
