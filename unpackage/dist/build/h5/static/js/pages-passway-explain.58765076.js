(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-passway-explain"],{"0665":function(t,e,a){var i=a("cfb3");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("0a9d8386",i,!0,{sourceMap:!1,shadowMode:!1})},"16bb":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{greenInfo:{time:""}}},onLoad:function(){this.getSearch()},methods:{getSearch:function(){var t=this;this.$request.passway.greenload({}).then((function(e){console.log(e),t.greenInfo=e.data}))}}};e.default=i},"1d1e":function(t,e,a){t.exports=a.p+"static/img/explain.40972d1c.jpg"},"1e09":function(t,e,a){"use strict";a.r(e);var i=a("49d6"),n=a("b983");for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("c120");var o,c=a("f0c5"),s=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,"2953c521",null,!1,i["a"],o);e["default"]=s.exports},"49d6":function(t,e,a){"use strict";var i,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"wrapper-page"},[i("v-uni-view",{staticClass:"wrapper-header"},[i("v-uni-view",{staticClass:"header-image"},[i("v-uni-image",{attrs:{src:a("1d1e"),mode:"widthFix"}})],1)],1),i("v-uni-view",{staticClass:"wrapper-center back-white"},[i("v-uni-view",{staticClass:"tit"},[t._v("申请体验说明")]),i("v-uni-view",{staticClass:"explain-list"},[i("v-uni-view",{staticClass:"explain-menu"},[t._v("1、新注册会员激活后，新会员和邀请人都能获得7天体验通道时间。")]),i("v-uni-view",{staticClass:"explain-menu"},[t._v("2、体验期间每场可以提前三分钟进场、每场限拍一单；整点抢单不影响。")]),i("v-uni-view",{staticClass:"explain-menu"},[t._v("3、当日激活当日体验。")])],1)],1),i("v-uni-view",{staticClass:"notice-btn"},[t._v("体验通道剩余: "+t._s(t.greenInfo.time||0)+" 天")])],1)},r=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return i}))},b983:function(t,e,a){"use strict";a.r(e);var i=a("16bb"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},c120:function(t,e,a){"use strict";var i=a("0665"),n=a.n(i);n.a},cfb3:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".wrapper-page[data-v-2953c521]{font-size:%?28?%;background-color:#e5e5e5}.wrapper-header[data-v-2953c521]{\n\t/* height: 600upx ; */width:100%}.header-image[data-v-2953c521]{line-height:10px}.header-image uni-image[data-v-2953c521]{width:100%;line-height:10px;\n\t/* height: 348upx; */display:inline-block}.edition[data-v-2953c521]{padding:%?4?% %?15?%;border-radius:%?6?%;border:1px solid red;color:red;font-size:%?24?%}.header-desc[data-v-2953c521]{padding:%?20?% %?15?%}.desc-tit[data-v-2953c521]{margin-left:%?10?%;font-weight:600}.back-white[data-v-2953c521]{background-color:#fff}.wrapper-center[data-v-2953c521]{\n\t/* margin-top: 20upx; */padding:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.tit[data-v-2953c521]{text-align:center;font-size:%?32?%;font-weight:700}.explain-menu[data-v-2953c521]{margin-top:%?20?%;line-height:1.5;font-weight:700}.notice-btn[data-v-2953c521]{position:fixed;bottom:%?40?%;width:%?650?%;padding:%?10?% 0;color:#fff;font-size:%?34?%;letter-spacing:%?2?%;font-weight:700;text-align:center;background-color:#ffb900;margin:0 auto;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);-webkit-box-shadow:0 %?4?% %?10?% #000;box-shadow:0 %?4?% %?10?% #000}.top-20[data-v-2953c521]{margin-top:%?20?%}.no-data[data-v-2953c521]{font-weight:700;text-align:center}.explain-list[data-v-2953c521]{margin-top:%?10?%}",""]),t.exports=e}}]);