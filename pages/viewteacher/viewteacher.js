//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    teachername: '',
    studentlist: '',
    studentuser:'',
    studentscore:'',
    studenttime:'',
  },

  //加载数据
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

    var teacherdata = JSON.parse(options.teacherdata);
    console.log(teacherdata)
    this.setData({
      teachername: teacherdata.user,
      studentlist: teacherdata.students
    })
  },

  //输入姓名搜索
  searchStudent: function (e) {
    var that = this

    that.setData({
      studentuser: e.detail.value.user
    })

    wx.request({
      url: getApp().globalData.domain + '/getStudentByUser',
      data: {
        user: e.detail.value.user
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)

        if(res.data){
          that.setData({
            studentuser: res.data.user,
            studentscore: res.data.score,
            studenttime: res.data.time,
          })
        }else{
          wx.showToast({
            title: '未发现该学生',
            icon: 'none',
            duration: 1500
          })
          that.setData({
            studentuser: '',
            studentscore: '',
            studenttime: '',
          })
        }
      
        // that.setData({
        //   studentuser:res.data.user,
        //   studentscore:res.data.score,
        //   studenttime:res.data.time,
        // })
      },
    })
  }

})
