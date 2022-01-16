<template>
	<view class="container">
		<view class="t_top">
			<view class="t_se">
				<uni-search-bar radius="100" placeholder="请输入关键词" cancelButton="none" @confirm="search" />
			</view>
			<view class="time_str">{{ countDownObject.countDownStr }}</view>
			<uni-pagination title="标题文字" show-icon="true" :pageSize="PageSize" :total="PageTotal" :current="PageNo" @change="handleChange"></uni-pagination>
		</view>
		<view class="t_main">
			<view class="t_item t_miss" v-for="(item, index) in mainItem" :key="index" @click="dumpInfo(item.id)">
				<view class="t-status t-status-a" v-if="countDownObject.count_down>0">待开始</view>
				<view class="t-status t-status-b" v-else-if="countDownObject.count_down==-2">已结束</view>
				<view class="png-status" v-else-if="item.purchase_state==1">
					<image src="../../static/images/sell-out-r.png" mode="widthFix"></image>
				</view>	
				<view class="t-status t-status-b" v-else-if="countDownObject.count_down==-1">进行中</view>
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
				PageSize: 30,
				PageTotal : 0,
				mainItem: [
					
				],
				keyWords: '' ,//搜索关键词
				countDownObject : {
					countDownStr : '',
					count_down : 0
				},
				timer : null,
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
			this.getStartTime();
		},
		onHide(){
			console.log(this.timer)
			if(this.timer){
				clearInterval(this.timer);
			}
		},
		beforeDestroy(){
			console.log(this.timer)
			if(this.timer){
				clearInterval(this.timer);
			}
		},
		onLoad(option) {
			if (option.type) this.type = option.type;
			this.initData();
			// this.getStartTime();
		},
		onUnload() {
			console.log('页面卸载');
			if(this.timer){
				clearInterval(this.timer);
			}

			this.PageNo = 1;
			this.mainItem = [];
			this.loadMoreText = '加载更多';
			this.showLoadMore = false;
		},
		onBackPress(e){
		  // console.log("监听返回按钮事件",e);
		  // uni.navigateTo({
		  //   url:"/pages/details/details?type=2"
		  // })
		  // // 此处一定姚要return为true，否则页面不会返回到指定路径
		  // return true;
		},
		// onReachBottom() {
		// 	//下拉加载
		// 	this.showLoadMore = true;
		// 	setTimeout(() => {
		// 		this.setListData();
		// 	}, 300);
		// },
		onPullDownRefresh() {
			//上拉刷新
			this.initData();
		},
		methods: {
			handleChange(params) {
				this.PageNo = params.current;
				this.getPage();
			},
			countdown() {
				let that = this;
				that.timer = setInterval(function() {
					if (that.countDownObject.count_down > 0) {
						that.countDownObject.count_down -= 1;
						let t = that.countDownObject.count_down;
						let day = Math.floor(t / 86400);
						let hour = Math.floor((t / 3600) % 24);
						let min = Math.floor((t / 60) % 60);
						let sec = Math.floor((t) % 60);
						day = day < 10 ? "0" + day : day;
						hour = hour < 10 ? "0" + hour : hour;
						min = min < 10 ? "0" + min : min;
						sec = sec < 10 ? "0" + sec : sec;
						let format = "";
						if(day == '00'){
							format = `待开始：${hour}时${min}分${sec}秒`;
						}else{
							format = `待开始：${day}天${hour}时${min}分${sec}秒`;
						}
						that.$set(that.countDownObject,'countDownStr',format)
					} else {
						// 进行判断 如果数据内所有的倒计时已经结束，那么结束定时器， 如果没有那么继续执行定时器
						clearInterval(that.timer);
						if (that.countDownObject.count_down == -1) {
							that.$set(that.countDownObject,'countDownStr','进行中')
						} else if (that.countDownObject.count_down == -2) {
							that.$set(that.countDownObject,'countDownStr','已结束')
						}
					}
					// that.$set(that.countDownObject,'countDownStr',that.countDownObject.countDownStr)
					console.log(that.countDownObject)
				}, 1000);
			},
			getStartTime(){
				let _this = this;
				_this.$request.product
					.getTime({
						class_id: _this.type,
					}).then((res)=>{
						console.log(res.data)
						res.data.countDownStr = '';
						_this.countDownObject = res.data;
						// _this.countDownObject.countDownStr = '';
						// this.startTime = res.data.count_down;
						_this.countdown();
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
				uni.showLoading({
					title: '数据查询中'
				});
				_this.$request.product
					.getGoodsList({
						page: _this.PageNo,
						class_id: _this.type,
						keyWords: _this.keyWords
					})
					.then(data => {
						uni.hideLoading();
						
						if(data.status == 1){
							_this.mainItem = data.data
						}else {
							_this.mainItem = []
						}
						console.log(data)
						this.PageTotal = data.count;
						// if (data.status == 1) {
							
						// 	_this.mainItem = _this.mainItem.concat(data.data);
						// 	if (data.data.length < _this.PageSize) {
						// 		this.loadMoreText = '没有更多数据了';
						// 		_this.isMore = false;
						// 	} else {
						// 		_this.showLoadMore = false;
						// 		_this.isMore = true;
						// 	}
						// } else {
							
						// 	_this.showLoadMore = false;
						// 	uni.showToast({
						// 		icon: 'none',
						// 		title: data.msg
						// 	});
						// }
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
	page {
		height: 100%;
	}
	.t_top {
		position: sticky;
		top: 44px;
		background-color: #fff;
		z-index: 99999;
		padding: 10upx 0;
	}
	.t_se {
		width: 690upx;
		margin: 0 auto;
		/* margin-top: 10upx; */
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
		position: relative;
		/* z-index: 999; */
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
	.time_str {
		text-align: center;
		font-size: 32upx;
		font-weight: bold;
		color:#e0664f !important
	}
	.png-status {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		width: 300upx;
		height: 300upx;
		z-index: 100;
	}
</style>
