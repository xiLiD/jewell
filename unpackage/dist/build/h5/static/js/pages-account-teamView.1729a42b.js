(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-account-teamView"],{"0272":function(n,t,e){"use strict";var r,a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{staticClass:"modal-box"},[e("v-uni-view",{staticClass:"modal-back",on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.setClose.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"modal-contain"},[e("v-uni-view",{staticClass:"modal-title space-middle"},[n._v(n._s(n.time)+" 收益详情")]),e("v-uni-view",{staticClass:"modal-desc space-mini"},[e("v-uni-view",{staticClass:"thead"},[e("table",{staticClass:"table-month",attrs:{border:"0",cellpadding:"0",cellspacing:"0",width:"100%"}},[e("thead",{staticClass:"space-mini"},[e("tr",[e("td",[n._v("团队成员")]),e("td",[n._v("时间")]),e("td",[n._v("金额")])])]),e("tbody",n._l(n.list,(function(t){return e("tr",{key:t.id},[e("td",[n._v(n._s(t.id_card_name))]),e("td",[n._v(n._s(t.time))]),e("td",[n._v(n._s(t.money))])])})),0),n.list?n._e():e("v-uni-view",[e("noData",{ref:"noData"})],1)],1)])],1)],1)],1)},i=[];e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return r}))},"0832":function(n,t,e){var r=e("b012");"string"===typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);var a=e("4f06").default;a("28bfc83a",r,!0,{sourceMap:!1,shadowMode:!1})},"1a2a":function(n,t,e){var r=e("24fb");t=r(!1),t.push([n.i,"\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n \r\n/* page {\r\n\tbackground-color: rgb(229,229,229);\r\n} */.team-menu[data-v-2152f148]{width:100%;padding:%?20?% %?40?%;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff}.team-menu-box[data-v-2152f148]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:100%;border-radius:%?10?%;overflow:hidden}.team-menu-box .active[data-v-2152f148]{background-color:#fff}.team-menu-box >uni-view[data-v-2152f148]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;background-color:#e5e5e5;font-size:%?30?%;padding:%?4?% 0;font-weight:700}.user-info[data-v-2152f148]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.user-info .user-avater uni-image[data-v-2152f148]{width:%?100?%;height:%?100?%}.user-info .user-desc[data-v-2152f148]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;margin-left:%?10?%}.table-month td[data-v-2152f148]{text-align:center;padding:%?10?% 0}thead[data-v-2152f148]{background-color:#e5e5e5}thead tr td[data-v-2152f148]{font-weight:700;font-size:%?30?%;width:33%}tbody tr td[data-v-2152f148]{font-weight:700;font-size:%?26?%}\r\n/* tbody tr:nth-child(2n) {\r\n\tcolor:#fff;\r\n} */tbody tr[data-v-2152f148]:nth-child(2n + 1){background-color:#fff;color:#3c3c3c}.cur-month tr td[data-v-2152f148]:nth-child(1){width:40%}.team-income[data-v-2152f148]{width:80%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;\r\n\t/* padding: 20upx 0; */margin-top:%?20?%;font-weight:700}.team-income >uni-view[data-v-2152f148]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center}.income-num[data-v-2152f148]{font-size:%?30?%}.red-line[data-v-2152f148]{color:#d52941}.earn-details[data-v-2152f148]{background-color:#d52941;color:#fff;padding:%?6?% %?20?%;border-radius:%?10?%;font-size:%?28?%}",""]),n.exports=t},"41ef":function(n,t,e){"use strict";var r=e("0832"),a=e.n(r);a.a},4526:function(n,t,e){"use strict";var r=e("b600"),a=e.n(r);a.a},"6dbe":function(n,t,e){"use strict";var r=e("ee27");e("4160"),e("a9e3"),e("ac1f"),e("1276"),e("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(e("e6fa")),i=r(e("d756")),o={components:{modalDetails:i.default},data:function(){return{showDetails:!1,menu:1,dayList:[],monthList:[],curOrder:{},monthOrder:{},curTime:"",detailsList:[]}},methods:{seeDetails:function(n){var t=this;console.log(n),this.curTime=n&&n.split(" ")[0]?n.split(" ")[0]:n,this.$request.account.teamearning({type:this.curTime}).then((function(n){n.data.dayearning&&n.data.dayearning.forEach((function(n){n.time=a.default.transformTime(Number(n.time+"000"))}));var e=n.data.dayearning;t.detailsList=e,t.showDetails=!0})).catch((function(n){console.log(n)}))},checkMenu:function(n){this.menu=n},getIncome:function(){var n=this;this.$request.account.teamearning({type:"today"}).then((function(t){n.curOrder.count=t.data.count,n.curOrder.earning=t.data.earning,t.data.dayearning&&t.data.dayearning.forEach((function(n){n.time=a.default.transformTime(Number(n.time+"000"))})),n.dayList=t.data.dayearning,console.log(t)})).catch((function(n){console.log(n)}))},getMonthIncome:function(){var n=this;this.$request.account.monthteam({}).then((function(t){n.monthOrder.count=t.data.count,n.monthOrder.earning=t.data.earning,console.log(n.curOrder),t.data.monthteam&&t.data.monthteam.forEach((function(n){n.time=a.default.transformTime(Number(n.time+"000"))})),n.monthList=t.data.monthteam})).catch((function(n){console.log(n)}))}},onLoad:function(){this.getIncome(),this.getMonthIncome()}};t.default=o},"72b8":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={props:{list:Array,time:String},data:function(){return{}},methods:{setClose:function(){console.log("关闭"),this.$emit("closeDialog")}}};t.default=r},"775a":function(n,t,e){"use strict";e.r(t);var r=e("6dbe"),a=e.n(r);for(var i in r)"default"!==i&&function(n){e.d(t,n,(function(){return r[n]}))}(i);t["default"]=a.a},"925a":function(n,t,e){"use strict";e.r(t);var r=e("b86b"),a=e("775a");for(var i in a)"default"!==i&&function(n){e.d(t,n,(function(){return a[n]}))}(i);e("4526");var o,c=e("f0c5"),s=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,"2152f148",null,!1,r["a"],o);t["default"]=s.exports},b012:function(n,t,e){var r=e("24fb");t=r(!1),t.push([n.i,".modal-box[data-v-2fbb977e]{padding:%?10?% %?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;position:fixed;top:0;left:0;width:100vw;height:100vh;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.modal-back[data-v-2fbb977e]{position:fixed;\n\t\t/* top: 44px; */left:0;width:100vw;height:100vh;background-color:rgba(0,0,0,.7)}.modal-contain[data-v-2fbb977e]{width:%?680?%;\n\t\t/* height: 450upx; */border-radius:%?20?%;background-color:#fff;-webkit-box-shadow:0 0 5px 1px #999;box-shadow:0 0 5px 1px #999;z-index:99;position:relative;-webkit-animation:runBigger-data-v-2fbb977e .3s linear;animation:runBigger-data-v-2fbb977e .3s linear;padding-bottom:%?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}@-webkit-keyframes runBigger-data-v-2fbb977e{0%{-webkit-transform:scale(0);transform:scale(0)}75%{-webkit-transform:scale(1.1);transform:scale(1.1)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes runBigger-data-v-2fbb977e{0%{-webkit-transform:scale(0);transform:scale(0)}75%{-webkit-transform:scale(1.1);transform:scale(1.1)}100%{-webkit-transform:scale(1);transform:scale(1)}}\n\n\t/* .space-mini {\n\tletter-spacing: 1px;\n}\n.space-middle {\n\tletter-spacing: 2px;\n} */.modal-title[data-v-2fbb977e]{font-size:%?30?%;font-weight:700;padding:%?10?% %?30?%;width:100%;text-align:center;background-color:#e7e3e0;margin:0 auto}.modal-desc[data-v-2fbb977e]{padding:0 %?10?%;margin-top:%?20?%;color:#ababab;line-height:1.5;height:%?500?%;overflow-y:scroll}.table-month td[data-v-2fbb977e]{text-align:center;padding:%?10?% 0}thead[data-v-2fbb977e]{background-color:#e5e5e5}thead tr td[data-v-2fbb977e]{font-weight:700;font-size:%?30?%}tbody tr td[data-v-2fbb977e]{font-weight:700;font-size:%?26?%}\n\n\t/* tbody tr:nth-child(2n) {\n\tcolor:#fff;\n} */tbody tr[data-v-2fbb977e]:nth-child(2n + 1){background-color:#fff;color:#3c3c3c}",""]),n.exports=t},b600:function(n,t,e){var r=e("1a2a");"string"===typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);var a=e("4f06").default;a("3081722a",r,!0,{sourceMap:!1,shadowMode:!1})},b86b:function(n,t,e){"use strict";var r,a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{staticClass:"pager-box team-pager"},[e("v-uni-view",{staticClass:"team-menu"},[e("v-uni-view",{staticClass:"team-menu-box space-mini"},[e("v-uni-view",{class:["team-menu-item",{active:1==n.menu}],on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.checkMenu(1)}}},[n._v("今日")]),e("v-uni-view",{class:["team-menu-item",{active:2==n.menu}],on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.checkMenu(2)}}},[n._v("本月")])],1),e("v-uni-view",{staticClass:"team-income"},[e("v-uni-view",[e("v-uni-view",{staticClass:"income-name"},[n._v("订单(笔)")]),e("v-uni-view",{staticClass:"income-num"},[n._v(n._s(1==n.menu?n.curOrder.count:n.monthOrder.count))])],1),e("v-uni-view",[e("v-uni-view",{staticClass:"income-name"},[n._v("收益(元)")]),e("v-uni-view",{staticClass:"income-num red-line"},[n._v(n._s(1==n.menu?n.curOrder.earning:n.monthOrder.earning))])],1)],1)],1),e("v-uni-view",{staticClass:"team-list-container"},[1==n.menu?e("table",{staticClass:"table-month",attrs:{border:"0",cellpadding:"0",cellspacing:"0",width:"100%"}},[e("thead",{staticClass:"space-mini"},[e("tr",[e("td",[n._v("团队成员")]),e("td",[n._v("时间")]),e("td",[n._v("金额")])])]),e("tbody",n._l(n.dayList,(function(t){return e("tr",{key:t.id},[e("td",[n._v(n._s(t.id_card_name))]),e("td",[n._v(n._s(t.time))]),e("td",[n._v(n._s(t.money))])])})),0),0==n.dayList.length?e("v-uni-view",[e("noData",{ref:"noData"})],1):n._e()],1):e("table",{staticClass:"table-month cur-month",attrs:{border:"0",cellpadding:"0",cellspacing:"0",width:"100%"}},[e("thead",{staticClass:"space-mini"},[e("tr",[e("td",[n._v("日期")]),e("td",[n._v("金额")]),e("td",[n._v("详情")])])]),e("tbody",n._l(n.monthList,(function(t){return e("tr",{key:t.id},[e("td",[n._v(n._s(t.time))]),e("td",[n._v(n._s(t.money))]),e("td",[e("span",{staticClass:"earn-details",on:{click:function(e){arguments[0]=e=n.$handleEvent(e),n.seeDetails(t.time)}}},[n._v("详情")])])])})),0),0==n.monthList.length?e("v-uni-view",[e("noData",{ref:"noData"})],1):n._e()],1)]),n.showDetails?e("modal-details",{attrs:{list:n.detailsList,time:n.curTime},on:{closeDialog:function(t){arguments[0]=t=n.$handleEvent(t),n.showDetails=!1}}}):n._e()],1)},i=[];e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return r}))},ce07:function(n,t,e){"use strict";e.r(t);var r=e("72b8"),a=e.n(r);for(var i in r)"default"!==i&&function(n){e.d(t,n,(function(){return r[n]}))}(i);t["default"]=a.a},d756:function(n,t,e){"use strict";e.r(t);var r=e("0272"),a=e("ce07");for(var i in a)"default"!==i&&function(n){e.d(t,n,(function(){return a[n]}))}(i);e("41ef");var o,c=e("f0c5"),s=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,"2fbb977e",null,!1,r["a"],o);t["default"]=s.exports}}]);