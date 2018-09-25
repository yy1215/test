// pages/projectMember/projectMember.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow: true,
    memberList: [],
    isChecked:true,
    projectId:'',
  },
  // 获取选择的值
  checkboxChange: function (e) {
    var checkArr=e.detail.value;
    var idsStr='';
    for (var i = 0; i < checkArr.length;i++){
      idsStr += checkArr[i]+',' 
    }
    console.log(idsStr);
    wx.setStorageSync('checkdArr', idsStr.substring(0,idsStr.length-1));
  },

  //移除成员
  clearMembers:function(e){
    this.setData({
      modalShow:false
    })
  },
  modalSub:function(e){
    console.log(wx.getStorageSync('checkdArr'));
    var that=this;
     wx.request({
       url: app.globalData.URL +'project/deleteMembers',
       method:'POST',
       data:{
         ids: wx.getStorageSync('checkdArr'),
         projectId: that.data.projectId
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success:function(res){
         if (res.data.status == '0'){
           that.setData({
             modalShow: true
           })
           wx.navigateBack({
             delta:1
           })
         }
       }
     }) 
  },

  //弹窗关闭
  modalCancel: function (e) {
    this.setData({
      modalShow: true
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
      this.setData({
        memberList: wx.getStorageSync('memberList'),
        projectId:options.projectId
      })
      console.log(this.data.memberList);
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