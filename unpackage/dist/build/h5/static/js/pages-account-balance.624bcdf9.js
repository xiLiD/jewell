(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-account-balance"],{"0202":function(t,a,n){"use strict";n.r(a);var e=n("2d1a"),c=n("bda6");for(var i in c)"default"!==i&&function(t){n.d(a,t,(function(){return c[t]}))}(i);n("898a");var o,r=n("f0c5"),u=Object(r["a"])(c["default"],e["b"],e["c"],!1,null,"3c4acf65",null,!1,e["a"],o);a["default"]=u.exports},"2c93":function(t,a,n){var e=n("c405");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var c=n("4f06").default;c("58fc8282",e,!0,{sourceMap:!1,shadowMode:!1})},"2d1a":function(t,a,n){"use strict";var e;n.d(a,"b",(function(){return c})),n.d(a,"c",(function(){return i})),n.d(a,"a",(function(){return e}));var c=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"xmx",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.dump("/pages/account/details?type=3")}}},[t._v("佣金明细")]),e("v-uni-view",{staticClass:"main-con"},[e("v-uni-image",{attrs:{src:n("f59c"),mode:"aspectFill"}}),e("v-uni-view",{staticClass:"main-titel"},[t._v("我的佣金")]),e("v-uni-view",{staticClass:"main-price"},[e("v-uni-text",[t._v("￥")]),t._v(t._s(t.balance))],1)],1),e("v-uni-view",{staticClass:"main-bottom"},[e("v-uni-view",{staticClass:"btn-con",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.dump("/pages/account/withdrawal?type=2")}}},[t._v("提现")])],1)],1)},i=[]},8542:function(t,a,n){"use strict";function e(){return new Promise((function(t,a){try{navigator.clipboard.readText().then(t).catch(a)}catch(n){a(n)}}))}function c(t){return new Promise((function(a,n){var e=document.createElement("textarea");e.value=t,e.readOnly=!0,document.body.appendChild(e),e.select(),e.setSelectionRange(0,t.length),document.execCommand("copy"),e.remove(),a(t)}))}n("d3b7"),Object.defineProperty(a,"__esModule",{value:!0}),a.getClipboardData=e,a.setClipboardData=c},"898a":function(t,a,n){"use strict";var e=n("2c93"),c=n.n(e);c.a},bda6:function(t,a,n){"use strict";n.r(a);var e=n("c824"),c=n.n(e);for(var i in e)"default"!==i&&function(t){n.d(a,t,(function(){return e[t]}))}(i);a["default"]=c.a},c405:function(t,a,n){var e=n("24fb");a=e(!1),a.push([t.i,".xmx[data-v-3c4acf65]{margin-right:%?30?%;margin-top:%?30?%;color:#545454;font-weight:600;float:right;clear:both;margin-bottom:%?170?%}.main-con[data-v-3c4acf65]{width:100%;margin:0 auto;text-align:center;clear:both}.main-con uni-image[data-v-3c4acf65]{width:%?100?%;height:%?100?%}.main-titel[data-v-3c4acf65]{color:#545454;font-size:%?35?%;font-weight:600;margin-top:%?30?%}.main-price[data-v-3c4acf65]{font-size:%?75?%;color:#000;font-weight:600}.main-price uni-text[data-v-3c4acf65]{font-size:%?45?%}.main-bottom[data-v-3c4acf65]{position:absolute;bottom:%?200?%;width:%?600?%;margin-left:%?75?%}.btn-con[data-v-3c4acf65]{background-color:#212025;color:#f7d3a1;width:%?250?%;text-align:center;height:%?88?%;line-height:%?88?%;margin:0 auto}\n\n/* .btn-con:nth-child(1){\n\tmargin-right: 100upx;\n} */",""]),t.exports=a},c824:function(t,a,n){"use strict";var e=n("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;n("8542");var c=e(n("a675")),i={components:{ssPaymentPassword:c.default},data:function(){return{acer_truncatum:0,gold_balance:0,balance:0}},onShow:function(t){this.$store.commit("judgeLogin"),this.getUserData()},onLoad:function(t){},methods:{dump:function(t){uni.navigateTo({url:t})},getUserData:function(){var t=this;t.$request.user.getUserData({}).then((function(a){1==a.status?(t.balance=a.data.balance,t.acer_truncatum=a.data.acer_truncatum,t.gold_balance=a.data.gold_balance):uni.showToast({icon:"none",title:a.msg})})).catch((function(t){uni.showToast({icon:"none",title:"数据加载异常"})}))}}};a.default=i},f59c:function(t,a,n){t.exports=n.p+"static/img/money.19154c99.png"}}]);