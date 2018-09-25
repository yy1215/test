//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    hasProject: false,
    hasUserInfo: true
  },
  onLoad: function () {
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.hasLogin) {
      //this.hasProject()
    } else {
      this.setData({
        call_hasProject: true
      })
      this.login()
    }
  },   
  /**
   * 是否有项目
   */
  hasProject: function() {
    wx.request({
      url: app.globalData.URL + 'project/hasProjectWithTypeByUser',
      data: {
        userId: app.globalData.userId
      },
      success: function(res) {
        var hasProject = res.data.data.flag
        if (hasProject) {
          wx.navigateTo({
            url: '../ongoingProject/ongoingProject?projectType=ongoing',
          })
        }
      },
      fail: function(res) {

      }
    })
  },
  /**
   * 添加项目
   */
  addProject: function (e) {
    //缓存信息
    var userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    wx.setStorage({
      key: 'userInfo',
      data: userInfo,
    })
    //更新信息
    app.updateUserInfo()    
    //页面跳转
    wx.navigateTo({
      url: '../editProject/editProject',
    })    
  },
  /**
   * 用户登录
   */
  login: function () {
    var that = this
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.URL + 'user/login',
          data: { code: res.code },
          success: (function (res) {
            //缓存登录信息
            app.globalData.hasLogin = true
            app.globalData.userId = res.data.data.id
            app.globalData.openid = res.data.data.openid
            that.loginAfter()
            wx.setStorage({
              key: 'userId',
              data: res.data.data.id
            })
            
            wx.setStorage({
              key: 'opendId',
              data: res.data.data.openid,
            })

          })
        })
      }
    })
  },
  /**
   * 登录后执行的方法
   */
  loginAfter: function() {
    if(this.data.call_hasProject) {
      this.hasProject()
    }
  },
  /**
   * submit
   */
  submit: function (e) {
    app.globalData.formid = e.detail.formId
    app.appendFormid()

  },
  /**
   * 吐槽
   */
  opinion: function(e) {
    wx.navigateTo({
      url: '../opinion/opinion',
    })
  }  
})
