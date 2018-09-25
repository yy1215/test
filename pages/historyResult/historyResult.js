// pages/historyResult/historyResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList:[
      {
        id:1,
        date: '2018-02-18 16:00-17:00',
        result: '1可以送出（共计10项完成，2项未完成）',
        remark:''
      },
      {
        id: 2,
        date: '2018-02-19 16:00-17:00',
        result: '2可以送出（共计10项完成，2项未完成）',
        remark: '备注：有两项是本项目不必要项，另外还缺少商务部分的资质证书。'
      },
      {
        id: 3,
        date: '2018-02-19 16:00-17:00',
        result: '3可以送出（共计10项完成，2项未完成）',
        remark: '备注：有两项是本项目不必要项，另外还缺少商务部分的资质证书。'
      },
      {
        id: 4,
        date: '2018-02-19 16:00-17:00',
        result: '4可以送出（共计10项完成，2项未完成）',
        remark: ''
      }
    ]
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
  onShow: function (e) {
    //console.log(this.data.resultList)
    this.setData({
      resultList: this.data.resultList.reverse()
    })
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