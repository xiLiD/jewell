<script>
	// #ifdef APP-PLUS
	var domModule = weex.requireModule('dom');
	domModule.addRule('fontFace', {
		fontFamily: 'uniicons',
		src: "url('/static/uni.ttf')"
	});
	// #endif

	export default {
		onLaunch: function(e) {
			//记录推荐码
			if (e.query.invitation) {
				uni.setStorage({
					key: 'invitation',
					data: e.query.invitation
				});
				console.log(e.query.invitation + '---1')
			}

			// #ifdef APP-PLUS
			// plus.screen.lockOrientation('portrait-primary'); //锁屏
			// // 检测升级
			// if (plus.os.name != 'iOS') {
			// 	this.$request.common
			// 		.AppUpdate({
			// 			source: plus.runtime.appid,
			// 			AppVersions: plus.runtime.versionCode,
			// 			source: 'android'
			// 		})
			// 		.then(data => {
			// 			if (data.status == 1) {
			// 				if (data.info.AppCode > plus.runtime.versionCode) {
			// 					let openUrl = plus.os.name === 'iOS' ? '' : data.DownloadUrl;
			// 					// 提醒用户更新
			// 					uni.showModal({
			// 						title: '更新提示',
			// 						content: data.appLog ? data.appLog : '是否选择更新',
			// 						success: showResult => {
			// 							if (showResult.confirm && openUrl) {
			// 								plus.runtime.openURL(openUrl);
			// 							}
			// 						}
			// 					});
			// 				}
			// 			}
			// 		});
			// }
			// #endif
		},
		onHide: function() {
			//console.log('App Hide')
		},
		globalData: {
			test: ''
		}
	};
</script>
<style lang="scss">
	/*每个页面公共css */
	// @import './common/uni.css';
	@import './common/colorui/icon.css';
	@import './common/colorui/main.css';
	@import './common/base.scss';
	@import '/static/css/common.css';
	@import '/static/font/iconfont.css';
	// @import 'https://at.alicdn.com/t/font_2910543_rbzgn7v8nz.css';

	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #ffffff;
		height: 99%;
		font-size: 28rpx;
		line-height: 1.8;
	}

	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.uni-header-image {
		width: 100px;
		height: 100px;
	}

	.uni-hello-text {
		color: #7a7e83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #fff;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}

	/* #endif*/
	
</style>
