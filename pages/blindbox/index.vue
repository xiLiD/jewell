<template>
	<view>
		<view class="blind-top">
			<view class="blind-back">
				<image src="../../static/images/gift-box-gb.jpg" width="100%" mode="aspectFill"></image>
			</view>
<!-- 			<view class="firstFont current-info font-weight">
				<view>剩余抽奖次数 ： {{ currentInfo.having_num || 0 }}</view>
				<view>已经抽取次数 ： {{ currentInfo.Hasgift || 0 }}</view>
				<view>总抽奖次数 ： {{ currentInfo.Zongnum || 0 }}</view>
			</view> -->
			<view class="blind-top-btn-group space-mini">
				<view class="blind-rule firstFont" @click="showDesc = true">规则</view>
				<view class="blind-case firstFont" @click="clickPersonal">个人抽奖信息</view>
			</view>
			<view class="blind-top-notice">
				<text-notice class="notice-bk" :lists="lists" v-if="lists.length != 0"></text-notice>
			</view>
		</view>
		<view class="blind-info">
			<view class="blind-info-heard space-mini">
				<view :class="['blind-heard-title firstFont',{'active' : activeIndex == 0}]" @click="setClick(0)">盲盒列表</view>
				<view :class="['blind-heard-title firstFont',{'active' : activeIndex == 1}]" @click="setClick(1)">中奖记录</view>
				<view :class="['blind-heard-title firstFont',{'active' : activeIndex == 2}]" @click="setClick(2)">奖品列表</view>
			</view>
			<view class="blind-info-body">
				<view class="blind-info-list" v-show="activeIndex == 0">
					<view class="blind">
						<view :class="['blind-list-image',{'shake' : shakeIndex === index}]" v-for="(item,index) in blindList" :key="item.id"
						 @click="clickShake(index)">
							<image src="../../static/images/gift-box.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="blind-info-record" v-show="activeIndex == 1">
					
					<view class="thead">
						<table border="0" cellpadding="0" cellspacing="0">
							<thead class="record">
								<tr class="space-mini">
									<td class="firstFont">中奖日期</td>
									<td class="firstFont">奖品</td>
									<td class="firstFont">详情</td>
								</tr>
							</thead>
							
						</table>
					</view>
					<view class="tbody">
						<table border="0" cellpadding="0" cellspacing="0">
							<tbody>
								<tr v-for="item in recordList" :key="item.id">
									<td class="firstFont">{{ item.timer }}</td>
									<td class="firstFont">{{ item.gift_name }}</td>
									<td class="firstFont"><span class="goods-details" @click="clickDetails(item)">奖品介绍</span></td>
								</tr>
							</tbody>
						</table>
					</view>	
				</view>
				<view class="blind-info-gifts" v-show="activeIndex == 2">
					<view class="thead">
						<table border="0" cellpadding="0" cellspacing="0">
							<thead>
								<tr class="space-mini">
									<td class="firstFont">奖品图片</td>
									<td class="firstFont">奖品名称</td>
									<td class="firstFont">中奖概率</td>
								</tr>
							</thead>
						</table>
					</view>

					<view class="tbody">
						<table border="0" cellpadding="0" cellspacing="0">
							<tbody>
								<tr v-for="item in giftLists" :key="item.id">
									<td class="firstFont">
										<image :src="url + item.gift_img" mode="aspectFill"></image>
									</td>
									<td class="firstFont">{{ item.gift_name }}</td>
									<td class="firstFont">{{ item.rate }}</td>
								</tr>
							</tbody>
						</table>
					</view>


				</view>
			</view>
		</view>
		<modal-desc v-if="showDesc" @closeDialog="showDesc = false"></modal-desc>
		<show-gift v-if="showGift" @closeDialog="showGift = false" :giftInfo="giftInfo"></show-gift>
		<show-details v-if="showDetails" @closeDialog="showDetails = false" :giftDetails="giftDetails"></show-details>
		<personal-info v-if="showPersonal" @closeDialog="showPersonal = false" :currentInfo="currentInfo"></personal-info>
	</view>
