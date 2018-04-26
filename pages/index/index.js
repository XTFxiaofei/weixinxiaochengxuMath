Page({
  data: {
    clear: false,
    index: 0,
    wrongq: 0,
    wrongqc: '',
    rightqc: '',
    wrongqcimg: '',
    rightqcimg: '',
    title: [],
    titleimg:[],
    choice: [],
    seconds: 0,
    time: '00:00:00',
    img: "",
    images: {},
    i: 0,
    next: "下一题",
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
      ratio = $width / $height;    //图片的真实宽高比例
    let ratio2 = $width / 718;
    var viewHeight = e.detail.height,          //计算的高度值
      viewWidth = ($width * $height) / viewHeight;     //设置图片显示宽度，左右留有16rpx边距
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

  select: function (e) {
    if (this.data.index < (getApp().globalData.wrongQuestion.length - 1)) {
      var that = this;
      that.setData({
        index: that.data.index + 1
      })
      that.setData({
        wrongq: getApp().globalData.wrongQuestion[that.data.index],
        clear: false,
      })

      that.setData({
        wrongqc: this.data.choice[this.data.wrongq][getApp().globalData.wrongQuestionChoose[this.data.index]],
        rightqc: this.data.choice[this.data.wrongq][this.data.choice[this.data.wrongq].solution],
        //图片选项
        wrongqcimg: this.data.choice[this.data.wrongq][getApp().globalData.wrongQuestionChoose[this.data.index]+"img"],
        rightqcimg: this.data.choice[this.data.wrongq][this.data.choice[this.data.wrongq].solution+"img"],
      })
      console.log("错误图片:"+that.data.wrongqcimg)
      console.log("正确图片:" + that.data.rightqcimg)

      if (this.data.index == (getApp().globalData.wrongQuestion.length - 1)){
        that.setData({
          next: "返回结果"
        })
      }

    } else {
      this.submit();
    }
  },

  submit: function () {
    wx.redirectTo({
      url: '/pages/result/result',
    })
  },

  //返回结果页面
  image_back: function () {
    wx.redirectTo({
      url: '/pages/result/result',
    })
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
    
    let title = []
    let titleimg=[]
    let choice = []
    
    this.setData({
      //wrongq: getApp().globalData.wrongQuestion[this.data.index],
      title: wx.getStorageSync('title'),
      titleimg: wx.getStorageSync('titleimg'),
      choice: wx.getStorageSync('choice'),
      //wrongq: title[this.data.index]
    })

    this.setData({
      wrongqc: this.data.choice[this.data.wrongq][getApp().globalData.wrongQuestionChoose[this.data.index]],
      rightqc: this.data.choice[this.data.wrongq][this.data.choice[this.data.wrongq].solution],
         //图片选项
        wrongqcimg: this.data.choice[this.data.wrongq][getApp().globalData.wrongQuestionChoose[this.data.index] + "img"],
      rightqcimg: this.data.choice[this.data.wrongq][this.data.choice[this.data.wrongq].solution + "img"],
    })

  }

})

