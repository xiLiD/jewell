<template>
	<view class="page-container">
		<template>
			<form @submit="formSubmit">
				<view class="t-box">
					<view class="t-item">
						<i class="iconfont icon-shouji"></i>
						<input type="text" class="t-input" name="userName" v-model="userName"
							placeholder="请输入手机号码" /></view>
					<view class="t-item">
						<i class="iconfont icon-yduiyanzhengma"></i>
						<input type="text" class="t-input" name="code" v-model="code" placeholder="请输入验证码" />
						<button class="seehouse_get_nub" @click="sendCode" v-if="showText == true">获取验证码</button>
						<view v-else class="sends">({{ second }}秒)重新获取</view>
					</view>
				</view>

				<view class="b-box"><button formType="submit" :class="['blt-botton',{'n-agree-check': !value }]">验证登录</button></view>
			</form>
		</template>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	var graceChecker = require('@/common/graceChecker.js');
	export default {
		props:{
		    value:{
		        type: Boolean
		    }        
		},
		data() {
			return {
				userName: '',
				code: '',
				second: 90,
				showText: true
			};
		},
		onLoad(option) {
			
			if (option.nvitationCode) this.nvitationCode = parseInt(option.nvitationCode);
		},
		onNavigationBarButtonTap(e) { //点击事件
			console.log("success-------------", e)
			uni.reLaunch({
				url: '/pages/member/login'
			})
		
			// 修改buttons    
			// index: 按钮索引, style {WebviewTitleNViewButtonStyles }    
			// webView.setTitleNViewButtonStyle(0, {    
			//       text: '完成',    
			// });
		},
		mounted(){
			console.log(this.agreeCheck)
		},
		methods: {
						...mapMutations(['login']),
			sendCode() {
				//发送验证码
				var _this = this;
				if (_this.userName == '') {
					_this.$tools.toast('请填写正确的手机号码')
					return false;
				}
			
				//发送验证码
				_this.$request.common
					.sendCode({
						phone: _this.userName,
						type: 1
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


			formSubmit(e) {
				var _this = this;
				if(!_this.value){
					return
				}
				//定义表单规则
				var rule = [{
						name: 'userName',
						checkType: 'phoneno',
						errorMsg: '电话号码不正确'
					},
					{
						name: 'code',
						checkType: 'string',
						checkRule: '6,6',
						errorMsg: '验证码6个字符'
					}
				];
				//进行表单检查
				var formData = e.detail.value;

				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					_this.$tools.loading('数据提交中')
					_this.$request.user
						.msgLogin(formData)
						.then(data => {
							_this.$tools.loadingHide();
							if (data.status == 200) {
								// uni.navigateTo({
								// 	url: '/pages/member/login'
								// });
								_this.dealLogin(data.data)
							} else {
								_this.$tools.toast(data.msg)
							}
						})
						.catch(err => {
							_this.$tools.loadingHide();
							//消息异常
							_this.$tools.toast('数据加载异常')
						});
				} else {
					_this.$tools.toast(graceChecker.error)
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
/* 	.t-item {
		border-bottom: 1px solid #efefef;
		margin: 37.5upx 0 56upx 0;
		clear: both;
	} */
	
	.t-item {
		border: 1px solid rgb(194,21,7);
		background-color: rgb(240,240,240);
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
		padding-left: 10upx;
	}

	.b-box {
		width: 100%;
		/* margin-left: 4%; */
	}

.blt-botton {
		/* color: #f8d79f; */
		color:#fff;
		background-color: rgb(194,21,7);
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
		float: left;
	}

	.blt-z {
		color: #5e5e5e;
		font-size: 22.5upx;
		float: right;
	}

	.seehouse_get_nub {
		display: inline-block;
		min-width: 200upx;
		height: 52.5upx;
		line-height: 52.5upx;
		font-size: 22.5upx;
		border-radius: 7.5upx;
		text-align: center;
		background-color: #ffffff;
		border: 1px solid #9a9a9a;
		color: #9a9a9a;
		text-decoration: none;
		/* float: right; */
		/* margin-top: -60upx; */
		z-index: 100;
	}

	.sends {
		display: inline-block;
		min-width: 200upx;
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
	.iconfont {
		color: rgb(194, 21, 7);
	}
	.n-agree-check {
		color: #fff;
		    background-color: #c8c9cc;
		    border-color: #c8c9cc;
	}
</style>
