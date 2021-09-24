<template>
	<view class="container">
		<view class="t-box">
			<view class="t-item">
				<input type="text" class="t-input" v-model="userName" placeholder="用户名" autocomplete="off" /></view>
			<view class="t-item">
				<!-- <input :type="type" name="userPwd" ref="userPwd" class="t-input" v-model="userPwd" @focus="type = 'password'" autocomplete="off" placeholder="登录密码"  /> -->
				<pwInput  :inputInfo="{name:'userPwd',placeholder:'登录密码'}" ref='pwInput'></pwInput>
			</view>
		</view>



		<view class="b-box">
			<view class="blt-botton" @click="btnLogin">{{btnName}}</view>
			<text class="blt-r" @click="dump('/pages/member/registered')">快速注册</text>
			<text class="blt-z" @click="dump('/pages/member/retrieve')">忘记密码？</text>
		</view>



		<view class="bt-x" @click="dump('/pages/member/protocol')">
			登录即同意
			<text>《禅艺珠宝用户协议》</text>
		</view>

		<!-- <uni-login ref="uniLogin" :isFullScreen="isFullScreen" :isWeiAutomatic="isAutomatic"></uni-login>? -->
	</view>
</template>

<script>
	// import uniLogin from '@/components/uni-login/nui-login.vue';
		import pwInput from '@/components/input/PwInput'
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		components: {
			// uniLogin
			pwInput
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
				type : 'text'
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
			getFocus(){
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
		background-color: #ffffff;
		width: 92%;
		margin-left: 4%;
		padding: 11.25upx 0 7.5upx 0;
		margin-top: 37.5upx;
	}

	.t-item {
		border-bottom: 1px solid #efefef;
		margin: 37.5upx 0 56upx 0;
		clear: both;
	}

	.t-t {
		width: 150upx;
		text-align: right;
		float: left;
		font-size: 30upx;
	}

	.t-input {
		margin: 19upx 0 3.75upx 0;
		height: 49upx;
		line-height: 49upx;
		font-size: 26upx;
	}

	.b-box {
		width: 92%;
		margin-left: 4%;
	}

	.blt-botton {
		color: #f8d79f;
		background-color: #201f24;
		margin-bottom: 19upx;
		width: 100%;
		text-align: center;
		height: 86upx;
		line-height: 86upx;
		border-radius: 11upx;
		font-size: 30upx;
	}

	.blt-r {
		color: #5e5e5e;
		font-size: 22.5upx;
		float: left;
	}

	.blt-z {
		color: #5e5e5e;
		font-size: 22.5upx;
		float: right;
	}

	.bt-x {
		position: fixed;
		bottom: 75upx;
		width: 100%;
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
</style>
