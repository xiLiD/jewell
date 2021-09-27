<template>
	<view class="container">
		<view class="top"></view>
		<view class="main">
			<view class="main-title">我的邀请码</view>
			<view class="main-intro">{{nvitationCode}}</view>
			<tki-qrcode cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :lv="lv" :onval="onval"
				:loadMake="loadMake" :usingComponents="true" @result="qrR" />
			<view class="main-center">
				<view class="center-l" @click="msg('长按二维码图片下载二维码')">保存二维码</view>
				<view class="center-r" @click="copyCode">复制推广链接</view>
			</view>
			<view class="main-bottom">
				<view class="h-l"></view>
				<view class="h-c">分享</view>
				<view class="h-r"></view>
			</view>
			<view class="m-img" @click="msg('请使用右上角微信分享')">
				<image src="/static/images/grid-2.png" class="content-image" mode="widthFix" />
				<image src="/static/images/grid-1.png" class="content-image" mode="widthFix" />
			</view>
			<view class="m-intro">
				<view>1、好友识别二维码通过手机号进行注册</view>
				<view>2、也可分享此页面到微信或QQ邀请好友注册</view>
				<view>3、注册完成后您可得到相应奖励</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	import config from '@/config/config';
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'

	export default {
		data() {
			return {
				nvitationCode: "",
				size: 300, // 二维码大小
				val: '', // 要生成的二维码值
				unit: 'upx', // 单位
				lv: 1, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
			};
		},
		onShow: function(e) {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			var user = uni.getStorageSync('uerInfo');
			this.nvitationCode = user.invitation;
			this.val = config.SITE + '#/pages/member/login?invitation=' + this.nvitationCode;
		},
		methods: {
			copyCode() {
				//复制
				var _this = this;
				setClipboardData(_this.val).then(() => {
					_this.$tools.toast('复制成功')
				})
			},
			msg(msg) {
				let _this = this;
				_this.$tools.toast(msg)
			},
			qrR(result){
			}
		}
	};
</script>

<style>
	.top {
		background: #e93d3d;
		width: 100%;
		height: 300upx;
	}

	.main {
		background: #FFFFFF;
		width: 100%;
		border-radius: 60upx;
		margin-top: -60upx;
		text-align: center;
	}

	.main-title {
		font-size: 45upx;
		font-weight: 600;
		color: #000000;
		line-height: 70upx;
		padding-top: 50upx;
	}

	.main-intro {
		height: 70upx;
		line-height: 70upx;
		font-size: 35upx;
	}

	.qr-code {
		width: 350upx;
		height: 350upx;
		margin-top: 30upx;
	}

	.main-center {
		margin-top: 40upx;
	}

	.main-center view {
		color: #FFFFFF;
		background-color: #32b17e;
		width: 240upx;
		height: 66upx;
		line-height: 66upx;
		text-align: center;
		border-radius: 33upx;
	}

	.center-l {
		float: left;
		margin-left: 67upx;
	}

	.center-r {
		float: right;
		margin-right: 67upx;
	}

	.main-bottom {
		width: 100%;
		clear: both;
		height: 50upx;
		line-height: 50upx;
		padding-top: 40upx;
	}

	.main-bottom view {
		float: left;
	}

	.h-l {
		height: 5upx;
		width: 220upx;
		background-color: #dddddd;
		margin-top: 22upx;
		margin-left: 80upx;
	}

	.h-c {
		color: #969696;
		width: 150upx;
		text-align: center;
	}

	.h-r {
		height: 5upx;
		width: 220upx;
		background-color: #dddddd;
		margin-top: 22upx;
	}

	.m-intro {
		width: 100%;
		clear: both;
		text-align: left;
		text-indent: 100upx;
	}

	.m-img {
		margin-top: 20upx;
		clear: both;
		padding-top: 10upx;
	}

	.m-img image {
		width: 80upx;
		height: 80upx;
	}

	.m-img image:nth-child(1) {
		margin-right: 50upx;
	}
</style>
