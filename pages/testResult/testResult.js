// pages/testResult/testResult.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userImg:'',
    projectName:'',
    operationNum:'',
    checkState:'',
    checkRuleNum:'',
    checkremark:'',
    checkDate:'',
  },
  //返回首页
  backHome:function(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
      //获取用户信息
    wx.request({
      url: app.globalData.URL +'user/getUserInfo',
      data:{
        userId:wx.getStorageSync('userId')
      },
      success:function(res){
       that.setData({
         userName:res.data.data.nickName,
         userImg: res.data.data.avatarUrl
       })
      }
    })
    wx.request({
      url: app.globalData.URL +'projectcheck/checkResultList',
      data:{
        projectId:101,
      },
      success:function(res){
        that.setData({
          operationNum: res.data.data.operationNum,
          projectName: res.data.data.projectName,
          checkState: res.data.data.checkState,
          checkRuleNum: res.data.data.checkRuleNum,
          checkremark: res.data.data.checkremark,
          checkDate: res.data.data.checkDate
        })
      }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})