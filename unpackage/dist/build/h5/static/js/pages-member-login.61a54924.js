(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-member-login","pages-member-smsLogin"],{"07a4":function(t,e,n){"use strict";n.r(e);var i=n("3991"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"0bd5":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,"uni-page-body[data-v-890916fe]{background-color:#fff!important}.t-box[data-v-890916fe]{\n\t\t/* background-color: #ffffff; */width:100%;\n\t\t/* margin: 0 auto; */padding:%?11.25?% 0 %?7.5?% 0\n\t\t/* margin-top: 37.5upx; */}\n\n\t/* \t.t-item {\n\t\tborder-bottom: 1px solid #efefef;\n\t\tmargin: 37.5upx 0 56upx 0;\n\t\tclear: both;\n\t} */.t-item[data-v-890916fe]{border:1px solid #c21507;background-color:#f0f0f0;\n\t\t/* border-bottom: 1px solid #efefef; */margin:%?37.5?% 0 %?56?% 0;clear:both;padding:%?10?% %?20?%;border-radius:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative}.t-t[data-v-890916fe]{width:%?150?%;text-align:right;float:left;font-size:%?30?%}.t-input[data-v-890916fe]{\n\t\t/* margin: 19upx 0 3.75upx 0; */height:%?49?%;line-height:%?49?%;font-size:%?26?%;padding-left:%?10?%}.b-box[data-v-890916fe]{width:100%\n\t\t/* margin-left: 4%; */}.blt-botton[data-v-890916fe]{\n\t\t/* color: #f8d79f; */color:#fff;background-color:#c21507;\n\t\t/* background-color: #201f24; */margin-bottom:%?19?%;width:100%;text-align:center;height:%?86?%;line-height:%?86?%;border-radius:%?40?%;font-size:%?30?%}.blt-r[data-v-890916fe]{color:#5e5e5e;font-size:%?22.5?%;float:left}.blt-z[data-v-890916fe]{color:#5e5e5e;font-size:%?22.5?%;float:right}.seehouse_get_nub[data-v-890916fe]{display:inline-block;min-width:%?200?%;height:%?52.5?%;line-height:%?52.5?%;font-size:%?22.5?%;border-radius:%?7.5?%;text-align:center;background-color:#fff;border:1px solid #9a9a9a;color:#9a9a9a;text-decoration:none;\n\t\t/* float: right; */\n\t\t/* margin-top: -60upx; */z-index:100}.sends[data-v-890916fe]{display:inline-block;min-width:%?200?%;height:%?52.5?%;line-height:%?52.5?%;font-size:%?22.5?%;border-radius:%?7.5?%;text-align:center;background-color:#fff;border:1px solid #9a9a9a;color:#9a9a9a;text-decoration:none;padding:0 %?5.625?%;float:right;\n\t\t/* margin-top: -60upx; */z-index:100}.iconfont[data-v-890916fe]{color:#c21507}body.?%PAGE?%[data-v-890916fe]{background-color:#fff!important}",""]),t.exports=e},"0e64":function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"page-container"},[[n("v-uni-form",{on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.formSubmit.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"t-box"},[n("v-uni-view",{staticClass:"t-item"},[n("i",{staticClass:"iconfont icon-shouji"}),n("v-uni-input",{staticClass:"t-input",attrs:{type:"text",name:"userName",placeholder:"请输入手机号码"},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),n("v-uni-view",{staticClass:"t-item"},[n("i",{staticClass:"iconfont icon-yduiyanzhengma"}),n("v-uni-input",{staticClass:"t-input",attrs:{type:"text",name:"code",placeholder:"请输入验证码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),1==t.showText?n("v-uni-button",{staticClass:"seehouse_get_nub",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sendCode.apply(void 0,arguments)}}},[t._v("获取验证码")]):n("v-uni-view",{staticClass:"sends"},[t._v("("+t._s(t.second)+"秒)重新获取")])],1)],1),n("v-uni-view",{staticClass:"b-box"},[n("v-uni-button",{staticClass:"blt-botton",attrs:{formType:"submit"}},[t._v("验证登录")])],1)],1)]],2)},r=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}))},"13f0":function(t,e,n){"use strict";n.r(e);var i=n("e103"),o=n("3fe7");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("77f5");var a,s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"5dd6f18c",null,!1,i["a"],a);e["default"]=c.exports},1708:function(t,e,n){"use strict";var i=n("ee27");n("ac1f"),n("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("f3f3")),r=i(n("cfee")),a=i(n("9bb7")),s=n("2f62"),c={components:{pwInput:r.default,smsLogin:a.default},data:function(){return{userName:"",userPwd:"",invitation:"",iswei:!1,isAutomatic:!0,isFullScreen:!0,isBack:!0,btnName:"登录",userData:{UnionId:"",OpenId:"",UserImg:"",UserNickName:""},type:"text",currentIndex:0}},onShow:function(){},onLoad:function(t){console.log("隐藏"),t.source&&(this.isAutomatic=!1),t.isBack&&(this.isBack=!1),t.invitation&&(this.invitation=t.invitation);var e=uni.getStorageSync("invitation");""!=e&&(this.invitation=e);var n=this.getUrlCode();n&&(this.isAutomatic=!1)},onBackPress:function(t){return"navigateBack"!==t.from&&(this.back(),!0)},onNavigationBarButtonTap:function(t){console.log("success-------------",t),uni.redirectTo({url:"/pages/member/smsLogin"})},methods:(0,o.default)({},(0,s.mapMutations)(["login"]),{getFocus:function(){this.$refs.userPwd.type="password",this.userPwd="",this.userName=this.userName},back:function(){uni.switchTab({url:"/pages/index/index"})},dump:function(t){uni.navigateTo({url:t})},btnLogin:function(){var t=this;if(""==t.userName)return t.$tools.toast("请输入账号"),!1;var e=t.$refs["pwInput"].getPassWord();if(""==e)return t.$tools.toast("请输入密码"),!1;t.$tools.loading("数据提交中"),t.$request.user.login({userName:t.userName,passWord:e}).then((function(e){t.$tools.loadingHide(),200==e.status?t.dealLogin(e.data):t.$tools.toast(e.msg)})).catch((function(e){console.log(e),t.$tools.loadingHide(),t.$tools.toast("数据加载异常")}))},dealLogin:function(t){this.login({id:t.id,id_card:t.id_card,id_card_name:t.id_card_name,information_state:t.information_state,user_pay_state:t.user_pay_state,invitation:t.invitation,openid:t.openid,phone:t.phone,pid:t.pid,token:t.token,user_fen:t.user_fen,user_head:t.user_head,user_name:t.user_name,user_type:t.user_type}),uni.switchTab({url:"/pages/member/center"})},dealWeiLogin:function(){var t=this,e=t.getUrlCode();t.getBackUrl();e&&(uni.showLoading({title:"登录中"}),t.$request.user.getuser({code:e,invitation:t.invitation}).then((function(e){t.$tools.loadingHide(),200==e.status?t.dealLogin(e.data):t.$tools.toast(e.msg)})).catch((function(e){console.log(e),t.$tools.loadingHide(),t.$tools.toast("数据加载异常")})))},getUrlCode:function(){var t=window.location.href.split("#")[0],e=t.split("?")[1];if(e){var n=e.split("&"),i=n[0].split("code=")[1];return i}return""},getBackUrl:function(){var t=window.location.href.split("backUrl=")[1];if(t){var e=t.split("&"),n=decodeURIComponent(e[0]);return n}return""}})};e.default=c},2657:function(t,e,n){t.exports=n.p+"static/img/login_bg.e225d1c3.jpg"},"2d44":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 自定义变量 */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.pw_input_cp[data-v-17b61105]{width:100%}uni-input[data-v-17b61105]{font-size:12px;height:%?48?%;height:100%;font-size:%?26?%;line-height:normal}',""]),t.exports=e},3991:function(t,e,n){"use strict";n("4160"),n("a15b"),n("a434"),n("ac1f"),n("5319"),n("1276"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{inputInfo:Object},data:function(){return{pwdCover:"",password:""}},mounted:function(){this.pwdCover="",this.password=""},methods:{setPassword:function(t){var e=/[0-9a-zA-Z]/g,n=/[^●]/g,i=-1,o=void 0,r=t.detail.value,a=this.password.split(""),s=r.split(""),c=r.length,d=this.password.length;if(s.forEach((function(t,e){n.test(t)&&(i=e,o=t)})),o&&!e.test(o))return s.splice(i,1),void(this.pwdCover=s.join(""));if(d<c)a.splice(i,0,o);else if(c<=d&&-1!==i)a.splice(i,d-(c-1),o);else{var u=this.inputInfo.name,l=document.getElementById(u).selectionEnd;a.splice(l,d-c)}this.pwdCover=r.replace(/\S/g,"●"),this.password=a.join("")},getPassWord:function(){return this.password}}};e.default=i},"3fe7":function(t,e,n){"use strict";n.r(e);var i=n("1708"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"42c3":function(t,e,n){var i=n("d45d");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("0806f313",i,!0,{sourceMap:!1,shadowMode:!1})},"4c1a":function(t,e,n){n("c975"),n("a9e3"),n("4d63"),n("ac1f"),n("25f0"),n("1276"),t.exports={error:"",check:function(t,e){for(var n=0;n<e.length;n++){if(!e[n].checkType)return!0;if(!e[n].name)return!0;if(!e[n].errorMsg)return!0;if(!t[e[n].name])return this.error=e[n].errorMsg,!1;switch(e[n].checkType){case"string":var i=new RegExp("^.{"+e[n].checkRule+"}$");if(!i.test(t[e[n].name]))return this.error=e[n].errorMsg,!1;break;case"int":i=new RegExp("^(-[1-9]|[1-9])[0-9]{"+e[n].checkRule+"}$");if(!i.test(t[e[n].name]))return this.error=e[n].errorMsg,!1;break;case"between":if(!this.isNumber(t[e[n].name]))return this.error=e[n].errorMsg,!1;var o=e[n].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),t[e[n].name]>o[1]||t[e[n].name]<o[0])return this.error=e[n].errorMsg,!1;break;case"betweenD":i=/^-?[1-9][0-9]?$/;if(!i.test(t[e[n].name]))return this.error=e[n].errorMsg,!1;o=e[n].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),t[e[n].name]>o[1]||t[e[n].name]<o[0])return this.error=e[n].errorMsg,!1;break;case"betweenF":i=/^-?[0-9][0-9]?.+[0-9]+$/;if(!i.test(t[e[n].name]))return this.error=e[n].errorMsg,!1;o=e[n].checkRule.split(",");if(o[0]=Number(o[0]),o[1]=Number(o[1]),t[e[n].name]>o[1]||t[e[n].name]<o[0])return this.error=e[n].errorMsg,!1;break;case"same":if(t[e[n].name]!=e[n].checkRule)return this.error=e[n].errorMsg,!1;break;case"notsame":if(t[e[n].name]==e[n].checkRule)return this.error=e[n].errorMsg,!1;break;case"email":i=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!i.test(t[e[n].name]))return this.error=e[n].errorMsg,!1;break;case"phoneno":i=/^1[0-9]{10,10}$/;if(!i.test(t[e[n].name]))return this.error=e[n].errorMsg,!1;break;case"zipcode":i=/^[0-9]{6}$/;if(!i.test(t[e[n].name]))return this.error=e[n].errorMsg,!1;break;case"reg":i=new RegExp(e[n].checkRule);if(!i.test(t[e[n].name]))return this.error=e[n].errorMsg,!1;break;case"in":if(-1==e[n].checkRule.indexOf(t[e[n].name]))return this.error=e[n].errorMsg,!1;break;case"notnull":if(null==t[e[n].name]||t[e[n].name].length<1)return this.error=e[n].errorMsg,!1;break}}return!0},isNumber:function(t){var e=/^-?[1-9][0-9]?.?[0-9]*$/;return e.test(t)}}},5843:function(t,e,n){var i=n("2d44");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("32509359",i,!0,{sourceMap:!1,shadowMode:!1})},6686:function(t,e,n){"use strict";var i=n("c337"),o=n.n(i);o.a},"6f74":function(t,e,n){"use strict";n.r(e);var i=n("86b8"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"77f5":function(t,e,n){"use strict";var i=n("42c3"),o=n.n(i);o.a},"86b8":function(t,e,n){"use strict";var i=n("ee27");n("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("f3f3")),r=n("2f62"),a=n("4c1a"),s={data:function(){return{userName:"",code:"",second:90,showText:!0}},onLoad:function(t){t.nvitationCode&&(this.nvitationCode=parseInt(t.nvitationCode))},onNavigationBarButtonTap:function(t){console.log("success-------------",t),uni.reLaunch({url:"/pages/member/login"})},methods:(0,o.default)({},(0,r.mapMutations)(["login"]),{sendCode:function(){var t=this;if(""==t.userName)return t.$tools.toast("请填写正确的手机号码"),!1;t.$request.common.sendCode({phone:t.userName,type:1}).then((function(e){if(t.$tools.loadingHide(),200==e.status){t.showText=!1;var n=setInterval((function(){var e=--t.second;t.second=e<10?"0"+e:e}),1e3);setTimeout((function(){clearInterval(n),t.second=90,t.showText=!0}),9e4)}else t.$tools.toast(e.msg)})).catch((function(e){t.$tools.loadingHide(),t.$tools.toast("数据加载异常")}))},dealLogin:function(t){this.login({id:t.id,id_card:t.id_card,id_card_name:t.id_card_name,information_state:t.information_state,user_pay_state:t.user_pay_state,invitation:t.invitation,openid:t.openid,phone:t.phone,pid:t.pid,token:t.token,user_fen:t.user_fen,user_head:t.user_head,user_name:t.user_name,user_type:t.user_type}),uni.switchTab({url:"/pages/member/center"})},formSubmit:function(t){var e=this,n=[{name:"userName",checkType:"phoneno",errorMsg:"电话号码不正确"},{name:"code",checkType:"string",checkRule:"6,6",errorMsg:"验证码6个字符"}],i=t.detail.value,o=a.check(i,n);o?(e.$tools.loading("数据提交中"),e.$request.user.msgLogin(i).then((function(t){e.$tools.loadingHide(),200==t.status?e.dealLogin(t.data):e.$tools.toast(t.msg)})).catch((function(t){e.$tools.loadingHide(),e.$tools.toast("数据加载异常")}))):e.$tools.toast(a.error)}})};e.default=s},"9bb7":function(t,e,n){"use strict";n.r(e);var i=n("0e64"),o=n("6f74");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("6686");var a,s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"890916fe",null,!1,i["a"],a);e["default"]=c.exports},"9fb7":function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-input",{attrs:{id:t.inputInfo.name,type:"text",name:t.inputInfo.name,placeholder:t.inputInfo.placeholder,autocomplete:"off"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.setPassword.apply(void 0,arguments)}},model:{value:t.pwdCover,callback:function(e){t.pwdCover=e},expression:"pwdCover"}})],1)},r=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}))},c337:function(t,e,n){var i=n("0bd5");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("336a107a",i,!0,{sourceMap:!1,shadowMode:!1})},ccf4:function(t,e,n){"use strict";var i=n("5843"),o=n.n(i);o.a},cfee:function(t,e,n){"use strict";n.r(e);var i=n("9fb7"),o=n("07a4");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("ccf4");var a,s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"17b61105",null,!1,i["a"],a);e["default"]=c.exports},d45d:function(t,e,n){var i=n("24fb"),o=n("1de5"),r=n("2657");e=i(!1);var a=o(r);e.push([t.i,"uni-page-body[data-v-5dd6f18c]{background-color:#fff!important}.t-box[data-v-5dd6f18c]{\n\t\t/* background-color: #ffffff; */width:100%;\n\t\t/* margin: 0 auto; */padding:%?11.25?% 0 %?7.5?% 0\n\t\t/* margin-top: 37.5upx; */}.t-item[data-v-5dd6f18c]{border:1px solid #c21507;background-color:#f0f0f0;\n\t\t/* border-bottom: 1px solid #efefef; */margin:%?37.5?% 0 %?56?% 0;clear:both;padding:%?10?% %?20?%;border-radius:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative}.t-t[data-v-5dd6f18c]{width:%?150?%;text-align:right;float:left;font-size:%?30?%}.t-input[data-v-5dd6f18c]{\n\t\t/* margin: 19upx 0 3.75upx 0; */height:%?49?%;line-height:%?49?%;font-size:%?26?%;width:100%;padding-left:%?15?%;-webkit-box-sizing:border-box;box-sizing:border-box}.t-input uni-input[data-v-5dd6f18c]{padding:0}.blt-botton[data-v-5dd6f18c]{\n\t\t/* color: #f8d79f; */color:#fff;background-color:#c21507;\n\t\t/* background-color: #201f24; */margin-bottom:%?19?%;width:100%;text-align:center;height:%?86?%;line-height:%?86?%;border-radius:%?40?%;font-size:%?30?%}.blt-r[data-v-5dd6f18c]{color:#5e5e5e;font-size:%?22.5?%\n\t\t/* float: left; */}.blt-z[data-v-5dd6f18c]{color:#5e5e5e;font-size:%?22.5?%\n\t\t/* float: right; */}.bt-x[data-v-5dd6f18c]{position:fixed;bottom:%?75?%;width:60%;text-align:center;font-size:%?22.5?%}.bt-x uni-text[data-v-5dd6f18c]{color:#007aff}.b-phone[data-v-5dd6f18c]{position:fixed;bottom:%?60?%}uni-page-body[data-v-5dd6f18c]{width:100%;height:100%;background-image:url("+a+');background-size:cover;background-position:0 0;background-repeat:no-repeat;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.container[data-v-5dd6f18c]{width:65%}.type-box[data-v-5dd6f18c]{padding:%?20?% 0;width:%?360?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;border-top:%?6?% solid #8c8c8c;margin:0 auto %?20?%;position:relative}\n\n\t/* \t.type-code {\n\t\tposition: relative;\n\t} */.type-box[data-v-5dd6f18c]::before{content:"";position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:%?6?%;height:%?50?%;background-color:#8c8c8c}.line-active[data-v-5dd6f18c]{position:relative}.line-active[data-v-5dd6f18c]::after{content:"";position:absolute;left:0;bottom:%?-10?%;width:100%;height:%?6?%;background-color:#8c8c8c}.iconfont[data-v-5dd6f18c]{color:#c21507}.to-other[data-v-5dd6f18c]{position:absolute;right:%?-140?%;top:%?0?%}.sends[data-v-5dd6f18c]{display:inline-block;min-width:%?150?%;height:%?52.5?%;line-height:%?52.5?%;font-size:%?22.5?%;border-radius:%?7.5?%;text-align:center;background-color:#fff;border:1px solid #9a9a9a;color:#9a9a9a;text-decoration:none;padding:0 %?5.625?%;float:right;\n\t\t/* margin-top: -60upx; */z-index:100}.type-box uni-view[data-v-5dd6f18c]{font-size:%?36?%;font-weight:700;letter-spacing:0}body.?%PAGE?%[data-v-5dd6f18c]{background-color:#fff!important}',""]),t.exports=e},e103:function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"type-box"},[n("v-uni-view",{class:["type-pwd firstFont",{"line-active":0==t.currentIndex}],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.currentIndex=0}}},[t._v("账号登录")]),n("v-uni-view",{class:["type-code firstFont",{"line-active":1==t.currentIndex}],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.currentIndex=1}}},[t._v("短信登录")])],1),0==t.currentIndex?[n("v-uni-view",{staticClass:"t-box"},[n("v-uni-view",{staticClass:"t-item"},[n("i",{staticClass:"iconfont icon-yonghu"}),n("v-uni-input",{staticClass:"t-input",attrs:{type:"text",placeholder:"用户名",autocomplete:"off"},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1),n("v-uni-view",{staticClass:"t-item"},[n("i",{staticClass:"iconfont icon-ziyuanxhdpi"}),n("pwInput",{ref:"pwInput",staticClass:"t-input",attrs:{inputInfo:{name:"userPwd",placeholder:"登录密码"}}}),n("v-uni-view",{staticClass:"to-other"},[n("v-uni-view",{staticClass:"blt-r",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/member/registered?nvitationCode="+t.invitation)}}},[t._v("快速注册")]),n("v-uni-view",{staticClass:"blt-z",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/member/retrieve")}}},[t._v("忘记密码？")])],1)],1)],1),n("v-uni-view",{staticClass:"b-box"},[n("v-uni-view",{staticClass:"blt-botton",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.btnLogin.apply(void 0,arguments)}}},[t._v(t._s(t.btnName))])],1),n("v-uni-view",{staticClass:"bt-x",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dump("/pages/member/protocol")}}},[t._v("登录即同意"),n("v-uni-text",[t._v("《艺拍拍(深圳)用户协议》")])],1)]:[n("smsLogin")]],2)},r=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}))}}]);