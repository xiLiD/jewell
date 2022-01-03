<template>
	<view class="container">
		<view class="top">
			<view class="money">{{acer_truncatum}}</view>
			<view class="bt-box">
				<view class="bt-tx" @click="dump('/pages/account/withdrawal?type=1')">提现</view>
				<view class="bt-tx" @click="dump('/pages/account/give?type=1')">转赠</view>
				<!-- <view class="bt-tx" @click="dump('/pages/account/change')">冲押金</view> -->
			</view>
			<view class="bt-mx" @click="dump('/pages/account/details?type=1')">明细</view>
		</view>
		<view class="m-btn">
			<view class="m-btn-a" @click="copyUrl"><text class="uni-icon">&#xe567;</text>复制邀请链接</view>
			<view class="m-btn-b" @click="dump('/pages/team/invitation')"><text class="uni-icon">&#xe363;</text>生成专属邀请海报
			</view>
		</view>
		<view class="m-main">
			<view class="m-item" @click="dump('/pages/team/friends')">
				<view class="m-title">邀请好友</view>
				<view class="m-num">{{pidNum}}人</view>
				<view class="m-link">好友明细<text class="uni-icon">&#xe470;</text></view>
			</view>
			<view class="m-item" @click="dump('/pages/account/recommend?type=1')">
				<view class="m-title">推荐奖励</view>
				<view class="m-num">￥{{recommend}}</view>
				<view class="m-link">奖励明细<text class="uni-icon">&#xe470;</text></view>
			</view>
<!-- 			<view class="m-item" @click="dump('/pages/account/recommend?type=2')">
				<view class="m-title">团队奖</view>
				<view class="m-num">￥{{reward}}</view>
				<view class="m-link">奖励明细<text class="uni-icon">&#xe470;</text></view>
			</view> -->
			<view class="m-item" @click="dump('/pages/account/teamView')">
				<view class="m-title">团队奖</view>
				<view class="m-num">￥{{reward}}</view>
				<view class="m-link">奖励明细<text class="uni-icon">&#xe470;</text></view>
			</view>
			<view class="m-item">
				<view class="m-title">团队业绩</view>
				<view class="m-num">￥{{achievement}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'
	import config from '@/config/config';
	export default {
		data() {
			return {
				acer_truncatum: 0.00, //金元宝
				nvitationCode: '', //推荐码
				achievement: 0,//团队业绩
				pidNum: 0,//好友人数
				recommend: 0,//推荐奖励
				reward: 0//团队奖
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
			this.getUserData();
		},
		onLoad(option) {
			var user = uni.getStorageSync('uerInfo');
			this.nvitationCode = user.invitation;
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
				_this.$request.account
					.goldIngot({})
					.then(data => {
						if (data.status == 1) {
							_this.acer_truncatum = data.data.userAcerTruncatum;
							_this.achievement = data.data.achievement;
							_this.pidNum = data.data.pidNum;
							_this.recommend = data.data.recommend;
							_this.reward = data.data.reward;
						} else {
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
			},
			copyUrl() {
				//复制
				let _this = this;
				var url = config.SITE + '#/pages/member/registered?nvitationCode=' + this.nvitationCode;
				setClipboardData(url).then(() => {
					_this.$tools.toast('复制成功')
				})
			}
		}
	};
</script>

<style>
	.container,
	page {
		background-color: #f4f5f6;
	}

	.top {
		width: 100%;
		height: 300upx;
		background-color: #de373e;
		text-align: center;
		padding-top: 50upx;
	}

	.top .money {
		color: #FFFFFF;
		font-size: 55upx;
		font-weight: 600;
		height: 80upx;
		line-height: 80upx;
		margin-bottom: 15upx;
	}

	.top .intro {
		color: #FFFFFF;
		font-size: 25upx;
		margin-bottom: 30upx;
	}

	.bt-box {
		width: 550upx;
		margin: 0 auto;
		margin-top: 50upx;
		display: flex;
		justify-content: space-around;
	}

	.top .bt-tx {
		color: #FFFFFF;
		font-size: 30upx;
		border: 1px solid #FFFFFF;
		width: 150upx;
		margin: 0 auto;
		height: 56upx;
		line-height: 56upx;
		border-radius: 28upx;
		margin-bottom: 10upx;
		float: left;
	}

	.bt-tx:nth-child(1),
	.bt-tx:nth-child(2) {
		margin-right: 50upx;
	}

	.m-btn {
		width: 750upx;
		height: 100upx;
		line-height: 100upx;
		display: flex;
	}

	.m-btn view {
		flex: 1;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
	}

	.m-btn view text {
		font-size: 34upx;
		margin-right: 15upx;
	}

	.m-btn .m-btn-a {
		background-color: #e93f42;
		color: #FFFFFF;
	}

	.m-btn .m-btn-b {
		background-color: #c92b39;
		color: #FFFFFF;
	}

	.m-main {
		width: 680upx;
		margin: 0 auto;
		margin-top: 50upx;
	}

	.m-main .m-item {
		width: 320upx;
		height: 240upx;
		background-color: #FFFFFF;
		float: left;
		margin-bottom: 30upx;
		border-radius: 25upx;
		padding: 20upx;
	}

	.m-item:nth-child(even) {
		float: right;
	}

	.m-item .m-title {
		font-size: 30upx;
		height: 55upx;
		line-height: 55upx;
		color: #000000;
	}

	.m-item .m-num {
		color: #b43c58;
		text-align: center;
		height: 90upx;
		line-height: 90upx;
		font-weight: 600;
	}

	.m-item .m-link {
		text-align: center;
		color: #000000;
	}

	.m-item .m-link text {
		text-align: center;
		color: #9d9d9b;
		font-size: 32upx;
	}

	.bt-mx {
		color: #FFFFFF;
		position: absolute;
		top: 40upx;
		right: 30upx;
	}
</style>
