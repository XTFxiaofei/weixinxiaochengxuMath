//计时器
function timing(that) {
  var seconds = that.data.seconds
  if (seconds > 21599) {
    that.setData({
      time: '6小时，不想继续了'
    });
    return;
  }
  setTimeout(function () {
    that.setData({
      seconds: seconds + 1
    });
    timing(that);
  }
    , 1000)
  formatSeconds(that)
}
function formatSeconds(that) {
  var mins = 0, hours = 0, seconds = that.data.seconds, time = ''
  if (seconds < 60) {

  } else if (seconds < 3600) {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
  } else {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
    hours = parseInt(mins / 60)
    mins = mins % 60
  }
  that.setData({
    time: formatTime(hours) + ':' + formatTime(mins) + ':' + formatTime(seconds)
  });
}
function formatTime(num) {
  if (num < 10)
    return '0' + num
  else
    return num + ''
}


var progressNum = 0;//进度条
var i = 0;
Page({
  data: {
    per: 0,
    clear: false, 
    index: 0, 
    title:[],
    titleimg:[],
    choice:[],
    radios: ['a', 'b', 'c', 'd', 'e', 'f'],
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    // list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    //       10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    //       20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    //       30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    //       40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    //       50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    //       60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    //       70, 71, 72, 73, 74, 75, 76, 77, 78, 79,],
    seconds: 0,
    img: "",
    images: {},

  },
  //从服务器得到数据
  loadData: function () {
    var that=this
    wx.request({
      url: getApp().globalData.domain + '/getTenQuestion',
      data: {},
      header: {
        method: 'GET',
        'Content-Type': 'application/json'
      },
      success: function (res) {
        let titles=[]
        let titlesimg=[]
        let choices=[]
        console.log(res.data) //服务器返回得数据
        for (var k = 0; k < res.data.length; k++) {
          //console.log(res.data[k].describes) //问题描述
          //console.log(res.data[k].answers)  //选项对象
          titles[k]= res.data[k].describes
          titlesimg[k]=res.data[k].describesimg
          choices[k]= res.data[k].answers[0]
        }
        wx.setStorageSync('titleimg', titlesimg)
        wx.setStorageSync('title', titles)
        wx.setStorageSync('choice', choices)
       that.setData({
         title: titles,
         titleimg:titlesimg,
         choice: choices,
       })
      }
    })
  },
  //自适应显示图片
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  //选项自适应显示图片
  imageLoad2: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width/$height;    //图片的真实宽高比例
      let ratio2=$width/718;
    var viewHeight = e.detail.height,          //计算的高度值
      viewWidth = ($width*$height)/viewHeight;     //设置图片显示宽度，左右留有16rpx边距
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  //返回一个随机数
  randSort: function () {
    return Math.random() > 0.5 ? 1 : -1;
    //return ;
  },
  //打乱题目数组
  setList: function () {
    var newList = this.data.list.sort(this.randSort);
    this.setData({
      list: newList
    });
  },
  //打乱选项数组
  setRadios: function () {
    var newRadios = this.data.radios.sort(this.randSort);
    this.setData({
      radios: newRadios
    });
  },
  //选项按钮事件
  select: function (e) {
    //whichq是表示当前题数
    var whichq = e.currentTarget.dataset.whichquestion
    console.log("第几题:" + whichq)//第几题

    //chooseAnswer是表示正确答案
    var chooseAnswer = this.data.choice[whichq].solution
    console.log("该题的答案:" + this.data.choice[whichq].solution)//答案


    //tmp是表示选择的选项
    var tmp = e.detail.value;
    console.log("选择的选项:"+tmp)//选择的选项
    if (chooseAnswer == tmp) {
      //this.data.rightnumber++;
      getApp().globalData.rightnumber = getApp().globalData.rightnumber + 1;
      wx.showToast({
        title: '回答正确',
        icon: 'success',
        duration: 1000
      })
    } else {
      //this.data.wrongnumber++;
      getApp().globalData.wrongnumber = getApp().globalData.wrongnumber + 1;
      wx.showToast({
        title: '回答错误',
        icon: 'none',
        duration: 1000
      })
      //记录错题
      getApp().globalData.wrongQuestion[i] = whichq;
      for (var j = 0; j < (i + 1); j++) {
        console.log("for:" + getApp().globalData.wrongQuestion[j])
      }

      //记录错题选项
      getApp().globalData.wrongQuestionChoose[i++] = tmp;
      for (var j = 0; j < i; j++) {
        console.log("for:" + getApp().globalData.wrongQuestionChoose[j])
      }

    }
    
    // 进度条
    progressNum = progressNum + 1;
    this.setData({ per: progressNum })

    console.log("选对的个数:" + getApp().globalData.rightnumber)

    //延时操作
    var that = this;
    setTimeout(function () {
      //要延时执行的代码
      if (that.data.index < 9) {
        that.setRadios();
        that.setData({
          index: that.data.index + 1,
          clear: false
        });
      } else {
        getApp().globalData.time=that.data.time;
        that.submit();
      }  
    }, 1000) //延迟时间 这里是1秒
   
  },

  //提交结果
  submit: function () {
    wx.redirectTo({
      url: '/pages/result/result',
    })
  },

  //返回主页面
  image_cancel: function () {
    wx.redirectTo({
      url: '/pages/begin/begin',
    })
  },

  //重新做题
  image_again: function () {
    wx.redirectTo({
      url: '/pages/test/test',
    })
  },

  onLoad: function () {

    //导航条 颜色 动画效果
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#708090',
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
    //页面标题
    wx.setNavigationBarTitle({
      title: '答题小王者'
    })

    this.loadData();
    //清空wrongQuestion以及wrongQuestionChoose
    getApp().globalData.wrongQuestion = [];
    getApp().globalData.wrongQuestionChoose = [];

    getApp().globalData.wrongnumber = 0;
    getApp().globalData.rightnumber = 0;
    i = 0;
    console.log('从新开始：' + getApp().globalData.wrongQuestion)
    //计时器开始
    timing(this);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setList();
    this.setRadios();
    this.setData({
      rightnumber: 0,
      wrongnumber: 0
    });
  }

})