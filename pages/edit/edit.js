const app = getApp()
Page({
  onLoad: function () {

    this.setData({
      tag: app.globalData.tag
    })
  },
  // enterTestResult: function (event) {
  //   wx.navigateTo({ url: "../testResult/testResult" });
  // },
  formSubmit: function (e) {
    var data = e.detail.value.data;
    //     var tag = e.detail.value.tag;
    var tag = app.globalData.tag;
    wx.showLoading({ title: '灵魂上链中' });
    var aHeader = {
      'content-type': 'application/json'
    }
    console.log(data + ", " + tag);
    app.globalData.chain = {
      openId: app.globalData.openId,
      tag: app.globalData.tag,
      data: data
    }
    app.acHttpGet("acAddChain", app.globalData.chain, aHeader, "GET", function (aRes) {
      wx.hideLoading();
      if (aRes.state == 1) {
        wx.showLoading({ title: '上链成功' });
      }
      else {
        wx.showLoading({ title: '上链失败' });
      }
      wx.navigateTo({ url: "../testResult/testResult" });
    })
  },
})