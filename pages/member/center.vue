<template>
	<view class="container">
		<view class="pure_top">
			<image :src="mainData.headImg" class="m-head" mode="aspectFill"></image>
			<view class="m-r">
				<view class="m-name">
					<view class="m-name-a">{{mainData.nickName}}</view>
					<view class="m-name-b" @click="up">
						<view class="m-rank-name">{{rankItem.find(p=>p.id==mainData.user_type).name}}</view>
						<image :src="rankItem.find(p=>p.id==mainData.user_type).logo" mode="aspectFill"></image>
					</view>
					<view class="m-rank-up" v-if="mainData.up==1">
						<image src="../../static/images/up.png" mode="aspectFill"></image>
					</view>
					<view class="up-level" v-if="user.zi_admin_state == 0" @click="dump('/pages/company/company')">
						<i class="iconfont icon-fengongsi" style="font-size: 28rpx;"></i>
						<text>申请开分公司</text>
					</view>
					<view class="up-level get-level" v-else>
						<i class="iconfont icon-fengongsi" style="font-size: 28rpx;"></i>
						<text>已入驻分公司</text>
					</view>
					
					
				</view>
				<view class="m-ask">邀请码：{{mainData.nvitationCode}}
					<text class="bth-ask" @click="copyCode">复制</text>
				</view>
			</view>
			<view class="top-setting" @click="dump('/pages/member/details')"><text class="uni-icon">&#xe502;</text>
			</view>
		</view>
		<view class="m-account">
			<view class="account-item" @click="dump('/pages/account/silver')">
				<view class="account-money">{{gold_balance}}</view>
				<view class="account-name">银元宝</view>
			</view>
			<view class="account-item" @click="dump('/pages/account/balance')">
				<view class="account-money">{{balance}}</view>
				<view class="account-name">佣金</view>
			</view>
			<view class="account-item" @click="dump('/pages/account/account')">
				<view class="account-money">{{acer_truncatum}}</view>
				<view class="account-name">金元宝</view>
			</view>
		</view>

		<view class="m-center">
			<view class="center-item" @click="dump('/pages/order/list?type=1')">
				<image src="/static/images/c-1.png" mode="aspectFill"></image>
				<view>我的买单</view>
			</view>
			<view class="center-item" @click="dump('/pages/order/list?type=2')">
				<image src="/static/images/c-2.png" mode="aspectFill"></image>
				<view>我的卖单</view>
			</view>
			<view class="center-item" @click="dump('/pages/order/buyList')">
				<image src="/static/images/c-3.png" mode="aspectFill"></image>
				<view>实物订单</view>
			</view>
			<view class="center-item" @click="dump('/pages/team/invitation')">
				<image src="/static/images/c-4.png" mode="aspectFill"></image>
				<view>邀请函</view>
			</view>
			<view class="center-item" @click="dump('/pages/account/findBank')">
				<image src="/static/images/c-5.png" mode="aspectFill"></image>
				<view>收款设置</view>
			</view>
			<view class="center-item" @click="dump('/pages/address/list')">
				<image src="/static/images/c-6.png" mode="aspectFill"></image>
				<view>收货地址</view>
			</view>
			<view class="center-item" @click="dump('/pages/team/friends')">
				<image src="/static/images/c-7.png" mode="aspectFill"></image>
				<view>我的好友</view>
			</view>
			<view class="center-item" @click="dump('/pages/card/list')">
				<image src="/static/images/c-8.png" mode="aspectFill"></image>
				<view>我的入场券</view>
			</view>
			<view class="center-item" @click="dump('/pages/passway/explain')">
				<image src="/static/images/icon-explain.png" mode="aspectFill"></image>
				<view>体验通道</view>
			</view>
			<view class="center-item" @click="dump('/pages/passway/passfare')">
				<image src="/static/images/icon-passfare.png" mode="aspectFill"></image>
				<view>绿色通道</view>
			</view>
			<view class="center-item" @click="dump('/pages/customer/customer')">
				<image src="/static/images/customer.png" mode="aspectFill"></image>
				<view>人工客服</view>
			</view>
