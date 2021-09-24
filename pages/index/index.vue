<template>
	<view class="container">
		<view class="topBanner">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :interval="interval" :autoplay="autoplay" :style="swiper_class">
				<swiper-item class="case-item" v-for="(item, index) in ImgList" :key="index">
					<image :src="item.imgs" class="banner-img" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="main-item">
			<view class="main-titel">
				竞拍<text class="red">快报</text><text class="l-3">|</text><text class="l-4">七月风暖，豪礼相送！</text>
			</view>
			<view class="i_item" v-for="(item, index) in mainItem" :key="index" @click="loadShop(item)">
				<view class="i_l">
					<image :src="item.imgs" mode="aspectFill" lazy-load></image>
				</view>
				<view class="i_r">
					<view class="i_r_t">{{ item.class_name }}</view>
					<view class="i-r-date" v-if="item.sleep==1">
						<view class="i-r-date" v-if="item.status==1">进行中（{{item.start_hours}}-{{item.end_hours}})</view>
						<view class="i-r-date" v-else>{{item.countDownStr}}<text v-if="item.start_time>0">（{{item.start_hours}}-{{item.end_hours}})</text></view>
						<text class="i-r-intro">{{item.quota}}</text>
					</view>
					<view class="i-r-date" v-else>休市中</view>
				</view>
				<view class="i-p">
					<view :class="['uni-navigate-icon','uni-icon', item.status==1 ? 'i-p-b' : 'i-p-a']">&#xe83e;</view>
					<view class="i-p-b" v-if="item.status==1">购买</view>
				</view>
			</view>
		</view>
		<view class="dbh"></view>
	</view>
</template>

<script>
	import config from '@/config/config';
	export default {
		data() {
			return {
				indicatorDots: true,
				interval: 3000,
				autoplay: true,
				swiper_class: {
					height: '400upx'
				},
				ImgList: [],
				mainItem: [],
				timer: null,
				isCard: -1 //0、未权限；1、有权限
			};
		},
		onShow() {
			this.isCard = -1;
			this.getList();
			this.getBanner();
			this.getUserUp();
		},
		onLoad() {
			// this.getList();
			// this.getBanner();
			// this.getUserUp();
		},
		onHide() {
			console.log('页面隐藏')
			if (this.timer) {
				clearInterval(this.timer);
			}
		},
		onUnload() {
			console.log('页面卸载')
			if (this.timer) {
				clearInterval(this.timer);
			}
		},
		methods: {
			countdown() {
				let that = this;
				// let mainItem = JSON.parse((JSON.stringify(that.mainItem)));
				that.timer = setInterval(function() {
					that.mainItem.forEach((item, index) => {
						let t = item.count_down;
						if (t > 0) {
							item.count_down -= 1;
							let day = Math.floor(t / 86400);
							let hour = Math.floor((t / 3600) % 24);
							let min = Math.floor((t / 60) % 60);
							let sec = Math.floor((t) % 60);
							day = day < 10 ? "0" + day : day;
							hour = hour < 10 ? "0" + hour : hour;
							min = min < 10 ? "0" + min : min;
							sec = sec < 10 ? "0" + sec : sec;
							let format = "";
							if (day == '00') {
								format = `待开始：${hour}时${min}分${sec}秒`;

							} else {
								format = `待开始：${day}天${hour}时${min}分${sec}秒`;
							}
							// format = `待开始：${day}天${hour}时${min}分${sec}秒`;
							item.countDownStr = format
							that.$set(that.mainItem, index, item)
							// item.countDownStr = format;
						} else {
							// 进行判断 如果数据内所有的倒计时已经结束，那么结束定时器， 如果没有那么继续执行定时器
							let flag = that.mainItem.every((val, ind) => val.count_down <= 0);
							if (flag) clearInterval(that.timer);
							if (item.count_down == -1) {
								item.countDownStr = '已开始'
								that.$set(that.mainItem, index, item)
								// that.$set(that.mainItem, index, '已开始')
								// item.countDownStr = `已开始`; // 结束文案
							} else if (item.count_down == -2) {
								item.countDownStr = '已结束'
								that.$set(that.mainItem, index, item)
								// that.$set(that.mainItem, index, '已结束')
								// item.countDownStr = `已结束`; // 结束文案
							}
						}
					})
					console.log(that.mainItem)
				}, 1000);

			},
			loadShop(item) {
				var _this = this;
				// if (item.status != 1) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '此竞拍尚未开始'
				// 	});
				// 	return false;
				// }

				if (item.id == 1 || item.id == 4) {
					uni.navigateTo({
						url: '/pages/product/list?type=' + item.id
					});
				} else {
					if (_this.isCard == -1) {
						_this.$request.card
							.gradeList({})
							.then(data => {
								uni.hideLoading();
								if (data.status == 1) {
									var end_time = data.data.end_time; //结束时间
									if (end_time == 0) {
										_this.isCard = 0;
									} else {
										if (end_time * 1000 > Date.parse(new Date())) {
											_this.isCard = 1;
										} else {
											_this.isCard = 0;
										}
									}
								}
								_this.shopDump(item.id);
							});
					} else {
						_this.shopDump(item.id);
					}
				}
			},
			shopDump(id) {
				if (this.isCard == 1) {
					uni.navigateTo({
						url: '/pages/product/list?type=' + id
					});
				} else if (this.isCard == 0) {

					uni.showModal({
						title: '提示',
						content: '您尚未购买入场券，或已过期，是否前往购买？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/card/list'
								});
							}
						},
					})
				}
			},
			getList() {
				//获取数据
				var _this = this;
				_this.$request.index
					.classify({})
					.then(data => {
						if (data.status == 1) {
							_this.mainItem = data.data;
							var h = new Date().getHours();
							_this.mainItem.forEach(item => {
								item.status = 0;
								var a = parseFloat(item.start_time / 3600);
								var b = parseFloat(item.end_time / 3600);
								item.start_hours = _this.getDate(a);
								item.end_hours = _this.getDate(b);
								if (a <= h && h <= b) {
									item.status = 1;
								}
							});
							_this.countdown()
						}
					})
					.catch(err => {
						console.log(err);
						uni.hideLoading();
						//消息异常
						uni.showToast({
							icon: 'none',
							title: '数据加载异常'
						});
					});
			},
			getDate(hours) {
				//处理时间
				var h = Math.floor(hours);
				var m = hours % 1;
				var sh = h; //显示小时
				if (h < 10) sh = '0' + h;
				if (m > 0) m = Math.floor(60 * m);
				var sm = m; //显示分钟
				if (m < 10) sm = '0' + m;
				return sh + ':' + sm;
			},
			getBanner() {
				//获取广告
				var _this = this;
				_this.$request.index
					.carousel({})
					.then(data => {
						if (data.status == 1) {
							_this.ImgList = data.data;
						}
					})
					.catch(err => {
						console.log(err);
						uni.hideLoading();
						//消息异常
						uni.showToast({
							icon: 'none',
							title: '数据加载异常'
						});
					});
			},
			getUserUp() {
				//获取是否可以升级
				var _this = this;
				_this.$request.user
					.getUserData({})
					.then(data => {
						if (data.status == 1) {
							if (data.data.up == 1) {
								uni.setTabBarBadge({
									index: 3,
									text: '1'
								})
							} else {
								uni.setTabBarBadge({
									index: 3
								})
							}
						}
					});
			}
		}
	};
