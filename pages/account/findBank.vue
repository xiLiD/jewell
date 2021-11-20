<template>
	<view class="wrapper-bank">
		<view class="bank-menu">
			<view class="bank-item" v-for="(item,index) in bankList" :index="index">
				<view class="bank-info">
					<view class="bank-name">{{item.blank_name}}</view>
					<view class="bank-address">{{item.blank_address}}</view>
					<view class="bank-num">
						<text v-for="(childItem,childIndex) in item.blankArr">{{childItem.value}}</text>
					</view>
				</view>
			</view>
<!-- 			<view class="bank-item">
				<view class="bank-name">招商银行</view>
				<view class="bank-num">56491989196</view>
			</view>
			<view class="bank-item">
				<view class="bank-name">招商银行</view>
				<view class="bank-num">56491989196</view>
			</view>
			<view class="bank-item">
				<view class="bank-name">招商银行</view>
				<view class="bank-num">56491989196</view>
			</view> -->
			<view class="bank-add" @click="toAdd">
				<view v-if="bankList.length == 0">
					<image src="../../static/images/add.png" mode="widthFix"></image>
					<text>添加银行卡</text>
				</view>
				<view v-else>
					<image src="../../static/images/update.png" mode="widthFix"></image>
					<text>修改银行卡</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data(){
			return {
				bankList : []
			}
		},
		onLoad(){
			this.getbank()
		},
		methods : {
			getNumber(arr){
				console.log(arr)
				let newArr = []
				arr.forEach((item)=>{
					let len = item.blank_num.toString().split('');
					console.log(len)
					let str = '';
					let curNum = Math.round(len.length/4);
					console.log(curNum)
					for(var i=1;i<curNum;i++){
						// if(i < len.length - 4){
						// 	if(i/4==0){
						// 		newArr.push({
						// 			value : '****'
						// 		})
						// 	}else {
								// let num = i%4;
								// let star = ''
								// for(var j in num){
								// 	star += '*'
								// }
								// newArr.push({
								// 	value : star
								// })
						// 		// str += star + '&nbsp'
						// 	}
							
						// }else {		
						// 	str += len[i]
						// }
						
						console.log(i*4,len.length -4 )
						if(i*4 < len.length -4){
							newArr.push({
								value : '****'
							})
						}else {
							let num = len.length - 4 - (i-1)*4;
							console.log(num)
							let star = ''
							for(var j=0;j<num;j++){
								star += '*'
							}
							newArr.push({
								value : star
							})
							// 最后几位
							newArr.push({
								value : item.blank_num.slice(-4)
							})
						}
						// newArr.push({
						// 	value : str
						// })
					}
					// str.split(\)
					console.log(newArr)
					item.blankArr = newArr
					// item.blank_num = str
				})

				return arr;
			},
			toAdd() {
				console.log(this.bankList)
				if(this.bankList.length != 0){
					uni.navigateTo({
						url : '/pages/account/setBank?blank_address=' +this.bankList[0].blank_address +'&blank_name=' + this.bankList[0].blank_name
						+ '&blank_num=' + this.bankList[0].blank_num + '&user_name=' +this.bankList[0].user_name  
					})
					return
				}
				uni.navigateTo({
					url : '/pages/account/setBank'
				})
			},
			getbank() {
				//获取账户
				var _this = this;
				_this.$request.user
					.findblank({})
					.then(data => {
						if (data.status == 1) {
							let arr = [];
							if(!data.data){
								return;
							}
							arr.push(data.data);
							arr = this.getNumber(arr);
							_this.bankList = arr;
							
							// _this.blank_name = data.msg.blank_name;
							// _this.bank_number = data.msg.bank_number;
							// _this.bank_qutlets = data.msg.bank_qutlets;
						} else {
							
							// uni.showToast({
							// 	icon: 'none',
							// 	title: data.msg
							// });
						}
					})
					.catch(err => {
						//消息异常
						uni.showToast({
							icon: 'none',
							title: '数据加载异常'
						});
					});
			
			},
		}
	}
</script>

<style>
/* 	.pages-account-findBank {
		background-color: #000;
	} */
	.wrapper-bank {
		height: 100%;
		
	}
	.bank-menu {
		padding: 20upx 20upx;
		box-sizing: border-box;
		width: 100%;

	}
	.bank-item {
		border-radius: 10upx;
		padding: 10upx 20upx 10upx;
		color:#fff;
		margin-top: 10upx;
		/* background-color: rgba(200,79,86); */
		background: linear-gradient(to right, rgba(200,79,86,.8), rgba(199,78,88,.8));
	}
	.bank-info {
		padding-left: 60upx;
	}
	.bank-name {
		font-size: 30upx;
		letter-spacing: 2upx;
	}
	.bank-address {
		font-size: 24upx;
		color:rgba(255,255,255,.6);
		/* margin-top: 10upx; */
	}
	.bank-num {
		font-size: 40upx;
		margin-top:60upx;
		letter-spacing: 4upx;
		/* text-align: center; */
	}
	.bank-num text:nth-child(1) {
		margin-left: 0upx;
	}
	.bank-num text {
		margin-left: 30upx;
		display: inline-block;
	}
	.bank-add {
		background-color: rgba(0,0,0,.8);
		display: flex;
		align-items: center;
		border-radius: 10upx;
		padding: 20upx 20upx;
		margin-top: 20upx;
	}
	.bank-add >view {
		display: flex;
		align-items: center;
	}
	.bank-add uni-image {
		width: 40upx;
		height: 40upx;
	}
	.bank-add text {
		color:#fff;
		margin-left: 20upx;
	}
</style>
