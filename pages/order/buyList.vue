<template>
	<view class="container">
		<view class="main">
			<view class="main-top">
				<view v-for="(item,index) in statusItem" :key="index" @click="selType(item.id)"><text
						:class="status == item.id ? 'clon' : ''">{{item.name}}</text></view>
			</view>
			<view class="main-item" v-for="(item,index) in mainItem" :key="index">
				<view class="state_warp" @click="dump('/pages/order/info?orderId='+item.id)">
					<view>订单号:{{item.order_num}}</view>
					<view>{{statusItem.find(p=>p.id==item.order_state).name}}</view>
				</view>
				<view class="ordercp" @click="dump('/pages/order/info?orderId='+item.id)">
					<view class="product-img">
						<image :src="item.goods_imgs" mode="aspectFill"></image>
					</view>
					<view class="product-r">
						<view class="product-title">{{item.goods_titem}}</view>
						<view class="product-price"><text class="font14 red">￥{{item.goods_money}}</text>
							X1</view>
					</view>
				</view>
				<view class="orderbt" v-if="item.order_state==2&&item.user_id==user_id"  @click="dump('/pages/order/info?orderId='+item.id)">
					<view class="order-btn">立即支付</view>
				</view>
				<view class="clear"></view>
			</view>
			<view v-if="mainItem.length == 0">
				<noData ref="noData"></noData>
			</view>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainItem: [],
				status: 0, //类别
				user_id: 0,
				statusItem: [{
					id: 0,
					name: '全部'
				}, {
					id: 1,
					name: '代发货'
				}, {
					id: 2,
					name: '已发货'
				}, {
					id: 3,
					name: '已收货'
				}, {
					id: 4,
					name: '已完成'
				}],
				loadMoreText: '加载中...',
				showLoadMore: false,
				isMore: true,
				PageNo: 1,
				PageSize: 10
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			var user = uni.getStorageSync('uerInfo');
			this.user_id = user.id;
			this.getPage();
		},
		onUnload() {
			(this.PageNo = 1), (this.mainItem = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
		},
		onReachBottom() {
			//下拉加载
			this.showLoadMore = true;
			setTimeout(() => {
				this.setListData();
			}, 300);
		},
		onPullDownRefresh() {
			//上拉刷新
			this.initData();
		},
		methods: {
			selType(status) {
				//选择类别
				this.status = status;
				this.initData();
			},
			dump(url) {
				uni.navigateTo({
					url: url
				});
			},
			withdrawal() {
				//提现
				uni.navigateTo({
					url: '/pages/memberAccount/withdrawal'
				});
			},
			initData() {
				//刷新数据
				setTimeout(() => {
					this.PageNo = 1;
					this.mainItem = [];

					this.getPage();
					// this.getUserAccont();
					uni.stopPullDownRefresh();
				}, 300);
			},
			setListData() {
				//加载更多数据
				this.PageNo += 1;
				if (this.isMore) this.getPage();
			},
			getPage() {
				//加载数据
				var _this = this;
				uni.showLoading({
					title: '数据查询中'
				});
				_this.$request.order
					.physicalOrder({
						page: _this.PageNo,
						physical_order_state: _this.status
					})
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 1) {
							_this.mainItem = _this.mainItem.concat(data.data);
							if (data.data.length < _this.PageSize) {
								this.loadMoreText = '没有更多数据了';
								_this.isMore = false;
							} else {
								_this.showLoadMore = false;
								_this.isMore = true;
							}
						} else {
							_this.showLoadMore = false;
							_this.$refs.noData.showText(data.msg)
							// _this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						_this.showLoadMore = false;
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
			}
		}
	};
</script>

<style>
	.container,
	page {
		background-color: #f4f5f6;
	}

	.main {
		width: 100%;
	}

	.main .main-top {
		width: 100%;
		border-bottom: 1px solid #eaeaea;
		height: 90upx;
		display: flex;
		background: #FFFFFF;
		margin-bottom: 20upx;
	}

	.main-top view {
		flex: 1;
		float: left;
		text-align: center;
		height: 90upx;
		line-height: 90upx;
	}

	.main-top view .clon {
		display: block;
		border-bottom: 2px solid #159f66;
		height: 86upx;
		width: 90upx;
		margin: 0 auto;
		color: #159f66;
	}

	.main .main-item {
		width: 750upx;
		margin: 0 auto;
		padding: 13upx 20upx;
		margin-top: 10upx;
		background: #FFFFFF;
	}

	.state_warp {
		width: 100%;
		height: 80upx;
		font-weight: 600;
	}

	.state_warp view:nth-child(1) {
		float: left;
		height: 80upx;
		line-height: 80upx;
		color: #000000;
	}

	.state_warp view:nth-child(2) {
		float: right;
		height: 80upx;
		line-height: 80upx;
		color: #df9a5f;
		padding-right: 20upx;
	}

	.ordercp {
		width: 100%;
		margin-top: 10upx;
		clear: both;
	}

	.product-img {
		width: 180upx;
		height: 160upx;
		float: left;
	}

	.product-img image {
		width: 150upx;
		height: 150upx;
		border-radius: 20upx;
	}

	.product-r {
		float: left;
		width: 500upx;
	}

	.product-title {
		height: 45upx;
		line-height: 45upx;
		font-size: 30upx;
		color: #000000;
		font-weight: 500;
	}

	.product-intro {
		height: 45upx;
		line-height: 45upx;
		font-size: 30upx;
		color: #bfbfbf;
		font-weight: 500;
		font-size: 28upx;
	}

	.product-price {
		font-size: 30upx;
		color: #bfbfbf;
		font-weight: 500;
		font-size: 28upx;
		margin-top: 25upx;
	}

	.orderbt {
		width: 100%;
		margin-top: 20upx;
		clear: both;
		height: 70upx;
	}

	.orderbt .order-btn {
		color: #a75863;
		border: 1px solid #a75863;
		width: 200upx;
		text-align: center;
		float: right;
		margin-left: 15upx;
		height: 60upx;
		line-height: 60upx;
		border-radius: 8upx;
	}
</style>
