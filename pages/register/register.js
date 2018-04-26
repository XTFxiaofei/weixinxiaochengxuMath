var app = getApp()
Page({
  data: {
    //arrayteacher: ['李老师', '林老师', '谢老师', '骆老师', '杨老师'],
    //arrayparent: ['谢家长', '林家长', '骆家长', '杨家长'],
    arrayteacher:[],
    arrayparent:[],
    teacherid: 1,
    parentid: 1,
    selectHidden: '',//是否显示选择老师家长
    items: [
      { name: 'student', value: '学生', checked: 'true' },
      { name: 'teacher', value: '老师' },
      { name: 'parent', value: '家长' },
    ],
    status: "student", //默认学生登录
  },
  //选择器,学生注册选择老师和家长
  teacherPickerChange: function (e) {
    console.log('teacher发送选择改变，携带值为', e.detail.value)
    this.setData({
      teacherid: e.detail.value
    })
    this.data.teacherid = parseInt(e.detail.value) + 1
  },
  parentPickerChange: function (e) {
    console.log('parent发送选择改变，携带值为', e.detail.value)
    this.setData({
      parentid: e.detail.value
    })
    this.data.parentid = parseInt(e.detail.value) + 1
  },
  //选择注册身份
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.status = e.detail.value
    if (e.detail.value == "teacher" || e.detail.value == "parent") {
      this.setData({ selectHidden: 'none' })
    } else {
      this.setData({ selectHidden: '' })
    }
  },
  //注册
  registerUser: function (res) {

    console.log(res)

    if (res.detail.value.user.length == 0 || res.detail.value.password.length == 0 || res.detail.value.confirmpassword.length == 0){
      wx.showToast({
        title: '请完善用户或密码!',
        icon: 'none',
        duration: 1300,
      })
    }

    else if (res.detail.value.password != res.detail.value.confirmpassword) {
      wx.showToast({
        title: '2次密码不一样!',
        icon: 'none',
        duration: 1300,
      })
    } else {
      if (res.detail.value.user.length < 2) {
        console.log("用户名长度:" + res.detail.value.user.length);
        // console.log("密码长度:" + res.detail.value.password.length);
        wx.showToast({
          title: '用户名不能少于2个字 密码不能少于6位数!',
          icon: 'none',
          duration: 1400,
        })
      } else {
        var that = this;
        if (that.data.status == "student") {
          var formData = res.detail.value
          formData.teacherid = that.data.teacherid
          formData.parentid = that.data.parentid
          //学生注册
          wx.request({
            url: getApp().globalData.domain + '/registerStudent',
            data: formData,
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              if (res.data == true) { //如果返回是true,跳转登录页面
                wx.showToast({
                  title: '注册成功',
                  icon: 'success',
                  duration: 1300,
                  success: function () {
                    setTimeout(function () {
                      //要延时执行的代码
                      wx.redirectTo({
                        url: '../login/login'
                      })
                    }, 1300) //延迟时间
                  }
                })
              } else {
                wx.showToast({
                  title: '用户名重复!失败',
                  icon: 'none',
                  duration: 1500
                });
              }
            }
          })
        } else if (that.data.status == "teacher") {
          //老师注册
          wx.request({
            url: getApp().globalData.domain + '/registerTeacher',
            data: res.detail.value,
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              if (res.data == true) { //如果返回是true,跳转登录页面
                wx.showToast({
                  title: '注册成功',
                  icon: 'success',
                  duration: 1300,
                  success: function () {
                    setTimeout(function () {
                      //要延时执行的代码
                      wx.redirectTo({
                        url: '../login/login'
                      })
                    }, 1300) //延迟时间
                  }
                })
              } else {
                wx.showToast({
                  title: '用户名重复!失败',
                  icon: 'none',
                  duration: 1500
                });
              }
            }
          })
        } else if (that.data.status == "parent") {
          console.log(that.data.statue)
          //家长注册
          wx.request({
            url: getApp().globalData.domain + '/registerParent',
            data: res.detail.value,
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              if (res.data == true) { //如果返回是true,跳转登录页面
                wx.showToast({
                  title: '注册成功',
                  icon: 'success',
                  duration: 1300,
                  success: function () {
                    setTimeout(function () {
                      //要延时执行的代码
                      wx.redirectTo({
                        url: '../login/login'
                      })
                    }, 1300) //延迟时间
                  }
                })
              } else {
                wx.showToast({
                  title: '用户名重复!失败',
                  icon: 'none',
                  duration: 1500
                });
              }
            }
          })

        }
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
    
    var that = this
    //从数据库读取老师
    wx.request({
      url: getApp().globalData.domain + '/getAllTeacher',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
        let teachers = [];
        for (var i = 0; i < res.data.length; i++) {
          teachers[i] = res.data[i].user
        }
        that.setData({
          arrayteacher:teachers,
        })
      }
    })
    //从数据库读取家长
    wx.request({
      url: getApp().globalData.domain + '/getAllParent',
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data)
        let parents = [];
        for (var j = 0; j < res.data.length; j++) {
          parents[j] = res.data[j].user
        }
        that.setData({
          arrayparent: parents,
        })
      }
    })




  },
})