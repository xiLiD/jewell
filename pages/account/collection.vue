<template>
	<view class="container">
		<!--用户信息-->
		<view class="box-s">
			<view class="menu-list" @click="dump('/pages/account/setCard')">
				<text class="iconfont">支付宝收款码</text>
				<text class="menu-r">{{mainData.weiCode?'修改':'设置'}}
					<text class="uni-icon">&#xe470;</text></text>
			</view>
			<view class="menu-list" @click="dump('/pages/account/setCard')">
				<text class="iconfont">微信收款码</text>
				<text class="menu-r">{{mainData.alipayCode?'修改':'设置'}}
					<text class="uni-icon">&#xe470;</text></text>
			</view>
			<view class="menu-list" @click="dump('/pages/account/setCard')">
				<text class="iconfont">银行卡</text>
				<text class="menu-r">{{mainData.bankCode?'修改':'设置'}}
					<text class="uni-icon">&#xe470;</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainData: {
					weiCode: '',
					alipayCode: '',
					bankCode: ''
				}
			};
		},
		onLoad() {

		},
		methods: {
			dump(url) {
				uni.navigateTo({
					url: url
				});
			}
		}
	};
</script>

<style>
	.box-s {
		width: 690upx;
		margin: 0 auto;
		background-color: #ffffff;
		clear: both;
		margin-top: 0.8rem;
	}

	.menu-list {
		height: 50px;
		line-height: 50px;
		box-sizing: border-box;
		border-bottom: 1px solid #eaeaea;
		overflow: hidden;
	}

	.iconfont {
		color: #333333;
		float: left;
	}

	.menu-r {
		float: right;
		color: #74818a;
		font-size: 25upx;
	}

	.menu-r text {
		font-size: 30upx;
		padding-left: 20upx;
	}

	.uni-navigate-icon {
		color: #666666;
		margin-top: 0.6rem;
		float: right;
	}

	.m-head {
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
		vertical-align: middle;
	}

	.otc {
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		margin-top: 0.8rem;
		color: #f9afaf;
		margin-bottom: 140upx;
	}
</style>