<!-- 			<view class="center-item" @click="dump('/pages/passway/company')">
				<image src="/static/images/company.png" mode="aspectFill"></image>
				<view>开分公司</view>
			</view> -->
		</view>
		<view class="dbh"></view>

		<!-- 底部转拍弹窗 -->
		<uni-popup ref="showUp">
			<view class="main-up">
				<view class="up-title">购买升级卡</view>
				<view class="up-price">￥{{upData.money}}</view>
				<view class="up-intro">升级卡是付费的哦</view>
				<view class="up-intro">现在购买即刻享有<text class="red">{{upData.name}}</text>永久分润权益</view>
				<view class="up-b">
					<view class="up-close" @click="closeUp">再想想</view>
					<view class="up-com" @click="upBuy">购买</view>
				</view>
			</view>
		</uni-popup>

		<ssPaymentPassword ref="paymentPassword" mode="1" @submit="upBuy" />
	</view>
</template>


<script>
	import jwx from '../../common/weiPay/jws.js'
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
				mainData: {
					headImg: "",
					nickName: "",
					nvitationCode: "",
					user_type: 0,
					up: 0
				},
				rankItem: [{
					id: 0,
					name: '普通用户',
					logo: '/static/images/v0.png'
				}, {
					id: 1,
					name: '青铜分店',
					logo: '/static/images/v1.png'
				}, {
					id: 2,
					name: '白银分店',
					logo: '/static/images/v2.png'
				}, {
					id: 3,
					name: '黄金分店',
					logo: '/static/images/v3.png'
				}, {
					id: 4,
					name: '分公司',
					logo: '/static/images/v4.png'
				}],
				upData: {
					money: 0,
					name: '',
					type: 1,
					id: 0
				},
				user : {
					
				}
			};
		},
		onShow: function(e) {
			
			this.$store.commit('judgeLogin'); //判断登录状态
			this.getUserData();
		},
		onLoad(option) {
			var user = uni.getStorageSync('uerInfo');
			this.mainData.nickName = user.user_name;
			this.mainData.headImg = user.user_head;
			this.mainData.nvitationCode = user.invitation;
			this.mainData.user_type = user.user_type;
			this.mainData.up = user.up;
			
		},
		methods: {
			dump(url) {
				uni.navigateTo({
					url: url
				});
			},
			copyCode() {
				//复制
				var _this = this;
				setClipboardData(_this.mainData.nvitationCode).then(() => {
					_this.$tools.toast('复制成功')
				})
			},
			getUserData() {
				//获取用户信息
				var _this = this;
				_this.$request.user
					.getUserData({})
					.then(data => {
						console.log(data)
						if (data.status == 1) {
							_this.balance = data.data.balance;
							_this.acer_truncatum = data.data.acer_truncatum;
							_this.gold_balance = data.data.gold_balance;
							this.mainData.user_type = data.data.user_type;
							this.mainData.up = data.data.up;
							this.user = data.data;
							if (_this.mainData.up == 1) {
								uni.setTabBarBadge({
									index: 3,
									text: '1'
								})
							} else {
								uni.setTabBarBadge({
									index: 3,
									text: ''
								})
							}
						} else {
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
			},
			up() {
				//升级
				var _this = this;
				if (_this.mainData.up == 0) {
					_this.$tools.toast('未满足升级条件')
					return false;
				}
				uni.showLoading({
					title: '数据查询中'
				});
				var _this = this;
				_this.$request.user
					.getUp({})
					.then(data => {
						if (data.status == 1) {
							_this.upData = data.data;
							this.$refs['showUp'].open();
						} else {
							_this.$tools.toast(data.msg)
						}
						_this.$tools.loadingHide();
					})
					.catch(err => {
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
			},
			closeUp() {
				//关闭升级
				this.$refs['showUp'].close();
			},
			openPwd() {
				var _this = this;
				if (_this.addressItem.id <= 0) {
					_this.$tools.toast('请选择收货地址')
					return false;
				}
				//验证密码
				this.$refs.paymentPassword.modalFun('show');
			},
			upBuy(e) {
				//确认购买
				var _this = this;
				_this.$tools.loading('数据条件中')
				_this.$request.common
					.paySundries({
						type: 2
					})
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 1) {
							_this.closeUp();
							_this.pay(data.msg);
						} else {
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						console.log(err)
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
			},
			pay(orderInfo) {
				let _this = this;
				jwx({
					nonceStr: orderInfo.nonceStr,
					timeStamp: orderInfo.timeStamp,
					package: orderInfo.package,
					signType: orderInfo.signType,
					paySign: orderInfo.paySign
				}, res => {
					_this.$tools.toast('充值成功')
					setTimeout(() => {
						_this.getUserData();
					}, 1000)
				}, fail => {
					console.log(fail)
					_this.$tools.toast('支付失败')
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

	.pure_top {
		width: 100%;
		height: 400upx;
		position: relative;
		z-index: 0;
		overflow: hidden;
	}

	.pure_top::after {
		content: '';
		width: 140%;
		height: 400upx;
		position: absolute;
		left: -20%;
		top: 0;
		z-index: -1;
		border-radius: 0 0 50% 50%;
		background: #e93d3d;
	}

	.m-head {
		width: 140upx;
		height: 140upx;
		border-radius: 70upx;
		float: left;
		margin: 80upx 30upx 0 50upx;
	}

	.m-r {
		width: 500upx;
		float: left;
		margin-top: 80upx;
		color: #FFFFFF;
	}

	.m-name {
		font-size: 33upx;
		height: 66upx;
		line-height: 66upx;
	}

	.m-name-a {
		float: left;
		margin-right: 20upx;
	}

	.m-name-b {
		float: left;
		background-color: #2d2c31;
		color: #f6d79e;
		width: 170upx;
		border-radius: 11upx;
		margin-top: 7upx;
	}

	.m-rank-name {
		font-size: 22upx;
		float: left;
		width: 130upx;
		height: 45upx;
		line-height: 45upx;
		text-align: center;
	}

	.m-name-b image {
		width: 30upx;
		height: 30upx;
		float: right;
		margin-right: 10upx;
		margin-top: 6upx;
	}

	.m-rank-up {
		width: 40upx;
		height: 40upx;
		float: left;
		margin-top: -15upx;
		margin-left: -25upx;
	}

	.m-rank-up image {
		width: 40upx;
		height: 40upx;
	}

	.m-ask {
		color: #EFEFEF;
		width: 500upx;
	}

	.bth-ask {
		margin-left: 60upx;
		border: 1px solid #EFEFEF;
		padding: 8upx 30upx;
		border-radius: 30upx;
	}


	.top-setting {
		color: #FFFFFF;
		position: absolute;
		right: 30upx;
		top: 30upx;
	}

	.m-account {
		width: 660upx;
		height: 150upx;
		margin-left: 45upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		margin-top: -120upx;
		display: flex;
	}

	.account-item {
		flex: 1;
		text-align: center;
		border-left: 1px solid #f4f5f6;
		height: 80upx;
		margin-top: 35upx;
	}

	.account-item:nth-child(1) {
		border: 0;
	}

	.account-money {
		font-weight: 600;
		font-size: 28upx;
	}

	.account-name {
		color: #9c9c9c;
		font-size: 28upx;
	}

	.m-center {
		width: 750upx;
		background-color: #FFFFFF;
		height: 500upx;
		margin-top: 100upx;
	}

	.center-item {
		width: 180upx;
		float: left;
		text-align: center;
		color: #9c9c9c;
		margin-top: 30upx;
	}

	.center-item image {
		width: 80upx;
		height: 80upx;
	}

	.center-item view {
		height: 30upx;
		line-height: 30upx;
	}

	/*升级*/
	.main-up {
		width: 600upx;
		height: 450upx;
		background-color: #FFFFFF;
		border-radius: 25upx;
		text-align: center;
		padding-top: 50upx;
	}

	.up-title {
		font-weight: 600;
		height: 60upx;
		line-height: 60upx;
		font-size: 40upx;
	}

	.up-price {
		height: 60upx;
		line-height: 60upx;
		font-size: 37upx;
		font-weight: 600;
		margin-top: 30upx;
		margin-bottom: 20upx;
	}

	.up-intro {
		font-size: 20upx;
	}

	.up-b {
		width: 500upx;
		margin: 0 auto;
		margin-top: 25upx;
	}

	.up-b view {
		float: left;
		width: 220upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 10upx;
		font-weight: 600;
	}

	.up-b .up-close {
		background-color: #f5f5f7;
		color: #000000;
	}

	.up-b .up-com {
		background-color: #313035;
		color: #f3d59f;
		float: right;
	}
	.up-level {
		margin-top: 6rpx;
		line-height: 36rpx;
		border: 1px solid #fff;
		border-radius: 10upx;
		padding : 2upx 20upx;
		margin-left: 15upx;
		float: left;
		font-size: 24upx;
		display: flex;
		align-items: center;
	}
	.up-level text {
		margin-left: 10rpx;
	}
	.get-level {
		border-color: #333;
		background-color: #333;
	}
</style>
