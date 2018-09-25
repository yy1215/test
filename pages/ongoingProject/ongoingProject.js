// pages/ongoingProject/ongoingProject.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenSub: true,
    pageNum: 1,
    pageSize: 3,
    hasNextPage: true,
    projectType: 'ongoing',
    projectTypeStr: '进行中项目'
  }, 
  //下拉栏
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
    if (options.projectType == 'ongoing') {
      this.setData({
        projectType: 'ongoing',
        projectTypeStr: '进行中项目'
      })
    } else {
      this.setData({
        projectType: 'history',
        projectTypeStr: '历史项目'
      })
    }
    //刷新标题
    wx.setNavigationBarTitle({
      title: this.data.projectTypeStr
    })
    this.loadProject()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getStorage({//获取用户ID
      key: 'userId',
      success: function (res) {
        that.setData({
            userId: res.data
        })
        that.pageNum = 1
        that.loadProject()
      }
    })
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
    wx.showNavigationBarLoading()
    var that = this
    var pageNum = that.data.pageNum;
    that.setData({
      pageNum: pageNum + 1
    })
    that.loadProject()
    setTimeout(function(){
      wx.hideNavigationBarLoading()
    }, 500)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取项目信息
   */
  loadProject: function() {
    var that = this
    if (!that.data.hasNextPage) {
      return false
    }
    var userId = app.globalData.userId
    var pageNum = this.data.pageNum
    var pageSize = this.data.pageSize
    var projectType = this.data.projectType
    wx.request({
      url: app.globalData.URL + 'project/getProjectWithTypeByUser',
      data: {
        userId: userId,
        pageNum: pageNum,
        pageSize: pageSize,
        type: projectType
      },
      success: (function (res) {
        var data = res.data.data.list
        var hasNextPage = res.data.data.hasNextPage
        if(data.length == 0) {
          that.setData({
            projects: null
          })
        } else {
          that.setData({
            projects: data
          })
        }
        //设置分页信息
        that.setData({
          pageNum: pageNum,
          pageSize: pageSize,
          hasNextPage: hasNextPage
        })
      })
    })
  },
  /**
   * 添加项目
   */
  addProject: function(e) {
    //保存formid
    wx.navigateTo({
      url: '../editProject/editProject',
    })
  },
  /**
   * submit
   */
  submit: function(e) {
    console.log(e.detail.formId)
  }
})