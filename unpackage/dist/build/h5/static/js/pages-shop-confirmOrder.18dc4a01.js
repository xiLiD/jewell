(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shop-confirmOrder"],{"17fc":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 自定义变量 */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.di[data-v-625e512c]{display:initial!important}.di uni-text[data-v-625e512c]{display:initial!important}.xg[data-v-625e512c]{text-decoration:line-through}.flf[data-v-625e512c]{float:left}.flr[data-v-625e512c]{float:right}.t_se[data-v-625e512c]{width:100%}.clearboth[data-v-625e512c]{clear:both}.t_se_year[data-v-625e512c]{width:100%;background-color:#fff;height:%?75?%;line-height:%?75?%}.t_se_year uni-view[data-v-625e512c]{float:left;width:33.3%;text-align:center;height:%?75?%;line-height:%?75?%}.t_se_year_l[data-v-625e512c]{color:#5bcff4;font-size:%?22.5?%;text-align:left!important;padding-left:%?56.25?%}.t_se_year_r[data-v-625e512c]{color:#5bcff4;font-size:%?22.5?%;text-align:right!important;padding-right:%?56.25?%}.e-qh[data-v-625e512c]{color:#5bcff4;font-size:%?26.25?%}.t_border[data-v-625e512c]{border-bottom:1px solid #e9e9e9;clear:both;padding-top:%?11.25?%}.t_se_m[data-v-625e512c]{margin-top:%?18.75?%;width:97%;margin-left:3%;height:auto}.t_se_m uni-text[data-v-625e512c]{border:1px solid #d6d6d6;display:block;height:%?48.75?%;line-height:%?48.75?%;width:%?86.25?%;float:left;text-align:center;margin-right:%?12.75?%;margin-bottom:%?7.5?%;border-radius:%?7.5?%;color:#6d6d6d}.t_se_m .activie[data-v-625e512c]{background-color:#00a869;color:#fff;border:1px solid #00a869}.w3[data-v-625e512c]{width:%?127.5?%!important}.t_b[data-v-625e512c]{clear:both;margin-top:%?18.75?%}.t_item[data-v-625e512c]{width:97%;margin-left:1.5%;background-color:#fff;border-radius:%?7.5?%;\r\n\t/* height: 262.5upx; */padding-top:%?15?%;margin-top:%?18.75?%}.t_l[data-v-625e512c]{float:left;width:%?150?%;height:%?150?%}.t_l uni-image[data-v-625e512c]{width:%?94?%;height:%?94?%;border-radius:%?47?%;margin:%?11.25?% 0 0 %?28?%}.t_l uni-text[data-v-625e512c]{display:block;width:100%;text-align:center;color:#737373;font-size:%?26.25?%;margin-top:%?-15?%;overflow-y:hidden;height:%?56.25?%}.t_r[data-v-625e512c]{width:calc(100%-75upx);height:%?150?%}.t_r uni-text[data-v-625e512c]{display:block;color:#5c5c5c;font-size:%?26.25?%;height:%?37.5?%;line-height:%?37.5?%}.t_r_i_l[data-v-625e512c]{display:initial!important;float:left}.t_r_i_r[data-v-625e512c]{display:initial!important;float:right;padding-right:%?26.25?%}.t_r .t_r_t[data-v-625e512c]{font-size:%?30?%;color:#484848;height:%?56.25?%;line-height:%?56.25?%}.b_r_button[data-v-625e512c]{position:absolute;right:%?37.5?%;background-color:#33b7e5;color:#fff;font-size:%?22.5?%;padding:%?3.75?% %?26.25?%;border-radius:%?5.625?%}.b_r_button_h[data-v-625e512c]{position:absolute;right:%?37.5?%;background-color:#ccc;color:#fff;font-size:%?22.5?%;padding:%?3.75?% %?26.25?%;border-radius:%?5.625?%}.b_r_text[data-v-625e512c]{position:absolute;right:%?37.5?%;font-size:%?22.5?%;padding:%?3.75?% %?26.25?%;border-radius:%?5.625?%}.t_bt[data-v-625e512c]{width:100%;background-color:#efefef;padding:%?11.25?% 0}.uni-steps__row-text uni-text[data-v-625e512c]{font-size:%?18.75?%!important}.t_bt .t_pro[data-v-625e512c]{float:left;width:33.33%;text-align:center}.t_bt .t_pro .t_pro_z[data-v-625e512c]{font-size:%?18.75?%;height:%?30?%;line-height:%?30?%}.t_bt .t_pro .t_pro_t[data-v-625e512c]{font-size:%?18.75?%;height:%?26.25?%;line-height:%?30?%}\r\n/* 列表2 */.i_b[data-v-625e512c]{clear:both;margin-top:%?18.75?%}.i_item[data-v-625e512c]{width:98%;margin-left:1%;background-color:#fff;border-radius:%?7.5?%;height:%?262.5?%;margin-top:%?18.75?%}.i_l[data-v-625e512c]{float:left;width:%?195?%;height:%?187.5?%}.i_l uni-image[data-v-625e512c]{width:%?150?%;height:%?150?%;margin:%?19?% 0 0 %?19?%}.i_r[data-v-625e512c]{width:calc(100%-225upx);height:%?112.5?%}.i_r_b[data-v-625e512c]{width:calc(100%-225upx);text-align:right;padding-right:%?37.5?%;color:#696969;float:right}.i_r uni-text[data-v-625e512c]{display:block;color:#5c5c5c;font-size:%?26.25?%;height:%?37.5?%;line-height:%?37.5?%}.i_r .i_r_t[data-v-625e512c]{font-size:%?30?%;color:#484848;line-height:%?40?%;padding-top:%?12?%;height:auto}.i_r .i_r_t_s[data-v-625e512c]{font-size:%?30?%;color:#484848;line-height:%?45?%;height:auto!important;padding-top:%?10?%;max-height:%?85?%;overflow:hidden}.i_r .i_r_i[data-v-625e512c]{font-size:%?22.5?%;color:#686868;height:%?35?%;line-height:%?35?%;margin-bottom:%?11.25?%;overflow:hidden;margin-top:%?10?%}.i_bt[data-v-625e512c]{width:100%;padding:%?11.25?% 0;padding-left:%?18.75?%;clear:both}.i_bt uni-view[data-v-625e512c]{float:left;text-align:center;border:1.3px solid #9abee0;border-radius:%?9.4?%;margin-right:%?11.25?%;padding:0 %?15?%}.i_bt .b1[data-v-625e512c]{border-color:#9abee0}.i_bt .b2[data-v-625e512c]{border-color:#d78b7d}.i_bt .b3[data-v-625e512c]{border-color:#67cdbf}.i_bt .b4[data-v-625e512c]{border-color:#e0af60}\r\n/**列表3**/.i_category[data-v-625e512c]{width:%?210?%;height:%?210?%;float:left;text-align:center;margin-left:%?33?%;margin-top:%?20?%}.i_category uni-image[data-v-625e512c]{width:%?120?%;height:%?120?%;margin:%?10?% %?50?% 0 %?50?%}.i_category uni-text[data-v-625e512c]{font-size:%?25?%}\r\n/**列表4**/.i_brand[data-v-625e512c]{width:%?170?%;height:%?160?%;float:left;text-align:center;margin-top:%?20?%}.i_brand uni-image[data-v-625e512c]{width:%?80?%;height:%?80?%;margin:%?10?% %?45?% 0 %?45?%}.i_brand uni-text[data-v-625e512c]{font-size:%?25?%;text-align:center}.uni-loadmore[data-v-625e512c]{color:#999;clear:both}.container[data-v-625e512c],\r\nuni-page-body[data-v-625e512c]{background-color:#f4f5f6}.tt[data-v-625e512c]{height:%?20?%}.top-address[data-v-625e512c]{background-color:#fff;width:%?750?%;height:%?120?%;margin:0 auto;border-radius:%?15?%}.top-address .ad-l[data-v-625e512c]{height:%?120?%;line-height:%?120?%;width:%?120?%;text-align:center;font-size:%?60?%;float:left;color:#666}.top-address .ad-c[data-v-625e512c]{float:left;height:%?120?%;line-height:%?120?%;color:#363636;font-size:%?30?%;width:%?410?%}.ad-c .ad-c-n[data-v-625e512c]{font-size:%?30?%;line-height:%?45?%;margin-top:%?15?%}.ad-c .ad-c-n uni-text[data-v-625e512c]{font-size:%?25?%;padding-left:%?10?%;color:#9b9b9b}.ad-c .ad-c-i[data-v-625e512c]{font-size:%?27?%;line-height:%?45?%;height:%?45?%;overflow:hidden}.top-address .ad-r[data-v-625e512c]{float:left;height:%?120?%;line-height:%?120?%;width:%?120?%;text-align:center;float:right;color:#ccc}.i_item[data-v-625e512c]{height:%?180?%;width:100%;margin-left:0}.i-hx[data-v-625e512c]{height:1px;width:96%;margin-left:2%;border-bottom:1px solid #e5e5e5}.i_item .i_r[data-v-625e512c]{height:%?187.5?%}.main-list[data-v-625e512c]{width:%?750?%;margin:0 auto;background-color:#fff;border-radius:3px;margin-top:%?20?%}.i-r-n[data-v-625e512c]{position:absolute;right:%?50?%;margin-top:%?130?%}.list-title[data-v-625e512c]{font-weight:600;font-size:%?35?%;margin-left:%?20?%;padding-top:%?20?%}.main-price[data-v-625e512c]{width:%?750?%;margin:0 auto;background-color:#fff;border-radius:3px;margin-top:%?20?%}.main-price .price-item[data-v-625e512c]{height:%?90?%;line-height:%?90?%;padding:0 %?19?%;font-size:%?28?%}.price-item .remarks[data-v-625e512c]{width:%?580?%;float:right;height:%?90?%;line-height:%?90?%;font-size:%?28?%;text-align:right}.price-r[data-v-625e512c]{float:right}.db-h[data-v-625e512c]{height:%?130?%}.bt-cn[data-v-625e512c]{position:fixed;bottom:0;width:100%;height:%?113?%;background-color:#fff;-webkit-box-shadow:0 0 3px #e5e5e5;box-shadow:0 0 3px #e5e5e5}.bt-cn .t-b-l[data-v-625e512c]{width:%?450?%;float:left;text-align:right}.t-b-l .t-b-tb[data-v-625e512c]{font-size:%?25?%;height:%?45?%;line-height:%?45?%;margin-top:%?15?%}.t-b-l .t-b-tb .allMoney[data-v-625e512c]{font-size:%?35?%}.t-b-l .t-b-td[data-v-625e512c]{font-size:%?25?%;height:%?45?%;line-height:%?45?%}.t-b-a[data-v-625e512c]{float:right;height:%?75?%;width:%?200?%;line-height:%?75?%;background-color:#201f24;text-align:center;color:#f8d79f;font-size:%?30?%;margin:%?20?% %?38?% 0 0;border-radius:%?10?%;border:0}body.?%PAGE?%[data-v-625e512c]{background-color:#f4f5f6}',""]),t.exports=e},3351:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"tt"}),i("v-uni-view",{staticClass:"top-address",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.selectAddress.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-icon ad-l"},[t._v("")]),t.addressItem.id<=0?i("v-uni-view",{staticClass:"ad-c"},[t._v("请选择地址")]):i("v-uni-view",{staticClass:"ad-c"},[i("v-uni-view",{staticClass:"ad-c-n"},[t._v(t._s(t.addressItem.receiving_name)),i("v-uni-text",[t._v(t._s(t.addressItem.receiving_phone))])],1),i("v-uni-view",{staticClass:"ad-c-i"},[t._v(t._s(t.addressItem.province)+" "+t._s(t.addressItem.city)+" "+t._s(t.addressItem.area)+"\n\t\t\t\t"+t._s(t.addressItem.detailed_address))])],1),i("v-uni-text",{staticClass:"uni-icon ad-r"},[t._v("")])],1),i("v-uni-view",{staticClass:"main-list"},[i("v-uni-view",{staticClass:"list-title"},[t._v("商品信息")]),t._l(t.mainItem,(function(e,a){return i("v-uni-view",{key:a,staticClass:"i_item"},[i("v-uni-view",{staticClass:"i_l",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.loadInfo(e.id)}}},[i("v-uni-image",{attrs:{src:e.goods_imgs,mode:"aspectFill"}})],1),i("v-uni-view",{staticClass:"i_r",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.loadInfo(e.id)}}},[i("v-uni-view",{staticClass:"i-r-n"},[t._v("x"+t._s(e.num))]),i("v-uni-text",{staticClass:"i_r_t_s"},[t._v(t._s(e.goods_name))]),i("v-uni-text",{staticClass:"i_r_i red"},[t._v(t._s(e.money)+"元宝")])],1),a+1<t.mainItem.length?i("v-uni-view",{staticClass:"i-hx"}):t._e()],1)}))],2),i("v-uni-view",{staticClass:"main-price"},[i("v-uni-view",{staticClass:"price-item"},[t._v("商品金额"),i("v-uni-text",{staticClass:"price-r red"},[t._v(t._s(t.price)+"元宝")])],1)],1),i("v-uni-view",{staticClass:"db-h"}),i("v-uni-view",{staticClass:"bt-cn"},[i("v-uni-view",{staticClass:"t-b-l"},[i("v-uni-view",{staticClass:"t-b-tb"},[t._v("合计："),i("v-uni-text",{staticClass:"allMoney red"},[t._v(t._s(t.price)+"元宝")])],1),i("v-uni-view",{staticClass:"t-b-td"},[t._v("共"+t._s(t.num)+"件商品")])],1),i("v-uni-view",{staticClass:"t-b-a",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openPwd()}}},[t._v("提交订单")])],1),i("ssPaymentPassword",{ref:"paymentPassword",attrs:{mode:"1"},on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.dealOrder.apply(void 0,arguments)}}})],1)},o=[]},4386:function(t,e,i){"use strict";var a=i("4ea4");i("99af"),i("7db0"),i("4160"),i("e25e"),i("ac1f"),i("1276"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;a(i("f690"));var n=a(i("a675")),o={components:{ssPaymentPassword:n.default},data:function(){return{userKey:"",order:"",mainItem:[],num:0,price:0,addressItem:{id:0},remarks:""}},onShow:function(){this.$store.commit("judgeLogin")},onLoad:function(t){var e=uni.getStorageSync("uerInfo");""!=e&&(this.userKey=e.userKey),t.order&&(this.order=t.order),t.addressId&&(this.addressItem.id=t.addressId),""!=e&&(this.getProduct(),this.getAddress())},methods:{getProduct:function(){var t=this,e=t.order.split("_")[0],i=t.order.split("_")[1];t.$request.shop.getGoods({getgoldGoods_id:e}).then((function(e){1==e.status?(e.data.num=i,t.mainItem=t.mainItem.concat(e.data),t.dealNum()):uni.showToast({icon:"none",title:e.msg})})).catch((function(t){uni.showToast({icon:"none",title:"数据加载异常"})}))},getAddress:function(){var t=this;t=this;t.$request.address.gradeList({}).then((function(e){1==e.status&&e.data.length>0&&(t.addressItem.id>0?t.addressItem=e.data.find((function(e){return e.id==t.addressItem.id})):t.addressItem=e.data[0])})).catch((function(t){uni.showToast({icon:"none",title:"数据加载异常"})}))},dealNum:function(){var t=0,e=0;this.mainItem.forEach((function(i){t+=i.num,e+=i.num*i.money})),this.num=parseInt(t),this.price=e},openPwd:function(){var t=this;if(t.addressItem.id<=0)return uni.showToast({icon:"none",title:"请选择收货地址"}),!1;this.$refs.paymentPassword.modalFun("show")},dealOrder:function(t){var e=this;if(e.addressItem.id<=0)return uni.showToast({icon:"none",title:"请选择收货地址"}),!1;uni.showLoading({title:"订单提交中"}),e.$request.shop.rush({goldgoods_id:e.mainItem[0].id,address_id:e.addressItem.id,pwdPay:t.value}).then((function(t){uni.hideLoading(),1==t.status?(uni.showToast({icon:"none",title:"购买成功"}),setTimeout((function(){uni.navigateTo({url:"/pages/order/info?orderId="+t.data.orderId})}),1e3)):(e.$refs.paymentPassword.modalFun("hide"),uni.showToast({icon:"none",title:t.msg}))})).catch((function(t){e.$refs.paymentPassword.modalFun("hide"),uni.hideLoading(),uni.showToast({icon:"none",title:"数据加载异常"})}))},selectAddress:function(){uni.navigateTo({url:"/pages/address/list?order="+this.order+"&type=shop"})}}};e.default=o},"6dba":function(t,e,i){"use strict";var a=i("ae17"),n=i.n(a);n.a},8967:function(t,e,i){"use strict";i.r(e);var a=i("4386"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},ae17:function(t,e,i){var a=i("17fc");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("dbd8d0ca",a,!0,{sourceMap:!1,shadowMode:!1})},dcec:function(t,e,i){"use strict";i.r(e);var a=i("3351"),n=i("8967");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("6dba");var d,r=i("f0c5"),s=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"625e512c",null,!1,a["a"],d);e["default"]=s.exports}}]);