<template>
	<view class="wrapper-page">
		<view class="wrapper-header">
			<view class="header-image">
				<image src="../../static/images/passfare.jpg" mode="widthFix"></image>
			</view>
			<view class="header-desc back-white">
				<text class="edition">限量</text>
				<text class="desc-tit">提前进场绿色通道</text>
			</view>
		</view>
		<view class="wrapper-center back-white">
			<view class="tit">说明</view>
			<view class="explain-list">
				<view class="explain-menu">
					1、激活的会员，在团队中昨日成交单量超过十单，则第二日激活绿色通道。
				</view>
				<view class="explain-menu">
					2、绿色通道每场可以提前三分钟进场抢拍一单。
				</view>
				<view class="explain-menu">
					3、绿色通道不影响正常抢拍权益。
				</view>
			</view>
			<view class="notice-btn">
				<text v-if="greenInfo.green_load == 1">今日已获取绿色通道权益</text>
				<text v-else>
					今日未获取绿色通道权益
				</text>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				greenInfo: null
			}

		},
		onLoad() {
			this.getSearch();
		},
		methods: {
			getSearch() {
				this.$request.passway
					.greenload({})
					.then(data => {
						console.log(data)
						this.greenInfo = data.data;
					})
			}
		}
	}
</script>

<style>


	.wrapper-page {
		font-size: 28upx;
		background-color: #E5E5E5;
	}

	.wrapper-header {
		/* height: 600upx ; */
		width: 100%;

	}

	.header-image {
		line-height: 10px;
	}

	.header-image uni-image {
		width: 100%;
		line-height: 10px;
		/* height: 348upx; */
		display: inline-block;
	}

	.edition {
		padding: 4upx 15upx;
		border-radius: 6upx;
		border: 1px solid red;
		color: red;
		font-size: 24upx;
	}

	.header-desc {
		padding: 20upx 15upx;
	}

	.desc-tit {
		margin-left: 10upx;
		font-weight: 600;
	}

	.back-white {
		background-color: #fff;
	}

	.wrapper-center {
		margin-top: 20upx;
		padding: 30upx;
		box-sizing: border-box;
	}

	.tit {
		text-align: center;
		font-size: 32upx;
		font-weight: bold;
	}

	.explain-menu {
		margin-top: 20upx;
		line-height: 1.5;
		font-weight: bold;
	}

	.notice-btn {
		position: fixed;
		bottom: 40upx;
		width: 650upx;
		padding: 10upx 0;
		color: #fff;
		font-size: 34upx;
		letter-spacing: 2upx;
		font-weight: bold;
		text-align: center;
		background-color: rgb(255, 185, 0);
		margin: 0 auto;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 4upx 10upx #000;
	}
</style>
