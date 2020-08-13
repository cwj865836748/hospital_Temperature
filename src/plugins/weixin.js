import {WX_APPID} from '@/config/global.js';
import {getQueryString,delParams} from '@/config/function'
import Vue from 'vue';
// import {Ajax, Cookies} from 'util';
// import store from 'store';

class WeiXin {

  constructor() {
    this.bInit = false; //是否初始化
  }

  login(silent) {

    let oldCode = getQueryString('code');
    let URL = '';
    if (oldCode) {
        URL = delParams(['code','state']);  //删除地址中的指定参数
    } else {
      URL = window.location.href;
    }

    let redirectUri = encodeURIComponent(URL)

    location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + WX_APPID+"&redirect_uri="+ redirectUri +"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
    // if(silent){
    //   let redirectUri = encodeURIComponent('https://member.tutwo.com/weixin/oauthBaseTranfer.html?appid='+WX_APPID+'&transfer_url='+URL);
    //   location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + WX_APPID+"&redirect_uri="+ redirectUri +"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
    // }else{
    //   /**用户确认获取用户信息 */
    //   let redirectUri = encodeURIComponent('https://member.tutwo.com/weixin/oauthUserinfoTranfer.html?appid='+WX_APPID+'&transfer_url='+URL);
    //   location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + WX_APPID+"&redirect_uri="+ redirectUri +"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
    // }
  } //
  initConfig() {
    Ajax({
      url: "/weixin/config",
      data: {
        'url': location.href
      },
      success: (response) => {
        this.initWechat(response);
      }
    });
  }

  restConfig(shareConfig) {
    Ajax({
      url: "/weixin/config",
      data: {
        'url': location.protocol + "//" + location.host + store.state.router.curRoute
      },
      success: (response) => {
        this.initWechat(response, shareConfig);
      }
    });
  } //初始化微信
  initWechat(response, shareConfig) {
    Vue.wechat.config({
      jsApiList: ['chooseWXPay', 'openLocation', 'getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'getNetworkType'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: "wxf8b4f85f3a794e77", // 必填，公众号的唯一标识
      timestamp: "1528276899", // 必填，生成签名的时间戳
      nonceStr: "8CB0gpQqPaiVWv6P", // 必填，生成签名的随机串
      signature: "25da58d4c71a1bfc4ff4703a288ebac674e0a40a",// 必填，签名，见附录1
    });
    Vue.wechat.ready(() => {
      console.log(1212)
      this.bInit = true;
      //   	wx.getLocation({
      //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //     success: function (res) {
      //         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //         store.dispatch('setLocationInfo', {lat:latitude,lng:longitude});
      //     }
      // });
      // this.shareRing({
      //         title: shareConfig&&shareConfig.title?shareConfig.title:"花生计划", // 分享标题
      //         link: shareConfig&&shareConfig.link?shareConfig.link:location.protocol+"//"+location.host +store.state.router.curRoute, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //         imgUrl: shareConfig&&shareConfig.imgUrl?shareConfig.imgUrl:"/static/images/favicon.ico" // 分享图标
      // });
      // this.shareFriend({
      //     title: shareConfig&&shareConfig.title?shareConfig.title:"花生计划", // 分享标题
      //     desc: shareConfig&&shareConfig.desc?shareConfig.desc:"", // 分享描述
      //     link: shareConfig&&shareConfig.link?shareConfig.link:location.protocol+"//"+location.host +store.state.router.curRoute, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //     imgUrl: shareConfig&&shareConfig.imgUrl?shareConfig.imgUrl:"/static/images/favicon.ico" // 分享图标

      // });
      //   wx.getNetworkType({
      //       success: function (data) {

      //       },
      // fail: function (res) {
      //    Vue.$vux.toast.show({
      //    text: '网络状态不稳定',
      //    type:"text"
      //  })
      // }
      //   });

    })
  }

  restReday(shareConfig) {
    wx.ready(() => {
      //   	wx.getLocation({
      //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //     success: function (res) {
      //         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //         store.dispatch('setLocationInfo', {lat:latitude,lng:longitude});
      //     }
      // });
      this.shareRing({
        title: shareConfig && shareConfig.title ? shareConfig.title : "花生计划", // 分享标题
        link: shareConfig && shareConfig.link ? shareConfig.link : location.protocol + "//" + location.host + store.state.router.curRoute, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareConfig && shareConfig.imgUrl ? shareConfig.imgUrl : "/static/images/favicon.ico" // 分享图标
      });
      this.shareFriend({
        title: shareConfig && shareConfig.title ? shareConfig.title : "花生计划", // 分享标题
        desc: shareConfig && shareConfig.desc ? shareConfig.desc : "", // 分享描述
        link: shareConfig && shareConfig.link ? shareConfig.link : location.protocol + "//" + location.host + store.state.router.curRoute, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareConfig && shareConfig.imgUrl ? shareConfig.imgUrl : "/static/images/favicon.ico" // 分享图标
      });


      wx.getNetworkType({
        success: function (data) {

        },
        fail: function (res) {
          Vue.$vux.toast.show({
            text: '网络状态不稳定',
            type: "text"
          })
        }
      });

    })
  }

  WXpay(config, sucCallBack, errCallBack) {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId": config.appId,
        "timeStamp": config.timeStamp,
        "nonceStr": config.nonceStr,
        "package": config.package,
        "signType": config.signType,
        "paySign": config.paySign,
      },
      function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          sucCallBack && sucCallBack()
        }
        else {
          errCallBack && errCallBack();
        }
      }
    );
    //       wx.chooseWXPay({
    //     timestamp: config.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    //     nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
    //     package: config['package'], // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
    //     signType: config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    //     paySign: config.paySign, // 支付签名
    //     success: (res)=>{
    //     	sucCallBack&&sucCallBack();
    //     },
    //     error: (res)=>{
    //     	errCallBack&&errCallBack(res);
    //     },
    //     cancel:(res)=>{
    //     	errCallBack&&errCallBack(res);
    //     }
    // });
  }

  /**
   * [getLocation 获取坐标]
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // store.dispatch('setLocationInfo', {lat: latitude, lng: longitude});
          resolve(res);
        }
      });
    })
  }

  /**
   * [shareRing 分享微信朋友圈]
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  shareRing(config) {
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: config.title, // 分享标题
      link: config.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: config.imgUrl // 分享图标
    });
  }

  /**
   * [shareFriend 分享微信好友]
   * @param  {[type]} config [description]
   * @return {[type]}        [description]
   */
  shareFriend(config) {
    //分享给好友
    wx.onMenuShareAppMessage({
      title: config.title, // 分享标题
      desc: config.desc, // 分享描述
      link: config.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: config.imgUrl // 分享图标
    });
  }

  //扫二维码
  scanQrcode(callback) {
    Vue.wechat.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        callback && callback(result);
      }
    });
  }

  /**
   * 打开地图
   * @param config
   */
  openLocation(config) {
    wx.openLocation({
      latitude: config.latitude,
      longitude: config.longitude,
      name: config.name,
      address: config.address,
      scale: 12,
      infoUrl: ''
    });
  }

  weixinAddContact(name) {
    WeixinJSBridge.invoke("addContact", {webtype: "1", username: name}, function (e) {
      WeixinJSBridge.log(e.err_msg);
      //e.err_msg:add_contact:added 已经添加
      //e.err_msg:add_contact:cancel 取消添加
      //e.err_msg:add_contact:ok 添加成功
      if (e.err_msg == 'add_contact:added' || e.err_msg == 'add_contact:ok') {
        //关注成功，或者已经关注过
      }
    })
  }
}

export let WeiXinTools = new WeiXin();
