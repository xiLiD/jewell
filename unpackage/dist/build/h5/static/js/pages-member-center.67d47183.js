(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-member-center"],{"43fa":function(t,e,a){t.exports=a.p+"static/img/up.75385480.png"},"543b":function(t,e,a){"use strict";var i=a("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("e7c9")),s=a("6910"),o=i(a("8c6a")),c={components:{ssPaymentPassword:o.default},data:function(){return{acer_truncatum:0,gold_balance:0,balance:0,mainData:{headImg:"",nickName:"",nvitationCode:"",user_type:0,up:0},rankItem:[{id:0,name:"普通用户",logo:"/static/images/v0.png"},{id:1,name:"青铜分店",logo:"/static/images/v1.png"},{id:2,name:"白银分店",logo:"/static/images/v2.png"},{id:3,name:"黄金分店",logo:"/static/images/v3.png"},{id:4,name:"分公司",logo:"/static/images/v4.png"}],upData:{money:0,name:"",type:1,id:0},user:{}}},onShow:function(t){this.$store.commit("judgeLogin"),this.getUserData()},onLoad:function(t){uni.showTabBar();var e=uni.getStorageSync("uerInfo");this.mainData.nickName=e.user_name,this.mainData.headImg=e.user_head,this.mainData.nvitationCode=e.invitation,this.mainData.user_type=e.user_type,this.mainData.up=e.up},methods:{dump:function(t){uni.navigateTo({url:t})},copyCode:function(){var t=this;(0,s.setClipboardData)(t.mainData.nvitationCode).then((function(){t.$tools.toast("复制成功")}))},getUserData:function(){var t=this,e=this;e.$request.user.getUserData({}).then((function(a){console.log(a),1==a.status?(e.balance=a.data.balance,e.acer_truncatum=a.data.acer_truncatum,e.gold_balance=a.data.gold_balance,t.mainData.user_type=a.data.user_type,t.mainData.up=a.data.up,t.user=a.data,1==e.mainData.up?uni.setTabBarBadge({index:3,text:"1"}):uni.setTabBarBadge({index:3,text:""})):e.$tools.toast(a.msg)})).catch((function(t){e.$tools.toast("数据加载异常")}))},up:function(){var t=this,e=this;if(0==e.mainData.up)return e.$tools.toast("未满足升级条件"),!1;uni.showLoading({title:"数据查询中"});e=this;e.$request.user.getUp({}).then((function(a){1==a.status?(e.upData=a.data,t.$refs["showUp"].open()):e.$tools.toast(a.msg),e.$tools.loadingHide()})).catch((function(t){e.$tools.loadingHide(),e.$tools.toast("数据加载异常")}))},closeUp:function(){this.$refs["showUp"].close()},openPwd:function(){var t=this;if(t.addressItem.id<=0)return t.$tools.toast("请选择收货地址"),!1;this.$refs.paymentPassword.modalFun("show")},upBuy:function(t){var e=this;e.$tools.loading("数据条件中"),e.$request.common.paySundries({type:2}).then((function(t){e.$tools.loadingHide(),1==t.status?(e.closeUp(),e.pay(t.msg)):e.$tools.toast(t.msg)})).catch((function(t){console.log(t),e.$tools.loadingHide(),e.$tools.toast("数据加载异常")}))},pay:function(t){var e=this;(0,n.default)({nonceStr:t.nonceStr,timeStamp:t.timeStamp,package:t.package,signType:t.signType,paySign:t.paySign},(function(t){e.$tools.toast("充值成功"),setTimeout((function(){e.getUserData()}),1e3)}),(function(t){console.log(t),e.$tools.toast("支付失败")}))}}};e.default=c},6910:function(t,e,a){"use strict";function i(){return new Promise((function(t,e){try{navigator.clipboard.readText().then(t).catch(e)}catch(a){e(a)}}))}function n(t){return new Promise((function(e,a){var i=document.createElement("textarea");i.value=t,i.readOnly=!0,document.body.appendChild(i),i.select(),i.setSelectionRange(0,t.length),document.execCommand("copy"),i.remove(),e(t)}))}a("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.getClipboardData=i,e.setClipboardData=n},"86d9":function(t,e,a){"use strict";var i=a("c995"),n=a.n(i);n.a},"909b":function(t,e,a){"use strict";var i={"uni-popup":a("c971").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"pure_top"},[i("v-uni-image",{staticClass:"m-head",attrs:{src:t.mainData.headImg,mode:"aspectFill"}}),i("v-uni-view",{staticClass:"m-r"},[i("v-uni-view",{staticClass:"m-name"},[i("v-uni-view",{staticClass:"m-name-a"},[t._v(t._s(t.mainData.nickName))]),i("v-uni-view",{staticClass:"m-name-b",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.up.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"m-rank-name"},[t._v(t._s(t.rankItem.find((function(e){return e.id==t.mainData.user_type})).name))]),i("v-uni-image",{attrs:{src:t.rankItem.find((function(e){return e.id==t.mainData.user_type})).logo,mode:"aspectFill"}})],1),1==t.mainData.up?i("v-uni-view",{staticClass:"m-rank-up"},[i("v-uni-image",{attrs:{src:a("43fa"),mode:"aspectFill"}})],1):t._e(),0==t.user.zi_admin_state?i("v-uni-view",{staticClass:"up-level",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/company/company")}}},[i("i",{staticClass:"iconfont icon-fengongsi",staticStyle:{"font-size":"28rpx"}}),i("v-uni-text",[t._v("申请开分公司")])],1):i("v-uni-view",{staticClass:"up-level get-level"},[i("i",{staticClass:"iconfont icon-fengongsi",staticStyle:{"font-size":"28rpx"}}),i("v-uni-text",[t._v("已入驻分公司")])],1)],1),i("v-uni-view",{staticClass:"m-ask"},[t._v("邀请码："+t._s(t.mainData.nvitationCode)),i("v-uni-text",{staticClass:"bth-ask",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copyCode.apply(void 0,arguments)}}},[t._v("复制")])],1)],1),i("v-uni-view",{staticClass:"top-setting",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/member/details")}}},[i("v-uni-text",{staticClass:"uni-icon"},[t._v("")])],1)],1),i("v-uni-view",{staticClass:"m-account"},[i("v-uni-view",{staticClass:"account-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/account/silver")}}},[i("v-uni-view",{staticClass:"account-money"},[t._v(t._s(t.gold_balance))]),i("v-uni-view",{staticClass:"account-name"},[t._v("银元宝")])],1),i("v-uni-view",{staticClass:"account-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/account/balance")}}},[i("v-uni-view",{staticClass:"account-money"},[t._v(t._s(t.balance))]),i("v-uni-view",{staticClass:"account-name"},[t._v("佣金")])],1),i("v-uni-view",{staticClass:"account-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/account/account")}}},[i("v-uni-view",{staticClass:"account-money"},[t._v(t._s(t.acer_truncatum))]),i("v-uni-view",{staticClass:"account-name"},[t._v("金元宝")])],1)],1),i("v-uni-view",{staticClass:"m-center"},[i("v-uni-view",{staticClass:"center-item no-top",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/order/list?type=1")}}},[i("v-uni-image",{attrs:{src:"/static/images/c-1.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("我的买单")])],1),i("v-uni-view",{staticClass:"center-item no-top",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/order/list?type=2")}}},[i("v-uni-image",{attrs:{src:"/static/images/c-2.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("我的卖单")])],1),i("v-uni-view",{staticClass:"center-item no-top",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/order/buyList")}}},[i("v-uni-image",{attrs:{src:"/static/images/c-3.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("实物订单")])],1),i("v-uni-view",{staticClass:"center-item no-top",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/team/invitation")}}},[i("v-uni-image",{attrs:{src:"/static/images/c-4.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("邀请函")])],1),i("v-uni-view",{staticClass:"center-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/account/findBank")}}},[i("v-uni-image",{attrs:{src:"/static/images/c-5.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("收款设置")])],1),i("v-uni-view",{staticClass:"center-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/address/list")}}},[i("v-uni-image",{attrs:{src:"/static/images/c-6.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("收货地址")])],1),i("v-uni-view",{staticClass:"center-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/team/friends")}}},[i("v-uni-image",{attrs:{src:"/static/images/c-7.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("我的好友")])],1),i("v-uni-view",{staticClass:"center-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/card/list")}}},[i("v-uni-image",{attrs:{src:"/static/images/c-8.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("我的入场券")])],1),i("v-uni-view",{staticClass:"center-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/passway/explain")}}},[i("v-uni-image",{attrs:{src:"/static/images/icon-explain.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("体验通道")])],1),i("v-uni-view",{staticClass:"center-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/passway/passfare")}}},[i("v-uni-image",{attrs:{src:"/static/images/icon-passfare.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("绿色通道")])],1),i("v-uni-view",{staticClass:"center-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/customer/customer")}}},[i("v-uni-image",{attrs:{src:"/static/images/customer.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("人工客服")])],1),i("v-uni-view",{staticClass:"center-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/income/index")}}},[i("v-uni-image",{attrs:{src:"/static/images/income.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("收益统计")])],1),i("v-uni-view",{staticClass:"center-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/income/paihang")}}},[i("v-uni-image",{attrs:{src:"/static/images/paihang.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("排行榜")])],1),i("v-uni-view",{staticClass:"center-item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/blindbox/index")}}},[i("v-uni-image",{attrs:{src:"/static/images/blind-logo.png",mode:"aspectFill"}}),i("v-uni-view",[t._v("盲盒")])],1)],1),i("v-uni-view",{staticClass:"dbh"}),i("uni-popup",{ref:"showUp"},[i("v-uni-view",{staticClass:"main-up"},[i("v-uni-view",{staticClass:"up-title"},[t._v("购买升级卡")]),i("v-uni-view",{staticClass:"up-price"},[t._v("￥"+t._s(t.upData.money))]),i("v-uni-view",{staticClass:"up-intro"},[t._v("升级卡是付费的哦")]),i("v-uni-view",{staticClass:"up-intro"},[t._v("现在购买即刻享有"),i("v-uni-text",{staticClass:"red"},[t._v(t._s(t.upData.name))]),t._v("永久分润权益")],1),i("v-uni-view",{staticClass:"up-b"},[i("v-uni-view",{staticClass:"up-close",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closeUp.apply(void 0,arguments)}}},[t._v("再想想")]),i("v-uni-view",{staticClass:"up-com",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.upBuy.apply(void 0,arguments)}}},[t._v("购买")])],1)],1)],1),i("ssPaymentPassword",{ref:"paymentPassword",attrs:{mode:"1"},on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.upBuy.apply(void 0,arguments)}}})],1)},s=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return i}))},c139:function(t,e,a){"use strict";a.r(e);var i=a("909b"),n=a("f357");for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);a("86d9");var o,c=a("f0c5"),d=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,"14d6e31d",null,!1,i["a"],o);e["default"]=d.exports},c296:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'.container[data-v-14d6e31d],\nuni-page-body[data-v-14d6e31d]{background-color:#f4f5f6}.pure_top[data-v-14d6e31d]{width:100%;height:%?400?%;position:relative;z-index:0;overflow:hidden}.pure_top[data-v-14d6e31d]::after{content:"";width:140%;height:%?400?%;position:absolute;left:-20%;top:0;z-index:-1;border-radius:0 0 50% 50%;background:#e93d3d}.m-head[data-v-14d6e31d]{width:%?140?%;height:%?140?%;border-radius:%?70?%;float:left;margin:%?80?% %?30?% 0 %?50?%}.m-r[data-v-14d6e31d]{width:%?500?%;float:left;margin-top:%?80?%;color:#fff}.m-name[data-v-14d6e31d]{font-size:%?33?%;height:%?66?%;line-height:%?66?%}.m-name-a[data-v-14d6e31d]{float:left;margin-right:%?20?%}.m-name-b[data-v-14d6e31d]{float:left;background-color:#2d2c31;color:#f6d79e;width:%?170?%;border-radius:%?11?%;margin-top:%?7?%}.m-rank-name[data-v-14d6e31d]{font-size:%?22?%;float:left;width:%?130?%;height:%?45?%;line-height:%?45?%;text-align:center}.m-name-b uni-image[data-v-14d6e31d]{width:%?30?%;height:%?30?%;float:right;margin-right:%?10?%;margin-top:%?6?%}.m-rank-up[data-v-14d6e31d]{width:%?40?%;height:%?40?%;float:left;margin-top:%?-15?%;margin-left:%?-25?%}.m-rank-up uni-image[data-v-14d6e31d]{width:%?40?%;height:%?40?%}.m-ask[data-v-14d6e31d]{color:#efefef;width:%?500?%}.bth-ask[data-v-14d6e31d]{margin-left:%?60?%;border:1px solid #efefef;padding:%?8?% %?30?%;border-radius:%?30?%}.top-setting[data-v-14d6e31d]{color:#fff;position:absolute;right:%?30?%;top:%?30?%}.m-account[data-v-14d6e31d]{width:%?660?%;height:%?150?%;margin-left:%?45?%;background-color:#fff;border-radius:%?20?%;position:absolute;margin-top:%?-120?%;display:-webkit-box;display:-webkit-flex;display:flex}.account-item[data-v-14d6e31d]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;border-left:1px solid #f4f5f6;height:%?80?%;margin-top:%?35?%}.account-item[data-v-14d6e31d]:nth-child(1){border:0}.account-money[data-v-14d6e31d]{font-weight:600;font-size:%?28?%}.account-name[data-v-14d6e31d]{color:#9c9c9c;font-size:%?28?%}.m-center[data-v-14d6e31d]{width:100%;background-color:#fff;\n\t/* height: 500upx; */margin-top:%?100?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:%?30?% 0;-webkit-box-sizing:border-box;box-sizing:border-box}.center-item[data-v-14d6e31d]{width:%?180?%;\n\t/* float: left; */text-align:center;color:#9c9c9c;margin-top:%?30?%}.no-top[data-v-14d6e31d]{margin-top:0}.center-item uni-image[data-v-14d6e31d]{width:%?80?%;height:%?80?%}.center-item uni-view[data-v-14d6e31d]{height:%?30?%;line-height:%?30?%}\n\n/*升级*/.main-up[data-v-14d6e31d]{width:%?600?%;height:%?450?%;background-color:#fff;border-radius:%?25?%;text-align:center;padding-top:%?50?%}.up-title[data-v-14d6e31d]{font-weight:600;height:%?60?%;line-height:%?60?%;font-size:%?40?%}.up-price[data-v-14d6e31d]{height:%?60?%;line-height:%?60?%;font-size:%?37?%;font-weight:600;margin-top:%?30?%;margin-bottom:%?20?%}.up-intro[data-v-14d6e31d]{font-size:%?20?%}.up-b[data-v-14d6e31d]{width:%?500?%;margin:0 auto;margin-top:%?25?%}.up-b uni-view[data-v-14d6e31d]{float:left;width:%?220?%;height:%?80?%;line-height:%?80?%;border-radius:%?10?%;font-weight:600}.up-b .up-close[data-v-14d6e31d]{background-color:#f5f5f7;color:#000}.up-b .up-com[data-v-14d6e31d]{background-color:#313035;color:#f3d59f;float:right}.up-level[data-v-14d6e31d]{margin-top:%?6?%;line-height:%?36?%;border:1px solid #fff;border-radius:%?10?%;padding:%?2?% %?20?%;margin-left:%?15?%;float:left;font-size:%?24?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.up-level uni-text[data-v-14d6e31d]{margin-left:%?10?%}.get-level[data-v-14d6e31d]{border-color:#333;background-color:#333}body.?%PAGE?%[data-v-14d6e31d]{background-color:#f4f5f6}',""]),t.exports=e},c995:function(t,e,a){var i=a("c296");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("5e9dd7fc",i,!0,{sourceMap:!1,shadowMode:!1})},e7c9:function(t,e,a){"use strict";var i=a("ee27");a("c975"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("b951")),s=function(t,e,a){var i=[n.default.H5Wei.AppId,t.timeStamp,t.nonceStr,t.signature,t.package,t.paySign,t.signType],s=i[0],o=i[1],c=i[2],d=(i[3],i[4]),u=i[5],l=i[6];function r(){console.log(o),WeixinJSBridge.invoke("getBrandWCPayRequest",{nonceStr:c,timeStamp:o,package:d,signType:l,paySign:u,appId:s},(function(t){t.err_msg.indexOf("ok")>=0?e(t):a(t)}))}function v(){"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",r,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",r),document.attachEvent("onWeixinJSBridgeReady",r)):r()}setTimeout(v(),0)},o=s;e.default=o},f357:function(t,e,a){"use strict";a.r(e);var i=a("543b"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);e["default"]=n.a}}]);