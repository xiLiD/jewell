<template>
	<view class="container">
		<view class="xmx" @click="dump('/pages/account/details?type=2')">银元宝明细</view>
		<view class="main-con">
			<image src="../../static/images/money.png" mode="aspectFill"></image>
			<view class="main-titel">我的银元宝</view>
			<view class="main-price"><text>￥</text>{{gold_balance}}</view>
		</view>
		<view class="btn-con" @click="dump('/pages/account/give?type=2')">转赠</view>
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
		onLoad(option) {
		},
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
	.xmx{
		margin-right: 30upx;
		margin-top: 30upx;
		color: #545454;
		font-weight: 600;
		float: right;
		clear: both;
		margin-bottom: 170upx;
	}
	.main-con{
		width: 100%;
		margin: 0 auto;
		text-align: center;
		clear: both;
	}
	.main-con image{
		width: 100upx;
		height: 100upx;
	}
	.main-titel{
		color: #545454;
		font-size: 35upx;
		font-weight: 600;
		margin-top: 30upx;
	}
	.main-price{
		font-size: 75upx;
		color: #000000;
		font-weight: 600;
	}
	.main-price text{
		font-size: 45upx;
	}
	.btn-con{
		background-color: #212025;
		color: #f7d3a1;
		width: 350upx;
		text-align: center;
		margin-left: 200upx;
		height: 88upx;
		line-height: 88upx;
		position: absolute;
		bottom: 200upx;
	}
</style>
