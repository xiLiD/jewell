<template>
	<view class="main">
		<view class="m-item">
			<view class="p-l">{{mainItem.money}}元/月</view>
			<view class="p-c">
				<view class="p-c-t">{{mainItem.name}}</view>
				<view class="p-c-b">{{mainItem.strDate}}</view>
			</view>
			<view class="p-r" @click="buy">购买</view>
		</view>
	</view>
</template>

<script>
	import jwx from '../../common/weiPay/jws.js'
	export default {
		data() {
			return {
				mainItem: []
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			this.getList();
		},
		methods: {
			getList() {
				var _this = this;
				uni.showLoading({
					title: '数据查询中'
				});
				_this.$request.card
					.gradeList({})
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 1) {
							_this.mainItem = data.data;
							if (_this.mainItem.end_time == 0) {
								_this.mainItem.strDate = "未购买";
							} else {
								if (_this.mainItem.end_time * 1000 > Date.parse(new Date())) {
									_this.mainItem.strDate = _this.getDate(_this.mainItem.end_time * 1000) + " 过期";
								} else {
									_this.mainItem.strDate = "已过期";
								}
							}
						}
					})
					.catch(err => {
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
			},
			getDate(item) { // 时间戳转日期
				var time = new Date(item)
				var year = time.getFullYear()
				var month = time.getMonth() + 1
				var date = time.getDate()
				return year + '-' + this.add0(month) + '-' + this.add0(date)
			},
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			buy() {
				//购买入场券

				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否确认购买次入场券？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: '数据提交中'
							});
							_this.$request.common
								.paySundries({
									type: 1,
									grade_id: _this.mainItem.id
								})
								.then(data => {
									_this.$tools.loadingHide();
									if (data.status == 1) {
										_this.pay(data.msg);
									} else {
										_this.$tools.toast(data.msg);
									}
								})
								.catch(err => {
									console.log(err)
									_this.$tools.loadingHide();
									//消息异常
									_this.$tools.toast('数据加载异常');
								});
						} else if (res.cancel) {}
					}
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
					_this.$tools.toast('支付成功')
					setTimeout(() => {
						_this.getList();
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

	.main {
		width: 650upx;
		margin: 0 auto;
	}

	.m-item {
		width: 650upx;
		height: 189upx;
		background-image: url(../../static/images/card_bg.png);
		background-size: 100%;
		margin-top: 50upx;
	}

	.m-item .p-l {
		width: 215upx;
		float: left;
		height: 189upx;
		line-height: 189upx;
		text-align: center;
		color: #d8614b;
		font-weight: 600;
		font-size: 30upx;
	}

	.m-item .p-c {
		width: 300upx;
		float: left;
		height: 150upx;
		margin-top: 20upx;
		color: #c8834c;
	}

	.p-c-t {
		height: 75upx;
		line-height: 75upx;
		text-indent: 20upx;
		font-weight: 600;
		color: #a45625;
		font-size: 32upx;
	}

	.p-c-b {
		height: 75upx;
		line-height: 75upx;
		text-indent: 20upx;
	}

	.m-item .p-r {
		width: 135upx;
		float: left;
		height: 189upx;
		line-height: 189upx;
		text-align: center;
		color: #f71024;
		font-weight: 600;
	}
</style>
