<template>
	<view class="container">
		<view v-if="isRead">
			<view class="t_se">
				<uni-search-bar radius="100" placeholder="请输入关键词" cancelButton="none" @confirm="search" />
			</view>
			<view class="t_main">
				<view class="t_item" v-for="(item, index) in mainItem" :key="index" @click="dumpInfo(item.id)">
					<view class="t_img">
						<image :src="item.goods_imgs" mode="aspectFill"></image>
					</view>
					<view class="t_b">
						<view class="t_r_t">{{ item.goods_name }}</view>
						<view class="t_r_price red">{{item.money}}元宝</view>
					</view>
				</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{ loadMoreText }}</view>
			<view class="dbh"></view>
		</view>
		<view class="t_ask" v-else>
			{{loadMoreText}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isRead: false, //银元宝数，元宝数不够1000时无权访问
				loadMoreText: '数据加载中...',
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
		},
		onLoad(option) {
			this.getUserUp();
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
			getPage() {
				//加载数据
				var _this = this;
				if (!_this.isRead) {
					_this.PageNo = 1;
					_this.mainItem = [];
					_this.keyWords = '';
					_this.loadMoreText = '您的银元宝未达到最低进入标准：1000银元宝';
					return false;
				}
				uni.showLoading({
					title: '数据查询中'
				});
				_this.$request.shop
					.getGoodsList({
						page: _this.PageNo,
						keyWords: _this.keyWords
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
			},
			getUserUp() {
				//获取是否可以升级
				var _this = this;
				_this.$request.user
					.getUserData({})
					.then(data => {
						if (data.status == 1) {
							_this.isRead = data.data.gold_balance >= 1000;
							_this.initData();
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
	.t_se {
		width: 690upx;
		margin: 0 auto;
		margin-top: 10upx;
	}

	.t_main {
		width: 690upx;
		margin: 0 auto;
		border-top: 1px solid #eeeeee;
		margin-top: 30upx;
		clear: both;
	}

	.t_item {
		width: 330upx;
		float: left;
		margin-top: 20upx;
	}

	.t_item:nth-child(even) {
		float: right;
	}

	.t_item .t_img {
		width: 330upx;
		height: 330upx;
	}

	.t_item .t_img image {
		width: 330upx;
		height: 330upx;
	}

	.t_b {
		margin: 15upx 0;
	}

	.t_b .t_r_t {
		color: #303241;
		font-size: 28upx;
		width: 330upx;
		height: 45upx;
		line-height: 45upx;
		overflow: hidden;
	}

	.t_b .t_r_i {
		color: #96979c;
		font-size: 20upx;
		width: 330upx;
		height: 35upx;
		line-height: 35upx;
		overflow: hidden;
	}
	
	.t_b .t_r_price{
		font-size: 28upx;
		width: 330upx;
		height: 45upx;
		line-height: 45upx;
		overflow: hidden;
		font-weight: 600;
	}

	.uni-loadmore {
		clear: both;
	}

	.t_ask {
		width: 100%;
		text-align: center;
		padding-top: 500upx;
		font-size: 27upx;
		color: #666666;
	}
</style>
