(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-account-account"],{"24f2":function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,".container[data-v-3c0f18fc],\nuni-page-body[data-v-3c0f18fc]{background-color:#f4f5f6}.top[data-v-3c0f18fc]{width:100%;height:%?300?%;background-color:#de373e;text-align:center;padding-top:%?50?%}.top .money[data-v-3c0f18fc]{color:#fff;font-size:%?55?%;font-weight:600;height:%?80?%;line-height:%?80?%;margin-bottom:%?15?%}.top .intro[data-v-3c0f18fc]{color:#fff;font-size:%?25?%;margin-bottom:%?30?%}.bt-box[data-v-3c0f18fc]{width:%?550?%;margin:0 auto;margin-top:%?50?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around}.top .bt-tx[data-v-3c0f18fc]{color:#fff;font-size:%?30?%;border:1px solid #fff;width:%?150?%;margin:0 auto;height:%?56?%;line-height:%?56?%;border-radius:%?28?%;margin-bottom:%?10?%;float:left}.bt-tx[data-v-3c0f18fc]:nth-child(1),\n.bt-tx[data-v-3c0f18fc]:nth-child(2){margin-right:%?50?%}.m-btn[data-v-3c0f18fc]{width:%?750?%;height:%?100?%;line-height:%?100?%;display:-webkit-box;display:-webkit-flex;display:flex}.m-btn uni-view[data-v-3c0f18fc]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;height:%?100?%;line-height:%?100?%}.m-btn uni-view uni-text[data-v-3c0f18fc]{font-size:%?34?%;margin-right:%?15?%}.m-btn .m-btn-a[data-v-3c0f18fc]{background-color:#e93f42;color:#fff}.m-btn .m-btn-b[data-v-3c0f18fc]{background-color:#c92b39;color:#fff}.m-main[data-v-3c0f18fc]{width:%?680?%;margin:0 auto;margin-top:%?50?%}.m-main .m-item[data-v-3c0f18fc]{width:%?320?%;height:%?240?%;background-color:#fff;float:left;margin-bottom:%?30?%;border-radius:%?25?%;padding:%?20?%}.m-item[data-v-3c0f18fc]:nth-child(even){float:right}.m-item .m-title[data-v-3c0f18fc]{font-size:%?30?%;height:%?55?%;line-height:%?55?%;color:#000}.m-item .m-num[data-v-3c0f18fc]{color:#b43c58;text-align:center;height:%?90?%;line-height:%?90?%;font-weight:600}.m-item .m-link[data-v-3c0f18fc]{text-align:center;color:#000}.m-item .m-link uni-text[data-v-3c0f18fc]{text-align:center;color:#9d9d9b;font-size:%?32?%}.bt-mx[data-v-3c0f18fc]{color:#fff;position:absolute;top:%?40?%;right:%?30?%}body.?%PAGE?%[data-v-3c0f18fc]{background-color:#f4f5f6}",""]),t.exports=i},6910:function(t,i,n){"use strict";function e(){return new Promise((function(t,i){try{navigator.clipboard.readText().then(t).catch(i)}catch(n){i(n)}}))}function a(t){return new Promise((function(i,n){var e=document.createElement("textarea");e.value=t,e.readOnly=!0,document.body.appendChild(e),e.select(),e.setSelectionRange(0,t.length),document.execCommand("copy"),e.remove(),i(t)}))}n("d3b7"),Object.defineProperty(i,"__esModule",{value:!0}),i.getClipboardData=e,i.setClipboardData=a},"8e54":function(t,i,n){"use strict";var e=n("9b59"),a=n.n(e);a.a},9614:function(t,i,n){"use strict";n.r(i);var e=n("a3a7"),a=n.n(e);for(var c in e)"default"!==c&&function(t){n.d(i,t,(function(){return e[t]}))}(c);i["default"]=a.a},"9b59":function(t,i,n){var e=n("24f2");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=n("4f06").default;a("fc187be6",e,!0,{sourceMap:!1,shadowMode:!1})},a3a7:function(t,i,n){"use strict";var e=n("ee27");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=n("6910"),c=e(n("b951")),o={data:function(){return{acer_truncatum:0,nvitationCode:"",achievement:0,pidNum:0,recommend:0,reward:0}},onShow:function(){this.$store.commit("judgeLogin"),this.getUserData()},onLoad:function(t){var i=uni.getStorageSync("uerInfo");this.nvitationCode=i.invitation},methods:{dump:function(t){uni.navigateTo({url:t})},getUserData:function(){var t=this;t.$request.account.goldIngot({}).then((function(i){1==i.status?(t.acer_truncatum=i.data.userAcerTruncatum,t.achievement=i.data.achievement,t.pidNum=i.data.pidNum,t.recommend=i.data.recommend,t.reward=i.data.reward):t.$tools.toast(i.msg)})).catch((function(i){t.$tools.toast("数据加载异常")}))},copyUrl:function(){var t=this,i=c.default.SITE+"#/pages/member/registered?nvitationCode="+this.nvitationCode;(0,a.setClipboardData)(i).then((function(){t.$tools.toast("复制成功")}))}}};i.default=o},c150:function(t,i,n){"use strict";var e,a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"top"},[n("v-uni-view",{staticClass:"money"},[t._v(t._s(t.acer_truncatum))]),n("v-uni-view",{staticClass:"bt-box"},[n("v-uni-view",{staticClass:"bt-tx",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dump("/pages/account/withdrawal?type=1")}}},[t._v("提现")]),n("v-uni-view",{staticClass:"bt-tx",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dump("/pages/account/give?type=1")}}},[t._v("转赠")])],1),n("v-uni-view",{staticClass:"bt-mx",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dump("/pages/account/details?type=1")}}},[t._v("明细")])],1),n("v-uni-view",{staticClass:"m-btn"},[n("v-uni-view",{staticClass:"m-btn-a",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.copyUrl.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"uni-icon"},[t._v("")]),t._v("复制邀请链接")],1),n("v-uni-view",{staticClass:"m-btn-b",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dump("/pages/team/invitation")}}},[n("v-uni-text",{staticClass:"uni-icon"},[t._v("")]),t._v("生成专属邀请海报")],1)],1),n("v-uni-view",{staticClass:"m-main"},[n("v-uni-view",{staticClass:"m-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dump("/pages/team/friends")}}},[n("v-uni-view",{staticClass:"m-title"},[t._v("邀请好友")]),n("v-uni-view",{staticClass:"m-num"},[t._v(t._s(t.pidNum)+"人")]),n("v-uni-view",{staticClass:"m-link"},[t._v("好友明细"),n("v-uni-text",{staticClass:"uni-icon"},[t._v("")])],1)],1),n("v-uni-view",{staticClass:"m-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dump("/pages/account/recommend?type=1")}}},[n("v-uni-view",{staticClass:"m-title"},[t._v("推荐奖励")]),n("v-uni-view",{staticClass:"m-num"},[t._v("￥"+t._s(t.recommend))]),n("v-uni-view",{staticClass:"m-link"},[t._v("奖励明细"),n("v-uni-text",{staticClass:"uni-icon"},[t._v("")])],1)],1),n("v-uni-view",{staticClass:"m-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dump("/pages/account/teamView")}}},[n("v-uni-view",{staticClass:"m-title"},[t._v("团队奖")]),n("v-uni-view",{staticClass:"m-num"},[t._v("￥"+t._s(t.reward))]),n("v-uni-view",{staticClass:"m-link"},[t._v("奖励明细"),n("v-uni-text",{staticClass:"uni-icon"},[t._v("")])],1)],1),n("v-uni-view",{staticClass:"m-item"},[n("v-uni-view",{staticClass:"m-title"},[t._v("团队业绩")]),n("v-uni-view",{staticClass:"m-num"},[t._v("￥"+t._s(t.achievement))])],1)],1)],1)},c=[];n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return c})),n.d(i,"a",(function(){return e}))},fd11:function(t,i,n){"use strict";n.r(i);var e=n("c150"),a=n("9614");for(var c in a)"default"!==c&&function(t){n.d(i,t,(function(){return a[t]}))}(c);n("8e54");var o,s=n("f0c5"),u=Object(s["a"])(a["default"],e["b"],e["c"],!1,null,"3c0f18fc",null,!1,e["a"],o);i["default"]=u.exports}}]);