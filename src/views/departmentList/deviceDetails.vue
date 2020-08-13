<template>
<div class="deviceDetail">
  <div class="deviceTemp flex-y-center">
    <div class="tempHead flex">
      <div class="redTemp">
        <div class="tempTitle">温度</div>
        <div class="num">{{detail.temperature}}</div>
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
        <div class="num">{{detail.humidity}}</div>
      </div>
      <div class="tempIcon">
        <img src="@/assets/images/waterBlack.png"/>
        <div>%RH</div>
      </div>
    </div>
    <div class="tempTime">{{detail.createTime|timeSFM}}</div>
  </div>
  <div class="otherWord">其他字段</div>
  <div class="otherList">
<!--    字段信息:115附3室设备的TH11R温湿度记录仪突然温度超高,疑似会损害其他设备-->
  </div>
</div>
</template>

<script>
export default {
  name: 'deviceDetails',
  data () {
    return {
      detail: JSON.parse(this.$route.query.detail)
    }
  }
}
</script>

<style lang="scss" scoped>
.deviceDetail {
  padding: 13px 15px 0 ;
  background: #f6f8fa;
  width: 100%;
  height: 100%;
  .deviceTemp {
    height: 75px;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
    width: 100%;
    padding: 0 12px;
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
          width: 12px;
          height: 16px;
        }
        div {
          font-size: 12px;
          color: #aaaaaa;
        }
      }
    }
    .tempHead:first-child {
      margin-right: 36px;
    }
    .tempTime {
      font-size: 15px;
      color: #6c758a;
      flex-grow:1;
      text-align: right;
    }
  }
  .otherWord {
    font-size: 16px;
    color: #8c9199;
    font-weight: 400;
    margin: 18px 0 12px;
  }
  .otherList {
    padding: 11px 18px 9px 12px;
    height: 76px;
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
    font-size: 16px;
    font-weight: 400;
    color: #0f1421;
    line-height: 24px;
  }
}
</style>
