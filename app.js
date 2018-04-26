//app.js
App({
  onLaunch: function () {

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
  globalData: {
    userInfo: null,
    question: [],
    rightnumber: 0,
    wrongnumber: 0,
    wrongQuestion:[],
    wrongQuestionChoose: [],
    mychoice:[],
    domain:'https://www.tengfeistudio.cn',//域名
  },
  
})