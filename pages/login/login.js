var app = getApp()
Page({
  data: {
    items: [ 
      { name: 'student', value: '学生', checked: 'true' },
      { name: 'teacher', value: '老师' },
      { name: 'parent', value: '家长' },
    ],
    status:"student", //默认学生登录
  },
  //选择登录身份
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.status = e.detail.value
  },
  //去注册
  toRegister: function () { //点击按钮跳转到注册页面
    wx.navigateTo({
      url: '../register/register',
    })
  },

  //登录账号
  loginUser: function (res) {
    if (res.detail.value.user.length <1 || res.detail.value.password < 1) {
      wx.showToast({
        title: '用户名或密码不能为空!',
        icon: 'none',
        duration: 1400,
      })
    } else {
      var that = this;
      let username = res.detail.value.user
      if (that.data.status =="student") {
        //学生登录
        wx.request({
          url: getApp().globalData.domain + '/loginStudent',
          data: res.detail.value,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) { 
            //console.log(res.data)
            if (res.data) {
              var studentdata = JSON.stringify(res.data);
              wx.navigateTo({
                url: '../viewstudent/viewstudent?studentdata='+studentdata,
              })
              wx.setStorageSync('student', username)
            } else {
              wx.showToast({
                title: '账号或密码错误!',
                icon: 'none',
                duration: 1500,
              })
            }
          }
        })
      } else if (that.data.status =="teacher") {
        //老师登录
        wx.request({
          url: getApp().globalData.domain + '/loginTeacher',
          data: res.detail.value,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //console.log(res.data)
            if (res.data) {
              var teacherdata = JSON.stringify(res.data);
              wx.navigateTo({
                url: '../viewteacher/viewteacher?teacherdata='+teacherdata,
              })
              wx.setStorageSync('teacher', username)
            } else {
              wx.showToast({
                title: '账号或密码错误!',
                icon: 'none',
                duration: 1500,
              })
            }
          }
        })
      } else if (that.data.status =="parent") {


        //家长登录
        wx.request({
          url: getApp().globalData.domain + '/loginParent',
          data: res.detail.value,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //console.log(res.data)
            if (res.data) {
              var parentdata = JSON.stringify(res.data);
              wx.redirectTo({
                url: '../viewparent/viewparent?parentdata='+parentdata,
              })
              wx.setStorageSync('parent', username)
            } else {
              wx.showToast({
                title: '账号或密码错误!',
                icon: 'none',
                duration: 1500,
              })
            }
          }
        })
      }


    }
  },
  onLoad: function () {

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
    
    var value = wx.getStorageSync('student')
    if (value) {
      wx.switchTab({
        url: '../begin/begin',
      })
    }
  },
})