</template>
<script>
	import config from '@/config/config.js'
	import modalDesc from './components/modal/modal.vue';
	import textNotice from './components/notice/notice.vue';
	import showGift from './components/gift/index.vue';
	import showDetails from './components/details/index.vue';
	import personalInfo from './components/personal/index.vue';
	import utils from '@/utils/utils.js';
	export default {
		components: {
			modalDesc,
			textNotice,
			showGift,
			showDetails,
			personalInfo
		},
		data() {
			return {
				showPersonal : false,
				showDetails : false,
				url: config.files,
				giftDetails: '',
				showGift: false,
				shakeIndex: '',
				lists: [],
				showDesc: false,
				activeIndex: 0,
				blindList: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
				giftLists: [],
				recordList: [],
				giftInfo: {},
				currentInfo : {}
			}
		},
		onShow() {
			// this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			this.setTimer();
			this.findMyGift();
			this.selectGift();
		},
		onHide(){
			clearInterval(this.timer)
		},
		beforeDestroy(){
			clearInterval(this.timer)
		},
		methods: {
			setTimer(){
				let self = this;
				self.findRecords();
				self.timer = setInterval(()=> {
					self.findRecords();
				},5000)
			},
			clickPersonal(){
				this.findUsergiftinfo();
				// this.showPersonal = true;
			},
			clickDetails(item) {
				this.showDetails = true;
				this.giftDetails = item
				// this.showDesc = true;
			},
			setClick(index) {
				this.activeIndex = index;
			},
			clickShake(index) {
				if (this.shakeIndex !== '') {
					return;
				}
				let self = this;
				this.shakeIndex = index;

				setTimeout(() => {
					self.shakeIndex = ''
					this.getGift();
				}, 1000)
			},
			selectGift() {
				this.$request.blind
					.selectgift({})
					.then(data => {
						if (data.status == 1) {
							data.data.forEach((item)=>{
								item.rate = item.weight ? ((item.weight / data.zong) * 100).toFixed(2) + "%" : 0
							})
							this.giftLists = data.data
							return
						}
						self.$tools.toast(data.msg)
					}).catch((err) => {
						console.log(err)
					})
			},
			getGift() {
				let self = this;
				this.$request.blind
					.havegift({})
					.then(data => {
						if (data.status == 1) {
							this.giftInfo = data.data
							this.showGift = true;
							return
						}
						self.$tools.toast(data.msg)
					}).catch((err) => {
						console.log(err)
					})
			},
			findUsergiftinfo() {
				this.$request.blind
					.usergiftinfo({})
					.then(data => {
						this.currentInfo = data.data;
						this.showPersonal = true;
						console.log(data)
					}).catch((err) => {
						console.log(err)
					})
			},
			findGiftInfo() {
				this.$request.blind
					.giftinfo({})
					.then(data => {
						console.log(data)
					}).catch((err) => {
						console.log(err)
					})
			},
			findMyGift() {
				let self = this;
				self.$request.blind
					.mygift({})
					.then(data => {
						if (data.status == 1) {
							if(data.data){
								data.data.forEach((item) => {
									item.timer = utils.transformTime(Number(item.time + '000'))
								})
								self.recordList = data.data;
								return
							}
							self.recordList = [];
							return
						}
						self.$tools.toast(data.msg)
					}).catch((err) => {
						console.log(err)
					})
			},
			findRecords() {
				let self = this;
				this.$request.blind
					.recentlog({})
					.then(data => {
						console.log(data)
						self.$tools.loadingHide();
						if (data.data) {
							self.lists = [];
							self.lists = data.data.map((item) => {
								return '恭喜' + item.user_name + '获得' + item.gift_name
							})
							return
						}
					}).catch((err) => {
						self.$tools.loadingHide();
						//消息异常
						self.$tools.toast('数据加载异常')
					})
			}
		}
	}
