(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-member-setPhone"],{1672:function(e,t,r){var n=r("24fb");t=n(!1),t.push([e.i,"uni-page-body[data-v-1fe35aea]{background-color:#fff!important}.t-box[data-v-1fe35aea]{background-color:#fff;width:92%;margin-left:4%;padding:%?11.25?% 0 %?7.5?% 0;margin-top:%?37.5?%}.t-item[data-v-1fe35aea]{border-bottom:1px solid #efefef;margin:%?37.5?% 0 %?56?% 0;clear:both}.t-t[data-v-1fe35aea]{width:%?150?%;text-align:right;float:left;font-size:%?30?%}.t-input[data-v-1fe35aea]{margin:%?19?% 0 %?3.75?% 0;height:%?49?%;line-height:%?49?%;font-size:%?26?%}.b-box[data-v-1fe35aea]{width:92%;margin-left:4%}.blt-botton[data-v-1fe35aea]{color:#f8d79f;background-color:#201f24;margin-bottom:%?19?%;width:100%;text-align:center;height:%?86?%;line-height:%?86?%;border-radius:%?11?%;font-size:%?30?%}.blt-r[data-v-1fe35aea]{color:#5e5e5e;font-size:%?22.5?%;float:left}.blt-z[data-v-1fe35aea]{color:#5e5e5e;font-size:%?22.5?%;float:right}.seehouse_get_nub[data-v-1fe35aea]{display:inline-block;min-width:%?150?%;height:%?52.5?%;line-height:%?52.5?%;font-size:%?22.5?%;border-radius:%?7.5?%;text-align:center;background-color:#fff;border:1px solid #9a9a9a;color:#9a9a9a;text-decoration:none;float:right;margin-top:%?-60?%;z-index:100}.sends[data-v-1fe35aea]{display:inline-block;min-width:%?150?%;height:%?52.5?%;line-height:%?52.5?%;font-size:%?22.5?%;border-radius:%?7.5?%;text-align:center;background-color:#fff;border:1px solid #9a9a9a;color:#9a9a9a;text-decoration:none;padding:0 %?5.625?%;float:right;margin-top:%?-60?%;z-index:100}body.?%PAGE?%[data-v-1fe35aea]{background-color:#fff!important}",""]),e.exports=t},"1ccb":function(e,t,r){"use strict";var n=r("2420"),o=r.n(n);o.a},2420:function(e,t,r){var n=r("1672");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=r("4f06").default;o("50d47896",n,!0,{sourceMap:!1,shadowMode:!1})},"496c":function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return n}));var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"container"},[[r("v-uni-form",{on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)}}},[r("v-uni-view",{staticClass:"t-box"},[r("v-uni-view",{staticClass:"t-item"},[e._v("预留号码："+e._s(e.oldPhone))]),r("v-uni-view",{staticClass:"t-item"},[r("v-uni-input",{staticClass:"t-input",attrs:{type:"text",name:"phone",placeholder:"请输入新手机号码"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1),r("v-uni-view",{staticClass:"t-item"},[r("v-uni-input",{staticClass:"t-input",attrs:{type:"text",name:"code",placeholder:"请输入验证码"},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}}),1==e.showText?r("v-uni-button",{staticClass:"seehouse_get_nub",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.sendCode.apply(void 0,arguments)}}},[e._v("获取验证码")]):r("v-uni-view",{staticClass:"sends"},[e._v("("+e._s(e.second)+"秒)重新获取")])],1)],1),r("v-uni-view",{staticClass:"b-box"},[r("v-uni-button",{staticClass:"blt-botton",attrs:{formType:"submit"}},[e._v("提交修改")])],1)],1)]],2)},a=[]},"7c0c":function(e,t,r){"use strict";r.r(t);var n=r("496c"),o=r("e61f");for(var a in o)"default"!==a&&function(e){r.d(t,e,(function(){return o[e]}))}(a);r("1ccb");var i,s=r("f0c5"),c=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"1fe35aea",null,!1,n["a"],i);t["default"]=c.exports},"917d":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("ac0e"),o={data:function(){return{oldPhone:"",phone:"",code:"",second:90,showText:!0}},onShow:function(){this.$store.commit("judgeLogin")},onLoad:function(){var e=uni.getStorageSync("uerInfo");this.oldPhone=e.phone},methods:{sendCode:function(){var e=this;if(""==e.phone)return uni.showToast({icon:"none",title:"请填写正确的手机号码"}),!1;e.$request.common.sendCode({phone:e.phone,type:1}).then((function(t){if(uni.hideLoading(),1==t.status){e.showText=!1;var r=setInterval((function(){var t=--e.second;e.second=t<10?"0"+t:t}),1e3);setTimeout((function(){clearInterval(r),e.second=90,e.showText=!0}),9e4)}else uni.showToast({icon:"none",title:t.msg})})).catch((function(e){uni.hideLoading(),uni.showToast({icon:"none",title:"数据加载异常"})}))},formSubmit:function(e){var t=this,r=[{name:"phone",checkType:"phoneno",errorMsg:"电话号码不正确"},{name:"code",checkType:"string",checkRule:"6,6",errorMsg:"验证码6个字符"}],o=e.detail.value,a=n.check(o,r);a?(uni.showLoading({title:"数据提交中"}),t.$request.user.updPhone(o).then((function(e){if(uni.hideLoading(),1==e.status){var r=uni.getStorageSync("uerInfo");r.phone=t.phone,uni.setStorage({key:"uerInfo",data:r}),uni.showToast({icon:"none",title:"修改成功"}),uni.navigateTo({url:"/pages/member/details"})}else uni.showToast({icon:"none",title:e.msg})})).catch((function(e){uni.hideLoading(),uni.showToast({icon:"none",title:"数据加载异常"})}))):uni.showToast({title:n.error,icon:"none"})}}};t.default=o},ac0e:function(e,t,r){r("c975"),r("a9e3"),r("4d63"),r("ac1f"),r("25f0"),r("1276"),e.exports={error:"",check:function(e,t){for(var r=0;r<t.length;r++){if(!t[r].checkType)return!0;if(!t[r].name)return!0;if(!t[r].errorMsg)return!0;if(!e[t[r].name])return this.error=t[r].errorMsg,!1;switch(t[r].checkType){case"string":var n=new RegExp("^.{"+t[r].checkRule+"}$");if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"int":n=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[r].checkRule+"}$");if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[r].name]))return this.error=t[r].errorMsg,!1;var o=t[r].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),e[t[r].name]>o[1]||e[t[r].name]<o[0])return this.error=t[r].errorMsg,!1;break;case"betweenD":n=/^-?[1-9][0-9]?$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;o=t[r].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),e[t[r].name]>o[1]||e[t[r].name]<o[0])return this.error=t[r].errorMsg,!1;break;case"betweenF":n=/^-?[0-9][0-9]?.+[0-9]+$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;o=t[r].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),e[t[r].name]>o[1]||e[t[r].name]<o[0])return this.error=t[r].errorMsg,!1;break;case"same":if(e[t[r].name]!=t[r].checkRule)return this.error=t[r].errorMsg,!1;break;case"notsame":if(e[t[r].name]==t[r].checkRule)return this.error=t[r].errorMsg,!1;break;case"email":n=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"phoneno":n=/^1[0-9]{10,10}$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"zipcode":n=/^[0-9]{6}$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"reg":n=new RegExp(t[r].checkRule);if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"in":if(-1==t[r].checkRule.indexOf(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"notnull":if(null==e[t[r].name]||e[t[r].name].length<1)return this.error=t[r].errorMsg,!1;break}}return!0},isNumber:function(e){var t=/^-?[1-9][0-9]?.?[0-9]*$/;return t.test(e)}}},e61f:function(e,t,r){"use strict";r.r(t);var n=r("917d"),o=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a}}]);