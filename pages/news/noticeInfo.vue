<template>
	<view class="container">
		<view class="main">
			<view class="m-title">{{mainData.title}}</view>
			<view class="m-date">{{getDate(mainData.time*1000)}}</view>
			<rich-text :nodes="mainData.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				mainData: {
					title: "",
					time: null,
					content: ""
				}
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			if (option.id) this.id = parseInt(option.id);
			this.getInfo();
		},
		methods: {
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
			getInfo() {
				//获取材料类别
				var _this = this;
				uni.showLoading({
					title: '数据查询中'
				});
				_this.$request.news
					.msgDetails({
						msg_id: _this.id
					})
					.then(data => {
						uni.hideLoading();
						if (data.status == 1) {
							_this.mainData = data.data;
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
	};
</script>

<style>
	.main {
		width: 710upx;
		margin: 0 auto;
	}

	.m-title {
		line-height: 55upx;
		font-size: 33upx;
		font-weight: 600;
		margin-top: 20upx;
	}

	.m-date {
		font-size: 25upx;
		color: #999999;
		height: 55upx;
		line-height: 55upx;
		margin-bottom: 20upx;
	}
</style>
