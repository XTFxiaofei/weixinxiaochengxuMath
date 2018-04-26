//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    parentname:'',
    studentlist: [],
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

    //将字符串转换成对象
    var parentdata = JSON.parse(options.parentdata);
     console.log(parentdata)
      this.setData({
        parentname: parentdata.user,
        studentlist:parentdata.students
      }) 
       

    //}

  },

})
