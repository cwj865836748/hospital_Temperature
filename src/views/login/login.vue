<template>
<div class="app_content loginBg">
   <div style="text-align: center">
    <img src="@/assets/images/logo.png" class="logo">
   </div>
  <div class="loginForm">
     <div class="fieldInput">
       <span>手机号</span>
       <van-field   v-model="loginForm.phone" placeholder="请输入手机号" maxlength="11"/>
       <div class="iconDelete" v-show="phoneShow" @click="loginForm.phone=''">
         <img src="@/assets/images/delete.png">
       </div>
     </div>
    <div class="fieldInput">
      <span>密码</span>
      <van-field type="password"  v-model="loginForm.password" placeholder="请输入密码" maxlength="16"/>
      <div class="iconDelete" v-show="passwordShow" @click="loginForm.password=''">
        <img src="@/assets/images/delete.png">
      </div>
    </div>
    <div class="registerBtn flex-x-between">
      <span @click="$router.push('/register')">注册</span>
      <span @click="$router.push('/forgetPassword')">忘记密码？</span>
    </div>
  </div>
  <div class="loginBtn flex-xy-center" @click="login">登录</div>
  <div class="loginLogo flex-xy-center">
    <img src="@/assets/images/logo2.png"/>
  </div>
</div>
</template>

<script>
import { isPhone } from '@/utils/utils'
import $ from 'jquery'
export default {
  name: 'index',
  data () {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      phoneShow: false,
      passwordShow: false
    }
  },
  watch: {
    'loginForm.phone' (newValue, oldValue) {
      this.phoneShow = !!newValue
    },
    'loginForm.password' (newValue, oldValue) {
      this.passwordShow = !!newValue
    }
  },
  created () {
    const Height = $('body').height()
    $(window).resize(function () {
      $('body').height(Height)
    })
  },
  methods: {
    async login () {
      if (!isPhone(this.loginForm.phone)) {
        return this.$toast('请输入正确的手机号')
      }
      if (!this.loginForm.password) {
        return this.$toast('请输入正确的密码')
      }
      await this.$store.dispatch('user/loginWechatAuth', { ...this.loginForm, code: this.$store.state.user.code })
      this.$store.dispatch('user/getUserInfo').then(re => {
        if (re.result.isHighAdmin) {
          // window.location.replace('http://tah.imtda.com/#/departmentList')
          this.$router.push('/departmentList')
        } else {
          // window.location.replace('http://tah.imtda.com/#/list')
          this.$router.push('/list')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loginBg {
  box-shadow: 0px 2px 7px 0px rgba(24,88,218,0.33);
  background: linear-gradient(135deg,#68a9fe, #4f89f8);
  padding:60px 50px 0 ;
  position: relative;
  .logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0px 4px 10px 0px rgba(8,19,43,0.18);
    text-align: center;
  }
  .loginForm {
    margin-top: 35px;
    .fieldInput {
      position: relative;
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
    .fieldInput:first-child {
      margin-bottom: 23px;
    }
    .fieldInput:nth-child(2) {
      margin-bottom: 12px;
    }
    .registerBtn {
      font-size: 13px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #fff;
    }
  }
  .loginBtn {
    width: 100%;
    height: 44px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 2px 7px 0px rgba(24,88,218,0.33);
    color: #3c7cf7;
    margin-top: 51px;
  }
  .loginLogo {
    height: 34px;
    width: 100%;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
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
    border-bottom: 1px solid #fff;
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
