<template>
	<view class="modal-box">
		<view class="modal-back" @click="setClose"></view>
		<view class="modal-contain">
			<view class="modal-title space-middle">{{ time }} 收益详情 </view>
			<view class="modal-desc space-mini">
				<!-- 				<view>1、每周每五个订单获得一次抽盲盒机会</view>
				<view>2、每周最多获得两次机会</view> -->
				<view class="thead">
					<table border="0" cellpadding="0" cellspacing="0" width="100%" class="table-month">
						<thead class="space-mini">
							<tr>
								<td>团队成员</td>
								<td>时间</td>
								<td>金额</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in list" :key="item.id">
								<td>{{ item.id_card_name }}</td>
								<td>{{ item.time }}</td>
								<td>{{ item.money }}</td>
							</tr>
						</tbody>
						<view v-if="!list">
							<noData ref="noData"></noData>
						</view>
					</table>


				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array,
			time: String
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

		background-color: rgba(0, 0, 0, .7);
	}

	.modal-contain {
		width: 680upx;
		/* height: 450upx; */
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

	@keyframes runBigger {
		0% {
			transform: scale(0)
		}

		75% {
			transform: scale(1.1)
		}

		100% {
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
		background-color: rgb(231, 227, 224);
		margin: 0 auto;
	}

	.modal-desc {
		padding: 0 10upx;
		margin-top: 20upx;
		color: #ababab;
		line-height: 1.5;
		height: 500upx;
		overflow-y: scroll;
	}

	.table-month td {
		text-align: center;
		padding: 10upx 0;
	}

	thead {
		background-color: rgb(229, 229, 229);
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
	tbody tr:nth-child(2n + 1) {
		background-color: #fff;
		color: rgb(60, 60, 60);
	}
</style>
