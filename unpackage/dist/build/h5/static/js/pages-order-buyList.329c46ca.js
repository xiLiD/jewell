(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-buyList"],{"7c03":function(t,i,e){"use strict";var a=e("d08d"),o=e.n(a);o.a},"9c2f":function(t,i,e){"use strict";e.r(i);var a=e("e5aa"),o=e("f34c");for(var n in o)"default"!==n&&function(t){e.d(i,t,(function(){return o[t]}))}(n);e("7c03");var d,r=e("f0c5"),s=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"599010dd",null,!1,a["a"],d);i["default"]=s.exports},b8b7:function(t,i,e){"use strict";e("99af"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{mainItem:[],status:0,user_id:0,statusItem:[{id:0,name:"全部"},{id:1,name:"代发货"},{id:2,name:"已发货"},{id:3,name:"已收货"},{id:4,name:"已完成"}],loadMoreText:"加载中...",showLoadMore:!1,isMore:!0,PageNo:1,PageSize:10}},onShow:function(){this.$store.commit("judgeLogin")},onLoad:function(t){var i=uni.getStorageSync("uerInfo");this.user_id=i.id,this.getPage()},onUnload:function(){this.PageNo=1,this.mainItem=[],this.loadMoreText="加载更多",this.showLoadMore=!1},onReachBottom:function(){var t=this;this.showLoadMore=!0,setTimeout((function(){t.setListData()}),300)},onPullDownRefresh:function(){this.initData()},methods:{selType:function(t){this.status=t,this.initData()},dump:function(t){uni.navigateTo({url:t})},withdrawal:function(){uni.navigateTo({url:"/pages/memberAccount/withdrawal"})},initData:function(){var t=this;setTimeout((function(){t.PageNo=1,t.mainItem=[],t.getPage(),uni.stopPullDownRefresh()}),300)},setListData:function(){this.PageNo+=1,this.isMore&&this.getPage()},getPage:function(){var t=this,i=this;uni.showLoading({title:"数据查询中"}),i.$request.order.physicalOrder({page:i.PageNo,physical_order_state:i.status}).then((function(e){i.$tools.loadingHide(),1==e.status?(i.mainItem=i.mainItem.concat(e.data),e.data.length<i.PageSize?(t.loadMoreText="没有更多数据了",i.isMore=!1):(i.showLoadMore=!1,i.isMore=!0)):(i.showLoadMore=!1,i.$refs.noData.showText(e.msg))})).catch((function(t){i.showLoadMore=!1,i.$tools.loadingHide(),i.$tools.toast("数据加载异常")}))}}};i.default=a},b964:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,".container[data-v-599010dd],\nuni-page-body[data-v-599010dd]{background-color:#f4f5f6}.main[data-v-599010dd]{width:100%}.main .main-top[data-v-599010dd]{width:100%;border-bottom:1px solid #eaeaea;height:%?90?%;display:-webkit-box;display:-webkit-flex;display:flex;background:#fff;margin-bottom:%?20?%}.main-top uni-view[data-v-599010dd]{-webkit-box-flex:1;-webkit-flex:1;flex:1;float:left;text-align:center;height:%?90?%;line-height:%?90?%}.main-top uni-view .clon[data-v-599010dd]{display:block;border-bottom:2px solid #159f66;height:%?86?%;width:%?90?%;margin:0 auto;color:#159f66}.main .main-item[data-v-599010dd]{width:%?750?%;margin:0 auto;padding:%?13?% %?20?%;margin-top:%?10?%;background:#fff}.state_warp[data-v-599010dd]{width:100%;height:%?80?%;font-weight:600}.state_warp uni-view[data-v-599010dd]:nth-child(1){float:left;height:%?80?%;line-height:%?80?%;color:#000}.state_warp uni-view[data-v-599010dd]:nth-child(2){float:right;height:%?80?%;line-height:%?80?%;color:#df9a5f;padding-right:%?20?%}.ordercp[data-v-599010dd]{width:100%;margin-top:%?10?%;clear:both}.product-img[data-v-599010dd]{width:%?180?%;height:%?160?%;float:left}.product-img uni-image[data-v-599010dd]{width:%?150?%;height:%?150?%;border-radius:%?20?%}.product-r[data-v-599010dd]{float:left;width:%?500?%}.product-title[data-v-599010dd]{height:%?45?%;line-height:%?45?%;font-size:%?30?%;color:#000;font-weight:500}.product-intro[data-v-599010dd]{height:%?45?%;line-height:%?45?%;font-size:%?30?%;color:#bfbfbf;font-weight:500;font-size:%?28?%}.product-price[data-v-599010dd]{font-size:%?30?%;color:#bfbfbf;font-weight:500;font-size:%?28?%;margin-top:%?25?%}.orderbt[data-v-599010dd]{width:100%;margin-top:%?20?%;clear:both;height:%?70?%}.orderbt .order-btn[data-v-599010dd]{color:#a75863;border:1px solid #a75863;width:%?200?%;text-align:center;float:right;margin-left:%?15?%;height:%?60?%;line-height:%?60?%;border-radius:%?8?%}body.?%PAGE?%[data-v-599010dd]{background-color:#f4f5f6}",""]),t.exports=i},d08d:function(t,i,e){var a=e("b964");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=e("4f06").default;o("0273302c",a,!0,{sourceMap:!1,shadowMode:!1})},e5aa:function(t,i,e){"use strict";var a,o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"main"},[e("v-uni-view",{staticClass:"main-top"},t._l(t.statusItem,(function(i,a){return e("v-uni-view",{key:a,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.selType(i.id)}}},[e("v-uni-text",{class:t.status==i.id?"clon":""},[t._v(t._s(i.name))])],1)})),1),t._l(t.mainItem,(function(i,a){return e("v-uni-view",{key:a,staticClass:"main-item"},[e("v-uni-view",{staticClass:"state_warp",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/order/info?orderId="+i.id)}}},[e("v-uni-view",[t._v("订单号:"+t._s(i.order_num))]),e("v-uni-view",[t._v(t._s(t.statusItem.find((function(t){return t.id==i.order_state})).name))])],1),e("v-uni-view",{staticClass:"ordercp",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/order/info?orderId="+i.id)}}},[e("v-uni-view",{staticClass:"product-img"},[e("v-uni-image",{attrs:{src:i.goods_imgs,mode:"aspectFill"}})],1),e("v-uni-view",{staticClass:"product-r"},[e("v-uni-view",{staticClass:"product-title"},[t._v(t._s(i.goods_titem))]),e("v-uni-view",{staticClass:"product-price"},[e("v-uni-text",{staticClass:"font14 red"},[t._v("￥"+t._s(i.goods_money))]),t._v("X1")],1)],1)],1),2==i.order_state&&i.user_id==t.user_id?e("v-uni-view",{staticClass:"orderbt",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/order/info?orderId="+i.id)}}},[e("v-uni-view",{staticClass:"order-btn"},[t._v("立即支付")])],1):t._e(),e("v-uni-view",{staticClass:"clear"})],1)})),0==t.mainItem.length?e("v-uni-view",[e("noData",{ref:"noData"})],1):t._e()],2),t.showLoadMore?e("v-uni-view",{staticClass:"uni-loadmore"},[t._v(t._s(t.loadMoreText))]):t._e()],1)},n=[];e.d(i,"b",(function(){return o})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){return a}))},f34c:function(t,i,e){"use strict";e.r(i);var a=e("b8b7"),o=e.n(a);for(var n in a)"default"!==n&&function(t){e.d(i,t,(function(){return a[t]}))}(n);i["default"]=o.a}}]);