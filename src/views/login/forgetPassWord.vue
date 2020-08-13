<template>
  <div class="app_content loginBg">
    <div class="logoTitle">忘记密码</div>
    <div class="loginForm">
      <div class="fieldInput">
        <span>手机号</span>
        <van-field :style="{borderBottom:styleBorder.phoneStyle}"   v-model="loginForm.phone" placeholder="请输入手机号" maxlength="11" @focus="focusStyle(1)"  @blur="blurStyle(1)"/>
        <div class="iconDelete" v-show="phoneShow" @click="loginForm.phone=''">
          <img src="@/assets/images/delete.png">
        </div>
      </div>
      <div class="flex-x-between">
      <div class="fieldInput" style="width: 170px">
        <span>验证码</span>
        <van-field :style="{borderBottom:styleBorder.codeStyle}"  v-model="loginForm.code" placeholder="请输入验证码" maxlength="6" @focus="focusStyle(2)" @blur="blurStyle(2)"/>
        <div class="iconDelete" v-show="codeShow" @click="loginForm.code=''">
          <img src="@/assets/images/delete.png">
        </div>
      </div>
        <div class="fieldTime" ref="fieldTime" @click="getCode" :style="{fontWeight:typeof timeDate==='number'?600:500,fontSize:typeof timeDate==='number'?9:14}">{{typeof timeDate==='number'?`重新发送(${timeDate}s)`:timeDate}}</div>
      </div>
      <div class="fieldInput">
        <span>密码</span>
        <van-field type="password" :style="{borderBottom:styleBorder.passwordStyle}"  v-model="loginForm.newPassword" placeholder="请输入密码" maxlength="16" @focus="focusStyle(3)"  @blur="blurStyle(3)"/>
        <div class="iconDelete" v-show="newPasswordShow" @click="loginForm.newPassword=''">
          <img src="@/assets/images/delete.png">
        </div>
      </div>
    </div>
    <div class="loginBtn flex-xy-center" @click="forgetPassword">完成</div>
  </div>
</template>

<script>
import api from '@/api'
import { isPhone } from '@/utils/utils'
export default {
  name: 'index',
  data () {
    return {
      loginForm: {
        phone: '',
        newPassword: '',
        code: ''
      },
      phoneShow: false,
      newPasswordShow: false,
      codeShow: false,
      timeDate: '获取验证码',
      initNum: null,
      styleBorder: {
        phoneStyle: '',
        codeStyle: '',
        passwordStyle: ''
      }
    }
  },
  watch: {
    'loginForm.phone' (newValue, oldValue) {
      this.phoneShow = !!newValue
    },
    'loginForm.newPassword' (newValue, oldValue) {
      this.newPasswordShow = !!newValue
    },
    'loginForm.code' (newValue, oldValue) {
      this.codeShow = !!newValue
    }
  },
  created () {

  },
  beforeDestroy () {
    if (this.initNum) {
      clearInterval(this.initNum)
      this.initNum = null
    }
  },
  methods: {
    async getCode () {
      if (this.initNum) {
        return
      }
      if (!isPhone(this.loginForm.phone)) {
        return this.$toast('请输入正确的手机号')
      }
      const { code, desc } = await api.user.changeCode({ phone: this.loginForm.phone })
      if (code !== 200) {
        return this.$toast(desc)
      }
      this.timeDate = 60
      this.$refs.fieldTime.style.borderBottom = '1px solid rgba(255, 255, 255, 0.7)'
      this.initNum = setInterval(() => {
        if (this.timeDate > 0) {
          this.timeDate--
        } else {
          this.$refs.fieldTime.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)'
          this.timeDate = '获取验证码'
          clearInterval(this.initNum)
          this.initNum = null
        }
      }, 1000)
    },
    async forgetPassword () {
      if (!isPhone(this.loginForm.phone)) {
        return this.$toast('请输入正确的手机号')
      }
      if (this.loginForm.newPassword.length < 6 || this.loginForm.newPassword.length > 10) {
        return this.$toast('请输入6位到10位的密码')
      }
      if (!this.loginForm.code) {
        return this.$toast('请输入验证码')
      }
      const { code, desc } = await api.user.resetPassword(this.loginForm)
      if (code === 200) {
        this.$toast(desc)
        this.$router.push('/')
      } else {
        this.$toast(desc)
      }
    },
    focusStyle (form) {
      const color = '1px solid rgba(255, 255, 255, 0.7)'
      if (form === 1) {
        this.styleBorder.phoneStyle = color
      } else if (form === 2) {
        this.styleBorder.codeStyle = color
      } else {
        this.styleBorder.passwordStyle = color
      }
    },
    blurStyle (form) {
      const color = '1px solid rgba(255, 255, 255, 0.2)'
      if (form === 1) {
        this.styleBorder.phoneStyle = color
      } else if (form === 2) {
        this.styleBorder.codeStyle = color
      } else {
        this.styleBorder.passwordStyle = color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .loginBg {
    box-shadow: 0px 2px 7px 0px rgba(24,88,218,0.33);
    background: linear-gradient(135deg,#68a9fe, #4f89f8);
    padding:49px 50px 0 ;
    .logoTitle {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;

    }
    .loginForm {
      margin-top: 49px;
      .fieldInput {
        position: relative;
        margin-bottom: 23px;
        span {
          font-size: 15px;
          color: rgba(255,255,255,.6);
        }
        .iconDelete {
          width: 8px;
          height: 8px;
          position: absolute;
          right: 0;
          top: 34px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .fieldInput:last-child {
        margin-bottom: 0;
      }
      .fieldTime {
        height: 100%;
        width: 80px;
        font-size: 12px;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        color: #ffffff;
        padding: 35px 0 15px;
        text-align: center;
      }
    }
    .loginBtn {
      width: 100%;
      height: 44px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 2px 7px 0px rgba(24,88,218,0.33);
      color: #3c7cf7;
      margin-top: 81px;
    }
    .loginLogo {
      margin-top: 92px;
      height: 34px;
      width: 100%;
      img {
        width: 194px;
        height: 100%;
      }
    }
    .van-cell {
      font-size: 17px;
      background: transparent;
      margin-top: 12px;
      box-sizing: content-box;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .van-cell:not(:last-child)::after {
      border: none;
    }
    /deep/.van-field__control {
      color: #fff !important;
      &::-webkit-input-placeholder {
        color: #fff;
      }
      &::-moz-placeholder {
        color: #fff;
      }
      &:-moz-placeholder {
        color: #fff;
      }
      &:-ms-input-placeholder {
        color: #fff;
      }
    }
  }
</style>
