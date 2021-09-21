<template>
	<view class="container">
		<view class="t-main">
			<view class="main-title">
				<view>时间</view>
				<view>奖励金</view>
			</view>

			<view class="main-item" v-for="(item, index) in mainItem" :key="index">
				<view>{{getDate(item.time*1000)}}</view>
				<view>{{item.money}}</view>
			</view>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0, //类别
				loadMoreText: '加载中...',
				showLoadMore: false,
				isMore: true,
				PageNo: 1,
				PageSize: 10,
				mainItem: [],
				keyWords: '' //搜索关键词
			};
		},
		onShow() {
			//传参
			var shotType = uni.getStorageSync('shotType');
			if (shotType != '' && parseInt(shotType) > 0) {
				this.type = parseInt(shotType);
				uni.setStorage({
					key: 'shotType',
					data: 0
				});
				//查询数据
			}
		},
		onLoad(option) {
			this.type = option.type;
			this.initData();
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
			search(res) {
				this.keyWords = res.value;
				this.initData();
			},
			dumpInfo(id) {
				uni.navigateTo({
					url: '/pages/shop/info?id=' + id
				});
			},
			initData() {
				//刷新数据
				setTimeout(() => {
					this.PageNo = 1;
					this.mainItem = [];

					this.getPage();
					uni.stopPullDownRefresh();
				}, 300);
			},
			setListData() {
				//加载更多数据
				this.PageNo += 1;
				if (this.isMore) this.getPage();
			},
			getDate(item) { // 时间戳转日期
				var time = new Date(item)
				var year = time.getFullYear()
				var month = time.getMonth() + 1
				var date = time.getDate()
				var hours = time.getHours()
				var minutes = time.getMinutes()
				return year + '-' + this.add0(month) + '-' + this.add0(date) + " " + this.add0(hours) + ":" + this.add0(
					minutes)
			},
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			getPage() {
				var _this = this;
				uni.showLoading({
					title: '数据查询中'
				});
				_this.$request.account
					.recommend({
						page: _this.PageNo,
						type: _this.type
					})
					.then(data => {
						uni.hideLoading();
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
							uni.showToast({
								icon: 'none',
								title: data.msg
							});
						}
					})
					.catch(err => {
						_this.showLoadMore = false;
						uni.hideLoading();
						//消息异常
						uni.showToast({
							icon: 'none',
							title: '数据加载异常'
						});
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

	.t_se {
		width: 750upx;
		margin: 0 auto;
		margin-top: 10upx;
		background-color: #FFFFFF;
		padding: 0 30upx;
	}

	.t-main {
		width: 750upx;
	}

	.main-title {
		width: 750upx;
		background-color: #FFFFFF;
		display: flex;
		height: 100upx;
		margin-bottom: 10upx;
	}

	.main-title view {
		flex: 1;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		color: #999999;
		font-size: 28upx;
	}

	.main-item {
		width: 750upx;
		background-color: #FFFFFF;
		display: flex;
		height: 100upx;
		border-bottom: 1px solid #EFEFEF;
	}

	.main-item view {
		flex: 1;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		overflow: hidden;
	}

	.main-item view:nth-child(2) {
		color: #b43c58;
	}

	.uni-loadmore {
		clear: both;
	}
</style>
