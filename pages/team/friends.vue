<template>
	<view class="container">
		<view class="t_se">
			<uni-search-bar radius="100" placeholder="手机号搜索" cancelButton="none" @confirm="search" />
		</view>
		<view class="team-nums">今日团队成交量: {{amount_record}}</view>
		<view class="t-main">
			<view class="main-title">
				<view>ID</view>
				<view>昵称</view>
				<view>会员数</view>
				<view>会员等级</view>
				<view></view>
			</view>
			<view class="main-item" v-for="(item, index) in mainItem" :key="index">
				<view>{{item.id}}</view>
				<view>{{item.user_name}}</view>
				<view>{{item.nub}}</view>
				<view>{{typeItem.find(p=>p.id==item.user_type).name}}</view>
				<view class="color-btn" @click="dump(`/pages/account/reward?id=${item.id}`)">打赏</view>
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
				array: ['佣金', '金元宝'],
				index: 0,
				type: 0, //类别
				loadMoreText: '加载中...',
				showLoadMore: false,
				isMore: true,
				PageNo: 1,
				PageSize: 10,
				amount_record: 0,
				mainItem: [],
				typeItem: [{
					id: 0,
					name: '普通用户'
				}, {
					id: 1,
					name: '青铜分店'
				}, {
					id: 2,
					name: '白银分店'
				}, {
					id: 3,
					name: '黄金分店'
				}, {
					id: 4,
					name: '分公司'
				}],
				keyWords: '' //搜索关键词
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
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
		dump(url) {
			uni.navigateTo({
				url: url
			});
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
				var _this = this;
				uni.showLoading({
					title: '数据查询中'
				});
				_this.$request.user
					.friends({
						page: _this.PageNo
					})
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 1) {
							_this.amount_record = data.data.amount_record
							_this.mainItem = _this.mainItem.concat(data.data.friend);
							if (data.data.friend.length < _this.PageSize) {
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
			},
			bindPickerChange(e){
				console.log(e.detail.value,'11111')
			},
		}
	};
</script>

<style>
	.container,
	page {
		background-color: #f4f5f6;
	}
	.color-btn{
		color: #f37483;
	}
	.team-nums{
		padding: 20upx 30upx;
		color: #f37483;
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

	.main-item view:nth-child(4) {
		color: #cc9f2c;
	}

	.uni-loadmore {
		clear: both;
	}
</style>
