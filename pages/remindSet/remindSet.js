// pages/remindSet/remindSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: '1', value: '报名结束时',checkFlag:''},
      { id: '2', value: '10分钟前', checkFlag: ''},
      { id: '3', value: '30分钟前', checkFlag: ''},
      { id: '4', value: '1小时前', checkFlag: ''},
      { id: '5', value: '1天前', checkFlag: ''},
      { id: '6', value: '2天前', checkFlag: ''},
      { id: '7', value: '3天前', checkFlag: ''},
      { id: '8', value: '报名开始时', checkFlag: ''}  
    ],
    bidList: [
      { id: '1', value: '投标结束时', checkFlag: ''},
      { id: '2', value: '10分钟前', checkFlag: ''},
      { id: '3', value: '30分钟前', checkFlag: ''},
      { id: '4', value: '1小时前', checkFlag: ''},
      { id: '5', value: '1天前', checkFlag: ''},
      { id: '6', value: '2天前', checkFlag: ''},
      { id: '7', value: '3天前', checkFlag: ''}
    ],
    urlTitle:''
  },
  checkboxChange: function (e) {
    var valArr=e.detail.value;
    var checkboxVal='';
    var checkboxId='';
    for(var i=0;i<valArr.length;i++){
      var val=valArr[i].split(',');
      checkboxVal+=val[0]+',';
      checkboxId+=val[1]+',';
    }
    console.log(valArr);
    var urlTitle = this.data.urlTitle;
    var num = valArr.length;
    if (urlTitle =='bmsj'){
      wx.setStorage({//存储到本地 选择的提醒时间段
        key: "setName",
        data: {
          'checkboxVal': checkboxVal.substring(0, checkboxVal.length - 1),
          'checkboxId': checkboxId.substring(0, checkboxId.length - 1),
          'num': num,
          'urlTitle': urlTitle
        }
      })
    } else if (urlTitle =='tbsj'){
      wx.setStorage({//存储到本地 选择的提醒时间段
        key: "setNameTb",
        data: {
          'checkboxVal': checkboxVal.substring(0, checkboxVal.length - 1),
          'checkboxId': checkboxId.substring(0, checkboxId.length - 1),
          'num': num,
          'urlTitle': urlTitle
        }
      })
    }  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var setName = wx.getStorageSync('setName').checkboxId+'';
    var itemsArr=that.data.items; 
    for(var i=0;i<itemsArr.length;i++){
      if (setName.indexOf(itemsArr[i].id)!=-1){
        var fs = 'items[' + i + '].checkFlag';
        that.setData({
          [fs]:'false'
        })
      }
      
    }

    var setNameTb = wx.getStorageSync('setNameTb').checkboxId + '';
    var bidListArr = that.data.bidList;
    for (var i = 0; i < bidListArr.length; i++) {
      if (setNameTb.indexOf(bidListArr[i].id) != -1) {
        var fs = 'bidList[' + i + '].checkFlag';
        that.setData({
          [fs]: 'false'
        })
      }

    }

    //console.log(options.title)
    that.setData({ //获取url参数
      urlTitle: options.title,
      
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