<template>
	<view class="container">
		<!--用户信息-->
		<view class="box-s">
			<view class="menu-list">
				<text class="iconfont">头像</text>
				<text class="menu-r">
					<image :src="mainData.user_head" mode="aspectFill" class="m-head"></image>
				</text>
			</view>
			<view class="menu-list">
				<text class="iconfont">昵称</text>
				<text class="menu-r">{{mainData.user_name}}</text>
			</view>
			<view class="menu-list">
				<text class="iconfont">姓名</text>
				<text class="menu-r">{{mainData.id_card_name}}</text>
			</view>
			<view class="menu-list" @click="dump('/pages/member/setPhone')">
				<text class="iconfont">手机</text>
				<text class="menu-r">{{mainData.phone}}
					<text class="uni-icon">&#xe470;</text></text>
			</view>
			<!-- <view class="menu-list">
				<text class="iconfont">微信</text>
				<text class="menu-r">{{mainData.weiCode}}
					<text class="uni-icon">&#xe470;</text></text>
			</view> -->
			<view class="menu-list" @click="dump('/pages/member/changePwd')">
				<text class="iconfont">支付密码</text>
				<text class="menu-r">设置
					<text class="uni-icon flr">&#xe470;</text></text>
			</view>
			<view class="menu-list" @click="dump('/pages/member/retrieve')">
				<text class="iconfont">账号密码</text>
				<text class="menu-r">修改
					<text class="uni-icon flr">&#xe470;</text></text>
			</view>
		</view>
		<view class="otc" @click="loginOut">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainData: {}
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad() {
			this.getUserData();
		},
		methods: {
			dump(url) {
				uni.navigateTo({
					url: url
				});
			},
			loginOut() {
				//退出登录
				this.$store.commit('logout'); //判断登录状态
				// this.dump('/pages/member/login')
				uni.reLaunch({
					url: '/pages/member/login'
				})
			},
			getUserData() {
				//获取用户信息
				var _this = this;
				_this.$request.user
					.getUserData({})
					.then(data => {
						if (data.status == 1) {
							_this.mainData = data.data;
						} else {
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						//消息异常
						_this.$tools.toast('数据加载异常')
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
