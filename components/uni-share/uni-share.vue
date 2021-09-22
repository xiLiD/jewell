<template>
	<!-- 底部分享弹窗 -->
	<uni-popup ref="showshare" type="bottom" @change="popupChange">
		<view class="uni-share">
			<view class="uni-share-title">
				分享到
				<view class="uni-navigate-icon uni-icon lo_r"  @click="cancelShare">&#xe460;</view>
			</view>
			<view class="uni-share-content">
				<view v-for="(item, index) in bottomData" :key="index" class="uni-share-content-box" @click="share(item.name)">
					<view class="uni-share-content-image"><image :src="item.icon" class="content-image" mode="widthFix" /></view>
					<text class="uni-share-content-text">{{ item.text }}</text>
				</view>
			</view>
			<text class="uni-share-btn" @click="cancelShare">取消分享</text>
		</view>
	</uni-popup>
</template>

<script>
// #ifdef H5
let wx = require('jweixin-module');
// #endif
export default {
	name: 'uni-share',
	props: {
		range: {
			type: Object
		}
	},
	data() {
		return {
			bottomData: [
				{
					text: '微信好友',
					icon: '/static/images/grid-2.png',
					name: 'WXSceneSession'
				},
				{
					text: '微信朋友圈',
					icon: '/static/images/grid-1.png',
					name: 'WXSenceTimeline'
				}
			],
			shareData: {
				title: '',
				imgUrl: '',
				intro: '',
				url: ''
			},
			show: false
		};
	},
	created() {
		// #ifdef H5
		this.weiShare();
		// #endif

		let pages = getCurrentPages();
		let route = pages[pages.length - 1].route;
	},
	methods: {
		openShare() {
			if (this.show) {
				this.$refs['showshare'].close();
			} else {
				this.$nextTick(() => {
					this.$refs['showshare'].open();
				});
			}
		},
		cancelShare() {
			this.$refs['showshare'].close();
		},
		popupChange(e) {
			if (e.show) {
				this.$emit('change', {
					show: true
				});
				this.show = true;
			} else {
				this.$emit('change', {
					show: false
				});
				this.show = false;
			}
		},
		async weiShare() {
			var _this = this;
			_this.shareData = _this._props.range;
			let windowurl = window.location.href.split('#')[0];
			//处理登录
			var user = uni.getStorageSync('uerInfo');
			if (user != '') {
				var uid = user.userId;
				if (this.shareData.url.toLowerCase().indexOf('userids') < 0) {
					//没有包含分享内容
					if (this.shareData.url.indexOf('?') > 0) {
						this.shareData.url += '&userIds=' + uid;
					} else {
						this.shareData.url += '?userIds=' + uid;
					}
				}
			}

			_this.$request.common.GetWeiShare({ url: windowurl }).then(data => {
				if (data.status == 1) {
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: data.datas.AppId, // 必填，公众号的唯一标识
						timestamp: data.datas.Timestamp, // 必填，生成签名的时间戳
						nonceStr: data.datas.NonceStr, // 必填，生成签名的随机串
						signature: data.datas.Signature, // 必填，签名，见微信开发文档附录1
						jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage']
					});
					wx.ready(function() {
						//分享至微信好友
						wx.updateAppMessageShareData({
							title: _this.shareData.title, // 分享标题
							desc: _this.shareData.intro, // 分享描述
							link: _this.shareData.url, // 分享链接
							imgUrl: _this.shareData.imgUrl, // 分享图标
							type: '', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function() {
								// 用户点击了分享后执行的回调函数
							}
						});
						//分享朋友圈
						wx.updateTimelineShareData({
							title: _this.shareData.title, // 分享标题
							link: _this.shareData.url, // 分享链接
							imgUrl: _this.shareData.imgUrl, // 分享图标
							success: function() {
								// 用户确认分享后执行的回调函数
								console.log('进入分享');
							},
							cancel: function() {
								// 用户取消分享后执行的回调函数
								console.log('取消分享');
							}
						});
					});
					wx.error(function(res) {
						// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
						console.log('验证失败');
					});
				}
			});
		},
		async share(name) {
			this.shareData = this._props.range;
			if (!this.shareData.title) {
				this.$tools.toast('分享内容不能为空')
				return;
			}

			if (!this.shareData.url) {
				this.$tools.toast('分享链接不能为空')
				return;
			}

			if (!this.shareData.imgUrl) {
				this.$tools.toast('分享图片不能为空')
				return;
			}

			//处理登录
			var user = uni.getStorageSync('uerInfo');
			if (user != '') {
				var uid = user.userId;
				if (this.shareData.url.toLowerCase().indexOf('userids') < 0) {
					//没有包含分享内容
					if (this.shareData.url.indexOf('?') > 0) {
						this.shareData.url += '&userIds=' + uid;
					} else {
						this.shareData.url += '?userIds=' + uid;
					}
				}
			}
			let shareOPtions = {
				provider: 'weixin',
				scene: name && name === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏
				type: 0,
				success: e => {
					this.$tools.toast('已分享')
				},
				fail: e => {
					this.$tools.toast(e.errMsg)
				},
				complete: function() {
					console.log('分享操作结束!');
				}
			};

			shareOPtions.summary = this.shareData.intro;
			shareOPtions.imageUrl = this.shareData.imgUrl;
			shareOPtions.title = this.shareData.title;
			shareOPtions.href = this.shareData.url;

			if (shareOPtions.type === 0 && plus.os.name === 'iOS') {
				//如果是图文分享，且是ios平台，则压缩图片
				//shareOPtions.imageUrl = await this.compress();
			}
			uni.share(shareOPtions);
		}
	}
};
</script>

<style>
/* 底部分享 */
.uni-share {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: column;
	/* #endif */
	background-color: #fff;
}

.uni-share-title {
	line-height: 60rpx;
	font-size: 24rpx;
	padding: 15rpx 0;
	text-align: center;
}

.uni-share-content {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 15px;
}

.uni-share-content-box {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	align-items: center;
	width: 200rpx;
}

.uni-share-content-image {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 60rpx;
	height: 60rpx;
	overflow: hidden;
	border-radius: 10rpx;
}

.content-image {
	width: 60rpx;
	height: 60rpx;
}

.uni-share-content-text {
	font-size: 26rpx;
	color: #333;
	padding-top: 5px;
	padding-bottom: 10px;
}

.uni-share-btn {
	height: 90rpx;
	line-height: 90rpx;
	font-size: 14px;
	border-top-color: #f5f5f5;
	border-top-width: 1px;
	border-top-style: solid;
	text-align: center;
	color: #666;
}
.lo_r {
	position: absolute;
	right: 10upx;
	color: #666;
}
</style>
