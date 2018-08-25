App({
  onLaunch: function() { 
    // Do something initial when launch.
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          var aHeader = {
            'content-type': 'application/json'
          }
          this.acHttpGet("acGetOpenId", res, aHeader, "GET", function (aRes) {
            console.log(aRes.datas)
            //获取应用实例
            const app = getApp()
            app.globalData.openId = aRes.datas
            // app.getUserInfo(function (userInfo) {
            //   userInfo.openId = this.globalData.openId
            //   var path = this.Datas.Path.Token + ',' + this.Datas.Path.addToken
            //   this.acHttp("acGetExecute", path, userInfo, "GET", function (aRes) {
            //   })   

            // });
            //   wx.getUserInfo({
            //     success: res => {
            //       // 可以将 res 发送给后台解码出 unionId
            //       this.globalData.userInfo = res.userInfo
            //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            //       // 所以此处加入 callback 以防止这种情况
            //       if (this.userInfoReadyCallback) {
            //         this.userInfoReadyCallback(res)
            //       }
            //     }
            //   })
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.showToast({
            title: '已经授权',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          wx.redirectTo({
            url: '../posters/posters'
          })
        } else {
          // wx.showToast({
          //   title: '未授权',
          //   icon: 'false',
          //   duration: 1000,
          //   mask: true
          // })
        }
      }
    })
  },
  onShow: function() {
      // Do something when show.
  },
  onHide: function() {
      // Do something when hide.
  },
  globalData: {
      g_isMusicPlayed:false,
      g_currentMusicIndex:null,
      userInfo: null,
      openId: null,
      chain: {},
      tag:null
  },
  getUserInfo: function (cb) {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        success: function (res) {
          const app = getApp()
          app.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(app.globalData.userInfo)
        }
      })
    }
  },
  /**
   * 数据
   */
  Datas: {
    // http://111.231.87.15:2018/
    // http://192.168.101.113:2018/
    // https://mini.merchain.cn/
    reqUrl: "https://mini.merchain.cn/",
    /**
    * sql语句的路径
    */
    Path: {
      addToken: "user/AddToken.txt",
      addUser: "user/AddUser.txt",
      Token: "user/Token.txt",
    },
    /**
     * 请求的url
     */
    Url: {
      flights: "flights",
      airline_tickets: "search-tickets",
    },
  },
  /**
   * 发起网络请求
   */
  acHttp: function (url_input, path_input, data_input, method_input, callback) {
    var aUrl = this.Datas.reqUrl + url_input
    var aData = {
      Path: path_input,
      Ps: data_input,
    }
    wx.request({
      url: aUrl, //仅为示例，并非真实的接口地址
      data: aData,   //data:::{ x: '', y: '' };;最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
      method: method_input,    //默认GET
      success: function (res) {
        //console.log(res.data)
        var receiveData = res.data
        typeof callback == "function" && callback(receiveData);
      }
    })
  },
  acHttpGet: function (url_input, data_input, header_input, method_input, callback) {
    var aUrl = this.Datas.reqUrl + url_input
    wx.request({
      url: aUrl, //仅为示例，并非真实的接口地址
      data: data_input,   //data:::{ x: '', y: '' };;最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
      method: method_input,    //默认GET
      header: header_input,
      success: function (res) {
        //console.log(res.data)
        var receiveData = res.data
        typeof callback == "function" && callback(receiveData);
      }
    })
  },
})