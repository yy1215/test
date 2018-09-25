// pages/editProject/editProject.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:'',
    endDate:'',
    deadline:'',
    startTime:'',
    endTime: '',
    deadlineTime:'',
    regstDate:'',
    bidDate:'',
    setDate:'',
    setTitle:'',
    regstNum:'0',
    bidNum:'0',
    modalHidden:true,
    modalHidden2: true,
    projectId:'',
    projectName:'',
    bidEndStr:'',
  },
  // 删除弹窗
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  //弹窗关闭
  modalCancel: function (e) {
    this.setData({
      modalHidden: true,
      modalHidden2: true
    })
  },
  //日期选择器
  bindDateChange: function (e) {
    var currId = e.currentTarget.dataset.id;
    //console.log(currId == "end-date")
    if (currId == 'start-date'){
      this.setData({
        startDate: e.detail.value
      })
    } else if (currId == 'end-date'){
      this.setData({
        endDate: e.detail.value
      })
    } else if (currId == 'deadline') {
      this.setData({
        deadline: e.detail.value
      })
    }
   
  },
  //时间选择器
  bindTimeChange: function (e) {
    var currId = e.currentTarget.dataset.id;
    //console.log(currId == "end-date")
    if (currId == 'start-date') {
      this.setData({
        startTime: e.detail.value
      })
    } else if (currId == 'end-date') {
      this.setData({
        endTime: e.detail.value
      })
    } else if (currId == 'deadline') {
      this.setData({
        deadlineTime: e.detail.value
      })
    }
   
  },
  //表单提交
  formSubmit: function (e) {
    var that=this;
    var enrollStart = e.detail.value.enrollStartDa +' '+ e.detail.value.enrollStart;
    var enrollEnd = e.detail.value.enrollEndDa + ' ' +  e.detail.value.enrollEnd;
    var enrollRemindTimeStr=wx.getStorageSync('setName').checkboxId
    var bidEnd = e.detail.value.bidEndDa + ' ' +  e.detail.value.bidEnd;
    var bidEndStr=wx.getStorageSync('setNameTb').checkboxId;
    wx.request({
      url: app.globalData.URL+'project/edit',
      method:'POST',
      data:{
        opendId: wx.getStorageSync('opendId'),
        name: e.detail.value.input,
        enrollStartStr: enrollStart,
        enrollEndStr: enrollEnd,
        enrollRemindTime: enrollRemindTimeStr,
        bidEndStr: bidEnd,
        bidRemindTime: bidEndStr
        },
      header:{
        "Content-Type": "application/json"},
      success:function(res){
       if(res.data.status=='0'){
         wx.navigateTo({
           url: '../share/share?projectId='+res.data.data.projectId
         })
       }
      } 
    })
  
  },
  saveBtn:function(){ //临时效果
    this.setData({
      modalHidden2: false
    })
  },
  //表单重置
  formReset: function () {
    console.log('form发生了reset事件')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatDate(new Date());
    var time = util.formatTiem(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      startDate: date,
      endDate: date,
      deadline:date,
      startTime: time,
      endTime: time,
      deadlineTime:time,
      projectId: options.projectId
    });
    if (undefined!=options&&undefined!=options.projectId){
      wx.request({
        url: app.globalData.URL+'project/loadProject',
        data: { projectId: options.projectId },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.status == '0') {
            console.log(res.data.data.name);
            that.setData({
              projectName: res.data.data.name,
              crtime: res.data.data.createTime,
              enrollStart: res.data.data.enrollStartTime,
              enrollEnd: res.data.data.enrollEndTime,
              bidEnd: res.data.data.bidEnd,
              enrollRemindTime: res.data.data.enrollRemindTime,
              bidRemindTime: res.data.data.bidRemindTime
            })
          }
        }
      })
    }
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
    wx.getStorage({//获取本地缓存 提醒时间段
      key: 'setName',
      success: function (res) {
          that.setData({
            regstDate: res.data.checkboxVal,
            regstNum: res.data.num
          })
      }
    })
    wx.getStorage({//获取本地缓存 提醒时间段
      key: 'setNameTb',
      success: function (res) {
        that.setData({
          bidDate: res.data.checkboxVal,
          bidNum: res.data.num
        })
      }
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