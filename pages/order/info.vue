<template>
	<view class="container">
		<view class="top" v-if="mainData.orderData.order_state!=5">
			<view class="top-icon">
				<image src="/static/images/order-a-t.png" mode="aspectFill"></image>
				<view class="icon-on">下单成功</view>
			</view>
			<view class="top-line"></view>
			<view class="top-icon">
				<image src="/static/images/order-b-t.png" mode="aspectFill" v-if="mainData.orderData.order_state>1">
				</image>
				<image src="/static/images/order-b-f.png" mode="aspectFill" v-else></image>
				<view :class="[mainData.orderData.order_state>1 ? 'icon-on' : '']">线下支付</view>
			</view>
			<view class="top-line"></view>
			<view class="top-icon">
				<image src="/static/images/order-c-t.png" mode="aspectFill" v-if="mainData.orderData.order_state>2">
				</image>
				<image src="/static/images/order-c-f.png" mode="aspectFill" v-else></image>
				<view :class="[mainData.orderData.order_state>2 ? 'icon-on' : '']">已确认</view>
			</view>
			<view class="top-line"></view>
			<view class="top-icon">
				<image src="/static/images/order-d-t.png" mode="aspectFill" v-if="mainData.orderData.order_state>3">
				</image>
				<image src="/static/images/order-d-f.png" mode="aspectFill" v-else></image>
				<view :class="[mainData.orderData.order_state>3 ? 'icon-on' : '']">转拍/提货</view>
			</view>
		</view>

		<view class="main">
			<view class="main-item">
				<view class="main-l">买家昵称</view>
				<view class="main-r">{{mainData.buyersUser.user_name}}</view>
			</view>
			<view class="main-item">
				<view class="main-l">买家姓名</view>
				<view class="main-r">{{mainData.buyersUser.id_card_name}}</view>
			</view>
			<view class="main-item">
				<view class="main-l">手机号</view>
				<view class="main-r" v-if="mainData.sellerUser.sellerUserId==user_id"
					@click="call(mainData.buyersUser.phone)">{{mainData.buyersUser.phone}}
					<view class="uni-icon">&#xe230;</view>
				</view>
				<view class="main-r" v-else>{{mainData.buyersUser.phone}}</view>
			</view>
		</view>

		<view class="main">
			<view class="main-item">
				<view class="main-l">商品信息</view>
				<view class="main-r">{{mainData.orderData.goods_titem}}</view>
			</view>
			<!-- <view class="main-item">
				<view class="main-l">库号</view>
				<view class="main-r">ZS708266</view>
			</view> -->
		</view>

		<view class="main">
			<view class="main-item">
				<view class="main-l">订单编号</view>
				<view class="main-r">{{mainData.orderData.order_num}}</view>
			</view>
			<view class="main-item">
				<view class="main-l">订单金额</view>
				<view class="main-r red">￥{{mainData.orderData.goods_money}}</view>
			</view>
			<view class="main-item">
				<view class="main-l">创建时间</view>
				<view class="main-r">{{getDate(mainData.orderData.time * 1000)}}</view>
			</view>
			<view class="main-item" v-if="mainData.orderData.payment_time">
				<view class="main-l">支付时间</view>
				<view class="main-r">{{getDate(mainData.orderData.payment_time * 1000)}}</view>
			</view>
		</view>

		<view class="main" v-if="mainData.sellerUser.sellerUserId>0">
			<view class="main-item">
				<view class="main-l">卖家昵称</view>
				<view class="main-r">{{mainData.sellerUser.user_name}}</view>
			</view>
			<view class="main-item">
				<view class="main-l">卖家姓名</view>
				<view class="main-r">{{mainData.sellerUser.id_card_name}}</view>
			</view>
			<view class="main-item">
				<view class="main-l">联系卖家</view>
				<view class="main-r" v-if="mainData.buyersUser.buyersUserId==user_id"
					@click="call(mainData.sellerUser.phone)">
					{{mainData.sellerUser.phone}}
					<view class="uni-icon">&#xe230;</view>
				</view>
				<view class="main-r" v-else>{{mainData.sellerUser.phone}}</view>
			</view>
		</view>

		<view class="main-pay" v-if="mainData.orderData.order_state==1&&mainData.buyersUser.buyersUserId==user_id">
			<view class="pay-title">收款码</view>
			<view class="pay-type">
				<view class="type-name">支付方式</view>

				<picker class="picker" @change="payTypeChange" :value="payTypeIndex" :range="mainData.sellerPayData"
					range-key="name">
					<!-- #ifdef MP-WEIXIN -->
					<input :value="mainData.sellerPayData[payTypeIndex].name" disabled style="color: transparent;" />
					<!-- #endif -->
				</picker>
				<view class="type-r">{{payMain.name}}<text class="uni-icon">&#xe470;</text></view>
			</view>
			<view class="pay-con">
				<view class="pay-intro">如遇付款码有问题，请与卖家联系再支付</view>
				<view class="pay-no">收款账户：{{payMain.zf_name}}</view>
				<image :src="payMain.zf_imgse" mode="widthFix"></image>
			</view>
		</view>

		<view class="main-pay" v-if="mainData.orderData.order_state>=2&&mainData.orderData.zfb_imgs!=''">
			<view class="pay-title">支付凭证</view>
			<view class="pay-con">
				<image :src="mainData.orderData.zfb_imgs" mode="widthFix"></image>
			</view>
		</view>

		<view class="main-bottom">
			<view class="btn-a" @click="confirmOrder"
				v-if="mainData.orderData.physical_order==2&&mainData.orderData.physical_order_state==2&&mainData.buyersUser.buyersUserId==user_id">
				确认收货</view>
			<view class="btn-c" v-else-if="mainData.orderData.order_state==5">已取消</view>
			<view class="btn-a" v-else-if="mainData.orderData.order_state==2&&mainData.sellerUser.sellerUserId==user_id"
				@click="confirmOrderPay">确认收款</view>
			<view class="btn-a"
				v-else-if="mainData.orderData.order_state==2&&mainData.buyersUser.buyersUserId==user_id">等待放货</view>
			<view class="btn-d"
				v-else-if="mainData.orderData.order_state==3&&mainData.buyersUser.buyersUserId==user_id&&mainData.sellerUser.sellerUserId>0">
				<view class="btn-d-l" @click="substitution">置换成银元宝</view>
				<view class="btn-d-r" @click="transfer">立即转拍</view>
			</view>
			<view class="btn-d"
				v-else-if="mainData.orderData.order_state==3&&mainData.buyersUser.buyersUserId==user_id">
				<view class="btn-a" @click="transfer">立即转拍</view>
			</view>
			<view class="btn-a" v-else-if="mainData.orderData.order_state==3&&mainData.buyersUser.buyersUserId==user_id"
				<view class="btn-b"
				v-else-if="mainData.orderData.order_state==1&&mainData.buyersUser.buyersUserId==user_id">
				<view class="btn-b-t">请在{{payitem_start}}至{{payitem_end}}之间付款</view>
				<view class="btn-b-l" @click="cancel"><text class="uni-icon">&#xe404;</text>取消订单</view>
				<view class="btn-b-r" @click="pay">({{liveCountdown}})已付款,提醒卖家收款</view>
			</view>
		</view>
		<view class="dbh"></view>

		<!-- 底部转拍弹窗 -->
		<uni-popup ref="showtransfer" type="bottom">
			<view class="main-transfer">
				<view class="tr-title">
					<image src="../../static/images/pm.png" mode="aspectFill"></image>
					转拍是T+1交易，即当日转拍，+1日才能出售。转拍需缴纳转拍费。
				</view>
				<view class="tr-main">
					<view class="tr-item">购买单价：<text class="red">￥{{transferData.order_price}}</text></view>
					<view class="tr-item">转拍单价：<text class="red">￥{{transferData.transfer_price}}</text></view>
					<view class="tr-item">手续费：<text class="red">￥{{transferData.pay_price}}</text></view>
				</view>
				<view class="tr-pay">
					<view class="pay-top">支付方式</view>
					<radio-group class="uni-list" @change="payChange">
						<view class="pay-item">
							<view class="pay-l">
								<image src="../../static/images/ye.png" mode="aspectFill"></image>佣金支付
							</view>
							<view class="pay-r">
								<radio value="2" class="pay-radio" color="#cd373a"
									:checked="transferData.pay_type==2" />
							</view>
						</view>
						<view class="pay-item">
							<view class="pay-l">
								<image src="../../static/images/yb.png" mode="aspectFill"></image>金元宝支付
							</view>
							<view class="pay-r">
								<radio value="1" class="pay-radio" color="#cd373a"
									:checked="transferData.pay_type==1" />
							</view>
						</view>
						<view class="pay-item">
							<view class="pay-l">
								<image src="../../static/images/grid-2.png" mode="aspectFill"></image>微信支付
							</view>
							<view class="pay-r">
								<radio value="3" class="pay-radio" color="#cd373a"
									:checked="transferData.pay_type==3" />
							</view>
						</view>
					</radio-group>
				</view>
				<view class="tr-bottom" @click="openPwd">立即支付</view>
			</view>
		</uni-popup>
		<ssPaymentPassword ref="paymentPassword" mode="1" @submit="transferPay" />
	</view>
