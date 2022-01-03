<template>
	<view class="modal-box">
		<view class="modal-back" @click="setClose"></view>
		<view class="modal-contain">
			<view class="modal-title space-middle">奖品介绍</view>
			<view class="gift-image">
				<image :src="url + giftDetails.gift_img" mode="widthFix"></image>
			</view>
			<view class="modal-desc space-mini">
				<view>奖品名: {{ giftDetails.gift_name }} </view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/config/config.js'
	export default {
		props : {
			giftDetails : Object
		},
		data() {
			return {
				url : config.files
			}
		},
		methods: {
			setClose() {
				console.log('关闭')
				this.$emit('closeDialog')
			}
		}
	}
</script>

<style scoped>
.modal-box {
	padding: 10upx 20upx;
	box-sizing: border-box;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal-back {
	position: fixed;
	/* top: 44px; */
	left: 0;
	width: 100vw;
	height: 100vh;

	background-color: rgba(0,0,0,.7);
}
.modal-contain {
	width : 650upx;
	height: 450upx;
	overflow: hidden;
	border-radius: 20upx;
	background-color: #fff;
	box-shadow: 0 0 5px 1px #999;
	z-index: 99;
	position: relative;
	animation: runBigger .3s linear;
	padding-bottom: 20upx;
	box-sizing: border-box;
}
@keyframes runBigger{
	0%{
		transform: scale(0)
	}
	75%{
		transform: scale(1.1)
	}
	100%{
		transform: scale(1)
	}
}
/* .space-mini {
	letter-spacing: 1px;
}
.space-middle {
	letter-spacing: 2px;
} */
.modal-title {
	font-size: 30upx;
	font-weight: bold;
	width: 100%;
	text-align: center;
	padding: 10upx 30upx;
	color:#fff;
	background-color: rgb(244,194,84);
	margin: 0 auto;
	overflow: hidden;
}
.modal-desc {
	margin-top: 20upx;
	color: #ababab;
	line-height: 1.5;
	text-align: center;
	padding: 0 30upx;
}
.gift-image {
	width: 400upx;
/* 	height: 300upx; */
	margin: 40upx auto;
}
.gift-image image {
	width: 100%;
	height: 100%;
}
</style>
