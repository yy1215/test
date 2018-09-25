Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectId:'',
    modelId:''
  },
  //确认按钮
  confirm: function () {
    var that=this;
  
    wx: wx.navigateTo({
      url: '../selfTest/selfTest?projectId=' + that.data.projectId + "&modelId=" + that.data.modelId, //跳转到自检页面
      success: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let selectId= wx.getStorageSync('selectId'); 
    let projectId = wx.getStorageSync('projectId'); 
    this.setData({ 
      modelId: selectId,
      projectId: projectId
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