</template>

<script>
	import ssPaymentPassword from '../../components/sanshui-payment-password'
	import jwx from '../../common/weiPay/jws.js'
	export default {
		components: {
			ssPaymentPassword
		},
		data() {
			return {
				order_id: 0,
				user_id: 0,
				payItem: [{
					id: 1,
					name: "支付宝"
				}, {
					id: 2,
					name: "微信"
				}, {
					id: 3,
					name: "银行卡"
				}],
				payMain: {
					id: 0,
					name: "",
					zf_imgse: "",
					zf_name: ''
				}, //支付方式
				mainData: {
					orderData: {
						order_state: 0
					},
					buyersUser: {
						user_name: ''
					},
					sellerUser: {
						user_name: ''
					},
					sellerPayData: []
				},
				transferData: {
					order_price: 0,
					transfer_price: 0,
					pay_price: 0,
					pay_type: 2 //1、金元宝；2、佣金
				},
				status: 1,
				payitem_start: '',
				payitem_end: '',
				liveCountdown: '', //倒计时
				payTypeIndex: 0 //支付方式
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			if (option.orderId != '') this.order_id = option.orderId;
			var user = uni.getStorageSync('uerInfo');
			this.user_id = user.id;

			this.initData();
		},
		methods: {
			payTypeChange(e) {
				this.payTypeIndex = e.target.value;
				this.payMain = this.mainData.sellerPayData[this.payTypeIndex];
			},
			call(phone) { //拨打电话
				if (phone === "" || phone === "0")
					return false;
				uni.makePhoneCall({
					phoneNumber: phone,
					success: (res) => {
						console.log('调用成功!')
					},
					fail: (res) => {
						console.log('调用失败!')
					}

				});
			},
			initData() {
				//查询数据
				var _this = this;
				uni.showLoading({
					title: '数据查询中'
				});
				_this.$request.order
					.particulars({
						order_id: _this.order_id
					})
					.then(data => {
						uni.hideLoading();
						if (data.status == 1) {
							_this.mainData = data.data;
							if (_this.mainData.sellerUser == null) {
								_this.mainData.sellerUser = {
									sellerUserId: 0
								};
							}
							//收款码
							if (_this.mainData.sellerPayData.length > 0) {
								_this.mainData.sellerPayData.forEach(item => {
									item.name = _this.payItem.find(p => p.id == item.type).name;
								})
								_this.payMain = _this.mainData.sellerPayData[0];
							}
							//订单时间
							if (_this.mainData.orderData.order_state == 1) {
								var date_start = getDate(_this.getDate(_this.mainData.orderData.time * 1000));
								_this.payitem_start = this.add0(date_start.getHours()) + ":" + this.add0(date_start
										.getMinutes()) +
									":" + this.add0(date_start.getSeconds());

								var str_date_end = _this.getDate(_this.mainData.orderData.time * 1000 + 3600 * 1000);
								var date_end = getDate(str_date_end);
								_this.payitem_end = this.add0(date_end.getHours()) + ":" + this.add0(date_end
										.getMinutes()) +
									":" + this.add0(date_end.getSeconds());

								//倒计时
								this.getLiveTimeCount(str_date_end);
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: data.msg
							});
						}
					});
			},
			confirmOrderPay() {
				//确认订单
				var _this = this;
				uni.showModal({
					title: '确认收款',
					content: '是否确定已收到款？未收到款确认将造成自己财产损失，请谨慎点击。',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '数据提交中'
							});
							_this.$request.order
								.setPayDocument({
									order_id: _this.order_id,
									order_state: 3
								})
								.then(data => {
									uni.hideLoading();
									if (data.status == 1) {
										uni.showToast({
											icon: 'none',
											title: '确认成功'
										});
										setTimeout(() => {
											_this.initData();
										}, 1000)
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
						}
					}
				})
			},
			confirmOrder() {
				//确认订单
				var _this = this;
				uni.showModal({
					title: '确认订单',
					content: '是否确定已收到商品？未收到商品确认将造成自己财产损失，请谨慎点击。',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '数据提交中'
							});
							_this.$request.order
								.receivingGoods({
									order_id: _this.order_id
								})
								.then(data => {
									uni.hideLoading();
									if (data.status == 1) {
										uni.showToast({
											icon: 'none',
											title: '确认成功'
										});
										setTimeout(() => {
											_this.initData();
										}, 1000)
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
						}
					}
				})
			},
			cancel() {
				//取消订单
				var _this = this;
				uni.showModal({
					title: '取消订单',
					content: '是否确定关闭此订单？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '数据提交中'
							});
							_this.$request.order
								.delOrder({
									order_id: _this.order_id
								})
								.then(data => {
									uni.hideLoading();
									if (data.status == 1) {
										uni.showToast({
											icon: 'none',
											title: '取消成功'
										});
										setTimeout(() => {
											_this.initData();
										}, 1000)
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
						}
					}
				})
			},
			pay() {
				//支付
				var _this = this;
				uni.showModal({
					title: '已付款，提醒卖家收款',
					content: '请再次确认您是否付款，未成功就点击，将记录违规，请谨慎点击',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/order/pay?orderId=' + _this.order_id
							});
						}
					}
				})
			},
			transfer() {
				//转拍
				var _this = this;
				_this.$request.order
					.resell({
						order_id: _this.order_id
					})
					.then(data => {
						uni.hideLoading();
						if (data.status == 1) {
							_this.transferData.order_price = data.data.unitPurchasePrice;
							_this.transferData.transfer_price = data.data.unitPrice;
							_this.transferData.pay_price = data.data.serviceCharge;
							this.$refs['showtransfer'].open();
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
			substitution() {
				//置换成银元宝
				var _this = this;
				uni.showModal({
					title: '取消订单',
					content: '是否确定将此商品置换成银元宝？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '数据提交中'
							});
							_this.$request.order
								.substitution({
									order_id: _this.order_id
								})
								.then(data => {
									uni.hideLoading();
									if (data.status == 1) {
										uni.showToast({
											icon: 'none',
											title: '置换成功'
										});
										setTimeout(() => {
											_this.initData();
										}, 1000)
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
						}
					}
				})
			},
			openPwd() {
				//验证密码
				if (this.transferData.pay_type == 3) {
					this.transferPay();
				} else {
					this.$refs.paymentPassword.modalFun('show');
				}
			},
			transferPay(e) {
				//转拍下单
				var _this = this;
				uni.showLoading({
					title: '数据提交中'
				});
				var pwdPay = '';
				if (e) pwdPay = e.value;
				_this.$request.order
					.transfer({
						order_id: _this.order_id,
						type: _this.transferData.pay_type,
						pwdPay: pwdPay
					})
					.then(data => {
						uni.hideLoading();
						if (data.status == 1) {
							if (this.transferData.pay_type == 3) {
								_this.pays(data.msg);
							} else {
								uni.showToast({
									icon: 'none',
									title: '转拍成功'
								});
								setTimeout(() => {
									_this.$refs.paymentPassword.modalFun('hide');
									_this.$refs['showtransfer'].close();
									_this.initData();
								}, 1000)
							}
						} else {
							_this.$refs.paymentPassword.modalFun('hide');
							uni.showToast({
								icon: 'none',
								title: data.msg
							});
						}
					})
					.catch(err => {
						_this.$refs.paymentPassword.modalFun('hide');
						uni.hideLoading();
						//消息异常
						uni.showToast({
							icon: 'none',
							title: '数据加载异常'
						});
					});
			},
			pays(orderInfo) {
				jwx({
					nonceStr: orderInfo.nonceStr,
					timeStamp: orderInfo.timeStamp,
					package: orderInfo.package,
					signType: orderInfo.signType,
					paySign: orderInfo.paySign
				}, res => {
					uni.showToast({
						icon: 'none',
						title: '转拍成功'
					});
					setTimeout(() => {
						_this.initData();
					}, 1000)
				}, fail => {
					console.log(fail)
					uni.showToast({
						icon: 'none',
						title: '支付失败'
					});
				})
			},
			payChange(e) {
				this.transferData.pay_type = e.detail.value;
			},
			getLiveTimeCount(startTime) {
				//倒计时
				if (startTime) { //如果设置了开始时间
					this.liveCountTimes = setInterval(() => {
						//注：不论安卓还是ios，请将时间如 2020-02-02 20:20:20 转化为 2020/02/02 20:20:20 这种形式后再使用，否则无法转换，如下转换即可↓
						let transedPreTime = startTime.replace(/-/g, '/') //这里转化时间格式为以/分隔形式
						let nowTime = new Date().getTime();
						let preTime = new Date(transedPreTime).getTime()
						let obj = null;
						if (preTime - nowTime > 0) {
							let time = (preTime - nowTime) / 1000;
							let day = parseInt(time / (60 * 60 * 24));
							let hou = parseInt(time % (60 * 60 * 24) / 3600);
							let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
							let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
							obj = {
								day: day < 10 ? '0' + day : day,
								hou: hou < 10 ? '0' + hou : hou,
								min: min < 10 ? '0' + min : min,
								sec: sec < 10 ? '0' + sec : sec
							};
							this.liveCountdown = "";
							if (obj.day != '00') {
								this.liveCountdown += obj.day + '天';
							}
							if (obj.hou != '00') {
								this.liveCountdown += obj.hou + ':';
							}

							this.liveCountdown += obj.min + ':' + obj.sec
						} else {
							obj = {
								day: '00',
								hou: '00',
								min: '00',
								sec: '00'
							};
							this.liveCountdown = "";
							if (obj.day != '00') {
								this.liveCountdown += obj.day + '天';
							}
							if (obj.hou != '00') {
								this.liveCountdown += obj.hou + ':';
							}

							this.liveCountdown += obj.min + ':' + obj.sec
							clearInterval(this.liveCountTimes)
						}
					}, 1000)
				} else {
					this.liveCountdown = "开始时间待定"
				}
			},
			getDate(item) { // 时间戳转日期
				var time = new Date(item)
				var year = time.getFullYear()
				var month = time.getMonth() + 1
				var date = time.getDate()
				var hours = time.getHours()
				var minutes = time.getMinutes()
				var seconds = time.getSeconds()
				return year + '-' + this.add0(month) + '-' + this.add0(date) + " " + this.add0(hours) + ":" + this.add0(
					minutes) + ":" + this.add0(seconds)
			},
			add0(m) {
				return m < 10 ? '0' + m : m
			}
		}
	};
</script>

<style>
	.container,
	page {
		background-color: #f4f5f6;
	}


	/*头部*/
	.top {
		width: 100%;
		background-color: #FFFFFF;
		height: 150upx;
		padding: 25upx 30upx;
	}

	.top view {
		text-align: center;
		float: left;
	}

	.top .top-icon {
		width: 130upx;
	}

	.top .top-icon image {
		width: 60upx;
		height: 60upx;
	}

	.top .top-icon view {
		font-size: 20upx;
		color: #94929c;
		text-align: center;
		width: 100%;
		margin-top: -10upx;
	}

	.top .top-icon .icon-on {
		color: #000000;
	}

	.top-line {
		width: 57upx;
		height: 3px;
		background-color: #f6f6f6;
		margin-top: 30upx;
		padding: 0 -50upx;
	}

	/*项目*/
	.main {
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 10upx;
	}

	.main-item {
		height: 88upx;
		line-height: 88upx;
		border-bottom: 1px solid #f6f6f6;
		width: 710upx;
		margin: 0 auto;
		font-size: 22upx;
	}

	.main .main-l {
		float: left;
		width: 150upx;
		height: 88upx;
		line-height: 88upx;
		color: #b1b1b1;
	}

	.main .main-r {
		height: 88upx;
		line-height: 88upx;
	}

	.main .main-r .uni-icon {
		font-size: 32upx;
		float: right;
		height: 88upx;
		line-height: 88upx;
		margin-right: 10upx;
	}

	/*支付*/
	.main-pay {
		background-color: #FFFFFF;
		margin-top: 10upx;
		padding: 20upx;
	}

	.main-pay .pay-title {
		border-left: 7upx solid #c13c3e;
		height: 35upx;
		line-height: 35upx;
		padding-left: 20upx;
		font-weight: 600;
		font-size: 32upx;
	}

	.pay-type {
		height: 80upx;
		line-height: 80upx;
		margin-top: 20upx;
	}

	.type-name {
		float: left;
		width: 300upx;
		font-size: 32upx;
		height: 80upx;
		line-height: 80upx;
		color: #b1b1b1;
	}

	.type-r {
		float: right;
		width: 300upx;
		text-align: right;
		height: 80upx;
		line-height: 80upx;
	}

	.type-r text {
		font-size: 36upx;
	}

	.pay-con {
		clear: both;
		text-align: center;
		margin-top: 20upx;
	}

	.pay-intro {
		color: #b1b1b1;
		height: 80upx;
		line-height: 80upx;
	}

	.pay-no {
		height: 80upx;
		line-height: 80upx;
	}

	.pay-con image {
		width: 600upx;
		margin-top: 20upx;
	}

	.picker {
		position: absolute;
		margin-top: 0;
		left: 0;
		width: 100%;
		height: 80upx;
		box-sizing: border-box;
	}

	/*底部按钮*/
	.main-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.btn-a {
		width: 100%;
		color: #FFFFFF;
		background-color: #cc373b;
		height: 110upx;
		line-height: 110upx;
		font-size: 35upx;
		text-align: center;
	}

	.btn-b {
		width: 100%;
	}

	.btn-c {
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		font-size: 35upx;
		text-align: center;
		background-color: #EFEFEF;
		color: #aaaaaa;
	}

	.btn-b .btn-b-t {
		width: 100%;
		background-color: #f8c953;
		color: #000000;
		text-align: center;
		height: 65upx;
		line-height: 65upx;
	}

	.btn-b .btn-b-l {
		width: 38%;
		height: 110upx;
		line-height: 110upx;
		font-size: 35upx;
		float: left;
		text-align: center;
		background-color: #FFFFFF;
		font-size: 27upx;
		color: #aaaaaa;
	}

	.btn-b .btn-b-r {
		width: 62%;
		height: 110upx;
		line-height: 110upx;
		font-size: 35upx;
		text-align: center;
		float: right;
		background-color: #cc373b;
		color: #FFFFFF;
		font-size: 27upx;
	}

	.btn-b-l text {
		font-size: 33upx;
		margin-right: 10upx;
	}


	.btn-d {
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		font-size: 35upx;
		text-align: center;
		background-color: #FFFFFF;
	}

	.btn-d .btn-d-l {
		width: 50%;
		float: left;
		height: 110upx;
		line-height: 110upx;
		background-color: #f8c953;
		color: #000000;
	}

	.btn-d .btn-d-r {
		width: 50%;
		float: right;
		height: 110upx;
		line-height: 110upx;
		color: #FFFFFF;
		background-color: #cc373b;
	}

	.dbh {
		height: 200upx !important;
	}

	/*转拍*/
	.main-transfer {
		width: 100%;
		height: 770upx;
		background-color: #FFFFFF;
		border-top-left-radius: 50upx;
		border-top-right-radius: 50upx;
		padding-top: 40upx;
	}

	.tr-title {
		padding-top: 20upx;
		color: #000000;
		font-weight: 600;
		padding: 0 40upx;
	}

	.tr-title image {
		width: 30upx;
		height: 30upx;
		margin-right: 10upx;
	}

	.tr-main {
		border-bottom: 10upx solid #f8f8f8;
		padding-bottom: 20upx;
	}

	.tr-item {
		color: #b0b0b0;
		height: 50upx;
		line-height: 50upx;
		padding: 0 40upx;
	}

	.tr-item text {
		font-weight: 600;
	}

	.tr-pay {
		padding: 20upx 40upx;
	}

	.pay-top {
		color: #000000;
		font-weight: 600;
		font-size: 35upx;
		height: 80upx;
		line-height: 80upx;
	}

	.pay-item {
		height: 65upx;
		line-height: 65upx;
	}

	.uni-list {
		border: 0;
		padding-top: 20upx;
	}

	.pay-l {
		color: #3e3e3e;
		float: left;
	}

	.pay-l image {
		width: 30upx;
		height: 30upx;
		margin-right: 20upx;
		text-anchor: middle;
	}

	.pay-r {
		float: right;
	}

	.pay-radio {
		transform: scale(0.7);
	}

	.tr-bottom {
		position: absolute;
		bottom: 0;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		background-color: #cc373b;
		color: #FFFFFF;
		width: 100%;
		font-size: 33upx;
	}
</style>
