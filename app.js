const openIdUrl = require('./config').openIdUrl

App({
  onLaunch: function () {
    console.log('寻找卧底 小程序启动');
    // 获取openid
    this.getUserOpenId(function(args,openid){
      wx.setStorageSync("openid", openid);
    });
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  globalData: {
    hasLogin: false,
    openid: null
  },
  // lazy loading openid
  getUserOpenId: function(callback) {
    var self = this
    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          console.log("获取微信code：",data);
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function(res) {
              if (res.data.errmsg != undefined)
                console.log('拉取openid错误:', res.data.errmsg);
              else
                console.log('拉取openid成功:', res.data.openid);
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})
