Page({
  enterTestResult: function (event) {
    wx.navigateTo({ url: "../testResult/testResult" });
  },
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
      if (aRes.state == 1) {
        wx.showToast({
          title: '上链成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
      else {
        wx.showToast({
          title: '上链失败',
          icon: 'false',
          duration: 1000,
          mask: true
        })
      }
      wx.hideLoading();
    })
  },
})