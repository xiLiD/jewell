<template>
	<view class="container">
		<view class="inv-h-w">
			<view :class="['inv-h', inv == 0 ? 'inv-h-se' : '']">通知</view>
			<view :class="['inv-h', inv == 1 ? 'inv-h-se' : '']" @click="dumpNotice">公告</view>
		</view>
		<view class="t_main">
			<view class="t_item" v-for="(item, index) in mainItem" :key="index" @click="dumpInfo(item.id)">
				<view class="t_img">
					<image :src="item.filepath" mode="aspectFill"></image>
				</view>
				<view class="t_b">
					<view class="t_r_t">{{ item.title }}</view>
					<view class="t_r_d">{{ getDate(item.create_time*1000) }}</view>
					<view class="t_r_i">{{ item.description }}</view>
				</view>
			</view>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
		<view class="dbh"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inv: 0,
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
			this.$store.commit('judgeLogin'); //判断登录状态
			this.initData();
			this.getUserUp();
		},
		onLoad(option) {
			
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
			dumpNotice() {
				//跳转公告
				uni.navigateTo({
					url: '/pages/news/notice'
				});
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
			dumpInfo(id) {
				uni.navigateTo({
					url: '/pages/news/info?id=' + id
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
			getPage() {
				var _this = this;
				uni.showLoading({
					title: '数据查询中'
				});
				_this.$request.news
					.article({
						page: _this.PageNo
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
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						_this.showLoadMore = false;
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常')
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
									index: 3,
									text  : ''
								})
							}
						}
					});
			}
		}
	};
</script>

<style>
	.t_se {
		width: 690upx;
		margin: 0 auto;
		margin-top: 10upx;
	}

	.t_main {
		width: 750upx;
		margin: 0 auto;
		margin-top: 30upx;
		clear: both;
	}

	.t_item {
		width: 680upx;
		margin: 0 auto;
		margin-top: 20upx;
		border-bottom: 1upx solid #eaeaec;
		clear: both;
		height: 175upx;
	}

	.t_item .t_img {
		width: 150upx;
		height: 150upx;
		float: left;
		margin: 10upx 30upx 0 0;
	}

	.t_item .t_img image {
		width: 130upx;
		height: 130upx;
		border-radius: 20upx;
		margin-left: 8upx;
	}

	.t_b {
		margin: 30upx 0 0 0;
	}

	.t_b .t_r_t {
		color: #31343d;
		font-size: 28upx;
		height: 45upx;
		line-height: 45upx;
		overflow: hidden;
		width: 280upx;
		float: left;
		margin-bottom: 20upx;
		margin-top: 10upx;
	}

	.t_b .t_r_d {
		color: #999a9f;
		font-size: 20upx;
		height: 45upx;
		line-height: 45upx;
		overflow: hidden;
		float: right;
		margin-top: 5upx;
	}

	.t_b .t_r_i {
		color: #2e303c;
		font-size: 20upx;
		width: 500upx;
		height: 70upx;
		line-height: 35upx;
		overflow: hidden;
	}

	.uni-loadmore {
		clear: both;
	}


	.inv-h-w {
		background-color: #ffffff;
		height: 125upx;
		width: 750upx;
		display: flex;
		justify-content: center;
		border-bottom: 25upx solid #f5f5f5;
	}

	.inv-h {
		font-size: 30upx !important;
		text-align: center;
		color: #98979c;
		height: 100upx;
		line-height: 100upx !important;
		width: 100upx;

	}

	.inv-h:nth-child(1) {
		margin-right: 180upx;
	}

	.inv-h-se {
		color: #31303e;
		border-bottom: 4upx solid #31303e;
		height: 100upx;
	}

	.c-main {
		width: 670upx;
		margin: 0 auto;
		margin-top: 30upx;
	}

	.c-main .c-ad {
		width: 670upx;
		border-radius: 20upx;
		margin-top: 20upx;
	}

	.c-title {
		font-size: 30upx;
		color: #000000;
		font-weight: 600;
		margin-top: 15upx;
	}
</style>
