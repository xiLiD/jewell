<template>
	<view class="pager-box team-pager">
		<view class="team-menu">
			<view class="team-menu-box space-mini">
				<view :class="['team-menu-item',{'active': menu == 0}]" @click="checkMenu(0)">今日排行</view>
				<view :class="['team-menu-item',{'active': menu == 1}]" @click="checkMenu(1)">本月排行</view>
				<view :class="['team-menu-item',{'active': menu == 2}]" @click="checkMenu(2)">总排行</view>
			</view>
		</view>
		<view class="team-list-container">
			<table border="0" cellpadding="0" cellspacing="0" width="100%" class="table-month">
				<thead class="space-mini">
					<tr>
						<td>排名</td>
						<td>名称</td>
						<!-- <td>订单数量</td> -->
						<td>金额</td>
						<td>收益(元)</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in dayList" :key="item.id" :index ="item.index + 1">
						<td>{{index + 1}}</td>
						<td>{{item.receiving_name}}</td>
						<!-- <td>{{item.user_increase}}</td> -->
						<td>{{item.money}}</td>
						<td>{{item.earnings}}</td>
					</tr>
				</tbody>
				<view v-if="dayList.length == 0">
					<noData ref="noData"></noData>
				</view>
			</table>
		</view>
		
		<!-- <modal-details v-if="showDetails" @closeDialog="showDetails = false" :list="detailsList" :time="curTime"></modal-details> -->
	</view>
</template>

<script>
	import utils from '@/utils/utils.js'
	// import modalDetails from './modal/modal'
	export default {
		data() {
			return {
				detailsList : [],
				showDetails : false,
				menu : 0,
				dayList : [],
				type:['today','month','zong'],
				monthList : [],
				curOrder : {},
				monthOrder : {},
				curTime : ''
			}
		},
		methods: {
			checkMenu(num) {
				this.menu = num;
				this.getIncome(this.type[num])
			},
			getIncome(type) {
				this.$request.paihang({
						type : type
					})
					.then(data => {
						this.dayList = data.data
						
						// this.$tools.toast(data.msg)
					}).catch((err) => {
						console.log(err)
					})
			},
		},
		onLoad(){
			this.getIncome('today')
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
}
tbody tr td {
	font-weight: bold;
	font-size: 26upx;
}
/* tbody tr:nth-child(2n) {
	color:#fff;
} */
tbody tr:nth-child(2n) {
	background-color: #fff;
	color:rgb(60,60,60);
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
