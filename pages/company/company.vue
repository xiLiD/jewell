<template>
	<view>
		<image src="../../static/images/join_us.jpg" mode="aspectFit"></image>
		<view class='hand' @click="joinClick">
			<view class="pointer"></view>
			<i class="iconfont icon-shouzhi"></i>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			joinClick(){
				this.$request.user
					.setZiAdmin({})
					.then(data => {
						console.log(data)
						if (data.status == 1) {
							this.$tools.toast(data.msg);
							setTimeout(()=>{
								uni.navigateBack({
									url : 'pages/member/center'
								})
							},500)
						}else {
							this.$tools.toast(data.msg);
							
							
						}
					});
			}
		}
	}
</script>

<style scoped>
	uni-page-body {
		height: 100%;
		background-color: rgb(250,181,0);
	}
	uni-page-body > view {
		height: 100%;
		position: relative;
	}
image {
	width: 100%;
	height: 100% ;
}
.hand {
	width:440rpx;
	height: 440rpx;
	position: absolute;

	left:150rpx;
	top: 150rpx;
	z-index:999;
}

.hand .pointer {
	position: absolute;
	width:440rpx;
	height: 440rpx;
	/* background-color: #ffffff; */
	border-radius: 50%;

	left:0;
	top: 0;
}
.hand .pointer::before {
	content: '';
	display: block;
	width:440rpx;
	height: 440rpx;
	border-radius: 50%;
	opacity: .4;
	background-color: #ffffff;
	animation: scale 2s infinite;            
}
 @keyframes scale {
            0% {
                transform: scale(1)
            }
 
            50% {
                transform: scale(1.5)
            }
 
            100% {
                opacity: 0
            }
        }
		@keyframes move {
		           0% {
		               transform: translate(0,0) scale(1);
		           }
		
		           50% {
		               transform: translate(-30rpx,-30rpx) scale(0.9);
		           }
		
		           100% {
		               transform: translate(0,0) scale(1);
		           }
		}
.hand i {
	position: absolute;
	bottom: -50rpx;
	right:-50rpx;
	color:#000;
	font-size: 80rpx;
	animation: move 2s infinite;
}
</style>
