<template>
	<view class="container">
		<view class="type-box">
			<view :class="['type-pwd firstFont',{'line-active':currentIndex == 0}]" @click="currentIndex=0">账号登录</view>
			<view :class="['type-code firstFont',{'line-active':currentIndex == 1}]" @click="currentIndex=1">短信登录</view>
		</view>
		<template v-if="currentIndex == 0">
			<view class="t-box">
				<view class="t-item">
					<i class="iconfont icon-yonghu"></i>
					<input type="text" class="t-input" v-model="userName" placeholder="用户名" autocomplete="off" /></view>
				<view class="t-item">
					<i class="iconfont icon-ziyuanxhdpi"></i>
					<!-- <input :type="type" name="userPwd" ref="userPwd" class="t-input" v-model="userPwd" @focus="type = 'password'" autocomplete="off" placeholder="登录密码"  /> -->
					<pwInput :inputInfo="{name:'userPwd',placeholder:'登录密码'}" ref='pwInput' class="t-input"></pwInput>
					<view class="to-other">
						<view class="blt-r" @click="dump('/pages/member/registered?nvitationCode='+invitation)">快速注册</view>
						<view class="blt-z" @click="dump('/pages/member/retrieve')">忘记密码？</view>
					</view>
				</view>
			</view>
			<view class="b-box">
				<view class="blt-botton" @click="btnLogin">{{btnName}}</view>
				<!-- 			<text class="blt-r" @click="dump('/pages/member/registered')">快速注册</text>
						<text class="blt-z" @click="dump('/pages/member/retrieve')">忘记密码？</text> -->
			</view>
			<view class="bt-x" @click="dump('/pages/member/protocol')">
				登录即同意
				<text>《艺拍拍(深圳)用户协议》</text>
			</view>
		</template>


		<template v-else>
			<smsLogin></smsLogin>
		</template>



		<!-- <uni-login ref="uniLogin" :isFullScreen="isFullScreen" :isWeiAutomatic="isAutomatic"></uni-login>? -->
	</view>
</template>

<script>
	// import uniLogin from '@/components/uni-login/nui-login.vue';
	import pwInput from '@/components/input/PwInput'
	import smsLogin from '@/pages/member/smsLogin'
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		components: {
			// uniLogin
			pwInput,
			smsLogin
		},
		data() {
			return {
				userName: '',
				userPwd: '',
				invitation: '', //邀请码
				iswei: false,
				isAutomatic: true, //是否自动登录
				isFullScreen: true, //是否全屏,
				isBack: true, //是否返回,
				btnName: '登录',
				userData: {
					UnionId: '',
					OpenId: '',
					UserImg: '',
					UserNickName: ''
				},
				type: 'text',
				currentIndex: 0
			};
		},
		onShow() {
			// console.log(this.$tools.loading())
			// this.$tools.tosat('123s')
		},
		onLoad(option) {
			// uni.switchTab({
			// 	url: '/pages/member/center'
			// });
			if (option.source) this.isAutomatic = false;
			if (option.isBack) this.isBack = false;

			//推荐码
			if(option.invitation){
				this.invitation = option.invitation;
			}
			var invitation = uni.getStorageSync('invitation');
			if (invitation != '') {
				this.invitation = invitation;
			}
			
			//#ifdef H5
			var code = this.getUrlCode();
			if (code) this.isAutomatic = false;
			//#endif
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			this.back();
			return true;
		},
		onNavigationBarButtonTap(e) { //点击事件
			console.log("success-------------", e)
			uni.redirectTo({
				url: '/pages/member/smsLogin'
			})

			// 修改buttons    
			// index: 按钮索引, style {WebviewTitleNViewButtonStyles }    
			// webView.setTitleNViewButtonStyle(0, {    
			//       text: '完成',    
			// });
		},
		methods: {
			...mapMutations(['login']),
			getFocus() {
				this.$refs.userPwd.type = "password"
				this.userPwd = '';
				this.userName = this.userName;
			},
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			dump(url) {
				uni.navigateTo({
					url: url
				});
			},
			btnLogin() {
				var that = this;
				if (that.userName == '') {
					that.$tools.toast('请输入账号')
					return false;
				}
				let userPwd = that.$refs['pwInput'].getPassWord();
				if (userPwd == '') {
					that.$tools.toast('请输入密码')
					return false;
				}
				that.$tools.loading('数据提交中')
				that.$request.user
					.login({
						userName: that.userName,
						passWord: userPwd
					})
					.then(data => {
						that.$tools.loadingHide();
						if (data.status == 200) {
							that.dealLogin(data.data);
						} else {
							that.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						console.log(err);
						that.$tools.loadingHide();
						that.$tools.toast('数据加载异常');
					});
			},
			dealLogin(data) {
				//处理登录
				this.login({
					id: data.id,
					id_card: data.id_card,
					id_card_name: data.id_card_name,
					information_state: data.information_state,
					user_pay_state: data.user_pay_state,
					invitation: data.invitation,
					openid: data.openid,
					phone: data.phone,
					pid: data.pid,
					token: data.token,
					user_fen: data.user_fen,
					user_head: data.user_head,
					user_name: data.user_name,
					user_type: data.user_type
				});
					
				uni.switchTab({
					url: '/pages/member/center'
				});
				// if (this.isBack) {
				// 	uni.navigateBack();
				// } else {
				// 	uni.switchTab({
				// 		url: '/pages/member/center'
				// 	});
				// }
			},
			dealWeiLogin() {
				//处理微信登录
				var _this = this;
				//  var datas ='{"status":1,"msg":"成功","data":{"id":3,"user_name":"诡秘","phone":"15507454444","user_head":"https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/TUuSsapDzaoZg7B2HgKgTO1ksRaicSmFvCZ1sDcNGibQORrEgusXAYPoficI9DyE0ERbZKibKepbribm54PiaAiakyzoA\/132","openid":"oe4CW5qPdHMQ3_TqBMlQcZq0_R_0","token":"2e5c61e2b7d222989cccac3534b4c6924c8a623e","id_card_name":"覃明明","id_card":"43120219891123001X","invitation":"799870","information_state":1,"pid":0,"user_type":4,"user_fen":0,"pay_paw":"ce0bb4de3237efe6f50b2eb0d0a9ddfc","user_type_1":0,"user_type_2":0,"user_type_3":0,"user_type_4":0,"user_pay_state":1,"user_state":0,"user_num":0,"prohibit_transaction_end_time":"","acer_truncatum":"238.87","gold_balance":"1000.00","balance":"0.00","up":0}}';
				// _this.dealLogin(JSON.parse(datas).data);
				// return false;
				var code = _this.getUrlCode();
				var backUrl = _this.getBackUrl();
				if (code) {
					uni.showLoading({
						title: '登录中'
					});
					_this.$request.user
						.getuser({
							code: code,
							invitation: _this.invitation
						})
						.then(data => {
							_this.$tools.loadingHide();
							if (data.status == 200) {
								_this.dealLogin(data.data);
							} else {
								_this.$tools.toast(data.msg)
							}
						})
						.catch(err => {
							console.log(err);
							_this.$tools.loadingHide();
							//消息异常
							_this.$tools.toast('数据加载异常')
						});
				}
			},
			getUrlCode() {
				//获取URL中的code
				let url = window.location.href.split('#')[0]
				let serch = url.split('?')[1]
				let _this = this;
				if (serch) {
					let arr = serch.split('&')
					let code = arr[0].split('code=')[1]
					// 此时获取到的code码需要你传给后端，因为微信的安全机制，前端不能做处理
					return code;
				} else {
					return ''
				}
			},
			getBackUrl() {
				//获取URL中的返回链接
				let serch = window.location.href.split('backUrl=')[1]
				let _this = this;
				if (serch) {
					let arr = serch.split('&')
					let url = decodeURIComponent(arr[0])
					return url;
				} else {
					return ''
				}
			}
		}
	};
