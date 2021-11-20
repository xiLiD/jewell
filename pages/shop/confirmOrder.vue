<template>
	<view class="container">
		<view class="tt"></view>
		<view class="top-address" @click="selectAddress">
			<view class="uni-icon ad-l">&#xe333;</view>
			<view class="ad-c" v-if="addressItem.id <= 0">请选择地址</view>
			<view class="ad-c" v-else>
				<view class="ad-c-n">
					{{ addressItem.receiving_name }}
					<text>{{ addressItem.receiving_phone }}</text>
				</view>
				<view class="ad-c-i">{{addressItem.province}} {{addressItem.city}} {{addressItem.area}}
					{{ addressItem.detailed_address }}
				</view>
			</view>
			<text class="uni-icon ad-r">&#xe470;</text>
		</view>

		<view class="main-list">
			<view class="list-title">商品信息</view>
			<view class="i_item" v-for="(item, index) in mainItem" :key="index">
				<view class="i_l" @click="loadInfo(item.id)">
					<image :src="item.goods_imgs[0]" mode="aspectFill"></image>
				</view>
				<view class="i_r" @click="loadInfo(item.id)">
					<view class="i-r-n">x{{ item.num }}</view>
					<text class="i_r_t_s">{{ item.goods_name }}</text>
					<text class="i_r_i red">{{ item.money }}元宝</text>
				</view>
				<view class="i-hx" v-if="index + 1 < mainItem.length"></view>
			</view>
		</view>

		<view class="main-price">
			<view class="price-item">
				商品金额
				<text class="price-r red">{{ price }}元宝</text>
			</view>
			<!--<view class="i-hx"></view>
			<view class="price-item">
				留言
				<input type="text" class="remarks" v-model="remarks" placeholder="选填，可填写您和买家达成一致的要求" />
			</view> -->
		</view>

		<view class="db-h"></view>

		<view class="bt-cn">
			<view class="t-b-l">
				<view class="t-b-tb">
					合计：
					<text class="allMoney red">{{ price }}元宝</text>
				</view>
				<view class="t-b-td">共{{ num }}件商品</view>
			</view>
			<view class="t-b-a" @click="openPwd()">提交订单</view>
		</view>
		<ssPaymentPassword ref="paymentPassword" mode="1" @submit="dealOrder" />
	</view>
</template>

