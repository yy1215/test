// pages/projectReport/projectReport.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenSub: true,
    ongoingNum:'',
    historyNum:'',
  },
  // 下拉菜单
  subNav: function (e) {
    //console.log(this.data.hiddenSub)
    if (this.data.hiddenSub == true) {
      this.setData({
        hiddenSub: false
      })
    } else {
      this.setData({
        hiddenSub: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.URL +'project/loadProjectTb',
      method: 'GET',
      data: {
        opendId: app.globalData.openid
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.setData({
          ongoingNum:res.data.data.ongoingNum,
          historyNum:res.data.data.historyNum
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