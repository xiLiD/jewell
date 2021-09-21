<template>
	<view class="container">
		<view class="t_se">
			<uni-search-bar radius="100" placeholder="请输入关键词" cancelButton="none" @confirm="search" />
		</view>
		<view class="t_main">
			<view class="t_item" v-for="(item, index) in mainItem" :key="index" @click="dumpInfo(item.id)">
				<view class="t-status t-status-a" v-if="item.start_auction==0">待开始 {{}}</view>
				<view class="t-status t-status-b" v-else-if="item.purchase_state==1">已售罄</view>
				<view class="t-status t-status-b" v-else-if="item.purchase_state==2">进行中</view>
				<view class="t_img">
					<image :src="item.goods_imgs" mode="aspectFill"></image>
				</view>
				<view class="t_b">
					<view class="t_r_t">{{ item.goods_name }}</view>
					<view class="t_r_price red">￥{{item.money}}</view>
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
				type: 1,
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
			
		},
		onLoad(option) {
			if (option.type) this.type = option.type;
			this.initData();
			this.getStartTime();
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
			getStartTime(){
				let _this = this;
				_this.$request.product
					.getTime({
						class_id: _this.type,
					}).then((res)=>{
						console.log(res);
					})
			},
			search(res) {
				this.keyWords = res.value;
				this.initData();
			},
			dumpInfo(id) {
				uni.navigateTo({
					url: '/pages/product/info?id=' + id
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
				this.$tools.loading('数据查询中')
				_this.$request.product
					.getGoodsList({
						page: _this.PageNo,
						class_id: _this.type,
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
							// uni.showToast({
							// 	icon: 'none',
							// 	title: data.msg
							// });
							this.$tools.loading(data.msg)
						}
					})
					.catch(err => {
						_this.showLoadMore = false;
						// uni.hideLoading();
						//消息异常
						// uni.showToast({
						// 	icon: 'none',
						// 	title: '数据加载异常'
						// });
						_this.$tools.loadingHide();
						_this.$tools.loading('数据加载异常')
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
	.t-status{
		position: absolute;
		z-index: 100;
		width: 120upx;
		text-align: center;
		height: 50upx;
		line-height: 50upx;
		border-radius: 25upx;
		font-size: 25upx;
		margin:20upx 0 0 200upx;
	}
	.t-status-a{
		background-color: #e2ac35;
		color: #FFFFFF;
		font-weight: 600;
	}
	.t-status-b{
		background-color: #EFEFEF;
		color: #000000;
		font-weight: 600;
	}
</style>
