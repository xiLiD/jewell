<template>
	<view class="container">
		<template>
			<form @submit="formSubmit">
				<view class="t-box">
					<view class="t-item"><input type="text" class="t-input" name="tel" v-model="tel"
							placeholder="请输入手机号码" /></view>
					<view class="t-item">
						<input type="text" class="t-input" name="code" v-model="code" placeholder="请输入验证码" />
						<button class="seehouse_get_nub" @click="sendCode" v-if="showText == true">获取验证码</button>
						<view v-else class="sends">({{ second }}秒)重新获取</view>
					</view>
					<view class="t-item"><input type="password" class="t-input" name="passWord" v-model="passWord"
							placeholder="用户密码" /></view>
					<view class="t-item"><input type="password" class="t-input" name="passWorda" v-model="passWorda"
							placeholder="确认密码" /></view>
					<view class="t-item"><input class="t-input" name="nvitationCode" v-model="nvitationCode"
							placeholder="邀请码" /></view>
				</view>

				<view class="b-box"><button formType="submit" class="blt-botton">提交注册</button></view>
			</form>
		</template>
	</view>
</template>

<script>
	var graceChecker = require('@/common/graceChecker.js');
	export default {
		data() {
			return {
				tel: '',
				code: '',
				passWord: '',
				passWorda: '',
				nvitationCode:'',//邀请码
				second: 90,
				showText: true
			};
		},
		onLoad(option) {
			if (option.nvitationCode) this.nvitationCode = parseInt(option.nvitationCode);
		},
		methods: {
			sendCode() {
				//发送验证码
				var th = this;
				if (th.tel == '') {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号码'
					});
					return false;
				}

				//发送验证码
				th.$request.common
					.SendCode({
						tel: th.tel,
						typeId: 3
					})
					.then(data => {
						uni.hideLoading();
						if (data.status == 1) {
							th.showText = false;
							var interval = setInterval(() => {
								let times = --th.second;
								th.second = times < 10 ? '0' + times : times; //小于10秒补 0
							}, 1000);
							setTimeout(() => {
								clearInterval(interval);
								th.second = 90;
								th.showText = true;
							}, 90000);
						} else {
							uni.showToast({
								icon: 'none',
								title: data.msg
							});
						}
					})
					.catch(err => {
						uni.hideLoading();
						//消息异常
						uni.showToast({
							icon: 'none',
							title: '数据加载异常'
						});
					});
			},
			formSubmit(e) {
				var _this = this;
				//定义表单规则
				var rule = [{
						name: 'tel',
						checkType: 'phoneno',
						errorMsg: '电话号码不正确'
					},
					{
						name: 'code',
						checkType: 'string',
						checkRule: '6,6',
						errorMsg: '验证码6个字符'
					},
					{
						name: 'passWord',
						checkType: 'string',
						checkRule: '6,20',
						errorMsg: '密码为6-20个字符'
					},
					{
						name: 'passWorda',
						checkType: 'same',
						checkRule: _this.passWord,
						errorMsg: '两次密码不相同'
					}
				];
				//进行表单检查
				var formData = e.detail.value;

				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showLoading({
						title: '数据提交中'
					});
					_this.$request.user
						.Registered(formData)
						.then(data => {
							uni.hideLoading();
							if (data.status == 1) {
								uni.navigateTo({
									url: '/pages/member/login'
								});
							} else {
								uni.showToast({
									icon: 'none',
									title: data.msg
								});
							}
						})
						.catch(err => {
							uni.hideLoading();
							//消息异常
							uni.showToast({
								icon: 'none',
								title: '数据加载异常'
							});
						});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
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

	.seehouse_get_nub {
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
		float: right;
		margin-top: -60upx;
		z-index: 100;
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
		margin-top: -60upx;
		z-index: 100;
	}
</style>
