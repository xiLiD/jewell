(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-news-notice"],{"265e":function(t,i,e){"use strict";e.r(i);var n=e("97a8"),a=e("dd44");for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);e("cbea");var d,s=e("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"1d92d898",null,!1,n["a"],d);i["default"]=r.exports},6446:function(t,i,e){var n=e("88a4");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("c4f73760",n,!0,{sourceMap:!1,shadowMode:!1})},8443:function(t,i,e){"use strict";e("99af"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{inv:1,type:0,loadMoreText:"加载中...",showLoadMore:!1,isMore:!0,PageNo:1,PageSize:10,mainItem:[],keyWords:""}},onShow:function(){this.$store.commit("judgeLogin")},onLoad:function(t){this.initData()},onUnload:function(){this.PageNo=1,this.mainItem=[],this.loadMoreText="加载更多",this.showLoadMore=!1},onReachBottom:function(){var t=this;this.showLoadMore=!0,setTimeout((function(){t.setListData()}),300)},onPullDownRefresh:function(){this.initData()},methods:{search:function(t){this.keyWords=t.value,this.initData()},dumpNews:function(){uni.switchTab({url:"/pages/news/list"})},getDate:function(t){if(!t)return"";var i=new Date(t),e=i.getFullYear(),n=i.getMonth()+1,a=i.getDate(),o=i.getHours(),d=i.getMinutes();return e+"-"+this.add0(n)+"-"+this.add0(a)+" "+this.add0(o)+":"+this.add0(d)},add0:function(t){return t<10?"0"+t:t},dumpInfo:function(t){uni.navigateTo({url:"/pages/news/noticeInfo?id="+t})},initData:function(){var t=this;setTimeout((function(){t.PageNo=1,t.mainItem=[],t.getPage(),uni.stopPullDownRefresh()}),300)},setListData:function(){this.PageNo+=1,this.isMore&&this.getPage()},getPage:function(){var t=this,i=this;uni.showLoading({title:"数据查询中"}),i.$request.news.msg({page:i.PageNo}).then((function(e){uni.hideLoading(),1==e.status?(i.mainItem=i.mainItem.concat(e.data),e.data.length<i.PageSize?(t.loadMoreText="没有更多数据了",i.isMore=!1):(i.showLoadMore=!1,i.isMore=!0)):(i.showLoadMore=!1,uni.showToast({icon:"none",title:e.msg}))})).catch((function(t){i.showLoadMore=!1,uni.hideLoading(),uni.showToast({icon:"none",title:"数据加载异常"})}))}}};i.default=n},"88a4":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,".t_se[data-v-1d92d898]{width:%?690?%;margin:0 auto;margin-top:%?10?%}.t_main[data-v-1d92d898]{width:%?750?%;margin:0 auto;margin-top:%?30?%;clear:both}.t_item[data-v-1d92d898]{width:%?680?%;margin:0 auto;margin-top:%?20?%;border-bottom:%?1?% solid #eaeaec;clear:both;height:%?65?%;line-height:%?65?%}.t_item .t_img[data-v-1d92d898]{width:%?150?%;height:%?150?%;float:left;margin:%?10?% %?30?% 0 0}.t_item .t_img uni-image[data-v-1d92d898]{width:%?130?%;height:%?130?%;border-radius:%?20?%;margin-left:%?8?%}.t_b[data-v-1d92d898]{margin:%?30?% 0 0 0}.t_r_t[data-v-1d92d898]{color:#31343d;font-size:%?28?%;height:%?45?%;line-height:%?45?%;overflow:hidden;width:%?280?%;float:left;margin-bottom:%?20?%;margin-top:%?10?%}.t_r_d[data-v-1d92d898]{color:#999a9f;font-size:%?20?%;height:%?45?%;line-height:%?45?%;overflow:hidden;float:right;margin-top:%?5?%}.t_b .t_r_i[data-v-1d92d898]{color:#2e303c;font-size:%?20?%;width:%?500?%;height:%?70?%;line-height:%?35?%;overflow:hidden}.uni-loadmore[data-v-1d92d898]{clear:both}.inv-h-w[data-v-1d92d898]{background-color:#fff;height:%?125?%;width:%?750?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;border-bottom:%?25?% solid #f5f5f5}.inv-h[data-v-1d92d898]{font-size:%?30?%!important;text-align:center;color:#98979c;height:%?100?%;line-height:%?100?%!important;width:%?100?%}.inv-h[data-v-1d92d898]:nth-child(1){margin-right:%?180?%}.inv-h-se[data-v-1d92d898]{color:#31303e;border-bottom:%?4?% solid #31303e;height:%?100?%}.c-main[data-v-1d92d898]{width:%?670?%;margin:0 auto;margin-top:%?30?%}.c-main .c-ad[data-v-1d92d898]{width:%?670?%;border-radius:%?20?%;margin-top:%?20?%}.c-title[data-v-1d92d898]{font-size:%?30?%;color:#000;font-weight:600;margin-top:%?15?%}",""]),t.exports=i},"97a8":function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return n}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"inv-h-w"},[e("v-uni-view",{class:["inv-h",0==t.inv?"inv-h-se":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.dumpNews.apply(void 0,arguments)}}},[t._v("通知")]),e("v-uni-view",{class:["inv-h",1==t.inv?"inv-h-se":""]},[t._v("公告")])],1),e("v-uni-view",{staticClass:"t_main"},t._l(t.mainItem,(function(i,n){return e("v-uni-view",{key:n,staticClass:"t_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dumpInfo(i.id)}}},[e("v-uni-view",{staticClass:"t_r_t"},[t._v(t._s(i.title))]),e("v-uni-view",{staticClass:"t_r_d"},[t._v(t._s(t.getDate(1e3*i.time)))])],1)})),1),t.showLoadMore?e("v-uni-view",{staticClass:"uni-loadmore"},[t._v(t._s(t.loadMoreText))]):t._e(),e("v-uni-view",{staticClass:"dbh"})],1)},o=[]},cbea:function(t,i,e){"use strict";var n=e("6446"),a=e.n(n);a.a},dd44:function(t,i,e){"use strict";e.r(i);var n=e("8443"),a=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);i["default"]=a.a}}]);