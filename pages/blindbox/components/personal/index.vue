<template>
	<view class="modal-box">
		<view class="modal-back" @click="setClose"></view>
		<view class="modal-contain">
			<view class="modal-title space-middle">个人抽奖信息</view>
			<view class="modal-desc space-mini">
				<view>剩余抽奖次数 ： {{ currentInfo.having_num || 0 }}</view>
				<view>已经抽取次数 ： {{ currentInfo.Hasgift || 0 }}</view>
				<view>总抽奖次数 ： {{ currentInfo.Zongnum || 0 }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props : {
			currentInfo : Object
		},
		data() {
			return {
				
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
	border-radius: 20upx;
	background-color: #fff;
	box-shadow: 0 0 5px 1px #999;
	z-index: 99;
	position: relative;
	animation: runBigger .3s linear;
	padding-bottom: 20upx;
	box-sizing: border-box;
	overflow: hidden;
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
	padding: 10upx 30upx;
	width: 100%;
	text-align: center;
	background-color: rgb(231,227,224);
	margin: 0 auto;
}
.modal-desc {
	padding: 0 30upx;
	margin-top: 20upx;
	color: #ababab;
	line-height: 1.5;
}
</style>
