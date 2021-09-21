<template>
	<view class="container">
		<view class="xmx" @click="dump('/pages/account/details?type=3')">佣金明细</view>
		<view class="main-con">
			<image src="../../static/images/money.png" mode="aspectFill"></image>
			<view class="main-titel">我的佣金</view>
			<view class="main-price"><text>￥</text>{{balance}}</view>
		</view>
		<view class="main-bottom">
			<!-- <view class="btn-con" @click="dump('/pages/account/recharge')">充值</view> -->
			<view class="btn-con" @click="dump('/pages/account/withdrawal?type=2')">提现</view>
		</view>
	</view>
</template>
<script>
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	import ssPaymentPassword from '../../components/sanshui-payment-password'

	export default {
		components: {
			ssPaymentPassword
		},
		data() {
			return {
				acer_truncatum: 0.00, //金元宝
				gold_balance: 0.00, //银元宝
				balance: 0.00, //用户余额
			};
		},
		onShow: function(e) {
			this.$store.commit('judgeLogin'); //判断登录状态
			this.getUserData();
		},
		onLoad(option) {},
		methods: {
			dump(url) {
				uni.navigateTo({
					url: url
				});
			},
			getUserData() {
				//获取用户信息
				var _this = this;
				_this.$request.user
					.getUserData({})
					.then(data => {
						if (data.status == 1) {
							_this.balance = data.data.balance;
							_this.acer_truncatum = data.data.acer_truncatum;
							_this.gold_balance = data.data.gold_balance;
						} else {
							uni.showToast({
								icon: 'none',
								title: data.msg
							});
						}
					})
					.catch(err => {
						//消息异常
						uni.showToast({
							icon: 'none',
							title: '数据加载异常'
						});
					});
			}
		}
	};
</script>

<style>
	.xmx {
		margin-right: 30upx;
		margin-top: 30upx;
		color: #545454;
		font-weight: 600;
		float: right;
		clear: both;
		margin-bottom: 170upx;
	}

	.main-con {
		width: 100%;
		margin: 0 auto;
		text-align: center;
		clear: both;
	}

	.main-con image {
		width: 100upx;
		height: 100upx;
	}

	.main-titel {
		color: #545454;
		font-size: 35upx;
		font-weight: 600;
		margin-top: 30upx;
	}

	.main-price {
		font-size: 75upx;
		color: #000000;
		font-weight: 600;
	}

	.main-price text {
		font-size: 45upx;
	}

	.main-bottom {
		position: absolute;
		bottom: 200upx;
		width: 600upx;
		margin-left: 75upx;
	}

	.btn-con {
		background-color: #212025;
		color: #f7d3a1;
		width: 250upx;
		text-align: center;
		height: 88upx;
		line-height: 88upx;
		margin: 0 auto;
	}
	/* .btn-con:nth-child(1){
		margin-right: 100upx;
	} */
</style>
