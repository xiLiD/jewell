<template>
	<view class="pager-box team-pager">
		<view class="team-menu">
			<view class="team-menu-box space-mini">
				<view :class="['team-menu-item',{'active': menu == 1}]" @click="checkMenu(1)">今日</view>
				<view :class="['team-menu-item',{'active': menu == 2}]" @click="checkMenu(2)">本月</view>
			</view>
			<view class="team-income">
				<view>
					<view class="income-name">订单(笔)</view>
					<view class="income-num">{{ menu == 1 ? curOrder.count : monthOrder.count }}</view>
				</view>
				<view>
					<view class="income-name">收益(元)</view>
					<view class="income-num red-line">{{ menu == 1 ? curOrder.earning : monthOrder.earning }}</view>
				</view>
			</view>
		</view>
		<view class="team-list-container">
			<table border="0" cellpadding="0" cellspacing="0" width="100%" class="table-month" v-if="menu == 1">
				<thead class="space-mini">
					<tr>
						<td>团队成员</td>
						<td>时间</td>
						<td>金额</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in dayList" :key="item.id">
						<td>{{item.id_card_name}}</td>
						<td>{{item.time}}</td>
						<td>{{item.money}}</td>
					</tr>
				</tbody>
				<view v-if="dayList.length == 0">
					<noData ref="noData"></noData>
				</view>
			</table>
			<table border="0" cellpadding="0" cellspacing="0" width="100%" class="table-month cur-month" v-else>
				<thead class="space-mini">
					<tr>
						<td>日期</td>
						<td>金额</td>
						<td>详情</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in monthList" :key="item.id">
						<td>
							{{ item.time }}
						</td>
						<td>
							{{ item.money }}
						</td>
						<td>
							<span class="earn-details" @click="seeDetails(item.time)">详情</span>
						</td>
					</tr>
				</tbody>
				<view v-if="monthList.length == 0">
					<noData ref="noData"></noData>
				</view>
			</table>
		</view>
		<modal-details v-if="showDetails" @closeDialog="showDetails = false" :list="detailsList" :time="curTime"></modal-details>
	</view>
</template>

<script>
		import utils from '@/utils/utils.js'
		import modalDetails from './components/teamModal.vue'
	export default {
		components: {
			modalDetails
		},
		data() {
			return {
				showDetails : false,
				menu : 1,
				dayList : [],
				monthList : [],
				curOrder : {},
				monthOrder : {},
				curTime : '',
				detailsList : []
			}
		},
		methods: {
			seeDetails(time){
				console.log(time)
				this.curTime = time && time.split(' ')[0] ? time.split(' ')[0] : time;
				
				this.$request.account
					.teamearning({
						// type : 'today'
						type: this.curTime
					})
					.then(data => {
						if(data.data.dayearning){
							data.data.dayearning.forEach((item)=>{
								item.time = utils.transformTime(Number(item.time + '000'));
							})
						}
						let list = data.data.dayearning;
						this.detailsList = list;
						this.showDetails = true;
					}).catch((err) => {
						console.log(err)
					})	
			},
			checkMenu(num) {
				this.menu = num;
			},
			getIncome() {
				// let curDate = new Date();
				// let month = curDate.getMonth() > 9 ? curDate.getMonth() + 1 : '0' + (curDate.getMonth() + 1);
				// let day = curDate.getDate() > 9 ? curDate.getDate() : '0' + curDate.getDate();
				// let date = curDate.getFullYear() +  '-' + month + '-' + day;
				this.$request.account
					.teamearning({
						type : 'today'
					})
					.then(data => {
						this.curOrder.count = data.data.count;
						this.curOrder.earning = data.data.earning;
						
						if(data.data.dayearning){
							data.data.dayearning.forEach((item)=>{
								item.time = utils.transformTime(Number(item.time + '000'));
							})
						}
						this.dayList = data.data.dayearning;
						console.log(data)
						// this.$tools.toast(data.msg)
					}).catch((err) => {
						console.log(err)
					})
			},
			getMonthIncome() {
				this.$request.account
					.monthteam({
					})
					.then(data => {
						// this.curOrder.count = data.count;
						// this.curOrder.earning = data.earning;
						// this.monthList = data.mouthearning;
						
						this.monthOrder.count = data.data.count;
						this.monthOrder.earning = data.data.earning;
						console.log(this.curOrder)
						if(data.data.monthteam){
							data.data.monthteam.forEach((item)=>{
								item.time = utils.transformTime(Number(item.time + '000'));
							})
						}
						this.monthList = data.data.monthteam;
						
						// this.$tools.toast(data.msg)
					}).catch((err) => {
						console.log(err)
					})
			}
		},
		onLoad(){
			this.getIncome();
			this.getMonthIncome()
		}
	}
</script>

<style scoped> 
/* page {
	background-color: rgb(229,229,229);
} */
.team-menu {
	
	width: 100%;
	padding: 20upx 40upx;
	box-sizing: border-box;
	background-color: rgb(255,255,255);
}
.team-menu-box {
	display: flex;
	justify-content: center;
	width: 100%;
	border-radius: 10upx;
	overflow: hidden;
}
.team-menu-box .active {
	background-color: #fff;
}
.team-menu-box >view {
	flex: 1;
	text-align: center;
	background-color: rgb(229,229,229);
	font-size: 30upx;
	padding: 4upx 0;
	font-weight: bold;
}
.user-info {
	display: flex;
	align-items: center;
	justify-content: center;
}
.user-info .user-avater image {
	width: 100upx;
	height: 100upx;
}

.user-info .user-desc {
	display: flex;
	flex-direction: column;
	margin-left: 10upx;
	
}
.table-month td  {
	text-align: center;
	padding: 10upx 0;
}

thead {
	background-color: rgb(229,229,229);
}
thead tr td {
	font-weight: bold;
	font-size: 30upx;
	width: 33%;
}
tbody tr td {
	font-weight: bold;
	font-size: 26upx;
}
/* tbody tr:nth-child(2n) {
	color:#fff;
} */
tbody tr:nth-child(2n + 1) {
	background-color: #fff;
	color:rgb(60,60,60);
}
.cur-month tr td:nth-child(1) {
	width: 40%;
}
.team-income {
	width: 80%;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	/* padding: 20upx 0; */
	margin-top: 20upx;
	font-weight: bold;
}
.team-income >view {
	flex: 1;
	text-align: center;
}
.income-num {
	font-size: 30upx;
}
.red-line {
	color : rgb(213,41,65)
}
.earn-details {
	background-color:rgb(213,41,65) ;
	color:#fff;
	padding: 6upx 20upx;
	border-radius: 10upx;
	font-size: 28upx;
}
</style>
