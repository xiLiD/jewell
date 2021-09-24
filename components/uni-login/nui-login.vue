<template>
	<view class="container">
		<uni-popup ref="showLogin" @change="popupChange">
			<view class="uni-login">
				<image class="black" src="/static/images/close_black.png" @click="cancelLogin"></image>
				<image class="logo" src="/static/logo.png"></image>
				<!-- <view class="ctel">{{ userTel }}</view> -->
				<button class="btn-login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
					v-if="isWei">本机号码一键登录</button>
				<view class="btn-login" @click="dealLogin" v-else>本机号码一键登录</view>
				<view class="other" @click="otherLogin">账号密码登录</view>
				<view class="bt-x" @click="dump('/pages/member/protocol')">
					登录即同意
					<text>《爱秀装用户协议》</text>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="showCodeLogin" @change="popupChange">
			<view class="seehouse_box">
				<!-- <view class="seehouse_nub">
					已有
					<text class="red">200</text>
					人领取
				</view> -->
				<view class="s_input">
					<input type="number" v-model="userTel" placeholder="输入手机号" />
					<button class="seehouse_get_nub" @click="sendCode" v-if="showText">获取验证码</button>
					<view v-else class="send">({{ second }}秒)重新获取</view>
				</view>

				<view class="s_input"><input type="number" v-model="code" placeholder="输入验证码" /></view>

				<button class="seehou_submit" id="tjsx" @click="signUp">{{ name }}</button>
				<text class="E_Declaration" v-if="intro">说明：{{ intro }}</text>

				<image src="/static/images/seehouse_close.png" class="seehouse_close" @click="cancelCodeLogin"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	// #ifdef APP-PLUS
	const shanYanSDKModule = uni.requireNativePlugin('CLSDK-ShanYanSDKModule'); //调用
	// #endif

	import config from '@/config/config';

	export default {
		name: 'uni-login',
		props: {
			isFullScreen: {
				//是否全屏
				type: Boolean,
				default () {
					return false;
				}
			},
			isAutomatic: {
				//是否自动登录
				type: Boolean,
				default () {
					return false;
				}
			},
			isWeiAutomatic: {
				//是否自动登录
				type: Boolean,
				default () {
					return false;
				}
			},
			backUrl: {
				//返回地址
				type: String,
				default () {
					return '';
				}
			},
			remarks: {
				//备注
				type: String,
				default () {
					return '';
				}
			},
			title: {
				//标题
				type: String,
				default () {
					return '立即报名';
				}
			}
		},
		data() {
			return {
				platform: '',
				appid: '',
				ios_uiConfigure: {},
				userTel: '',
				token: '',
				weiToken: '',
				isWei: false,
				isApp: false,
				intro: '',
				name: '',
				showText: true,
				code: '',
				second: 90,
				isSignUp: 0 //是否报名
			};
		},
		created() {
			if (this._props.isAutomatic) { //是否自动登录
				this.openLogin();
			}
			if (this._props.isWeiAutomatic) { //微信自动登录
				this.weiLogin(this._props.backUrl);
			}
			this.name = this._props.title;
		},
		methods: {
			openLogin() {
				this.intro = this._props.remarks;
				this.userTel = uni.getStorageSync('LocalTel');

				// #ifdef APP-PLUS
				this.isApp = true;
				// #endif
				// #ifdef MP-WEIXIN
				this.isWei = true;
				// #endif

				if (this.isApp) {
					this.platform = uni.getSystemInfoSync().platform;
					if (this.platform == 'android') {
						this.appid = config.SanYan.AndroidAppId; //appID与包名绑定
					} else if (this.platform == 'ios') {
						this.appid = config.SanYan.IOSAppId; //appID与bundleID绑定
					}

					this.init();
				} else if (this.isWei) {
					this.open();
				} else {
					this.otherLogin();
				}
				//this.open();
			},
			open() {
				if (this.isWei) {
					wx.login({
						success: function(res) {}
					});
				}
				this.$nextTick(() => {
					this.$refs['showLogin'].open();
				});
			},
			cancelLogin() {
				this.$refs['showLogin'].close();
			},
			cancelCodeLogin() {
				this.$refs['showCodeLogin'].close();
			},
			popupChange(e) {
				if (e.show) {
					this.$emit('change', {
						show: true
					});
				} else {
					this.$emit('change', {
						show: false
					});
				}
			},
			otherLogin() {
				if (this._props.isFullScreen) {
					if (!this._props.isFullScreen) {
						uni.navigateTo({
							url: '/member/login?option=1'
						});
						this.$refs['showLogin'].close();
					}
				} else {
					this.$refs['showCodeLogin'].open();
				}
			},
			sendCode() {
				//发送验证码
				var _this = this;
				if (_this.userTel == '') {
					_this.$tools.toast('请填写正确的手机号码')
					return false;
				}

				_this.$tools.loading('数据条件中')
				//发送验证码
				_this.$request.common
					.SendCode({
						tel: _this.userTel,
						typeId: 2
					})
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 200) {
							_this.showText = false;
							var interval = setInterval(() => {
								let times = --_this.second;
								_this.second = times < 10 ? '0' + times : times; //小于10秒补 0
							}, 1000);
							setTimeout(() => {
								clearInterval(interval);
								_this.second = 90;
								_this.showText = true;
							}, 90000);
						} else {
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常')
						
					});
			},
			signUp() {
				//报名
				var th = this;
				if (th.userTel == '') {
					th.$tools.toast('请填写正确的手机号码')
					return false;
				}
				if (th.code == '') {
					th.$tools.toast('请输入手机验证码')
					return false;
				}

				//报名
				th.isSignUp = 1;
				th.dealLogin();
			},
			weiLogin(backUrl) {
				//微信登录

				// #ifdef H5
				let agent = window.navigator.userAgent.toLowerCase();
				if (agent.match(/MicroMessenger/i) == 'micromessenger') {
					this.weiH5Login(backUrl);
				}
				// #endif

				// #ifndef H5
				this.weiAppLogin();
				// #endif

			},
			weiH5Login(backUrl) {
				//公众号登录
				var appId = config.H5Wei.AppId;
				var redirect_uri = encodeURIComponent(config.SITE + '#/pages/member/login?backUrl=' + backUrl); //返回网址
				var url =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId +
					'&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';

				window.location.href = url;
			},
			weiAppLogin() {
				var _this = this;
				// uni.showLoading({
				// 	title: '微信登录中'
				// });
				var typeId = 1;
				// #ifdef APP-PLUS
				typeId = 2;
				//#endif

				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						_this.$request.user
							.WeiLogin({
								code: loginRes.code,
								typeId: typeId
							})
							.then(data => {
								_this.$tools.loadingHide();
								if (data.status == 1) {
									console.log(data)
								} else {
									_this.$tools.toast(data.msg)
								}
							})
							.catch(err => {
								_this.$tools.loadingHide();
								//消息异常
								_this.$tools.toast('数据加载异常')
							});
					}
				});
			},
			init() {
				let _this = this;
				//初始化建议在app启动时调用，即App.vue的onLaunch方法中
				uni.showLoading({
					mask: true
				});
				//闪验SDK 初始化
				shanYanSDKModule.init({
						appid: this.appid
					},
					result => {
						_this.$tools.loadingHide();
						if (result.code === 1022 || result.code === 1000) {
							_this.qulickLogin();
						}
					}
				);
			},
			setAuthCJSThemeConfig() {
				//页面授权模式
				if (this.platform == 'android') {
					//Android 全屏模式

					//闪验SDK  配置授权页方法
					shanYanSDKModule.setAuthThemeConfig({
							//授权页已有元素配置
							uiConfig: {
								setNavText: '一键登录', //导航栏

								setLogoImgPath: 'static/logo.png', //logo
								setLogoWidth: '71',
								setLogoHeight: '71',

								setLogBtnImgPath: 'static/logo-bg.png', //按钮
								setLogBtnText: '  ',

								setAppPrivacyOne: {
									title: '爱秀装用户协议',
									url: config.SITE + '/#/pages/member/protocol'
								},
								setPrivacyState: true,
								setPrivacyText: {
									privacyTextOne: '登录即同意',
									privacyTextTwo: '、',
									privacyTextThree: '、',
									privacyTextFour: '和',
									privacyTextFive: '并授权登录。快捷登录后，您可以看到秀装所有的材料和人工报价'
								}
							}, //授权页添加自定义控件元素
							widgets: {
								widget1: {
									widgetId: 'customView_one',
									type: 'TextView',
									left: '',
									top: '300',
									right: '',
									bottom: '',
									width: '',
									height: '30',
									textContent: '账号密码登录',
									textFont: '13',
									textColor: '#cc0000',
									backgroundColor: '#ffffff',
									isFinish: 'true'
								}
							}
						},
						result => {
							if (result.result === 'customView_one') {
								shanYanSDKModule.close();
							}
						}
					);
				} else if (this.platform == 'ios') {
					//iOS 全屏模式
					let screenWidth_Portrait = plus.screen.resolutionWidth; //竖屏宽

					var screenScale = screenWidth_Portrait / 375.0; //相对iphone6屏幕
					if (screenScale > 1) {
						screenScale = 1; //大屏的无需放大
					}

					//竖屏
					let clLayoutLogoTop_Portrait = screenScale * 60;
					let clLayoutLogoWidth_Portrait = 60 * screenScale;
					let clLayoutLogoHeight_Portrait = 60 * screenScale;
					let clLayoutLogoCenterX_Portrait = 0;

					let clLayoutPhoneCenterY_Portrait = -20 * screenScale;
					let clLayoutPhoneLeft_Portrait = 50 * screenScale;
					let clLayoutPhoneRight_Portrait = -50 * screenScale;
					let clLayoutPhoneHeight_Portrait = 20 * screenScale;

					let clLayoutLoginBtnCenterY_Portrait = clLayoutPhoneCenterY_Portrait + clLayoutPhoneHeight_Portrait *
						0.5 *
						screenScale + 20 * screenScale + 15 * screenScale;
					let clLayoutLoginBtnHeight_Portrait = 30 * screenScale;
					let clLayoutLoginBtnLeft_Portrait = 70 * screenScale;
					let clLayoutLoginBtnRight_Portrait = -70 * screenScale;

					let clLayoutAppPrivacyLeft_Portrait = 40 * screenScale;
					let clLayoutAppPrivacyRight_Portrait = -40 * screenScale;
					let clLayoutAppPrivacyBottom_Portrait = 0 * screenScale;
					let clLayoutAppPrivacyHeight_Portrait = 45 * screenScale;

					let clLayoutSloganLeft_Portrait = 0;
					let clLayoutSloganRight_Portrait = 0;
					let clLayoutSloganHeight_Portrait = 15 * screenScale;
					let clLayoutSloganBottom_Portrait = clLayoutAppPrivacyBottom_Portrait -
						clLayoutAppPrivacyHeight_Portrait;

					this.ios_uiConfigure = {
						clBackgroundImg: 'static/lbg.jpg',

						shouldAutorotate: false,
						supportedInterfaceOrientations: 5,

						clNavigationBackgroundClear: true, //导航栏透明
						clNavigationBackBtnImage: 'static/images/close-white.png', //返回按钮图片
						clNavBackBtnAlimentRight: false, //返回按钮居右,设置自定义导航栏返回按钮时，以自定义为准

						clLogoImage: 'static/logo.png', //logo图片

						clLoginBtnText: '本机号一键登录', //一键登录按钮文字
						clLoginBtnTextColor: [1, 1, 1, 1.0], //rgba
						clLoginBtnBgColor: [0.2, 0.8, 0.2, 1.0], //rgba
						clLoginBtnTextFont: 15 * screenScale,
						clLoginBtnCornerRadius: 10,
						clLoginBtnBorderWidth: 0.5,
						clLoginBtnBorderColor: [0.1, 0.8, 0.1, 1.0], //rgba

						clPhoneNumberFont: 20.0 * screenScale,

						clAppPrivacyColor: [
							[0.6, 0.6, 0.6, 1.0],
							[0, 1, 0, 1.0]
						], //2 item,commomTextColor and appPrivacyTextColor
						clAppPrivacyTextFont: 11 * screenScale,
						clAppPrivacyTextAlignment: 0, //0: center 1: left 2: right
						clAppPrivacyFirst: ['爱秀装用户协议', config.SITE +
						'/#/pages/member/protocol'], // 2 item, name and url

						clCheckBoxVerticalAlignmentToAppPrivacyCenterY: true,
						clCheckBoxSize: [30 * screenScale, 30 * screenScale], //2 item, width and height
						clCheckBoxImageEdgeInsets: [2 * screenScale, 10 * screenScale, 13 * screenScale, 5 *
							screenScale
						], //4 item, top left bottom right
						clCheckBoxUncheckedImage: 'static/images/checkBoxNor.png',
						clCheckBoxCheckedImage: 'static/images/checkBoxSEL.png',
						clCheckBoxValue: true,

						clLoadingSize: [50, 50], //2 item, width and height
						clLoadingTintColor: [0.2, 0.8, 0.2, 1],
						clLoadingBackgroundColor: [1, 1, 1, 1],
						clLoadingCornerRadius: 5,

						//竖屏布局对象
						clOrientationLayOutPortrait: {
							//控件
							clLayoutLogoWidth: clLayoutLogoWidth_Portrait,
							clLayoutLogoHeight: clLayoutLogoHeight_Portrait,
							clLayoutLogoCenterX: clLayoutLogoCenterX_Portrait,
							clLayoutLogoTop: clLayoutLogoTop_Portrait,

							clLayoutPhoneCenterY: clLayoutPhoneCenterY_Portrait,
							clLayoutPhoneHeight: clLayoutPhoneHeight_Portrait,
							clLayoutPhoneLeft: clLayoutPhoneLeft_Portrait,
							clLayoutPhoneRight: clLayoutPhoneRight_Portrait,

							clLayoutLoginBtnCenterY: clLayoutLoginBtnCenterY_Portrait,
							clLayoutLoginBtnHeight: clLayoutLoginBtnHeight_Portrait,
							clLayoutLoginBtnLeft: clLayoutLoginBtnLeft_Portrait,
							clLayoutLoginBtnRight: clLayoutLoginBtnRight_Portrait,

							clLayoutAppPrivacyLeft: clLayoutAppPrivacyLeft_Portrait,
							clLayoutAppPrivacyRight: clLayoutAppPrivacyRight_Portrait,
							clLayoutAppPrivacyBottom: clLayoutAppPrivacyBottom_Portrait,
							clLayoutAppPrivacyHeight: clLayoutAppPrivacyHeight_Portrait,

							clLayoutSloganLeft: clLayoutSloganLeft_Portrait,
							clLayoutSloganRight: clLayoutSloganRight_Portrait,
							clLayoutSloganHeight: clLayoutSloganHeight_Portrait,
							clLayoutSloganBottom: clLayoutSloganBottom_Portrait
						},
						//自定义控件
						widgets: {
							widget0: {
								widgetId: 'customView_nav_left', //字符标记
								type: 'Button', // 类型：Button：按钮，ImageView:图片 TextView:文本
								navPosition: 'navleft', //按钮位置 navleft:导航栏左侧 ，navright:导航栏右侧（不设置默认添加到授权页上）,当设置为导航栏控件时，仅宽高可设置，位置固定
								textContent: '返回', //文字
								textFont: 11, //字体
								textColor: [1, 1, 0, 1], //文字颜色[r,g,b,a]
								// backgroundColor: [0,0,1,1],//控件背景色[r,g,b,a]
								image: 'static/images/close-black.png',

								// cornerRadius: 10,//圆角，设置圆角时请设置masksToBounds:true
								// masksToBounds:true,//圆角相关

								isFinish: true, //点击销毁授权页,

								// clLayoutLeft:12,
								// clLayoutTop:60,
								// clLayoutRight:-12,
								// clLayoutBottom:-80,
								clLayoutWidth: 40,
								clLayoutHeight: 40
								// clLayoutCenterX:0,
								// clLayoutCenterY:0,
							},
							widgetnavRight: {
								widgetId: 'customView_nav_right', //字符标记
								type: 'Button', // 类型：Button：按钮，ImageView:图片 TextView:文本
								navPosition: 'navright', //按钮位置 navleft:导航栏左侧 ，navright:导航栏右侧（不设置默认添加到授权页上）,当设置为导航栏控件时，仅宽高可设置，位置固定
								textContent: '关闭', //文字
								textFont: 13, //字体
								textColor: [0, 1, 0, 1], //文字颜色[r,g,b,a]
								backgroundColor: [0, 0, 1, 1], //控件背景色[r,g,b,a]
								image: 'static/images/checkbox-multiple-ma.png',

								cornerRadius: 10, //圆角，设置圆角时请设置masksToBounds:true
								masksToBounds: true, //圆角相关

								isFinish: true, //点击销毁授权页,

								// clLayoutLeft:12,
								// clLayoutTop:60,
								// clLayoutRight:-12,
								// clLayoutBottom:-80,
								clLayoutWidth: 60,
								clLayoutHeight: 40
								// clLayoutCenterX:0,
								// clLayoutCenterY:0,
							}
						}
					};

					//设置自定义控件点击回调
					shanYanSDKModule.setCustomInterface(customInterface => {});
				}
			},
			setAuthDialogThemeConfig() {
				let platform = uni.getSystemInfoSync().platform;
				if (platform == 'android') {
					//Android 弹窗模式

					shanYanSDKModule.setAuthThemeConfig({
							//授权页已有元素配置
							uiConfig: {
								setNavColor: '#ff0000',
								setNavText: '',
								setNavTextSize: '0',
								setNavReturnImgPath: 'static/images/close_black.png',
								setNavReturnBtnOffsetRightX: '15',
								setLogoImgPath: 'static/logo.png',
								setLogoOffsetY: '15',
								setLogoWidth: '110',
								setLogoHeight: '60',
								setNumFieldOffsetY: '80',
								setNumberSize: '18',
								setLogBtnText: '本机号码一键登录',
								setLogBtnOffsetY: '140',
								setPrivacyState: 'true',
								setAppPrivacyOne: {
									title: '爱秀装用户协议',
									url: config.SITE + '/#/pages/member/protocol'
								},
								setPrivacyText: {
									privacyTextOne: '登录即同意',
									privacyTextTwo: '、',
									privacyTextThree: '、',
									privacyTextFour: '和',
									privacyTextFive: '并授权登录'
								},
								setSloganHidden: 'true',
								setDialogTheme: {
									width: '300',
									height: '400',
									marginLeft: '0',
									marginTop: '0',
									isBottom: 'false'
								}
							}, //授权页添加自定义控件元素
							widgets: {
								widget1: {
									widgetId: 'customView_one',
									type: 'TextView',
									left: '',
									top: '195',
									right: '',
									bottom: '',
									width: '',
									height: '30',
									textContent: '账号密码登录',
									textFont: '13',
									textColor: '#cc0000',
									backgroundColor: '#ffffff',
									isFinish: 'true'
								}
							}
						},
						result => {
							console.log(JSON.stringify(result));
						}
					);

					this.shanyan_code = 1000;
					this.shanyan_result = '授权页配置完成';
				} else if (platform == 'ios') {
					//iOS 弹窗模式

					let screenWidth_Portrait = plus.screen.resolutionWidth; //竖屏宽
					let screenHeight_Portrait = plus.screen.resolutionHeight; //竖屏宽
					let screenWidth_Landscape = plus.screen.resolutionHeight; //横屏宽(即竖屏高)
					let screenHeight_Landscape = plus.screen.resolutionWidth; //横屏高(即竖屏宽)

					var screenScale = screenWidth_Portrait / 375.0; //相对iphone6屏幕
					if (screenScale > 1) {
						screenScale = 1; //大屏的无需放大
					}

					//竖屏
					//窗口中心
					let clAuthWindowOrientationCenterX_Portrait = screenWidth_Portrait * 0.5;
					let clAuthWindowOrientationCenterY_Portrait = screenHeight_Portrait * 0.5;

					//窗口宽高
					let clAuthWindowOrientationWidth_Portrait = screenWidth_Portrait * 0.8;
					let clAuthWindowOrientationHeight_Portrait = clAuthWindowOrientationWidth_Portrait * 0.8;

					let clLayoutLogoTop_Portrait = screenScale * 25;
					let clLayoutLogoWidth_Portrait = 60 * screenScale;
					let clLayoutLogoHeight_Portrait = 60 * screenScale;
					let clLayoutLogoCenterX_Portrait = 0;

					let clLayoutPhoneCenterY_Portrait = -20 * screenScale;
					let clLayoutPhoneLeft_Portrait = 50 * screenScale;
					let clLayoutPhoneRight_Portrait = -50 * screenScale;
					let clLayoutPhoneHeight_Portrait = 20 * screenScale;

					let clLayoutLoginBtnCenterY_Portrait = clLayoutPhoneCenterY_Portrait + clLayoutPhoneHeight_Portrait *
						0.5 *
						screenScale + 20 * screenScale + 15 * screenScale;
					let clLayoutLoginBtnHeight_Portrait = 30 * screenScale;
					let clLayoutLoginBtnLeft_Portrait = 70 * screenScale;
					let clLayoutLoginBtnRight_Portrait = -70 * screenScale;

					let clLayoutAppPrivacyLeft_Portrait = 40 * screenScale;
					let clLayoutAppPrivacyRight_Portrait = -40 * screenScale;
					let clLayoutAppPrivacyBottom_Portrait = 0 * screenScale;
					let clLayoutAppPrivacyHeight_Portrait = 45 * screenScale;

					let clLayoutSloganLeft_Portrait = 0;
					let clLayoutSloganRight_Portrait = 0;
					let clLayoutSloganHeight_Portrait = 15 * screenScale;
					let clLayoutSloganBottom_Portrait = clLayoutAppPrivacyBottom_Portrait -
						clLayoutAppPrivacyHeight_Portrait;

					//横屏
					//窗口中心
					let clAuthWindowOrientationCenterX_Landscape = screenWidth_Landscape * 0.5;
					let clAuthWindowOrientationCenterY_Landscape = screenHeight_Landscape * 0.5;

					//窗口宽高
					let clAuthWindowOrientationWidth_Landscape = screenWidth_Portrait * 0.8; //窗口宽度为竖屏宽度的0.8;
					let clAuthWindowOrientationHeight_Landscape = clAuthWindowOrientationWidth_Landscape *
					0.8; //窗口高度为窗口宽度的0.8

					let clLayoutLogoWidth_Landscape = 60 * screenScale;
					let clLayoutLogoHeight_Landscape = 60 * screenScale;
					let clLayoutLogoCenterX_Landscape = 0;
					let clLayoutLogoTop_Landscape = 25 * screenScale;

					let clLayoutPhoneCenterY_Landscape = -20 * screenScale;
					let clLayoutPhoneLeft_Landscape = 50 * screenScale;
					let clLayoutPhoneRight_Landscape = -50 * screenScale;
					let clLayoutPhoneHeight_Landscape = 20 * screenScale;

					let clLayoutLoginBtnCenterY_Landscape = clLayoutPhoneCenterY_Landscape +
						clLayoutPhoneHeight_Landscape * 0.5 *
						screenScale + 20 * screenScale + 15 * screenScale;
					let clLayoutLoginBtnHeight_Landscape = 30 * screenScale;
					let clLayoutLoginBtnLeft_Landscape = 70 * screenScale;
					let clLayoutLoginBtnRight_Landscape = -70 * screenScale;

					let clLayoutAppPrivacyLeft_Landscape = 40 * screenScale;
					let clLayoutAppPrivacyRight_Landscape = -40 * screenScale;
					let clLayoutAppPrivacyBottom_Landscape = 0 * screenScale;
					let clLayoutAppPrivacyHeight_Landscape = 45 * screenScale;

					let clLayoutSloganLeft_Landscape = 0;
					let clLayoutSloganRight_Landscape = 0;
					let clLayoutSloganHeight_Landscape = 15 * screenScale;
					let clLayoutSloganBottom_Landscape = clLayoutAppPrivacyBottom_Landscape -
						clLayoutAppPrivacyHeight_Landscape;

					this.ios_uiConfigure = {
						shouldAutorotate: true,
						/**支持方向
						 * 如支持横竖屏，需同时设置 clOrientationLayOutPortrait 和 clOrientationLayOutLandscape
						 * 0:UIInterfaceOrientationMaskPortrait
						 * 1:UIInterfaceOrientationMaskLandscapeLeft
						 * 2:UIInterfaceOrientationMaskLandscapeRight
						 * 3:UIInterfaceOrientationMaskPortraitUpsideDown
						 * 4:UIInterfaceOrientationMaskLandscape
						 * 5:UIInterfaceOrientationMaskAll
						 * 6:UIInterfaceOrientationMaskAllButUpsideDown
						 * */
						supportedInterfaceOrientations: 5,

						/**偏好方向
						 * -1:UIInterfaceOrientationUnknown
						 * 0:UIInterfaceOrientationPortrait
						 * 1:UIInterfaceOrientationPortraitUpsideDown
						 * 2:UIInterfaceOrientationLandscapeLeft
						 * 3:UIInterfaceOrientationLandscapeRight
						 * */
						//偏好方向默认Portrait preferredInterfaceOrientationForPresentation: Number(5),

						clNavigationBackgroundClear: true, //导航栏透明
						clNavigationBackBtnImage: 'static/images/close-white.png', //返回按钮图片
						clNavBackBtnAlimentRight: true, //返回按钮居右

						clLogoImage: 'static/logo.png', //logo图片

						clLoginBtnText: '本机号一键登录', //一键登录按钮文字
						clLoginBtnTextColor: [1, 1, 1, 1.0], //rgba
						clLoginBtnBgColor: [0, 153, 102, 1], //rgba
						clLoginBtnTextFont: 15 * screenScale,
						clLoginBtnCornerRadius: 10,
						clLoginBtnBorderWidth: 0.5,
						clLoginBtnBorderColor: [0.1, 0.8, 0.1, 1.0], //rgba

						clPhoneNumberFont: 20.0 * screenScale,

						clAuthTypeUseWindow: true,
						clAuthWindowCornerRadius: 20,

						clAppPrivacyColor: [
							[0.6, 0.6, 0.6, 1.0],
							[0, 1, 0, 1.0]
						], //2 item,commomTextColor and appPrivacyTextColor
						clAppPrivacyTextFont: 11 * screenScale,
						clAppPrivacyTextAlignment: 0, //0: center 1: left 2: right
						clAppPrivacyFirst: ['爱秀装用户协议', config.SITE +
						'/#/pages/member/protocol'], // 2 item, name and url

						clCheckBoxVerticalAlignmentToAppPrivacyCenterY: true,
						clCheckBoxSize: [30 * screenScale, 30 * screenScale], //2 item, width and height
						clCheckBoxImageEdgeInsets: [2 * screenScale, 10 * screenScale, 13 * screenScale, 5 *
							screenScale
						], //4 item, top left bottom right
						clCheckBoxUncheckedImage: 'static/images/checkBoxNor.png',
						clCheckBoxCheckedImage: 'static/images/checkBoxSEL.png',
						clCheckBoxValue: true,

						clLoadingSize: [50, 50], //2 item, width and height
						clLoadingTintColor: [0.2, 0.8, 0.2, 1],
						clLoadingBackgroundColor: [1, 1, 1, 1],
						clLoadingCornerRadius: 5,

						//竖屏布局对象
						clOrientationLayOutPortrait: {
							//窗口
							clAuthWindowOrientationWidth: clAuthWindowOrientationWidth_Portrait,
							clAuthWindowOrientationHeight: clAuthWindowOrientationHeight_Portrait,

							clAuthWindowOrientationCenterX: clAuthWindowOrientationCenterX_Portrait,
							clAuthWindowOrientationCenterY: clAuthWindowOrientationCenterY_Portrait,

							//控件
							clLayoutLogoWidth: clLayoutLogoWidth_Portrait,
							clLayoutLogoHeight: clLayoutLogoHeight_Portrait,
							clLayoutLogoCenterX: clLayoutLogoCenterX_Portrait,
							clLayoutLogoTop: clLayoutLogoTop_Portrait,

							clLayoutPhoneCenterY: clLayoutPhoneCenterY_Portrait,
							clLayoutPhoneHeight: clLayoutPhoneHeight_Portrait,
							clLayoutPhoneLeft: clLayoutPhoneLeft_Portrait,
							clLayoutPhoneRight: clLayoutPhoneRight_Portrait,

							clLayoutLoginBtnCenterY: clLayoutLoginBtnCenterY_Portrait,
							clLayoutLoginBtnHeight: clLayoutLoginBtnHeight_Portrait,
							clLayoutLoginBtnLeft: clLayoutLoginBtnLeft_Portrait,
							clLayoutLoginBtnRight: clLayoutLoginBtnRight_Portrait,

							clLayoutAppPrivacyLeft: clLayoutAppPrivacyLeft_Portrait,
							clLayoutAppPrivacyRight: clLayoutAppPrivacyRight_Portrait,
							clLayoutAppPrivacyBottom: clLayoutAppPrivacyBottom_Portrait,
							clLayoutAppPrivacyHeight: clLayoutAppPrivacyHeight_Portrait,

							clLayoutSloganLeft: clLayoutSloganLeft_Portrait,
							clLayoutSloganRight: clLayoutSloganRight_Portrait,
							clLayoutSloganHeight: clLayoutSloganHeight_Portrait,
							clLayoutSloganBottom: clLayoutSloganBottom_Portrait
						},
						//横屏布局对象
						clOrientationLayOutLandscape: {
							//窗口
							clAuthWindowOrientationWidth: clAuthWindowOrientationWidth_Landscape,
							clAuthWindowOrientationHeight: clAuthWindowOrientationHeight_Landscape,

							clAuthWindowOrientationCenterX: clAuthWindowOrientationCenterX_Landscape,
							clAuthWindowOrientationCenterY: clAuthWindowOrientationCenterY_Landscape,

							//控件
							clLayoutLogoWidth: clLayoutLogoWidth_Landscape,
							clLayoutLogoHeight: clLayoutLogoHeight_Landscape,
							clLayoutLogoCenterX: clLayoutLogoCenterX_Landscape,
							clLayoutLogoTop: clLayoutLogoTop_Landscape,

							clLayoutPhoneCenterY: clLayoutPhoneCenterY_Landscape,
							clLayoutPhoneHeight: clLayoutPhoneHeight_Landscape,
							clLayoutPhoneLeft: clLayoutPhoneLeft_Landscape,
							clLayoutPhoneRight: clLayoutPhoneRight_Landscape,

							clLayoutLoginBtnCenterY: clLayoutLoginBtnCenterY_Landscape,
							clLayoutLoginBtnHeight: clLayoutLoginBtnHeight_Landscape,
							clLayoutLoginBtnLeft: clLayoutLoginBtnLeft_Landscape,
							clLayoutLoginBtnRight: clLayoutLoginBtnRight_Landscape,

							clLayoutAppPrivacyLeft: clLayoutAppPrivacyLeft_Landscape,
							clLayoutAppPrivacyRight: clLayoutAppPrivacyRight_Landscape,
							clLayoutAppPrivacyBottom: clLayoutAppPrivacyBottom_Landscape,
							clLayoutAppPrivacyHeight: clLayoutAppPrivacyHeight_Landscape,

							clLayoutSloganLeft: clLayoutSloganLeft_Landscape,
							clLayoutSloganRight: clLayoutSloganRight_Landscape,
							clLayoutSloganHeight: clLayoutSloganHeight_Landscape,
							clLayoutSloganBottom: clLayoutSloganBottom_Landscape
						}
					};
					this.shanyan_code = 1000;
					this.shanyan_result = '授权页配置完成';
				}
			},
			qulickLogin() {
				let _this = this;
				if (_this._props.isFullScreen) {
					_this.setAuthCJSThemeConfig();
				} else {
					_this.setAuthDialogThemeConfig();
				}
				uni.showLoading({
					mask: true
				});
				setTimeout(function() {
					_this.$tools.loadingHide();
				}, 5000);
				if (_this.platform == 'android') {
					/*************************Android*************************/
					//闪验SDK  拉起授权页方法
					shanYanSDKModule.openLoginAuth(
						true,
						result => {
							_this.$tools.loadingHide();
							//成功进入授权页
							if (result.code === 1022 || result.code === 1000) {
								_this.qulickLogin();
							} else {
								_this.otherLogin();
							}
						},
						result => {
							//点击一键登录
							var tokenJson = JSON.parse(result.result.replace(/\"/g, '"'));
							_this.token = tokenJson.token;
							_this.dealLogin();
						}
					);
				} else if (_this.platform == 'ios') {
					/*************************iOS*************************/
					//闪验SDK  拉起授权页方法

					if (_this.ios_uiConfigure == null) {
						//debug_test
						_this.$tools.toast('请先配置UI')
						return;
					}

					//一键登录
					shanYanSDKModule.quickAuthLoginWithConfigure(
						this.ios_uiConfigure,
						openLoginAuthListenerResult => {
							//拉起授权页面回调
							_this.$tools.loadingHide();
						},
						oneKeyLoginListenerResult => {
							_this.$tools.loadingHide();
							//点一键登录回调
							if (oneKeyLoginListenerResult.errorCode != null) {
								//失败，跳回手动登录页面
								// uni.showToast({
								// 	icon: 'none',
								// 	title: '一键登录失败'
								// });
							} else {
								//SDK获取Token成功

								//此处根据token调用户后台接口获取手机号，获取成功或失败后再调shanYanSDKModule.finishAuthControllerCompletion()关闭页面
								// //关闭授权页
								shanYanSDKModule.finishAuthControllerCompletion(oneKeyLoginListenerResult => {
									//如需跳转，code here:
								});

								//debug_test
								// uni.showToast({
								// 	icon: 'none',
								// 	title: JSON.stringify(oneKeyLoginListenerResult),
								// 	duration: 3000
								// });
								_this.token = oneKeyLoginListenerResult.data.token;
								_this.dealLogin();
							}
						}
					);
				}
			},
			...mapMutations(['login']),
			dealLogin() {
				//用户登录
				var _this = this;
				_this.$request.user
					.QuickLogin({
						loginAppId: _this.appid,
						token: _this.token,
						tel: _this.userTel,
						code: _this.code,
						weiToken: _this.weiToken,
						isSignUp: _this.isSignUp
					})
					.then(data => {
						_this.saveLogin(data);
					})
					.catch(err => {
						console.log(err);
					});
			},
			getPhoneNumber: function(e) {
				var _this = this;
				wx.login({
					success: function(res) {
						if (e.detail.errMsg == 'getPhoneNumber:ok') {
							var encryptedData = e.detail.encryptedData;
							var iv = e.detail.iv;
							var code = res.code;

							_this.$request.user
								.GetWekTel({
									encryptedData: encryptedData,
									iv: iv,
									code: code
								})
								.then(data => {
									_this.saveLogin(data);
								})
								.catch(err => {
									console.log(err);
								});
						} else {
							_this.otherLogin();
						}
					}
				});
			},
			saveLogin(data) {
				//保存登录数据
				if (data.status == 1) {
					this.login({
						userKey: data.datas.UserKey, //秘钥
						userId: data.datas.UserId, //用户ID
						roleId: data.datas.RoleId, //角色ID
						roleName: data.datas.RoleName, //角色名
						userNickName: data.datas.UserNickName, //昵称
						userImg: data.datas.UserImg, //头像,
						userName: '',
						userPwd: '',
						userTel: data.datas.UserTel,
						isAccount: data.datas.IsAccount
					});

					//记录本机手机号码
					uni.setStorage({
						//设置缓存
						key: 'LocalTel',
						data: data.datas.UserTel
					});

					this.$tools.toast('操作成功')

					if (this._props.isFullScreen) {
						uni.switchTab({
							url: '/pages/member/center'
						});
					} else {
						this.$refs['showLogin'].close();
						this.$refs['showCodeLogin'].close();
					}
				} else {
					console.log(data);
				}
			}
		}
	};
