<template>
	<view class="container">
		<view class="main">
			<view class="title">上传收款凭证</view>
			<view class="main-img">
				<view class="upimg" @tap="chooseImage(0)" v-if="cardUrl">
					<image :src="cardUrl" class="m-img"></image>
				</view>
				<view class="upimg" @tap="chooseImage(0)" v-else>
					<text class="uni-navigate-icon uni-icon m-ico">&#xe468;</text>
					<view class="img-intro">选择收款凭证</view>
				</view>
			</view>
			<view class="f fc fw"><button class="blt-botton" @click="upload" :disabled="isSubmit">已付款,提醒卖家收款</button>
			</view>
		</view>
	</view>
</template>

<script>
	import permision from '@/common/permission.js';
	import config from '@/config/config';
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	export default {
		data() {
			return {
				order_id: 0,
				cardUrl: '', //证件前
				isSubmit: false,
				payTypeIndex: 0, //支付方式
				isPerfect: '' //是否完善信息
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			if (option.orderId != '') this.order_id = option.orderId;
		},
		methods: {
			chooseImage: async function(type) {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				let status = await this.checkPermission();
				if (status !== 1) {
					return;
				}
				// #endif
				uni.chooseImage({
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					count: 1,
					success: res => {
						this.cardUrl = res.tempFilePaths[0];
					},
					fail: err => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0) {
							this.checkPermission(err.code);
						}
						// #endif
					}
				});
			},
			previewImage: function(e) {
				uni.previewImage({
					current: e,
					urls: [e]
				});
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ?
					await permision.requestIOS('camera') :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: '没有开启权限',
						confirmText: '设置',
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					});
				}

				return status;
			},
			upload() {
				//上传
				var _this = this;
				if (!_this.cardUrl) {
					//消息异常
					uni.showToast({
						icon: 'none',
						title: '请选择收款凭证图片'
					});
					return false;
				}
				_this.isSubmit = true;
				uni.showLoading({
					title: '上传中'
				});
				_this.uploadFile('file', _this.cardUrl);
			},
			uploadFile(name, file) {
				var _this = this;
				//文件上传
				var user = uni.getStorageSync('uerInfo');
				const uploadTask = uni.uploadFile({
					url: config.API_SITE + '/gzh/Pay/addYine',
					filePath: file,
					name: name,
					formData: {
						token: user.token
					},
					success: function(msg) {
						uni.hideLoading();
						_this.isSubmit = false;
						var data = JSON.parse(msg.data);
						if (data.status == 1) {
							_this.addPay(data.data);
						} else {
							uni.showToast({
								icon: 'none',
								title: data.msg
							});
						}
					},
					fail: res => {
						_this.isSubmit = false;
						uni.showToast({
							icon: 'none',
							title: '上传失败'
						});
					}
				});
			},
			addPay(url) {
				var _this = this;
				_this.$request.order
					.setPayDocument({
						order_id: _this.order_id,
						order_state: 2,
						zfb_imgs: url
					})
					.then(data => {
						uni.hideLoading();
						if (data.status == 1) {
							uni.showToast({
								icon: 'none',
								title: '确认成功'
							});
							uni.navigateTo({
								url: '/pages/order/info?orderId=' + _this.order_id
							});
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

<style lang="scss" scoped>
	@import '@/static/css/from.scss';

	.topLable {
		color: #7a7e81;
		padding: 0 30upx;
		line-height: 40upx;
		margin: 20upx 0;
		font-size: 25upx;
	}

	.main {
		width: 100%;
		background-color: #ffffff;
		padding: 20upx 30upx;
	}

	.title {
		font-weight: 600;
		font-size: 35upx;
	}

	.intro {
		font-size: 25upx;
		color: #7a7e81;
	}

	.main-img {
		margin-top: 25upx;
	}

	.upimg {
		border: 1px solid #f1f1f1;
		margin-top: 20upx;
		text-align: center;
		background-color: #fcfcfc;
		width: 690upx;
		height: 390upx;
	}

	.m-ico {
		color: #cfcfcf;
		font-size: 130upx;
		margin-top: 70upx;
	}

	.m-img {
		width: 690upx;
		height: 390upx;
	}

	.blt-botton {
		color: #f8d79f;
		background-color: #201f24;
		margin-bottom: 19upx;
		width: 100%;
		text-align: center;
		height: 86upx;
		line-height: 86upx;
		border-radius: 11upx;
		font-size: 30upx;
		margin-top: 50upx;
	}


	.main-pay .pay-title {
		border-left: 7upx solid #c13c3e;
		height: 35upx;
		line-height: 35upx;
		padding-left: 20upx;
		font-weight: 600;
		font-size: 32upx;
	}

	.pay-type {
		height: 80upx;
		line-height: 80upx;
		margin-top: 20upx;
	}

	.type-name {
		float: left;
		width: 300upx;
		font-size: 32upx;
		height: 80upx;
		line-height: 80upx;
		color: #b1b1b1;
	}

	.type-r {
		float: right;
		width: 300upx;
		text-align: right;
		height: 80upx;
		line-height: 80upx;
	}

	.type-r text {
		font-size: 36upx;
	}

	.picker {
		position: absolute;
		margin-top: 0;
		left: 0;
		width: 100%;
		height: 80upx;
		box-sizing: border-box;
	}

	.main-item {
		height: 88upx;
		line-height: 88upx;
		border-bottom: 1px solid #f6f6f6;
		width: 710upx;
		margin: 0 auto;
		font-size: 22upx;
	}

	.main .main-l {
		float: left;
		width: 150upx;
		height: 88upx;
		line-height: 88upx;
		color: #b1b1b1;
	}

	.main .main-r {
		height: 88upx;
		line-height: 88upx;
	}

	.t-input {
		margin: 0 0 3.75upx 0;
		height: 80upx;
		line-height: 80upx;
		font-size: 26upx;
		text-align: right;
		padding-right: 20upx;
		color: #333333;
	}
</style>
