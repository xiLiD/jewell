<template>
	<view class="container">
		<view class="main">
			<view class="pay-title">收款码</view>
			<view class="pay-type">
				<view class="type-name">支付方式</view>

				<picker class="picker" @change="payTypeChange" :value="payTypeIndex" :range="payItem" range-key="Title">
					<!-- #ifdef MP-WEIXIN -->
					<input :value="payItem[payTypeIndex].Title" disabled style="color: transparent;" />
					<!-- #endif -->
				</picker>
				<view class="type-r">{{payMain.Title}}<text class="uni-icon">&#xe470;</text></view>
			</view>
			<view class="main-item">
				<view class="main-l">收款账户</view>
				<view class="main-r red"><input type="text" class="t-input" name="accountNumber"
						v-model="payMain.accountNumber" placeholder="请输入收款账户" /></view>
			</view>

			<view class="title">上传{{payMain.Title}}收款码</view>
			<view class="main-img">
				<view class="upimg" @tap="chooseImage(0)" v-if="cardUrl">
					<image :src="cardUrl" class="m-img"></image>
				</view>
				<view class="upimg" @tap="chooseImage(0)" v-else-if="payMain.ImgUrl">
					<image :src="payMain.ImgUrl" class="m-img"></image>
				</view>
				<view class="upimg" @tap="chooseImage(0)"  v-else>
					<text class="uni-navigate-icon uni-icon m-ico">&#xe468;</text>
					<view class="img-intro">选择{{payMain.Title}}收款码</view>
				</view>
			</view>
			<view class="f fc fw"><button class="blt-botton" @click="upload" :disabled="isSubmit">保存</button></view>
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
				cardUrl: '', //证件前
				isSubmit: false,
				payMain: {
					Id: 1,
					Title: "支付宝",
					ImgUrl: "",
					accountNumber: ""
				}, //支付方式
				payItem: [{
					Id: 1,
					Title: "支付宝",
					ImgUrl: "",
					accountNumber: "",
					isLoad: false
				}, {
					Id: 2,
					Title: "微信",
					ImgUrl: "",
					accountNumber: "",
					isLoad: false
				}, {
					Id: 3,
					Title: "银行卡",
					ImgUrl: "",
					accountNumber: "",
					isLoad: false
				}],
				payTypeIndex: 0, //支付方式
				isPerfect: '' //是否完善信息
			};
		},
		onShow() {
			// var user = uni.getStorageSync('uerInfo');
			// if (user == '') {
			// 	// #ifdef APP-PLUS
			// 	uni.reLaunch({
			// 		url: '/pages/member/login?isBack=0'
			// 	})
			// 	// #endif
			// 	// #ifndef APP-PLUS
			// 	uni.reLaunch({
			// 		url: '/pages/member/login?isBack=0'
			// 	})
			// 	// #endif
			// 	return;
			// }
		},
		onLoad(option) {
			if (option.source) this.isPerfect = true;
			var user = uni.getStorageSync('uerInfo');
			this.getshouPay();
		},
		methods: {
			dump(url) {
				uni.navigateTo({
					url: url
				});
			},
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
			isFullImg: function() {
				return new Promise(res => {
					uni.showModal({
						content: '已经有9张图片了,是否清空现有图片？',
						success: e => {
							if (e.confirm) {
								res(true);
							} else {
								res(false);
							}
						},
						fail: () => {
							res(false);
						}
					});
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
			payTypeChange(e) {
				this.payTypeIndex = e.target.value;
				this.payMain.Id = this.payItem[this.payTypeIndex].Id;
				this.payMain.Title = this.payItem[this.payTypeIndex].Title;
				this.payMain.accountNumber = "";
				this.payMain.ImgUrl = "";
				if (this.payItem[this.payTypeIndex].isLoad) {
					this.payMain.ImgUrl = this.payItem[this.payTypeIndex].ImgUrl;
					this.payMain.accountNumber = this.payItem[this.payTypeIndex].accountNumber;
				} else {
					this.getshouPay();
				}
			},
			getshouPay() {
				//获取用户信息
				var _this = this;
				_this.$tools.loading('数据查询中')
				_this.$request.account
					.shouPay({
						type: _this.payMain.Id
					})
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 1) {
							_this.payMain.ImgUrl = data.data.zf_imgse;
							_this.payMain.accountNumber = data.data.zf_name;
							_this.payItem.forEach(item => {
								if (item.Id == _this.payMain.Id) {
									item.ImgUrl = data.data.zf_imgse;
									item.accountNumber = data.data.zf_name;
									item.isLoad = true;
								}
							});
						}
					})
					.catch(err => {
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常');
					});
			},
			upload() {
				//上传
				var _this = this;
				if (!_this.payMain.accountNumber) {
					//消息异常
					_this.$tools.toast('请输入数据收款账户');
					return false;
				}
				if (!_this.cardUrl) {
					//消息异常
					_this.$tools.toast('请选择收款码图片');
					return false;
				}
				_this.isSubmit = true;
				_this.$tools.loading('上传中');
				_this.uploadFile('file', _this.cardUrl);
			},

			uploadFile(name, file) {
				var _this = this;
				//文件上传
				var user = uni.getStorageSync('uerInfo');
				console.log(file)
				const uploadTask = uni.uploadFile({
					url: config.API_SITE + '/gzh/Pay/addYine',
					filePath: file,
					name: name,
					formData: {
						token: user.token
					},
					success: function(msg) {
						_this.$tools.loadingHide();
						_this.isSubmit = false;
						var data = JSON.parse(msg.data);
						if (data.status == 1) {
							_this.addPay(data.data);
						} else {
							_this.$tools.toast(data.msg);
						}
					},
					fail: res => {
						_this.isSubmit = false;
						_this.$tools.toast('上传失败');
					}
				});
			},
			addPay(url) {
				var _this = this;
				_this.$request.account
					.addPay({
						zf_name: _this.payMain.accountNumber,
						type: _this.payMain.Id,
						zf_imgse: url
					})
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 1) {
							_this.$tools.toast('上传成功');
							_this.$store.commit('setUserPay'); //记录状态

							if (_this.isPerfect) { //完善信息，跳转到个人中心
								uni.switchTab({
									url: '/pages/member/center'
								});
							} else {
								_this.getshouPay();
							}

						} else {
							_this.$tools.toast(data.msg);
						}
					})
					.catch(err => {
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常');
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
