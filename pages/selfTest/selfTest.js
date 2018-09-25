var util = require('../../utils/util.js');
const app = getApp()
var ruleArr=new Array()
function rule(ruleId,isFlag,remark){
  this.ruleId=ruleId;
  this.isFlag=isFlag;
  this.remark=remark;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currId: '0',
    parentIndex: '0',
    ruleIdVal:'',
    modalHidden: true,
    modalShow: true,
    pageNum: 1,
    pageTitle:'',
    moduleTotalNum:4,
    currentModuleName:'',
    textList: [],
    modelId:4,
    checkModal:'',
    checkMo:'',
    checkM:'hide',
    textVal:'',
    checkResultVal:'',
    checkResultYesCla:'',
    checkstate:'10',
    checkResultNoCla:'',
    checkResultTx:'',
    projectId:'',
    checkNum:0,
    remarkVal:'',
    showLoading:'true',
    checkSaveModel:'true',
    buttonClicked:false
  },

  /*** 点击下一项***/
  nextItem: function (e) {
    var that=this;
    let parentindex = e.currentTarget.dataset.parentindex,
      index = e.currentTarget.dataset.current,
      textList = this.data.textList;
    // 如果是最后一个就return
    if (parentindex + 1 == textList.length && index + 1 == textList[parentindex].list.length) {
      that.showLoading();
      util.buttonClicked(that);
      let param={
        userId: wx.getStorageSync('userId'),
        checkResult:JSON.stringify(ruleArr),
        pageNum: that.data.pageNum,
        modelId: that.data.modelId,
        projectId: that.data.projectId,
        checkNum:that.data.checkNum
      }
     
      wx.request({
        url: app.globalData.URL +'projectcheck/saveCheck',
        method:'POST',
        data: param,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if(res.data.status=='0'){
            if (that.data.pageNum >=that.data.moduleTotalNum){
              that.setData({
                checkModal: 'hide',
                checkM: '',
              })
            }else{
              that.setData({
                checkModal: 'hide',
                checkMo: '',
                currentModuleName: res.data.data.name
              })
              that.cancelLoading();
            }
          }
        }
      })
      return;
    }
    //每一小项检查完，进入下一大项
    if (index + 1 == textList[parentindex].list.length) {
      textList[parentindex].show = false;
      parentindex++;
      textList[parentindex].show = true;
      this.setData({ textList: textList });
      index = 0;
    } else {
      index++;
    }
    if (index != 0) { textList[parentindex].list[index - 1].show = false; }
    textList[parentindex].list[index].show = true;
    ruleArr.push(new rule(e.currentTarget.dataset.textval,"1")); 

    this.setData({ 
      textList: textList,
      currId: index,
      parentIndex: parentindex,
      ruleIdVal: e.currentTarget.dataset.textval
       });
    that.cancelLoading();
  },
  /**
   * 点击上一项
   */
  prevItem: function (e) {
    let parentindex = e.currentTarget.dataset.parentindex,
      index = e.currentTarget.dataset.current,
      textList = this.data.textList;
    
    //当前小项的index与 父index  parentindex 相等就显示上一大项
    if (index == 0) {
      if (textList[parentindex - 1] == undefined) {
        return;
      }
      textList[parentindex].show = false;
      parentindex--;
      textList[parentindex].show = true;
      index = textList[parentindex].list.length - 1;
    } else {
      textList[parentindex].list[index].show = false;
      index--;
    }
    //2级
    textList[parentindex].list[index].show = true;

    this.setData({ textList: textList });
  },

  /*** 弹窗点击下一项***/
  maskNextItem: function (e) {
    var that = this;
    let parentindex = e.currentTarget.dataset.parentindex,
      index = e.currentTarget.dataset.current,
      textList = this.data.textList;
    // 如果是最后一个就return
    if (parentindex + 1 == textList.length && index + 1 == textList[parentindex].list.length) {
      this.setData({
        modalHidden: true,
      });

      let param = {
        userId: wx.getStorageSync('userId'),
        checkResult: JSON.stringify(ruleArr),
        pageNum: that.data.pageNum,
        modelId: that.data.modelId,
        projectId: that.data.projectId,
        checkNum: that.data.checkNum
      }
      that.showLoading();
      wx.request({
        url: app.globalData.URL + 'projectcheck/saveCheck',
        method: 'POST',
        data: param,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.status == '0') {
            if (that.data.pageNum >= that.data.moduleTotalNum) {
              that.setData({
                checkModal: 'hide',
                checkM: ''
              })
            } else {
              that.setData({
                checkModal: 'hide',
                checkMo: ''
              })
            }
           that. cancelLoading();
          }
        }
      })

      return;

    }
    //每一小项检查完，进入下一大项
    if (index + 1 == textList[parentindex].list.length) {
      textList[parentindex].show = false;
      parentindex++;
      textList[parentindex].show = true;
      this.setData({ textList: textList });
      index = 0;
    } else {
      index++;
    }
    if (index != 0) { textList[parentindex].list[index - 1].show = false; }
    textList[parentindex].list[index].show = true;
    ruleArr.push(new rule(that.data.ruleIdVal, "2", that.data.remarkVal)); 
    that.setData({
      textList: textList,
      currId: index,
      parentIndex: parentindex,
      modalHidden: true,
      remarkVal:'',
    });
  },
  //开始检查弹窗
  startcheck:function(e){
    var that=this;
    wx.request({
      url: app.globalData.URL + 'projectcheck/getCheckContent',
      data: {
        modelId: that.data.modelId,
        pageNum: that.data.pageNum,
      },
      success: function (res) {
        if (res.data.status == '0') {
          that.setData({
            textList: res.data.data.list,
            checkModal:'' ,
            checkMo: 'hide',
            pageNum: that.data.pageNum+1,
          })
          ruleArr = new Array();
        }
      }
    })
  },
  showLoading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
  },
  cancelLoading: function () {
    wx.hideToast();
  },

  getRemakVal:function(e){
    var that=this;
    that.setData({
      remarkVal: e.detail.value
    });
  },
  resultText:function(e){
    this.setData({
      checkResultTx: e.detail.value
    });
  },
  sendFun:function(e){
    this.setData({
      checkResultYesCla:'active',
      checkResultNoCla: '',
      checkstate:'20'
    })
  },
  updateFun:function(e){
    this.setData({
      checkResultYesCla :'' ,
      checkResultNoCla : 'active',
      checkstate: '10'
    })
  },
  subCheck:function(){
    var that=this;    
    let param = {
      userId: wx.getStorageSync('userId'),
      checkstate: that.data.checkstate,
      modelId: that.data.modelId,
      checkResultTx: that.data.checkResultTx, 
      projectId: that.data.projectId  
    }
    wx.request({
      url: app.globalData.URL + 'projectcheck/checkResult',
      method:'POST',
      data: param,
      success: function (res) {
        if (res.data.status == '0') {
          wx.navigateTo({
            url: '../testResult/testResult?projectId='+that.data.projectId+'&modelId='+that.data.modelId
          })

        }
      }
    })
  },

  //section 弹窗
  modalTap: function (e) {
    var that = this;
    var currId = e.currentTarget.dataset.current;
    this.setData({
      modalHidden: false
    })
  },
  //提示弹窗关闭
  promptCancel: function (e) {
    this.setData({
      modalShow: true
    })
  },
  //备注弹窗关闭
  modalCancel: function (e) {
    this.setData({
      modalHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if(options.pageNum!=undefined){
      that.setData({
        modelId: options.modelId,
        projectId: options.projectId,
        pageNum: Number(options.pageNum) + 1
      })
    }else{
      that.setData({
        modelId: options.modelId,
        projectId: options.projectId,
      })
    }
      wx.request({
        url: app.globalData.URL +'projectcheck/getCurrentMoudelInfo',
        data:{
          modelId: that.data.modelId,
          pageNum: that.data.pageNum,
        },
        success:function(res){
            that.setData({
              currentModuleName: res.data.data.currentModuleName,
            })
        }
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