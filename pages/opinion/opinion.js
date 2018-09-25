// pages/opinion/opinion.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    max:200
  },
  //限制字数
  textChange:function(e){
    var value = e.detail.value;
    var len = parseInt(value.length); // 获取内容的长度
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentNumber: len //当前字数  
    });

  },
  //表单提交
  formSubmit: function (e) {
    wx.request({
      url: app.globalData.URL  + 'feedback/save',
      method: 'POST',
      data: {
        opendId: app.globalData.openid,
        content: e.detail.value.text,
        contact:e.detail.value.tel
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        if (res.data.status == '0') {
          wx.navigateTo({
            url: '../index/index'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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