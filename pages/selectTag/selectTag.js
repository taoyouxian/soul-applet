// 获取应用实例
const app = getApp()
Page({
  enterGuide: function (e){
    var viewId = e.target.id;
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;
    // console.log(viewId);
    // console.log(viewText);
    app.globalData.tag = viewText;
      wx.navigateTo({url:"../guide/guide"});
    }
})