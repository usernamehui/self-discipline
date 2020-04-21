const configUrl = require('../../config');
Page({

  data: {
    gameNum : [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    gameNumIndex : 0,
    everNum: 2,
    whoNum : 1,
    whiteChecked: false,
    startBtnDis:false,
    index1: '',
    index2:"",
    index3:"",
    index4:"",
    index5:""
  },

  onLoad: function (options) {
    //转发
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  // 更改玩家数量
  bindNumChange : function(e){
    var gameNumber = this.data.gameNum[e.detail.value];

    this.setData({
      gameNumIndex : e.detail.value,
    });

    //修改平民与卧底数量
    if(gameNumber < 6){
      var whoNum = 1; 
      var everNum = gameNumber - whoNum; 
      this.setData({ whoNum: whoNum, everNum: everNum });
    } else if (gameNumber >5 && gameNumber < 9) {
      var whoNum = 2; 
      var everNum = gameNumber - whoNum; 
      this.setData({ whoNum: whoNum, everNum: everNum }); 
    }else{
      var whoNum = 3; 
      var everNum = gameNumber - whoNum; 
      this.setData({ whoNum: whoNum, everNum: everNum });
    }
    //设置关闭白板
    this.setData({ whiteChecked: false});
  },

  // 白板开关
  switchWhite : function (e){
    if (e.detail.value){
        // 开启
        if (this.data.gameNum[this.data.gameNumIndex] <= 3){
          this.setData({ whiteChecked:"" });
          wx.showToast({
            title: '玩家数量不够呢！',
            icon: 'none',
            duration: 2000
          });
        } else {
          var everNum = this.data.everNum - 1;
          this.setData({ everNum: everNum });
        } 
    }else{
        // 关闭
        var everNum = this.data.everNum + 1;
        this.setData({ everNum: everNum });
    }
  },

  // 开始游戏
  formSubmit: function (e) {
    var that = this;
    that.setData({ startBtnDis: true });

    var data = { "switchWhite": e.detail.value.switch, "whoNum": this.data.whoNum, 
                 "everNum": this.data.everNum, "gameNum": this.data.gameNum[this.data.gameNumIndex], "openid": wx.getStorageSync("openid")};

    wx.request({
      url: configUrl.startGameUrl,
      data: {params: data},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (res.data.code == 0){
          wx.setStorageSync("game", res.data.result[0]);
          wx.setStorageSync("gameNum", data);
            wx.navigateTo({
              url: '../game/game',
              success:function(){
                that.setData({ startBtnDis: false });
              }  　　　
            });
        }else{
          wx.showToast({
            title: '保存失败，请重试！',
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  }

})

