<template>
	<view class="container">
		<view class="t-box">
			<view class="t-item">
				<view class="t-tit">业主名称</view>
				<input class="t-input" v-model="mainData.receiving_name" placeholder="请填写业主名称" />
			</view>
			<view class="t-item">
				<view class="t-tit">手机号码</view>
				<input class="t-input" v-model="mainData.receiving_phone" placeholder="请填写手机号码" />
			</view>
			<view class="t-item" @click="openPicker">
				<view class="t-tit">所在城市</view>
				<view class="t-address" v-if="mainData.city">{{ mainData.province }} {{ mainData.city }}
					{{ mainData.area }}
				</view>
				<view class="t-address ito" v-else>请选择所在城市</view>
				<text class="uni-navigate-icon uni-icon ad-r">&#xe470;</text>
			</view>
			<view class="t-item">
				<view class="t-tit">详细地址</view>
				<input class="t-input" v-model="mainData.detailed_address" placeholder="请选择详细地址" />
			</view>
			<view class="t-item">
				<view class="t-tit">默认地址</view>
				<switch type="switch" class="swr" :checked="mainData.default==1" color="#2e2d32"
					style="transform:scale(0.8)" @change="useChange" />
			</view>
		</view>

		<view class="sku-tj" @click="add">{{ btnName }}</view>

		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
</template>

<script>
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";

	export default {
		data() {
			return {
				order: '',
				type: '',
				address_id: 0,
				mainData: {
					province: '',
					city: '',
					area: '',
					receiving_name: '',
					receiving_phone: '',
					detailed_address: '',
					default: 0
				},
				lotusAddressData: {
					visible: false,
					provinceName: '',
					cityName: '',
					townName: '',
				},
				region: '',
				btnName: '保存'
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			if (option.order) {
				this.order = option.order;
				this.btnName = '保存修改';
			}
			if (option.type) this.type = option.type;
			if (option.id) {
				this.address_id = option.id;
				this.btnName = '保存修改';
			}
			if (option.receiving_name) this.mainData.receiving_name = option.receiving_name;
			if (option.receiving_phone) this.mainData.receiving_phone = option.receiving_phone;
			if (option.province) this.mainData.province = option.province;
			if (option.city) this.mainData.city = option.city;
			if (option.area) this.mainData.area = option.area;
			if (option.detailed_address) this.mainData.detailed_address = option.detailed_address;
			if (option.default) this.mainData.default = option.default;
		},
		components: {
			"lotus-address": lotusAddress
		},
		methods: {
			openPicker() {
				this.lotusAddressData.visible = true;
			},
			//回传已选的省市区的值
			choseValue(res) {
				//res数据源包括已选省市区与省市区code
				this.lotusAddressData.visible = res.visible; //visible为显示与关闭组件标识true显示false隐藏
				if (res.isChose) {
					this.lotusAddressData.provinceName = res.province; //省
					this.lotusAddressData.cityName = res.city; //市
					this.lotusAddressData.townName = res.town; //区

					this.mainData.province = res.province; //省
					this.mainData.city = res.city; //市
					this.mainData.area = res.town; //区

					this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
			},
			useChange(e) {
				//使用余额
				if (e.detail.value) {
					this.mainData.default = 1;
				} else {
					this.mainData.default = 0;
				}
			},
			add() {
				if (!this.mainData.receiving_name) {
					_this.$tools.toast('请输入业主名称')
					return false;
				}
				if (!this.mainData.receiving_phone) {
					_this.$tools.toast('请输入手机号码')
					return false;
				}
				if (!this.mainData.city) {
					_this.$tools.toast('请选择城市')
					return false;
				}
				if (!this.mainData.detailed_address) {
					_this.$tools.toast('请输入详细地址')
					return false;
				}
				var _this = this;
				_this.$tools.loading('数据条件中')
				var formData = _this.mainData;

				formData = Object.assign({
						address_id: _this.address_id
					},
					formData
				);

				_this.$request.address
					.addAddress(formData)
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 1) {
							// uni.redirectTo({
							// 	url: '/pages/address/list?order=' + this.order + '&type=' + this.type
							// });
							uni.navigateBack({
								delta:1
							})
						} else {
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
			}
		}
	};
</script>

<style>
	page {
		background-color: #ffffff !important;
	}

	.t-box {
		background-color: #ffffff;
		width: 92%;
		margin-left: 4%;
		padding: 11.25upx 0 7.5upx 0;
	}

	.t-item {
		border-bottom: 1px solid #efefef;
		clear: both;
		height: 100upx;
		line-height: 100upx;
		margin-bottom: 20upx;
	}

	.t-item .t-tit {
		height: 100upx;
		line-height: 100upx;
	}

	.t-t {
		width: 150upx;
		text-align: right;
		float: left;
		font-size: 30upx;
	}

	.t-input {
		height: 100upx;
		line-height: 100upx;
		font-size: 26upx;
	}

	.b-box {
		width: 92%;
		margin-left: 4%;
	}

	.blt-botton {
		border: 1px solid #dedede;
		color: #333333;
		background-color: #ffffff;
		margin-bottom: 19upx;
		width: 100%;
		text-align: center;
		height: 86upx;
		line-height: 86upx;
		border-radius: 11upx;
		font-size: 30upx;
	}

	.blt-r {
		color: #5e5e5e;
		font-size: 22.5upx;
		float: left;
	}

	.blt-z {
		color: #5e5e5e;
		font-size: 22.5upx;
		float: right;
	}

	.sku-tj {
		width: 86%;
		margin-left: 7%;
		text-align: center;
		position: fixed;
		bottom: 30upx;
		background-color: #2e2d32;
		height: 90upx;
		line-height: 90upx;
		color: #ffffff;
		border-radius: 10upx;
	}

	.t-tit {
		float: left;
		width: 180upx;
	}

	.t-address {
		float: left;
		height: 100upx;
		line-height: 100upx;
		font-size: 26upx;
	}

	.ad-r {
		float: right;
		height: 100upx;
		line-height: 100upx;
		color: #cccccc;
	}

	.ito {
		color: #c4aeba;
	}

	.swr {
		float: right;
	}
</style>
