// pages/detailsDefault/detailsDefault.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    modalShow: true,
    applyModal:true,
    moreHeight:'',
    isShow:true,
    memberList:[],
    projectName:'',
    crtime:'',
    enrollStart:'',
    enrollEnd:'',
    bidEnd:'',
    enrollRemindTime:[],
    bidRemindTime:[],
    defaultbox:'',
    projectId:'',
    hasUserInfo:false,
    projectParticipants:[],
    checkRuleNum:'',
    moduleSort:'',
    modelId:''
  },
  //弹窗关闭
  modalCancel: function (e) {
    this.setData({
      modalShow: true
    })
  },
  /**
   * 查看更多
   */
  seeMore:function(){
   this.setData({
     moreHeight: 'auto'
   })
   
  },

  //报名时间提醒弹窗关闭
  applyModalCancel:function(){
    this.setData({
      applyModal:true
    })
  },
  //报名时间提醒弹窗
  applyModal:function(){
    this.setData({
      applyModal:false
    })
  },
  checkModal:function(){
    this.setData({
      modalHidden: false
    })
  } , 

  checkModalCancel:function(){
    this.setData({
      modalHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //是否登录
    //获取projectId
    this.setData({
      projectId: options.projectId,
      hasUserInfo: that.globalData.hasUserInfo 
    })
    //显示授权提示窗口？
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo
    })       
    /*
     */
    var that=this;
    var memberNum = that.data.memberList.length
    if (memberNum>10){
      this.setData({
        isShow: false,
        moreHeight: '380rpx'
      })
    }
    console.log(options);
    that.setData({
      projectId:options.projectId
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var newList = wx.getStorageSync('memberList')
    
    //加载详情
    wx.request({
      url: app.globalData.URL+'project/details',
      data: {
        projectId: that.data.projectId,
        wxOpenid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.status == '0') {
          that.setData({
            projectName: res.data.data.projectName,
            crtime: res.data.data.createTime,
            enrollStart: res.data.data.enrollStartTime,
            enrollEnd: res.data.data.enrollEndTime,
            bidEnd: res.data.data.bidEnd,
            enrollRemindTime: res.data.data.enrollRemindTime,
            bidRemindTime: res.data.data.bidRemindTime,
            projectParticipants: res.data.data.projectParticipants
          })
          wx.setStorage({//存储到本地 选择的提醒时间段
            key: "memberList",
            data: res.data.data.projectParticipants
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  //标数自检
  checkredict:function(){
    var that=this;
    wx.request({
      url: app.globalData.URL + 'projectcheck/checkRedict',
      data: {
        projectId: that.data.projectId,
        wxOpenid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
         if(res.data.status=='0'){
           if (res.data.data.isoperation=="false"){
             wx.navigateTo({
               url: '../template/template?projectId=' + that.data.projectId
             })
           }else if(res.data.data.isoperation=="true"){
              that.setData({
                modalShow:false,
                checkRuleNum: res.data.data.checkNum,
                moduleSort: res.data.data.moduleSort,
                modelId:res.data.data.modelId
              })
           }
         } 
      }
    }); 
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '项目详情',
      desc: '喜鹊投标卫士',
      path: 'pages/detailsDefault/detailsDefault',
      imagesUrl: '',
      success: function (res) {
        // 转发成功
        // console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        // console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    console.log('getUserInfo')
    var that = this
    //缓存用户信息
    var userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    //用户关联项目
    that.relateProjectWithUser()
    //更新用户信息
    that.updateUserInfo()
    //缓存信息
    app.globalData.hasUserInfo = true
    this.setData({
      hasUserInfo:true
    })
  },
  closeDea:function(){
    this.setData({
      hasUserInfo:true
    })
  },
  /**
   * 更新用户信息
   */
  updateUserInfo: function() {
    var userId = this.data.userId
    var userInfo = this.data.userInfo
    console.log('updateUserInfo')

    wx.request({
      url: app.globalData.URL + 'user/updateInfo',
      data: {
        id: app.globalData.userId,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      }
    })
  },
  /**
   * 用户关联项目
   */
  relateProjectWithUser: function(e) {
    console.log('relateProjectWithUser')
    var that = this
    wx.request({
      url: app.globalData.URL + 'project/relevanceProjectWithUser',
      data: {
        userId: app.globalData.userId,
        projectId: that.data.projectId
      },
      success: function() {
        that.setData({
          authorizeModalHidden: true
        })
        that.getUsersWithProject()
      }
    })
  },
  
  /**
   * 获取项目的所有用户
   */
  getUsersWithProject: function(e) {
    console.log('getUsersWithProject')
    var that = this
    wx.request({
      url: getApp().globalData.URL + 'user/getUsersWithProject',
      data: {
        projectId: that.data.projectId
      },
      success: function(res) {
        that.setData({
          memberList: res.data.data
        })
      }
    })
  },   
})