</script>
<style scoped>
	.blind-top {
		width: 100%;
		height: 35vh;
		position: relative;
		font-size:  36upx;
	}
	.blind-top view {
		font-size: 40upx;
	}

	.blind-back {
		height: 100%;
	}

	.blind-back image {
		width: 100%;
		height: 100%;
	}

	.blind-info {
		height: calc(65vh - 44px);
		background: linear-gradient(to bottom, rgb(244, 194, 84) 50%, rgb(252, 241, 219) 100%);
	}

	.blind-info-heard {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.blind-heard-title {
		flex: 1;

		text-align: center;
		font-size: 40upx;
		font-weight: bold;
		padding: 10upx 0;
		background-color: rgb(182, 133, 31);
		color: #fff;
	}

	.blind-heard-title.active {
		background-color: transparent;
	}

	.blind {
		display: flex;
		flex-flow: row wrap;

		justify-content: space-between;

		padding: 0 50upx;
		box-sizing: border-box;
		margin-top: 30upx;
	}

	.blind-list-image {
		flex: 0 0 30%;
		text-align: center;
		width: 140upx;
		height: 140upx;
		margin-top: 30upx;
	}

	.blind-list-image image {
		width: 70%;
		height: 70%;
	}

	.blind-info-gifts thead,
	.blind-info-record thead {
		font-weight: bold;
	}

	.blind-info-gifts table,
	.blind-info-record table {
		width: 100%;
		text-align: center;
		border: none;
	}

	.blind-info-gifts td,
	.blind-info-record td {
		width: 33%;
		font-size: 26upx;
		padding: 10upx 0;
	}

/* 	.blind-info-record thead td:nth-child(1),
	.blind-info-record tbody td:nth-child(1){
		width: 40%;
	}
 */
	.blind-info-record td {
		width: 30%;
	}

	.blind-info-gifts thead td,
	.blind-info-record thead td {
		font-size: 40upx;
	}

	.blind-info-record tbody tr:nth-child(2n+1) {
		background-color: rgb(254, 241, 216);
	}

	.goods-details {
		padding: 8upx 30upx;
		background-color: rgb(182, 133, 21);
		font-weight: bold;
		border-radius: 5px;
	}

	.blind-rule {
		background-color: rgb(52, 102, 182);
		color: #fff;
		padding: 4upx 20upx;
		border-radius: 30upx 0 0 30upx;
		font-weight: bold;
		display: inline-block;
		line-height: 1.2;
	}

	.blind-case {
		margin-top: 50upx;
		font-weight: bold;
		background-color: rgb(52, 102, 182);
		color: #fff;
		padding: 4upx 20upx;
		border-radius: 30upx 0 0 30upx;
		line-height: 1.2;
	}

	.blind-top-btn-group {
		position: absolute;
		right: 0;
		top: 120upx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.blind-top-notice {
		position: absolute;
		bottom: 0;
	}



	.notice-bk {
		width: 100%;
		padding: 10upx 20upx;
		box-sizing: border-box;
		background-color: rgb(62, 40, 27);
		color: #fff;
		line-height: 1;
	}


	@keyframes shake {
		0% {
			transform: rotate(-30deg);
		}

		25% {
			transform: rotate(30deg);
		}

		50% {
			transform: rotate(-30deg);
		}

		75% {
			transform: rotate(30deg);
		}

		100% {
			transform: rotate(-30deg);
		}
	}

	.shake {
		animation: shake 1s linear;
	}

	.blind-info-gifts td image {
		width: 64upx;
		height: 64upx;
	}

	tbody {
		width: 100%;
	}

	.tbody {
		width: 100%;
		height: 600upx;
		overflow: scroll;
	}
	.tbody td {
		font-size: 36upx;
		font-weight: bold;
	}
	.thead td {
		font-size: 40upx;
	}
	.current-info {
		position: absolute;
		top: 100upx;
		left: 0;
		background-color: rgb(52, 102, 182,.5);
		color: #fff;
		padding: 4upx 20upx;
		border-radius: 0 30upx 30upx 0;
		
	}
	.current-info view {
		line-height: 1.5;
	}
</style>