<script>
	import config from '@/config/config';
	import ssPaymentPassword from '../../components/sanshui-payment-password'
	export default {
		components: {
			ssPaymentPassword
		},
		data() {
			return {
				userKey: '',
				order: '',
				mainItem: [],
				num: 0,
				price: 0,
				addressItem: {
					id: 0
				},
				remarks: ''
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			var user = uni.getStorageSync('uerInfo');
			if (user != '') {
				this.userKey = user.userKey;
			}
			if (option.order) this.order = option.order;
			if (option.addressId) this.addressItem.id = option.addressId;

			if (user != '') {
				this.getProduct();
				this.getAddress();
			}
		},
		methods: {
			getProduct() {
				var _this = this;

				var goods_id = _this.order.split('_')[0];
				var num = _this.order.split('_')[1];

				_this.$request.shop
					.getGoods({
						getgoldGoods_id: goods_id
					})
					.then(data => {
						if (data.status == 1) {
							data.data.num = num;
							_this.mainItem = _this.mainItem.concat(data.data);
							_this.dealNum();
						} else {
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
			},
			getAddress() {
				//获取收货地址
				var _this = this;
				//获取用户信息
				var _this = this;
				_this.$request.address
					.gradeList({})
					.then(data => {
						if (data.status == 1 && data.data.length > 0) {
							if (_this.addressItem.id > 0) {
								_this.addressItem = data.data.find(p => p.id == _this.addressItem.id);
							} else {
								_this.addressItem = data.data[0];
							}
						}
					})
					.catch(err => {
						//消息异常
						_this.$tools.toast('数据加载异常')
						
					});
			},
			dealNum() {
				//修改数量
				var nums = 0;
				var prices = 0;
				this.mainItem.forEach(its => {
					nums += its.num;
					prices += its.num * its.money;
				});
				this.num = parseInt(nums);
				this.price = prices;
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
			dealOrder(e) {
				//处理订单
				var _this = this;
				if (_this.addressItem.id <= 0) {
					_this.$tools.toast('请选择收货地址')
					return false;
				}
				uni.showLoading({
					title: '订单提交中'
				});

				_this.$request.shop
					.rush({
						goldgoods_id: _this.mainItem[0].id,
						address_id: _this.addressItem.id,
						pwdPay: e.value
					})
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 1) {
							_this.$tools.toast('购买成功')
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/order/info?orderId=' + data.data.orderId
								});
							}, 1000)
						} else {
							_this.$refs.paymentPassword.modalFun('hide');
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						_this.$refs.paymentPassword.modalFun('hide');
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
			},
			selectAddress() {
				uni.navigateTo({
					url: '/pages/address/list?order=' + this.order + '&type=shop'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/static/css/list.css';

	.container,
	page {
		background-color: #f4f5f6;
	}

	.tt {
		height: 20upx;
	}

	.top-address {
		background-color: #ffffff;
		width: 750upx;
		height: 120upx;
		margin: 0 auto;
		border-radius: 15upx;
	}

	.top-address .ad-l {
		height: 120upx;
		line-height: 120upx;
		width: 120upx;
		text-align: center;
		font-size: 60upx;
		float: left;
		color: #666666;
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
	}

	.ad-c .ad-c-n text {
		font-size: 25upx;
		padding-left: 10upx;
		color: #9b9b9b;
	}

	.ad-c .ad-c-i {
		font-size: 27upx;
		line-height: 45upx;
		height: 45upx;
		overflow: hidden;
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

	.i_item {
		height: 180upx;
		width: 100%;
		margin-left: 0;
	}

	.i-hx {
		height: 1px;
		width: 96%;
		margin-left: 2%;
		border-bottom: 1px solid #e5e5e5;
	}

	.i_item .i_r {
		height: 187.5upx;
	}

	.main-list {
		width: 750upx;
		margin: 0 auto;
		background-color: #ffffff;
		border-radius: 3px;
		margin-top: 20upx;
	}

	.i-r-n {
		position: absolute;
		right: 50upx;
		margin-top: 130upx;
	}

	.list-title {
		font-weight: 600;
		font-size: 35upx;
		margin-left: 20upx;
		padding-top: 20upx;
	}

	.main-price {
		width: 750upx;
		margin: 0 auto;
		background-color: #ffffff;
		border-radius: 3px;
		margin-top: 20upx;
	}

	.main-price .price-item {
		height: 90upx;
		line-height: 90upx;
		padding: 0 19upx;
		font-size: 28upx;
	}

	.price-item .remarks {
		width: 580upx;
		float: right;
		height: 90upx;
		line-height: 90upx;
		font-size: 28upx;
		text-align: right;
	}

	.price-r {
		float: right;
	}

	.db-h {
		height: 130upx;
	}

	.bt-cn {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 113upx;
		background-color: #ffffff;
		box-shadow: 0px 0px 3px #e5e5e5;
	}

	.bt-cn .t-b-l {
		width: 450upx;
		float: left;
		text-align: right;
	}

	.t-b-l .t-b-tb {
		font-size: 25upx;
		height: 45upx;
		line-height: 45upx;
		margin-top: 15upx;
	}

	.t-b-l .t-b-tb .allMoney {
		font-size: 35upx;
	}

	.t-b-l .t-b-td {
		font-size: 25upx;
		height: 45upx;
		line-height: 45upx;
	}

	.t-b-a {
		float: right;
		height: 75upx;
		width: 200upx;
		line-height: 75upx;
		background-color: #201f24;
		text-align: center;
		color: #f8d79f;
		font-size: 30upx;
		margin: 20upx 38upx 0 0;
		border-radius: 10upx;
		border: 0;
	}
</style>
