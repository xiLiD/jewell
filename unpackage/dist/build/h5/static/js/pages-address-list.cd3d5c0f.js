(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-list"],{"4ceb":function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,".container[data-v-d0552354],\nuni-page-body[data-v-d0552354]{background-color:#f4f5f6}.top-address[data-v-d0552354]{background-color:#fff;width:%?750?%;margin:0 auto;margin-bottom:%?20?%}.ad-t[data-v-d0552354]{width:%?710?%;margin:0 auto;margin-top:%?20?%;height:%?130?%;padding-top:%?10?%}.ad-b[data-v-d0552354]{width:%?710?%;margin:0 auto;height:%?100?%;line-height:%?100?%;border-top:1px solid #eee}.ad-b .ad-b-l[data-v-d0552354]{width:50%;float:left;height:%?100?%;line-height:%?100?%;color:#666}.ad-b .ad-b-l uni-text[data-v-d0552354]{color:#353b50;font-size:%?35?%;padding-right:%?20?%;color:#d2a971}.ad-b .ad-b-l .rsh[data-v-d0552354]{color:#d5d6d9}.ad-b .ad-b-r[data-v-d0552354]{width:50%;float:right;text-align:right;height:%?100?%;line-height:%?100?%}.ad-b .ad-b-r uni-text[data-v-d0552354]{color:#353b50;font-size:%?38?%;margin-left:%?20?%}.top-address .ad-l[data-v-d0552354]{height:%?50?%;line-height:%?50?%;width:%?50?%;text-align:center;font-size:%?25?%;float:left;color:#fff;background-color:#d5d6d9;border-radius:%?25?%;margin:%?35?% %?35?% %?35?% 0}.top-address .ad-default[data-v-d0552354]{color:#000;background-color:#d1a971}.top-address .ad-c[data-v-d0552354]{float:left;height:%?120?%;line-height:%?120?%;color:#363636;font-size:%?30?%;width:%?410?%}.ad-c .ad-c-n[data-v-d0552354]{font-size:%?30?%;line-height:%?45?%;margin-top:%?15?%;color:#000}.ad-c .ad-c-n uni-text[data-v-d0552354]{font-size:%?25?%;padding-left:%?30?%;color:#999}.ad-c .ad-c-i[data-v-d0552354]{font-size:%?25?%;line-height:%?45?%;height:%?45?%;overflow:hidden;color:#999}.top-address .ad-r[data-v-d0552354]{float:left;height:%?120?%;line-height:%?120?%;width:%?120?%;text-align:center;float:right;color:#ccc}.sku-tj[data-v-d0552354]{width:86%;margin-left:7%;text-align:center;position:fixed;bottom:%?30?%;background-color:#2e2d32;height:%?90?%;line-height:%?90?%;color:#fff;border-radius:%?10?%}body.?%PAGE?%[data-v-d0552354]{background-color:#f4f5f6}",""]),t.exports=i},6113:function(t,i,e){"use strict";e.r(i);var a=e("ab58"),n=e.n(a);for(var d in a)"default"!==d&&function(t){e.d(i,t,(function(){return a[t]}))}(d);i["default"]=n.a},"86e7":function(t,i,e){var a=e("4ceb");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("0c322b64",a,!0,{sourceMap:!1,shadowMode:!1})},9069:function(t,i,e){"use strict";var a,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"tt"}),t._l(t.mainItem,(function(i,a){return e("v-uni-view",{key:a,staticClass:"top-address"},[e("v-uni-view",{staticClass:"ad-t",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.selectAddress(i)}}},[e("v-uni-view",{staticClass:"ad-l",class:["ad-l",1==i.default?"ad-default":""]},[t._v(t._s(i.receiving_name[0]))]),e("v-uni-view",{staticClass:"ad-c"},[e("v-uni-view",{staticClass:"ad-c-n"},[t._v(t._s(i.receiving_name)),e("v-uni-text",[t._v(t._s(i.receiving_phone))])],1),e("v-uni-view",{staticClass:"ad-c-i"},[t._v(t._s(i.province)+t._s(i.city)+t._s(i.area)+"\n\t\t\t\t\t"+t._s(i.detailed_address))])],1),t.order?e("v-uni-text",{staticClass:"uni-icon ad-r"},[t._v("")]):t._e()],1),e("v-uni-view",{staticClass:"ad-b"},[1==i.default?e("v-uni-view",{staticClass:"ad-b-l"},[e("v-uni-text",{staticClass:"uni-icon"},[t._v("")]),t._v("默认地址")],1):e("v-uni-view",{staticClass:"ad-b-l",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.setdefault(i.id)}}},[e("v-uni-text",{staticClass:"uni-icon rsh"},[t._v("")]),t._v("设置为默认地址")],1),e("v-uni-view",{staticClass:"ad-b-r"},[e("v-uni-text",{staticClass:"uni-icon",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.del(i.id)}}},[t._v("")]),e("v-uni-text",{staticClass:"uni-icon",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.update(i)}}},[t._v("")])],1)],1)],1)})),e("v-uni-view",{staticClass:"sku-tj",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.add.apply(void 0,arguments)}}},[t._v("添加新地址")])],2)},d=[];e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return d})),e.d(i,"a",(function(){return a}))},ab58:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{order:"",type:"",mainItem:[]}},onShow:function(){this.$store.commit("judgeLogin"),this.getAddress()},onLoad:function(t){t.order&&(this.order=t.order),t.type&&(this.type=t.type)},methods:{getAddress:function(){var t=this;uni.showLoading({title:"数据查询中"});t=this;t.$request.address.gradeList({}).then((function(i){uni.hideLoading(),1==i.status?t.mainItem=i.data:uni.showToast({icon:"none",title:i.msg})})).catch((function(t){uni.hideLoading(),uni.showToast({icon:"none",title:"数据加载异常"})}))},add:function(){uni.navigateTo({url:"/pages/address/add?order="+this.order+"&type="+this.type})},del:function(t){var i=this;uni.showModal({title:"提示",content:"是否确认删除此收货地址？",success:function(e){e.confirm?(uni.showLoading({title:"数据查询中"}),i.$request.address.delAddress({address_id:t}).then((function(t){1==t.status?i.getAddress():uni.showToast({icon:"none",title:t.msg}),uni.hideLoading()})).catch((function(t){uni.hideLoading(),uni.showToast({icon:"none",title:"数据加载异常"})}))):e.cancel}})},update:function(t){uni.navigateTo({url:"/pages/address/add?order="+this.order+"&type="+this.type+"&id="+t.id+"&receiving_name="+t.receiving_name+"&receiving_phone="+t.receiving_phone+"&province="+t.province+"&city="+t.city+"&area="+t.area+"&detailed_address="+t.detailed_address+"&default="+t.default})},setdefault:function(t){var i=this;i.$request.address.defaulst({address_id:t}).then((function(t){1==t.status?i.getAddress():uni.showToast({icon:"none",title:t.msg}),uni.hideLoading()})).catch((function(t){uni.hideLoading(),uni.showToast({icon:"none",title:"数据加载异常"})}))},selectAddress:function(t){this.order&&("product"==this.type?uni.navigateTo({url:"/pages/product/confirmOrder?order="+this.order+"&addressId="+t.id}):"shop"==this.type&&uni.navigateTo({url:"/pages/shop/confirmOrder?order="+this.order+"&addressId="+t.id}))}}};i.default=a},ae0f:function(t,i,e){"use strict";var a=e("86e7"),n=e.n(a);n.a},f7c4:function(t,i,e){"use strict";e.r(i);var a=e("9069"),n=e("6113");for(var d in n)"default"!==d&&function(t){e.d(i,t,(function(){return n[t]}))}(d);e("ae0f");var o,s=e("f0c5"),r=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"d0552354",null,!1,a["a"],o);i["default"]=r.exports}}]);