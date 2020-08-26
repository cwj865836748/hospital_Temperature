<template>
<div class="police_content">
  <div class="policeTitle">问题描述</div>
  <van-field
    v-model="addForm.question"
    type="textarea"
    placeholder="请输入您的描述"
    class="field"
  />
  <div class="policeTitle">处理方式</div>
  <van-field
    v-model="addForm.processMode"
    type="textarea"
    placeholder="处理方式"
    class="field"
  />
  <div class="policeTitle" >确认人</div>
  <van-field
    v-model="addForm.affirmRealName"
    placeholder="请输入确认人"
    class="field"
    style="height:44px"
  />
  <div class="policeTitle">确认时间</div>
  <div class="certainTime" @click="dateShow=true">{{affirmTime}}</div>
  <div class="certainBtn flex-xy-center" @click="warnAffirm">确定</div>
  <van-popup v-model="dateShow" position="bottom">
    <van-datetime-picker
      v-model="affirmTime"
      type="time"
      title="选择时间"
      :min-hour="minDate"
      :max-hour="maxDate"
      @confirm="dateShow=false"
      @cancel="dateShow=false"
    />
  </van-popup>
</div>
</template>

<script>
import api from '@/api'
import $ from 'jquery'
export default {
  name: 'confirmPolice',
  data () {
    return {
      addForm: {
        question: '',
        processMode: '',
        affirmRealName: '',
        affirmTime: '',
        warnId: this.$route.query.id
      },
      dateShow: false,
      minDate: `${new Date().getHours() - 1}`,
      maxDate: `${new Date().getHours() + 1}`,
      affirmTime: `${new Date().getHours()}:${new Date().getMinutes()}`
    }
  },
  created () {
    const Height = $('body').height()
    $(window).resize(function () {
      $('body').height(Height)
    })
  },
  methods: {
    async warnAffirm () {
      if (!this.addForm.question) {
        return this.$toast('问题描述不能为空')
      }
      if (!this.addForm.processMode) {
        return this.$toast('解决方式不能为空')
      }
      if (!this.addForm.affirmRealName) {
        return this.$toast('处理人姓名不能为空')
      }
      if (this.addForm.affirmRealName.length > 4) {
        return this.$toast('确认人姓名不能超过四个字')
      }
      this.addForm.affirmTime = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${this.affirmTime}:00`
      const { code, desc } = await api.user.warnAffirm(this.addForm)
      if (code === 200) {
        setTimeout(() => {
          this.$toast('报警成功')
        }, 1000)

        this.$router.go(-1)
      } else {
        this.$toast(desc)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.police_content {
  width: 100%;
  height: 100%;
  background: #f6f8fa;
  padding: 12px 15px;
  .policeTitle {
    font-size: 16px;
    font-weight: 400;
    color: #0f1421;
    margin-bottom: 12px;
    margin-top: 18px;
  }
  .policeTitle:first-child {
    margin-top: 0;
  }
  .field {
    height: 105px;
    border-radius: 6px;
    box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
    padding: 10px 15px 0;
    border:none;
  }
  .certainTime {
    font-size: 18px;
    font-weight: 700;
    color: #3674f6;
    border-radius: 6px;
    box-shadow: 0px 4px 8px 0px rgba(8,19,43,0.06);
    padding: 11px 15px 0;
    height: 44px;
    background: #fff;
    position: relative;
  }
  .certainTime::after {
     content: '';
    width: 22px;
    height: 22px;
    background: url("../../assets/images/time.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 11px;
    right: 15px;
  }
  .certainBtn {
    height: 44px;
    width: 100%;
    background: linear-gradient(160deg,#59a2fb -30%, #3674f6 135%);
    border-radius: 4px;
    box-shadow: 0px 2px 7px 0px rgba(24,88,218,0.33);
    color: #ffffff;
    margin-top: 56px;
  }
}
.van-cell:not(:last-child)::after {
  border:none
}
</style>