</script>

<style>
	/*广告*/
	.swiper {
		margin-bottom: 20upx;
		min-height: 450upx;
	}

	.topBanner {
		width: 750upx;
	}

	.banner-img {
		width: 750upx;
	}

	/**商品**/
	.main-item {
		width: 750upx;
		background-color: #FFFFFF;
	}

	.main-titel {
		width: 90%;
		margin: 0 auto;
		font-size: 35upx;
		font-weight: 600;
		font-style: italic;
		padding-top: 15upx;
	}

	.main-titel .l-3 {
		padding: 0 15upx;
		color: #aeaeae;
	}

	.main-titel .l-4 {
		font-style: normal;
		color: #414141;
		font-weight: normal;
		font-size: 28upx;
		line-height: 40upx;
	}

	.i_item {
		width: 90%;
		margin: 0 auto;
		background-color: #ffffff;
		height: 220upx;
		margin-top: 20upx;
		border-bottom: 1px solid #eeeeee;
	}

	.i_l {
		float: left;
		width: 200upx;
		height: 200upx;
	}

	.i_l image {
		width: 180upx;
		height: 180upx;
		margin: 10upx 0 0 0;
		border-radius: 25upx;
	}

	.i_r {
		width: calc(100%-200upx);
		padding-top: 10upx;
	}

	.i_r_t {
		font-size: 30upx;
		font-weight: 600;
		height: 45upx;
		line-height: 45upx;
	}

	.i-r-date {
		color: #666666;
		font-size: 25upx;
		height: 45upx;
		line-height: 45upx;
		margin-bottom: 30upx;
		margin-top: 5upx;
	}

	.i-r-intro {
		background-color: #fbe3c0;
		width: initial;
		text-align: center;
		border-radius: 22upx;
		padding: 9upx 30upx;
		font-size: 20upx;
	}

	.i-p {
		position: absolute;
		right: 40upx;
		margin-top: -130upx;
		text-align: center;
	}

	.i-p .i-p-a {
		margin: 0 auto;
		color: #d8d8d8;
	}

	.i-p .i-p-b {
		margin: 0 auto;
		color: #f99c9c;
	}
</style>
