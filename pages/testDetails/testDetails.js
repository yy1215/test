// pages/testDetails/testDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList:[
      {
        stage:'一、投标文件内容点检111',
        floor:[
          {
            pointName:'投标文件结构的正确性、完整性',
            status:'2项未完成',
            items: [
              {
                completion: true, 
                content:'检查投标文件的构成是否响应？如分开编制投标文件商务部分、报价部分则需分开。',
                remark:'没有分开编制投标文件的商务部分、技术部分、报价部分。'
              },
              {
                completion: false,
                content: '检查投标文件的构成是否响应？如分开编制投标文件商务部分、报价部分则需分开。',
                remark: '没有分开编制投标文件的商务部分、技术部分、报价部分。'
              },
              {
                completion: true,
                content: '检查投标文件的构成是否响应？如分开编制投标文件商务部分、报价部分则需分开。',
                remark: ''
              }
            ]
          },
          {
            pointName: '投标文件结构的正确性',
            status: '55项未完成',
            items: [
              {
                completion: true,
                content: '检查投标文件的构成是否响应？如分开编制投标文件商务部分、报价部分则需分开。',
                remark: '没有分开编制投标文件的商务部分、技术部分、报价部分。'
              },
              {
                completion: false,
                content: '检查投标文件的构成是否响应？如分开编制投标文件商务部分、报价部分则需分开。',
                remark: ''
              }
            ]
          }
        ]
      },
      {
        stage: '二、投标文件内容点检2',
        floor: [
          {
            pointName: '投标文件结构的正确性、完整性',
            status: '666项未完成',
            items: [
              {
                completion: true,
                content: '检查投标文件的构成是否响应？如分开编制投标文件商务部分、报价部分则需分开。',
                remark: '没有分开编制投标文件的商务部分、技术部分、报价部分。'
              },
              {
                completion: false,
                content: '检查投标文件的构成是否响应？如分开编制投标文件商务部分、报价部分则需分开。',
                remark: '没有分开编制投标文件的商务部分、技术部分、报价部分。'
              },
              {
                completion: true,
                content: '检查投标文件的构成是否响应？如分开编制投标文件商务部分、报价部分则需分开。',
                remark: ''
              }
            ]
          }
        ]

      }
    ]
  },
  listTap:function(e){
    console.log(e)
    let parentindex = e.currentTarget.dataset.parentindex,//最外层列表下标
      Index = e.currentTarget.dataset.index,//点击的内层下标
      list = this.data.testList;
    var len = list[parentindex].floor.length;
    list[parentindex].floor[Index].show = !list[parentindex].floor[Index].show || false;//变换其打开、关闭的状态 
    if (list[parentindex].floor[Index].show) {
      //如果是操作的打开状态，那么就让同级的其他列表变为关闭状态，保持始终只有一个打开 
      for (let i = 0, len = list[parentindex].floor.length; i < len; i++) { 
        if (i != Index) {
          list[parentindex].floor[i].show = false;
        }
      }
    //关闭其它所有的层
      for (let i = 0, len = list.length; i < len; i++) {  
        if (i != parentindex) {
          for (let j = 0, len2 = list[i].floor.length; j<len2; j++){
            list[i].floor[j].show = false;
          }
        }
      }
    }
    this.setData({ testList: list });
    console.log(list[parentindex].floor[Index].show)
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