// pages/result/result.js
Page({
  /** 
   * 页面的初始数据
   */
  data: {
    rightnumber:0,
    wrongnumber:0,
    kind: '',
    time: '00:00:00',
    //弹出的选择按钮
    tip: '',
    buttonDisabled: false,
    modalHidden: true,
    show: false,
    result:'',
  },
  //弹出的选择提示
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      show: !this.data.show,
      tip: '您点击了【确认】按钮！',
      buttonDisabled: !this.data.buttonDisabled
    })
    wx.navigateTo({
      url: '../login/login',
    })
  },
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      tip: '您点击了【取消】按钮！'
    })
  },

  toBegin: function () {
    wx.redirectTo({
      url: '../test/test',
    })
  },
  //跳转到错题页面
  toIndex: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  toSave: function () {
    if (wx.getStorageSync('student')) {
      //这里进行保存操作
      //学生登录
      wx.request({
        url: getApp().globalData.domain + '/saveScoreAndTime',
        data: {
          score: parseFloat(getApp().globalData.rightnumber),
          time: getApp().globalData.time,
          user:wx.getStorageSync('student')
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '保存成功',
            icon:'success',
            duration:1500,
          })
        }
      })
    } else {
      this.setData({
        modalHidden: !this.data.modalHidden
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    
    //导航条 颜色 动画效果
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#708090',
      animation: {
        duration: 500,
        timingFunc: 'easeIn'
      }
    })
    //页面标题
    wx.setNavigationBarTitle({
      title: '答题小王者'
    })

    //数据显示
    this.setData({
      time: getApp().globalData.time,
      rightnumber: getApp().globalData.rightnumber,
      wrongnumber: getApp().globalData.wrongnumber,
    })
    var data = this.data;

  },

  onReady: function () {

    //分数
    var score = this.data.rightnumber * 10;
    var content_text = "本次得分为：" + score;
    if (score < 70) {
      content_text += ",请更加用心点!相信自己！"
    } else if (score < 100) {
      content_text += ",还差一点点，加油！"
    } else {
      content_text += ",非常棒！"
    }
    wx.showModal({
      title: '提示',
      content: content_text,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }

})