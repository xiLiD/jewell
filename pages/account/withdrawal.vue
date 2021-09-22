<template>
	<view class="container">
		<view class="main-top">
			<view class="top-info" @click="dump('/pages/account/withdrawalInfo?type='+type)">提现记录</view>
			<view class="top-title">提现至银行卡</view>
			<view class="top-intro">请绑定持卡人本人的银行卡</view>
		</view>
		<form @submit="formSubmit">
			<view class="t-box">
				<view class="t-item">
					<view class="fl item-left">账户数额：</view>
					<view class="red">￥{{balance}}</view>
				</view>
				<view class="t-item">
					<view class="fl item-left">持卡人：</view>
					<view><input class="t-input" v-model="bank_name" placeholder="请输入持卡人" /></view>
				</view>
				<view class="t-item">
					<view class="fl item-left">卡号：</view>
					<view><input class="t-input" v-model="bank_number" placeholder="请输入卡号" /></view>
				</view>
				<view class="t-item">
					<view class="fl item-left">开户支行：</view>
					<view><input class="t-input" v-model="bank_qutlets" placeholder="请输入开户支行" /></view>
				</view>
				<view class="t-item">
					<view class="fl item-left">提现数量：</view>
					<view><input type="number" class="t-input" v-model="price" placeholder="请输入提现数量" /></view>
				</view>
			</view>

			<view class="b-box">
				<view class="blt-botton" @click="openPwd">提交</view>
			</view>
		</form>
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
				balance: 0,
				isSubmit: false, //是否提交中
				price: '',
				bank_name: '',
				bank_number: '',
				bank_qutlets: ''
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			this.type = option.type;
			this.getUserAccont();
			this.getbank();
		},
		methods: {
			dump(url) {
				uni.navigateTo({
					url: url
				});
			},
			getUserAccont() {
				//获取账户
				var _this = this;
				_this.$request.user
					.getUserData({})
					.then(data => {
						if (data.status == 1) {
							if (_this.type == 2) {
								_this.balance = data.data.balance;
							} else {
								_this.balance = data.data.acer_truncatum;
							}
						} else {
							this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						//消息异常
						this.$tools.toast('数据加载异常')
					});

			},
			getbank() {
				//获取账户
				var _this = this;
				_this.$request.account
					.getbank({})
					.then(data => {
						if (data.status == 1) {
							_this.bank_name = data.msg.bank_name;
							_this.bank_number = data.msg.bank_number;
							_this.bank_qutlets = data.msg.bank_qutlets;
						} else {
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						//消息异常
						_this.$tools.toast('数据加载异常')
					});

			},
			openPwd() {
				var _this = this;
				if (_this.price == '') {
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
				//提现
				var _this = this;
				if (_this.isSubmit) return false;
				if (_this.price == '') {
					_this.$tools.toast('请输入正确的金额')
					return false;
				}
				if (parseFloat(_this.price) > _this.balance) {
					_this.$tools.toast('账户余额不足')
					return false;
				}
				_this.isSubmit = true;
				// uni.showLoading({
				// 	title: '数据提交中'
				// });
				_this.$tools.loading('数据提交中')
				_this.$request.account
					.withdrawal({
						type: _this.type,
						money: _this.price,
						pwdPay: e.value,
						bank_name: _this.bank_name,
						bank_number: _this.bank_number,
						bank_qutlets: _this.bank_qutlets
					})
					.then(data => {
						_this.$tools.loadingHide();
						_this.isSubmit = false;
						if (data.status == 1) {

							_this.$tools.toast('申请成功')
							setTimeout(() => {
								_this.dump('/pages/account/withdrawalInfo?type='+_this.type);
							}, 1000)
						} else {
							_this.$refs.paymentPassword.modalFun('hide');
	
							_this.$tools.toast(data.msg)
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
		margin: 30upx 0 30upx 0;
		clear: both;
		color: #666666;
	}

	.t-item view {
		height: 55upx;
		line-height: 55upx;
		margin-bottom: 15upx;
	}

	.item-left {
		width: 150upx;
		color: #000000;
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

	/*顶部*/
	.main-top {
		width: 100%;
		height: 300upx;
	}

	.top-info {
		position: absolute;
		right: 30upx;
		margin-top: 20upx;
		color: #000000;
	}

	.top-title {
		width: 100%;
		text-align: center;
		font-weight: 600;
		font-size: 39upx;
		padding-top: 100upx;
	}

	.top-intro {
		text-align: center;
		padding-top: 40upx;
	}
</style>
