(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shop-info"],{"259d":function(t,a,i){"use strict";var e=i("4ea4");i("e25e"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=e(i("f690")),o={data:function(){return{userKey:"",id:0,indicatorDots:!0,autoplay:!1,mainData:{},shareData:{title:"",imgUrl:"",intro:"",url:"",baseUrl:""},price:0,categoryId:0,brandModelId:0,standardId:0,skuId:0,skuName:"",skuImg:"",num:1,type:0,scrollbar:!0,swiper_class:{height:"400upx"},qrCodeUrl:"",isH5:!1}},onShow:function(){this.$store.commit("judgeLogin")},onLoad:function(t){var a=uni.getStorageSync("uerInfo");""!=a&&(this.userKey=a.userKey),t.id&&(this.id=parseInt(t.id)),this.getGoods(),this.isH5=!0,this.setShare()},onShareAppMessage:function(t){return this.setShare(),{path:this.shareData.baseUrl,title:this.shareData.title,imageUrl:""}},onShareTimeline:function(t){this.setShare();var a=uni.getStorageSync("distSource");if(a)return{title:this.shareData.title,type:0,query:this.shareData.baseUrl,imageUrl:this.shareData.imgUrl}},methods:{setShare:function(){var t=n.default.SITE+"static/logo.png";t=this.mainData.goods_imgs,this.shareData.title="爱秀装"+this.mainData.BrandModelName+"详情",this.shareData.intro=this.mainData.BrandModelName+"同一风格，上百件家具任意组合，比市场便宜50%",this.shareData.imgUrl=t,this.shareData.baseUrl="pages/furniture/info?id="+this.id,this.shareData.url=n.default.SITE+"#/"+this.shareData.baseUrl},selectSku:function(t){this.skuId=t.StandardId,this.skuName=t.StandardName,this.price=t.UnitPrice,t.ImgUrl&&(this.skuImg=t.ImgUrl)},showCart:function(t){var a=this;this.type=t,this.$nextTick((function(){a.$refs["sku"].open()}))},numberChange:function(t){this.num=parseInt(t)},getGoods:function(){var t=this;uni.showLoading({title:"数据查询中"}),t.$request.shop.getGoods({getgoldGoods_id:t.id}).then((function(a){uni.hideLoading(),1==a.status?(t.mainData=a.data,t.price=a.data.money,uni.setNavigationBarTitle({title:t.mainData.BrandModelName})):uni.showToast({icon:"none",title:a.msg})})).catch((function(t){uni.hideLoading(),uni.showToast({icon:"none",title:"数据加载异常"})}))},saveOrder:function(){uni.navigateTo({url:"/pages/shop/confirmOrder?order="+this.id+"_"+this.num})}}};a.default=o},"55d8":function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,".container[data-v-2a5498a5]{background-color:#fff;min-height:100%}.swiper[data-v-2a5498a5]{margin-bottom:%?20?%;min-height:%?450?%}.topBanner[data-v-2a5498a5]{width:%?750?%;background-color:#f5f5f5}.banner-img[data-v-2a5498a5]{width:%?750?%}.ask[data-v-2a5498a5]{padding:0 %?20?%;border-bottom:%?13?% solid #f5f5f5}.ask uni-view[data-v-2a5498a5]{line-height:%?40?%;margin-top:%?8?%;font-size:%?25?%}.ask uni-view uni-text[data-v-2a5498a5]{font-weight:600}.ask-top[data-v-2a5498a5]{clear:both;height:%?60?%}.ask-price[data-v-2a5498a5]{font-size:%?30?%;line-height:%?60?%;float:left}.ask-price uni-text[data-v-2a5498a5]{color:#d98b40;font-size:%?40?%!important}.ask-intro[data-v-2a5498a5]{clear:both;height:%?80?%}.ask-intro uni-view[data-v-2a5498a5]{float:left;background-color:#fae6d7;color:#db9049;height:%?45?%;line-height:%?45?%;width:%?150?%;text-align:center;margin-right:%?22?%;border-radius:%?5?%}.ask-zs[data-v-2a5498a5]{font-size:%?28?%!important;padding-left:%?20?%;padding-top:%?2?%}.ask-unit[data-v-2a5498a5]{height:%?60?%;float:left;color:#868686;font-size:%?20?%;padding-top:%?5?%}.ask-title[data-v-2a5498a5]{font-weight:600;font-size:%?40?%!important;line-height:%?60?%!important}.ask-title .tit-r[data-v-2a5498a5]{color:#2d3142;font-weight:600;font-size:%?35?%!important;line-height:%?50?%!important}.list[data-v-2a5498a5]{margin-top:%?30?%}.list-title[data-v-2a5498a5]{font-weight:600;font-size:%?35?%;margin-left:%?10?%;line-height:%?40?%}.b_r_button[data-v-2a5498a5]{margin-top:%?10?%!important;background-color:#00a869}.bt-cn[data-v-2a5498a5]{position:fixed;bottom:0;width:100%;height:%?120?%;background-color:#fff;-webkit-box-shadow:0 0 3px #bbb;box-shadow:0 0 3px #bbb}.t-l[data-v-2a5498a5]{float:left;height:3rem;line-height:3rem;font-size:.8rem;text-align:center;width:%?450?%}.t-l .mo[data-v-2a5498a5]{color:#de0b3e;font-size:.8rem;padding-right:%?30?%}.t-b-p[data-v-2a5498a5]{color:#2d3142;width:%?200?%;float:left;font-size:%?33?%;height:%?120?%;line-height:%?120?%;text-align:center;margin-left:%?60?%;font-weight:500}.t-b-a[data-v-2a5498a5]{float:right;height:%?75?%;width:%?200?%;line-height:%?75?%;background-color:#201f24;text-align:center;color:#f8d79f;font-size:%?30?%;margin:%?20?% %?38?% 0 0;border-radius:%?10?%;border:0}.attr[data-v-2a5498a5]{width:%?710?%;margin:0 auto;border:1px solid #e8e8e8;border-top:0;margin-top:%?15?%}.attr-title[data-v-2a5498a5]{color:#000;padding:0 %?10?%;height:%?60?%;line-height:%?60?%;border-top:1px solid #e8e8e8;font-weight:600}.attr-item[data-v-2a5498a5]{border-top:1px solid #e8e8e8;line-height:%?50?%;color:#868686;overflow:hidden}.attr-t[data-v-2a5498a5]{width:%?200?%;float:left;line-height:%?50?%;text-indent:%?10?%;font-size:%?23?%}.attr-r[data-v-2a5498a5]{width:%?500?%;line-height:%?50?%;overflow:hidden;padding:0 %?10?%;border-left:1px solid #e8e8e8;font-size:%?23?%}.attr-item .attr-a[data-v-2a5498a5]{width:%?220?%;line-height:%?50?%;overflow:hidden;padding:0 %?10?%;font-size:%?23?%;float:left}.attr-item .attr-b[data-v-2a5498a5]{width:%?260?%;line-height:%?50?%;overflow:hidden;padding:0 %?10?%;border-left:1px solid #e8e8e8;font-size:%?23?%;float:left}.attr-item .attr-c[data-v-2a5498a5]{width:%?110?%;line-height:%?50?%;overflow:hidden;padding:0 %?10?%;border-left:1px solid #e8e8e8;font-size:%?23?%;float:left}.attr-item .attr-d[data-v-2a5498a5]{width:%?110?%;line-height:%?50?%;overflow:hidden;padding:0 %?10?%;border-left:1px solid #e8e8e8;font-size:%?23?%}.con[data-v-2a5498a5]{width:%?750?%;margin:0 auto;padding:0 %?20?%;border-top:%?13?% solid #f5f5f5}.dbh[data-v-2a5498a5]{height:%?130?%;width:100%;overflow:hidden}.con-title[data-v-2a5498a5]{color:#000;padding:0 %?10?%;font-weight:600;margin-top:%?20?%}.sku-main[data-v-2a5498a5]{background-color:#fff;border-top-left-radius:%?20?%;border-top-right-radius:%?20?%\n\t/*min-height: 700upx; */}.sku-top[data-v-2a5498a5]{width:100%;height:%?210?%}.sku-top uni-image[data-v-2a5498a5]{width:%?180?%;height:%?180?%;float:left;margin:%?30?% 0 0 %?30?%;margin-right:%?25?%}.sku-top .sku-r[data-v-2a5498a5]{padding-top:%?130?%}.sku-top .sku-price[data-v-2a5498a5]{height:%?40?%;line-height:%?40?%;color:#e0664f;font-size:%?25?%}.sku-top .sku-intro[data-v-2a5498a5]{height:%?40?%;line-height:%?40?%;font-size:%?25?%;overflow:hidden}.sku-center[data-v-2a5498a5]{width:100%;padding-left:%?30?%;margin-top:%?50?%}.sku-center .sku-item[data-v-2a5498a5]{width:100%;max-height:%?500?%}.sku-center .sku-item .sku-i[data-v-2a5498a5]{float:left;padding:%?7?% %?30?%;border:1px solid #ccc;font-size:%?25?%;color:#333;border-radius:%?8?%;float:left;margin-bottom:%?15?%;margin-right:%?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;white-space:nowrap}.sku-center .sku-item .active[data-v-2a5498a5]{border:1px solid #dc0000;color:#dc0000;background:#fff}.sku-bt[data-v-2a5498a5]{width:100%;padding-left:%?30?%;margin-top:%?50?%;clear:both;padding-bottom:%?150?%}.sku-tj[data-v-2a5498a5]{width:80%;margin-left:10%;text-align:center;position:fixed;bottom:%?30?%;background-color:#1f1e23;height:%?66?%;line-height:%?66?%;color:#f8d79f;border-radius:%?33?%}.sku-tj-hui[data-v-2a5498a5]{background-color:#999}.tcdbg[data-v-2a5498a5]{position:absolute;z-index:100;background-color:#fff;width:%?70?%;height:%?70?%;right:%?30?%;top:%?30?%}.tcdbg uni-image[data-v-2a5498a5]{width:100%;height:100%}.cdbg_box[data-v-2a5498a5]{background-color:#fff;width:%?600?%;height:%?650?%}.cdbg_box uni-image[data-v-2a5498a5]{width:%?440?%;height:%?440?%;margin:%?50?% 0 0 %?80?%}.qr_down[data-v-2a5498a5]{width:%?230?%;height:%?44?%;line-height:%?44?%;border-radius:22px;background-color:#159f66;color:#fff;margin:0 auto;text-align:center;font-size:%?25?%;margin-top:%?50?%}.qr_intro[data-v-2a5498a5]{width:%?230?%;height:%?44?%;line-height:%?44?%;border-radius:22px;color:#999;margin:0 auto;text-align:center;font-size:%?25?%;margin-top:%?50?%}",""]),t.exports=a},a152:function(t,a,i){"use strict";var e=i("ffa4"),n=i.n(e);n.a},adf1:function(t,a,i){"use strict";var e;i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return o})),i.d(a,"a",(function(){return e}));var n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"topBanner"},[i("v-uni-swiper",{staticClass:"swiper",style:t.swiper_class,attrs:{circular:!0,"indicator-dots":t.indicatorDots,autoplay:t.autoplay}},t._l(t.mainData.goods_imgs,(function(t,a){return i("v-uni-swiper-item",{key:a,staticClass:"case-item"},[i("v-uni-image",{staticClass:"banner-img",attrs:{src:t,mode:"widthFix"}})],1)})),1)],1),i("v-uni-view",{staticClass:"ask"},[i("v-uni-view",{staticClass:"ask-title"},[i("v-uni-view",{staticClass:"tit-r"},[t._v(t._s(t.mainData.goods_name))])],1),i("v-uni-view",{staticClass:"ask-top"},[i("v-uni-view",{staticClass:"ask-price"},[i("v-uni-text",[t._v(t._s(t.mainData.money)+"元宝")])],1),t.mainData.Unit?i("v-uni-view",{staticClass:"ask-unit"},[t._v("/"+t._s(t.mainData.Unit))]):t._e()],1),i("v-uni-view",{staticClass:"ask-intro"},[i("v-uni-view",[t._v("今日特价")]),i("v-uni-view",[t._v("新品上市")])],1)],1),t.mainData.contcn?i("v-uni-view",{staticClass:"con"},[i("v-uni-view",{staticClass:"con-title"},[t._v("商品详情")]),i("v-uni-rich-text",{attrs:{nodes:t.mainData.contcn}})],1):t._e(),i("v-uni-view",{staticClass:"dbh"}),i("v-uni-view",{staticClass:"bt-cn"},[i("v-uni-view",{staticClass:"t-b-p"},[t._v(t._s(t.mainData.money)+"元宝")]),i("v-uni-view",{staticClass:"t-b-a",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.saveOrder.apply(void 0,arguments)}}},[t._v("立即购买")])],1)],1)},o=[]},b1ac:function(t,a,i){"use strict";i.r(a);var e=i("259d"),n=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(a,t,(function(){return e[t]}))}(o);a["default"]=n.a},b1ee:function(t,a,i){"use strict";i.r(a);var e=i("adf1"),n=i("b1ac");for(var o in n)"default"!==o&&function(t){i.d(a,t,(function(){return n[t]}))}(o);i("a152");var r,d=i("f0c5"),s=Object(d["a"])(n["default"],e["b"],e["c"],!1,null,"2a5498a5",null,!1,e["a"],r);a["default"]=s.exports},ffa4:function(t,a,i){var e=i("55d8");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=i("4f06").default;n("31dd4962",e,!0,{sourceMap:!1,shadowMode:!1})}}]);