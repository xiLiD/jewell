(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-buyList"],{"28c8":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"main"},[i("v-uni-view",{staticClass:"main-top"},t._l(t.statusItem,(function(e,a){return i("v-uni-view",{key:a,on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.selType(e.id)}}},[i("v-uni-text",{class:t.status==e.id?"clon":""},[t._v(t._s(e.name))])],1)})),1),t._l(t.mainItem,(function(e,a){return i("v-uni-view",{key:a,staticClass:"main-item"},[i("v-uni-view",{staticClass:"state_warp",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dump("/pages/order/info?orderId="+e.id)}}},[i("v-uni-view",[t._v("订单号:"+t._s(e.order_num))]),i("v-uni-view",[t._v(t._s(t.statusItem.find((function(t){return t.id==e.order_state})).name))])],1),i("v-uni-view",{staticClass:"ordercp",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dump("/pages/order/info?orderId="+e.id)}}},[i("v-uni-view",{staticClass:"product-img"},[i("v-uni-image",{attrs:{src:e.goods_imgs,mode:"aspectFill"}})],1),i("v-uni-view",{staticClass:"product-r"},[i("v-uni-view",{staticClass:"product-title"},[t._v(t._s(e.goods_titem))]),i("v-uni-view",{staticClass:"product-price"},[i("v-uni-text",{staticClass:"font14 red"},[t._v("￥"+t._s(e.goods_money))]),t._v("X1")],1)],1)],1),2==e.order_state&&e.user_id==t.user_id?i("v-uni-view",{staticClass:"orderbt",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dump("/pages/order/info?orderId="+e.id)}}},[i("v-uni-view",{staticClass:"order-btn"},[t._v("立即支付")])],1):t._e(),i("v-uni-view",{staticClass:"clear"})],1)}))],2),t.showLoadMore?i("v-uni-view",{staticClass:"uni-loadmore"},[t._v(t._s(t.loadMoreText))]):t._e()],1)},o=[]},6901:function(t,e,i){"use strict";i.r(e);var a=i("db6a"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},d04c:function(t,e,i){"use strict";var a=i("f225"),n=i.n(a);n.a},db6a:function(t,e,i){"use strict";i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{mainItem:[],status:0,user_id:0,statusItem:[{id:0,name:"全部"},{id:1,name:"代发货"},{id:2,name:"已发货"},{id:3,name:"已收货"},{id:4,name:"已完成"}],loadMoreText:"加载中...",showLoadMore:!1,isMore:!0,PageNo:1,PageSize:10}},onShow:function(){this.$store.commit("judgeLogin")},onLoad:function(t){var e=uni.getStorageSync("uerInfo");this.user_id=e.id,this.getPage()},onUnload:function(){this.PageNo=1,this.mainItem=[],this.loadMoreText="加载更多",this.showLoadMore=!1},onReachBottom:function(){var t=this;this.showLoadMore=!0,setTimeout((function(){t.setListData()}),300)},onPullDownRefresh:function(){this.initData()},methods:{selType:function(t){this.status=t,this.initData()},dump:function(t){uni.navigateTo({url:t})},withdrawal:function(){uni.navigateTo({url:"/pages/memberAccount/withdrawal"})},initData:function(){var t=this;setTimeout((function(){t.PageNo=1,t.mainItem=[],t.getPage(),t.getUserAccont(),uni.stopPullDownRefresh()}),300)},setListData:function(){this.PageNo+=1,this.isMore&&this.getPage()},getPage:function(){var t=this,e=this;uni.showLoading({title:"数据查询中"}),e.$request.order.physicalOrder({page:e.PageNo,physical_order_state:e.status}).then((function(i){uni.hideLoading(),1==i.status?(e.mainItem=e.mainItem.concat(i.data),i.data.length<e.PageSize?(t.loadMoreText="没有更多数据了",e.isMore=!1):(e.showLoadMore=!1,e.isMore=!0)):(e.showLoadMore=!1,uni.showToast({icon:"none",title:i.msg}))})).catch((function(t){e.showLoadMore=!1,uni.hideLoading(),uni.showToast({icon:"none",title:"数据加载异常"})}))}}};e.default=a},df5d:function(t,e,i){"use strict";i.r(e);var a=i("28c8"),n=i("6901");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("d04c");var d,r=i("f0c5"),s=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"1b5d313e",null,!1,a["a"],d);e["default"]=s.exports},ee5b:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".container[data-v-1b5d313e],\nuni-page-body[data-v-1b5d313e]{background-color:#f4f5f6}.main[data-v-1b5d313e]{width:100%}.main .main-top[data-v-1b5d313e]{width:100%;border-bottom:1px solid #eaeaea;height:%?90?%;display:-webkit-box;display:-webkit-flex;display:flex;background:#fff;margin-bottom:%?20?%}.main-top uni-view[data-v-1b5d313e]{-webkit-box-flex:1;-webkit-flex:1;flex:1;float:left;text-align:center;height:%?90?%;line-height:%?90?%}.main-top uni-view .clon[data-v-1b5d313e]{display:block;border-bottom:2px solid #159f66;height:%?86?%;width:%?90?%;margin:0 auto;color:#159f66}.main .main-item[data-v-1b5d313e]{width:%?750?%;margin:0 auto;padding:%?13?% %?20?%;margin-top:%?10?%;background:#fff}.state_warp[data-v-1b5d313e]{width:100%;height:%?80?%;font-weight:600}.state_warp uni-view[data-v-1b5d313e]:nth-child(1){float:left;height:%?80?%;line-height:%?80?%;color:#000}.state_warp uni-view[data-v-1b5d313e]:nth-child(2){float:right;height:%?80?%;line-height:%?80?%;color:#df9a5f;padding-right:%?20?%}.ordercp[data-v-1b5d313e]{width:100%;margin-top:%?10?%;clear:both}.product-img[data-v-1b5d313e]{width:%?180?%;height:%?160?%;float:left}.product-img uni-image[data-v-1b5d313e]{width:%?150?%;height:%?150?%;border-radius:%?20?%}.product-r[data-v-1b5d313e]{float:left;width:%?500?%}.product-title[data-v-1b5d313e]{height:%?45?%;line-height:%?45?%;font-size:%?30?%;color:#000;font-weight:500}.product-intro[data-v-1b5d313e]{height:%?45?%;line-height:%?45?%;font-size:%?30?%;color:#bfbfbf;font-weight:500;font-size:%?28?%}.product-price[data-v-1b5d313e]{font-size:%?30?%;color:#bfbfbf;font-weight:500;font-size:%?28?%;margin-top:%?25?%}.orderbt[data-v-1b5d313e]{width:100%;margin-top:%?20?%;clear:both;height:%?70?%}.orderbt .order-btn[data-v-1b5d313e]{color:#a75863;border:1px solid #a75863;width:%?200?%;text-align:center;float:right;margin-left:%?15?%;height:%?60?%;line-height:%?60?%;border-radius:%?8?%}body.?%PAGE?%[data-v-1b5d313e]{background-color:#f4f5f6}",""]),t.exports=e},f225:function(t,e,i){var a=i("ee5b");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("2d7fbed8",a,!0,{sourceMap:!1,shadowMode:!1})}}]);