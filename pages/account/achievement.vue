<template>
	<view class="container">
		<view class="t-main">
			<view class="main-top">
				<view>本月个人业绩</view>
				<view>￥{{money}}</view>
			</view>
			
			<view class="main-title">
				<view>时间</view>
				<view>新增业绩</view>
			</view>
			
			<view class="main-item" v-for="(item, index) in mainItem" :key="index">
				<view>{{item.Date}}</view>
				<view>{{item.Num}}</view>
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
				PageNo: 0,
				PageSize: 10,
				mainItem: [{
					Date: '2021-04-10 13:22',
					Num: "￥3"
				}, {
					Date: '2021-04-10 13:22',
					Num: "￥3"
				}, {
					Date: '2021-04-10 13:22',
					Num: "￥3"
				}, {
					Date: '2021-04-10 13:22',
					Num: "￥3"
				}, {
					Date: '2021-04-10 13:22',
					Num: "￥3"
				}, {
					Date: '2021-04-10 13:22',
					Num: "￥3"
				}],
				money:100,//本月个人业绩
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
			//this.initData();

		},
		onUnload() {
			(this.PageNo = 0), (this.mainItem = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
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
					this.PageNo = 0;
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
	
	.main-top{
		width: 750upx;
		background-color: #FFFFFF;
		height: 110upx;
		line-height: 110upx;
		margin-bottom: 10upx;
	}
	.main-top view{
		float: left;
		height: 110upx;
		line-height: 110upx;
		padding: 0 50upx;
		font-size: 32upx;
	}
	.main-top view:nth-child(2){
		float: right;
		color: #b43c58;
		font-weight: 600;
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
