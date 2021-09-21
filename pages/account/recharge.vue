<template>
	<view class="container">
		<template>
			<form @submit="formSubmit">
				<view class="t-box">
					<view class="t-item"><input type="number" class="t-input" v-model="price" placeholder="充值金额" />
					</view>
				</view>

				<view class="b-box">
					<view class="blt-botton" @click="withdrawal">充值</view>
				</view>
			</form>
		</template>
	</view>
</template>

<script>
	import jwx from '../../common/weiPay/jws.js'
	export default {
		data() {
			return {
				balance: 0,
				isSubmit: false, //是否提交中
				price: ''
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {},
		methods: {
			withdrawal(e) {
				//提现
				var _this = this;
				if (_this.isSubmit) return false;
				if (_this.price == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的金额'
					});
					return false;
				}
				_this.isSubmit = true;
				uni.showLoading({
					title: '数据提交中'
				});
				_this.$request.common
					.paySundries({
						type: 3,
						money: _this.price
					})
					.then(data => {
						uni.hideLoading();
						_this.isSubmit = false;
						if (data.status == 1) {
							_this.pay(data.msg);
						} else {
							_this.$refs.paymentPassword.modalFun('hide');
							uni.showToast({
								icon: 'none',
								title: data.msg
							});
						}
					})
					.catch(err => {
						_this.$refs.paymentPassword.modalFun('hide');
						_this.isSubmit = false;
						uni.hideLoading();
						//消息异常
						uni.showToast({
							icon: 'none',
							title: '数据加载异常'
						});
					});
			},
			pay(orderInfo) {
				jwx({
					nonceStr: orderInfo.nonceStr,
					timeStamp: orderInfo.timeStamp,
					package: orderInfo.package,
					signType: orderInfo.signType,
					paySign: orderInfo.paySign
				}, res => {
					uni.showToast({
						icon: 'none',
						title: '充值成功'
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 1000)
				}, fail => {
					console.log(fail)
					uni.showToast({
						icon: 'none',
						title: '支付失败'
					});
				})
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
