//app.js
App({
  onLaunch: function () {
    //that  
    var that = this
    //获取用户userId
    wx.getStorage({
      key: 'userId',
      success: function(res) {
         that.globalData.userId = res.data
      },
      fail: function(res) {
        wx.login({
          success: res => {
            wx.request({
              url: that.globalData.URL + 'user/login',
              data: { code: res.code },
              success: (function (res) {
                //缓存登录信息
                that.globalData.hasLogin = true
                that.globalData.userId = res.data.data.userId
                that.globalData.opendId = res.data.data.openid
                //that.loginAfter()
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
      }
    })
    //openid
    wx.getStorage({
      key: 'opendId',
      success: function(res) {
        that.globalData.opendId = res.data
      },
    })
    //是否有用户信息
    wx.getStorage({
      key: 'hasUserInfo',
      success: function(res) {
        that.globalData.hasUserInfo = hasUserInfo
      },
    })
    //用户信息
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.globalData.userInfo = userInfo
      },
    })
  },
  globalData: {
    URL: 'http://jason.dunhanson.com/',
    userInfo: {},
    hasUserInfo: false,
    hasLogin: false,
    userId: null,
    wxOpenid: null
  },
  /**
   * 更新用户信息
   */
  updateUserInfo: function () {
    var that = this
    //请求后台更新用户信息
    wx.request({
      url: that.globalData.URL + 'user/updateInfo',
      data: {
        userId: that.globalData.userId,
        avatarUrl: that.globalData.userInfo.avatarUrl,
        nickName: that.globalData.userInfo.nickName
      },
      success: (function (res) {
        
      })
    })
    //隐藏授权窗口
    wx.setStorage({
      key: 'authorizeModalHidden',
      data: true,
    })
  },
  /**
   * 更新用户信息
   */
  updateUserInfo: function () {
    console.log('app-updateUserInfo')
    var that = this
    var userId = this.globalData.userId
    var userInfo = this.globalData.userInfo
    //请求后台更新用户信息
    wx.request({
      url: getApp().globalData.URL + 'user/updateInfo',
      data: {
        id: userId,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      },
      success: (function (res) {
        that.globalData.hasUserInfo = true
      })
    })
  },
  /**
   * 保存formid
   */        
  appendFormid: function() {
    var formid = this.globalData.formid
    var userId = this.globalData.userId
    var url = this.globalData.URL
    console.log(formid)
    if (formid != 'the formId is a mock one') {
      wx.request({
        url: url + 'formid/append',
        data: {
          code : formid,
          userId: userId
        },
        success: function(e) {
 
        }
      })
    }
  }
})