</script>

<style>
	.uni-login {
		width: 550upx;
		height: 670upx;
		background-color: #ffffff;
	}

	.black {
		width: 40upx;
		height: 40upx;
		float: right;
		margin: 20upx 20upx 0 0;
	}

	.logo {
		width: 110upx;
		height: 110upx;
		margin: 120upx 0 0 220upx;
	}

	.ctel {
		width: 100%;
		text-align: center;
		font-weight: 500;
		font-size: 35upx;
		margin-bottom: 20upx;
	}

	.btn-login {
		width: 380upx;
		height: 80upx;
		line-height: 80upx;
		background-color: #019340;
		color: #ffffff;
		text-align: center;
		margin: 0 auto;
		border-radius: 40upx;
	}

	.other {
		text-align: center;
		height: 30upx;
		line-height: 30upx;
		padding: 40upx 0 20upx 0;
		color: #941c25;
	}

	.bt-x {
		position: absolute;
		bottom: 50upx;
		width: 100%;
		text-align: center;
		font-size: 22.5upx;
	}

	.bt-x text {
		color: #007aff;
	}

	/*弹出层*/
	.seehouse_box {
		width: 14.5rem;
		border: 0;
		border-radius: 0.5rem;
		background-color: #fff;
		position: relative;
		padding: 0 0.8rem;
		padding-top: 1.7rem;
		padding-bottom: 0.8rem;
	}

	.seehouse_nub {
		text-align: left;
		font-size: 0.7rem;
		color: #646464;
		font-weight: 500;
		margin-bottom: 0.6rem;
	}

	.seehouse_nub .red {
		color: #dd4037;
	}

	.s_input {
		text-align: left;
		font-size: 0.7rem;
		margin: 0 2% 0.7rem 2%;
		position: relative;
	}

	.s_input input {
		width: 100%;
		height: 2rem;
		font-size: 12px;
		border: 0;
		text-indent: 0.5em;
		border: 0;
		background-color: #f4f4f4;
	}

	.s_input input:-ms-input-placeholder {
		color: #b6b6b6;
	}

	.s_input .seehouse_get_nub {
		display: inline-block;
		min-width: 4rem;
		height: 1.4rem;
		line-height: 1.4rem;
		font-size: 0.6rem;
		border: 0;
		border-radius: 0.2rem;
		text-align: center;
		position: absolute;
		right: 0.5rem;
		top: 0.25rem;
		background-color: #f2473d;
		text-decoration: none;
		color: #fff;
	}

	.seehou_submit {
		width: 100%;
		border: 0;
		background-color: #e9382e;
		color: #fff;
		height: 2rem;
		line-height: 2rem;
		border-radius: 0.4rem;
		margin-bottom: 0.6rem;
		-webkit-appearance: none;
		font-size: 0.7rem;
		margin-top: 1.5rem;
	}

	.E_Declaration {
		font-size: 0.6rem;
		position: relative;
		text-align: left;
	}

	.seehouse_head {
		position: absolute;
		top: -120px;
		left: 4%;
		width: 92%;
		height: 7rem;
	}

	.seehouse_close {
		display: inline-block;
		width: 1.7rem;
		height: 1.7rem;
		position: absolute;
		top: -37.5upx;
		right: -26.25upx;
	}

	.send {
		display: inline-block;
		min-width: 4rem;
		height: 1.4rem;
		line-height: 1.4rem;
		font-size: 0.6rem;
		border: 0;
		border-radius: 0.2rem;
		text-align: center;
		position: absolute;
		right: 0.5rem;
		top: 0.25rem;
		background-color: #c0c0c0;
		text-decoration: none;
		padding: 0 0.15rem;
		color: #fff;
	}
</style>
