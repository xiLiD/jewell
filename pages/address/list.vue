<template>
	<view class="container">
		<view class="tt"></view>
		<view class="top-address" v-for="(item, index) in mainItem" :key="index">
			<view class="ad-t" @click="selectAddress(item)">
				<view :class="['ad-l',item.default == 1 ? 'ad-default' : '']" class="ad-l">{{item.receiving_name[0]}}
				</view>
				<view class="ad-c">
					<view class="ad-c-n">
						{{ item.receiving_name }}
						<text>{{ item.receiving_phone }}</text>
					</view>
					<view class="ad-c-i">{{item.province}}{{item.city}}{{item.area}}
						{{ item.detailed_address }}
					</view>
				</view>
				<text class="uni-icon ad-r" v-if="order">&#xe470;</text>
			</view>
			<view class="ad-b">
				<view class="ad-b-l" v-if="item.default==1">
					<text class="uni-icon">&#xe442;</text>
					默认地址
				</view>
				<view class="ad-b-l" @click="setdefault(item.id)" v-else>
					<text class="uni-icon rsh">&#xe7fa;</text>
					设置为默认地址
				</view>
				<view class="ad-b-r">
					<text class="uni-icon" @click="del(item.id)">&#xe401;</text>
					<text class="uni-icon" @click="update(item)">&#xe400;</text>
				</view>
			</view>
		</view>
		<view class="sku-tj" @click="add">添加新地址</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: '',
				type: '',
				mainItem: []
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
			this.getAddress();
		},
		onLoad(option) {
			if (option.order) this.order = option.order;
			if (option.type) this.type = option.type;
			
		},
		methods: {
			getAddress() {
				//获取收货地址
				var _this = this;
				uni.showLoading({
					title: '数据查询中'
				});
				//获取用户信息
				var _this = this;
				_this.$request.address
					.gradeList({})
					.then(data => {
						uni.hideLoading();
						if (data.status == 1) {
							_this.mainItem = data.data;
						} else {
							uni.showToast({
								icon: 'none',
								title: data.msg
							});
						}
					})
					.catch(err => {
						uni.hideLoading();
						//消息异常
						uni.showToast({
							icon: 'none',
							title: '数据加载异常'
						});
					});
			},
			add() {
				uni.navigateTo({
					url: '/pages/address/add?order=' + this.order + '&type=' + this.type
				});
			},
			del(id) {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除此收货地址？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '数据查询中'
							});
							_this.$request.address
								.delAddress({
									address_id: id
								})
								.then(data => {
									if (data.status == 1) {
										_this.getAddress();
									} else {
										uni.showToast({
											icon: 'none',
											title: data.msg
										});
									}
									uni.hideLoading();
								})
								.catch(err => {
									uni.hideLoading();
									//消息异常
									uni.showToast({
										icon: 'none',
										title: '数据加载异常'
									});
								});
						} else if (res.cancel) {}
					}
				});
			},
			update(item) {
				uni.navigateTo({
					url: '/pages/address/add?order=' + this.order + '&type=' + this.type +
						"&id=" + item.id +
						"&receiving_name=" + item.receiving_name +
						"&receiving_phone=" + item.receiving_phone +
						"&province=" + item.province +
						"&city=" + item.city +
						"&area=" + item.area +
						"&detailed_address=" + item.detailed_address +
						"&default=" + item.default
				});
			},
			setdefault(id) {
				var _this = this;
				_this.$request.address
					.defaulst({
						address_id: id
					})
					.then(data => {
						if (data.status == 1) {
							_this.getAddress();
						} else {
							uni.showToast({
								icon: 'none',
								title: data.msg
							});
						}
						uni.hideLoading();
					})
					.catch(err => {
						uni.hideLoading();
						//消息异常
						uni.showToast({
							icon: 'none',
							title: '数据加载异常'
						});
					});
			},
			selectAddress(item) {
				if (this.order) {
					if (this.type == "product") {
						uni.navigateTo({
							url: '/pages/product/confirmOrder?order=' + this.order + '&addressId=' + item.id
						});
					} else if (this.type == "shop") {
						uni.navigateTo({
							url: '/pages/shop/confirmOrder?order=' + this.order + '&addressId=' + item.id
						});
					}
				}
			}
		}
	};
</script>

<style>
	.container,
	page {
		background-color: #f4f5f6;
	}


	.top-address {
		background-color: #ffffff;
		width: 750upx;
		margin: 0 auto;
		margin-bottom: 20upx;
	}

	.ad-t {
		width: 710upx;
		margin: 0 auto;
		margin-top: 20upx;
		height: 130upx;
		padding-top: 10upx;
	}

	.ad-b {
		width: 710upx;
		margin: 0 auto;
		height: 100upx;
		line-height: 100upx;
		border-top: 1px solid #eeeeee;
	}

	.ad-b .ad-b-l {
		width: 50%;
		float: left;
		height: 100upx;
		line-height: 100upx;
		color: #666666;
	}

	.ad-b .ad-b-l text {
		color: #353b50;
		font-size: 35upx;
		padding-right: 20upx;
		color: #d2a971;
	}

	.ad-b .ad-b-l .rsh {
		color: #d5d6d9;
	}

	.ad-b .ad-b-r {
		width: 50%;
		float: right;
		text-align: right;
		height: 100upx;
		line-height: 100upx;
	}

	.ad-b .ad-b-r text {
		color: #353b50;
		font-size: 38upx;
		margin-left: 20upx;
	}

	.top-address .ad-l {
		height: 50upx;
		line-height: 50upx;
		width: 50upx;
		text-align: center;
		font-size: 25upx;
		float: left;
		color: #ffffff;
		background-color: #d5d6d9;
		border-radius: 25upx;
		margin: 35upx 35upx 35upx 0;
	}

	.top-address .ad-default {
		color: #000000;
		background-color: #d1a971;
	}

	.top-address .ad-c {
		float: left;
		height: 120upx;
		line-height: 120upx;
		color: #363636;
		font-size: 30upx;
		width: 410upx;
	}

	.ad-c .ad-c-n {
		font-size: 30upx;
		line-height: 45upx;
		margin-top: 15upx;
		color: #000000;
	}

	.ad-c .ad-c-n text {
		font-size: 25upx;
		padding-left: 30upx;
		color: #999999;
	}

	.ad-c .ad-c-i {
		font-size: 25upx;
		line-height: 45upx;
		height: 45upx;
		overflow: hidden;
		color: #999999;
	}

	.top-address .ad-r {
		float: left;
		height: 120upx;
		line-height: 120upx;
		width: 120upx;
		text-align: center;
		float: right;
		color: #cccccc;
	}

	.sku-tj {
		width: 86%;
		margin-left: 7%;
		text-align: center;
		position: fixed;
		bottom: 30upx;
		background-color: #2e2d32;
		height: 90upx;
		line-height: 90upx;
		color: #ffffff;
		border-radius: 10upx;
	}
</style>
