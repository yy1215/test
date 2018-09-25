Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    template:[
      { id: '1', name: '通用版', image: '../../img/mb-tongyong.png' },
      {id: '2', name: '工程类', image: '../../img/mb-gongcheng.png' },
      {id: '3', name: '货物类', image: '../../img/mb-huowu.png' },
      {id: '4', name: '服务类', image: '../../img/mb-fuwu.png' },
    ],
    projectId:'',
    modelId:null
  },
  //选择模版
  selectTemp:function(e){
    let Index = e.currentTarget.dataset.id,
        list = this.data.template;
    list[Index].show = !list[Index].show || false;//变换其打开、关闭的状态 
    if (list[Index].show) {
      for (let i = 0, len = list.length; i < len; i++) {
        if (i != Index) {
          list[i].show = false;
        }
      }
      this.setData({
        modelId: Index+1  // 选择的模版ID
      });
    }else{
      this.setData({
        modelId: null
      });
    }
   
    this.setData({ 
      template:list
    });
    wx.setStorage({
      key: 'selectId',
      data: Index+1,
    })
  },


  //确认按钮
  confirm:function(){
    var that=this;
    console.log(that.data.projectId);
    console.log(that.data.modelId);
    if (that.data.modelId == null){
        return;
    }
    wx.navigateTo({
      url: '../templateView/templateView?projectId=' + that.data.projectId,
    })
    wx.setStorage({
      key: 'projectId',
      data: that.data.projectId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({  //根据参数显示图片
      projectId: options.projectId
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