</script>

<style>
	page {
		background-color: #ffffff !important;
	}

	.t-box {
		/* background-color: #ffffff; */
		width: 100%;
		/* margin: 0 auto; */
		padding: 11.25upx 0 7.5upx 0;
		/* margin-top: 37.5upx; */
	}

	.t-item {
		border: 1px solid rgb(194, 21, 7);
		background-color: rgb(240, 240, 240);
		/* border-bottom: 1px solid #efefef; */
		margin: 37.5upx 0 56upx 0;
		clear: both;
		padding: 10upx 20upx;
		border-radius: 40upx;
		display: flex;
		align-items: center;
		position: relative;
	}

	.t-t {
		width: 150upx;
		text-align: right;
		float: left;
		font-size: 30upx;
	}

	.t-input {
		/* margin: 19upx 0 3.75upx 0; */
		height: 49upx;
		line-height: 49upx;
		font-size: 26upx;
		width: 100%;
		padding-left: 15upx;
		box-sizing: border-box;
	}

	.t-input uni-input {
		padding: 0;
	}


	.blt-botton {
		/* color: #f8d79f; */
		color: #fff;
		background-color: rgb(194, 21, 7);
		/* background-color: #201f24; */
		margin-bottom: 19upx;
		width: 100%;
		text-align: center;
		height: 86upx;
		line-height: 86upx;
		border-radius: 40upx;
		font-size: 30upx;
	}

	.blt-r {
		color: #5e5e5e;
		font-size: 22.5upx;
		/* float: left; */
	}

	.blt-z {
		color: #5e5e5e;
		font-size: 22.5upx;
		/* float: right; */
	}

	.bt-x {
		position: fixed;
		bottom: 75upx;
		width: 60%;
		text-align: center;
		font-size: 22.5upx;
	}

	.bt-x text {
		color: #007aff;
	}

	.b-phone {
		position: fixed;
		bottom: 60upx;
	}

	uni-page-body {
		width: 100%;
		height: 100%;
		background-image: url('../../static/images/login_bg.jpg');
		background-size: cover;
		background-position: top left;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		width: 65%;
	}

	.type-box {
		padding: 20upx 0;
		width: 360upx;
		display: flex;
		justify-content: space-around;
		border-top: 6upx solid rgb(140, 140, 140);
		margin: 0 auto 20upx;
		position: relative;
	}

/* 	.type-code {
		position: relative;
	} */

	.type-box::before {
		content: '';
		position: absolute;
		left: 50%;
		top:50%;
		transform: translate(-50%,-50%);
		width: 6upx;
		height: 50upx;
		background-color: rgb(140, 140, 140);
	}

	.line-active {
		position: relative;
	}

	.line-active::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -10upx;
		width: 100%;
		height: 6upx;
		background-color: rgb(140, 140, 140);
	}

	.iconfont {
		color: rgb(194, 21, 7);
	}

	.to-other {
		position: absolute;
		right: -140upx;
		top: 0upx;
	}

	.sends {
		display: inline-block;
		min-width: 150upx;
		height: 52.5upx;
		line-height: 52.5upx;
		font-size: 22.5upx;
		border-radius: 7.5upx;
		text-align: center;
		background-color: #ffffff;
		border: 1px solid #9a9a9a;
		color: #9a9a9a;
		text-decoration: none;
		padding: 0 5.625upx;
		float: right;
		/* margin-top: -60upx; */
		z-index: 100;
	}
	.type-box view {
		font-size: 36rpx;
		font-weight: bold;
		letter-spacing: 0;
		
	}
</style>
