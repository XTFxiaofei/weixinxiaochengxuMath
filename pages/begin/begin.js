//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
   if(wx.getStorageSync('student')){

   }else{
     wx.showToast({
       title: '您还没登录,测试结果不能保存!',
       icon:'none',
       duration:1300,
     })
   }

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

  },
  //开始测试
  beginttest: function(){
    wx.redirectTo({
      url: '/pages/test/test'
    })
  },
  //登录
  toLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  //注册
  toRegister: function () {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  }
})
