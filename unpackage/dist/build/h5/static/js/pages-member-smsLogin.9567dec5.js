(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-member-smsLogin"],{"0bd5":function(e,t,r){var n=r("24fb");t=n(!1),t.push([e.i,"uni-page-body[data-v-890916fe]{background-color:#fff!important}.t-box[data-v-890916fe]{\n\t\t/* background-color: #ffffff; */width:100%;\n\t\t/* margin: 0 auto; */padding:%?11.25?% 0 %?7.5?% 0\n\t\t/* margin-top: 37.5upx; */}\n\n\t/* \t.t-item {\n\t\tborder-bottom: 1px solid #efefef;\n\t\tmargin: 37.5upx 0 56upx 0;\n\t\tclear: both;\n\t} */.t-item[data-v-890916fe]{border:1px solid #c21507;background-color:#f0f0f0;\n\t\t/* border-bottom: 1px solid #efefef; */margin:%?37.5?% 0 %?56?% 0;clear:both;padding:%?10?% %?20?%;border-radius:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative}.t-t[data-v-890916fe]{width:%?150?%;text-align:right;float:left;font-size:%?30?%}.t-input[data-v-890916fe]{\n\t\t/* margin: 19upx 0 3.75upx 0; */height:%?49?%;line-height:%?49?%;font-size:%?26?%;padding-left:%?10?%}.b-box[data-v-890916fe]{width:100%\n\t\t/* margin-left: 4%; */}.blt-botton[data-v-890916fe]{\n\t\t/* color: #f8d79f; */color:#fff;background-color:#c21507;\n\t\t/* background-color: #201f24; */margin-bottom:%?19?%;width:100%;text-align:center;height:%?86?%;line-height:%?86?%;border-radius:%?40?%;font-size:%?30?%}.blt-r[data-v-890916fe]{color:#5e5e5e;font-size:%?22.5?%;float:left}.blt-z[data-v-890916fe]{color:#5e5e5e;font-size:%?22.5?%;float:right}.seehouse_get_nub[data-v-890916fe]{display:inline-block;min-width:%?200?%;height:%?52.5?%;line-height:%?52.5?%;font-size:%?22.5?%;border-radius:%?7.5?%;text-align:center;background-color:#fff;border:1px solid #9a9a9a;color:#9a9a9a;text-decoration:none;\n\t\t/* float: right; */\n\t\t/* margin-top: -60upx; */z-index:100}.sends[data-v-890916fe]{display:inline-block;min-width:%?200?%;height:%?52.5?%;line-height:%?52.5?%;font-size:%?22.5?%;border-radius:%?7.5?%;text-align:center;background-color:#fff;border:1px solid #9a9a9a;color:#9a9a9a;text-decoration:none;padding:0 %?5.625?%;float:right;\n\t\t/* margin-top: -60upx; */z-index:100}.iconfont[data-v-890916fe]{color:#c21507}body.?%PAGE?%[data-v-890916fe]{background-color:#fff!important}",""]),e.exports=t},"0e64":function(e,t,r){"use strict";var n,o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"page-container"},[[r("v-uni-form",{on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)}}},[r("v-uni-view",{staticClass:"t-box"},[r("v-uni-view",{staticClass:"t-item"},[r("i",{staticClass:"iconfont icon-shouji"}),r("v-uni-input",{staticClass:"t-input",attrs:{type:"text",name:"userName",placeholder:"请输入手机号码"},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1),r("v-uni-view",{staticClass:"t-item"},[r("i",{staticClass:"iconfont icon-yduiyanzhengma"}),r("v-uni-input",{staticClass:"t-input",attrs:{type:"text",name:"code",placeholder:"请输入验证码"},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}}),1==e.showText?r("v-uni-button",{staticClass:"seehouse_get_nub",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.sendCode.apply(void 0,arguments)}}},[e._v("获取验证码")]):r("v-uni-view",{staticClass:"sends"},[e._v("("+e._s(e.second)+"秒)重新获取")])],1)],1),r("v-uni-view",{staticClass:"b-box"},[r("v-uni-button",{staticClass:"blt-botton",attrs:{formType:"submit"}},[e._v("验证登录")])],1)],1)]],2)},a=[];r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return n}))},"4c1a":function(e,t,r){r("c975"),r("a9e3"),r("4d63"),r("ac1f"),r("25f0"),r("1276"),e.exports={error:"",check:function(e,t){for(var r=0;r<t.length;r++){if(!t[r].checkType)return!0;if(!t[r].name)return!0;if(!t[r].errorMsg)return!0;if(!e[t[r].name])return this.error=t[r].errorMsg,!1;switch(t[r].checkType){case"string":var n=new RegExp("^.{"+t[r].checkRule+"}$");if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"int":n=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[r].checkRule+"}$");if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[r].name]))return this.error=t[r].errorMsg,!1;var o=t[r].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),e[t[r].name]>o[1]||e[t[r].name]<o[0])return this.error=t[r].errorMsg,!1;break;case"betweenD":n=/^-?[1-9][0-9]?$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;o=t[r].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),e[t[r].name]>o[1]||e[t[r].name]<o[0])return this.error=t[r].errorMsg,!1;break;case"betweenF":n=/^-?[0-9][0-9]?.+[0-9]+$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;o=t[r].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),e[t[r].name]>o[1]||e[t[r].name]<o[0])return this.error=t[r].errorMsg,!1;break;case"same":if(e[t[r].name]!=t[r].checkRule)return this.error=t[r].errorMsg,!1;break;case"notsame":if(e[t[r].name]==t[r].checkRule)return this.error=t[r].errorMsg,!1;break;case"email":n=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"phoneno":n=/^1[0-9]{10,10}$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"zipcode":n=/^[0-9]{6}$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"reg":n=new RegExp(t[r].checkRule);if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"in":if(-1==t[r].checkRule.indexOf(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"notnull":if(null==e[t[r].name]||e[t[r].name].length<1)return this.error=t[r].errorMsg,!1;break}}return!0},isNumber:function(e){var t=/^-?[1-9][0-9]?.?[0-9]*$/;return t.test(e)}}},6686:function(e,t,r){"use strict";var n=r("c337"),o=r.n(n);o.a},"6f74":function(e,t,r){"use strict";r.r(t);var n=r("86b8"),o=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},"86b8":function(e,t,r){"use strict";var n=r("ee27");r("e25e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(r("f3f3")),a=r("2f62"),i=r("4c1a"),s={data:function(){return{userName:"",code:"",second:90,showText:!0}},onLoad:function(e){e.nvitationCode&&(this.nvitationCode=parseInt(e.nvitationCode))},onNavigationBarButtonTap:function(e){console.log("success-------------",e),uni.reLaunch({url:"/pages/member/login"})},methods:(0,o.default)({},(0,a.mapMutations)(["login"]),{sendCode:function(){var e=this;if(""==e.userName)return e.$tools.toast("请填写正确的手机号码"),!1;e.$request.common.sendCode({phone:e.userName,type:1}).then((function(t){if(e.$tools.loadingHide(),200==t.status){e.showText=!1;var r=setInterval((function(){var t=--e.second;e.second=t<10?"0"+t:t}),1e3);setTimeout((function(){clearInterval(r),e.second=90,e.showText=!0}),9e4)}else e.$tools.toast(t.msg)})).catch((function(t){e.$tools.loadingHide(),e.$tools.toast("数据加载异常")}))},dealLogin:function(e){this.login({id:e.id,id_card:e.id_card,id_card_name:e.id_card_name,information_state:e.information_state,user_pay_state:e.user_pay_state,invitation:e.invitation,openid:e.openid,phone:e.phone,pid:e.pid,token:e.token,user_fen:e.user_fen,user_head:e.user_head,user_name:e.user_name,user_type:e.user_type}),uni.switchTab({url:"/pages/member/center"})},formSubmit:function(e){var t=this,r=[{name:"userName",checkType:"phoneno",errorMsg:"电话号码不正确"},{name:"code",checkType:"string",checkRule:"6,6",errorMsg:"验证码6个字符"}],n=e.detail.value,o=i.check(n,r);o?(t.$tools.loading("数据提交中"),t.$request.user.msgLogin(n).then((function(e){t.$tools.loadingHide(),200==e.status?t.dealLogin(e.data):t.$tools.toast(e.msg)})).catch((function(e){t.$tools.loadingHide(),t.$tools.toast("数据加载异常")}))):t.$tools.toast(i.error)}})};t.default=s},"9bb7":function(e,t,r){"use strict";r.r(t);var n=r("0e64"),o=r("6f74");for(var a in o)"default"!==a&&function(e){r.d(t,e,(function(){return o[e]}))}(a);r("6686");var i,s=r("f0c5"),c=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"890916fe",null,!1,n["a"],i);t["default"]=c.exports},c337:function(e,t,r){var n=r("0bd5");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=r("4f06").default;o("336a107a",n,!0,{sourceMap:!1,shadowMode:!1})}}]);