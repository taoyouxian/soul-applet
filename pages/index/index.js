Page({
  enterGuide:function(event){
    wx.navigateTo({ url:"../selectTag/selectTag"});
    },
  enterTestMain: function (event) {
    wx.navigateTo({ url: "../testMain/testMain" });
  },
  enterLoveGuide: function (event) {
    wx.navigateTo({ url: "../loveGuide/loveGuide" });
  },
})