//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   user:'',//用户名
   score:'',//分数
   time:'',//用时
  },
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

    var studentdata = JSON.parse(options.studentdata);
    console.log(studentdata)
    this.setData({
      user: studentdata.user,
      score: studentdata.score*10,
      time: studentdata.time,
    }) 
  },

  beginttest: function () {
    wx.navigateTo({
      url: '../test/test'
    })
  },

})
