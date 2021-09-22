<template>
	<view class="container">
		<template>
			<form @submit="formSubmit">
				<view class="t-box">
					<view class="t-item">账户数额：{{balance}}</view>
					<view class="t-item"><input type="number" class="t-input" v-model="phone" placeholder="转赠手机号" />
					</view>
					<view class="t-item"><input type="number" class="t-input" v-model="price" placeholder="转赠数量" />
					</view>

				</view>

				<view class="b-box">
					<view class="blt-botton" @click="openPwd">提交</view>
				</view>
			</form>
		</template>
		<ssPaymentPassword ref="paymentPassword" mode="1" @submit="withdrawal" />
	</view>
</template>

<script>
	import ssPaymentPassword from '../../components/sanshui-payment-password'
	export default {
		components: {
			ssPaymentPassword
		},
		data() {
			return {
				type: 0,
				phone: '',
				balance: 0,
				isSubmit: false, //是否提交中
				price: ''
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			this.type = option.type;
			this.getUserAccont();
		},
		methods: {
			getUserAccont() {
				//获取账户
				var _this = this;
				_this.$request.user
					.getUserData({})
					.then(data => {
						if (data.status == 1) {
							if (_this.type == 2) {
								_this.balance = data.data.gold_balance;
							} else {
								_this.balance = data.data.acer_truncatum;
							}
						} else {
							_this.$tools.toast(data.msg);
						}
					})
					.catch(err => {
						//消息异常
						_this.$tools.toast('数据加载异常')
					});

			},
			openPwd() {
				var _this = this;
				if (_this.phone == '') {
					_this.$tools.toast('请输入正确的转赠手机号')
					return false;
				}
				if (_this.price == '' || parseFloat(_this.price) <= 0) {
					_this.$tools.toast('请输入正确的提现金额')
					return false;
				}
				if (parseFloat(_this.price) > _this.balance) {
					_this.$tools.toast('账户余额不足')
					return false;
				}
				//验证密码
				this.$refs.paymentPassword.modalFun('show');
			},
			withdrawal(e) {
				//转赠
				var _this = this;
				if (_this.isSubmit) return false;
				if (_this.phone == '') {
					_this.$tools.toast('请输入正确的转赠手机号')
					return false;
				}
				if (_this.price == '' || parseFloat(_this.price) <= 0) {
					_this.$tools.toast('请输入正确的转赠金额')
					return false;
				}
				if (parseFloat(_this.price) > _this.balance) {
					_this.$tools.toast('账户余额不足')
					return false;
				}
				_this.isSubmit = true;
				_this.$tools.loading('数据提交中')
				_this.$request.account
					.tyransfer({
						type: _this.type,
						money: _this.price,
						phone: _this.phone,
						pwdPay: e.value
					})
					.then(data => {
						_this.$tools.loadingHide();
						_this.isSubmit = false;
						if (data.status == 1) {
							_this.$tools.toast('申请成功')
							setTimeout(() => {
								uni.navigateBack();
							}, 1000)
						} else {
							_this.$refs.paymentPassword.modalFun('hide');
							_this.$tools.toast(data.msg);
						}
					})
					.catch(err => {
						_this.$refs.paymentPassword.modalFun('hide');
						_this.isSubmit = false;
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
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
		color: #666666;
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
</style>
