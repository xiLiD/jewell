<template>
	<view class="container">
		<view class="topBanner">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :style="swiper_class">
				<swiper-item class="case-item" v-for="(item, index) in mainData.goods_imgs" :key="index">
					<image :src="item" class="banner-img" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="ask">
			<view class="ask-title">
				<view class="tit-r">{{ mainData.goods_name }}</view>
			</view>
			<view class="ask-top">
				<view class="ask-price">
					<text>￥{{ mainData.money }}</text>
				</view>
				<view class="ask-unit" v-if="mainData.Unit">/{{ mainData.Unit }}</view>
			</view>
			<!-- <view class="ask-intro">
				<view>今日特价</view>
				<view>新品上市</view>
			</view> -->
		</view>

		<!-- <view class="attr" v-if="mainData.Attr.length > 0||mainData.Freight.length > 0">
			<view class="attr-title" v-if="mainData.Freight.length > 0">运费</view>
			<view class="attr-item" v-for="(item, index) in mainData.Freight" :key="index"
				v-if="mainData.Freight.length > 0">
				<view class="attr-t">{{ item.Title }}</view>
				<view class="attr-r">{{ item.Value }}</view>
			</view>
			<view class="attr-title" v-if="mainData.Attr.length > 0">商品参数</view>
			<view class="attr-item" v-for="(item, index) in mainData.Attr" :key="index" v-if="mainData.Attr.length > 0">
				<view class="attr-t">{{ item.Title }}</view>
				<view class="attr-r">{{ item.Value }}</view>
			</view>
			<view class="attr-title" v-if="mainData.Size.length > 0">商品尺寸</view>
			<view class="attr-item" v-if="mainData.Size.length > 0">
				<view class="attr-a">规格</view>
				<view class="attr-b">尺寸(mm) </view>
				<view class="attr-c">件数</view>
				<view class="attr-d ">体积</view>
			</view>
			<view class="attr-item" v-for="(item, index) in mainData.Size" :key="index" v-if="mainData.Size.length > 0">
				<view class="attr-a">{{ item.Standard }}</view>
				<view class="attr-b">{{ item.Size }}</view>
				<view class="attr-c">{{ item.Number }}件</view>
				<view class="attr-d">{{ item.Volume }}m³</view>
			</view>
		</view> -->

		<view class="con" v-if="mainData.contcn">
			<view class="con-title">商品详情</view>
			<rich-text :nodes="mainData.contcn"></rich-text>
		</view>

		<view class="dbh"></view>
		<view class="btn-a" v-if="mainData.start_auction==0">待开始</view>
		<view class="btn-b" v-else-if="mainData.purchase_state==1">已售罄</view>
		<view class="bt-cn" v-else>
			<view class="t-b-p">￥{{ mainData.money }}</view>
			<view class="t-b-a" @click="saveOrder">立即购买</view>
		</view>a

		<!-- <uni-popup ref="sku" type="bottom">
			<view class="sku-main">
				<view class="sku-top">
					<image :src="skuImg"></image>
					<view class="sku-r">
						<view class="sku-price" v-if="price > 0">￥{{ price }}</view>
						<view class="sku-price" v-else>￥?</view>
						<view class="sku-intro">已选：{{ skuName }}</view>
					</view>
				</view>
				<view class="sku-center" v-if="mainData.Sku.length > 0">
					类型
					<scroll-view class="sku-item" :show-scrollbar="scrollbar" scroll-y="true">
						<view :class="['sku-i', item.StandardId == skuId ? 'active' : '']"
							v-for="(item, index) in mainData.Sku" :key="index" @click="selectSku(item)">
							{{ item.StandardName ? item.StandardName : mainData.BrandModelName }}
						</view>
					</scroll-view>
				</view>
				<view class="sku-bt">
					数量
					<view class="sku-n">
						<uni-number-box :min="0" :max="1000" class="flr" v-model="num" @change="numberChange($event)">
						</uni-number-box>
					</view>
				</view>
				<view class="sku-tj" @click="saveOrder">立即购买</view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import config from '@/config/config';
	export default {
		data() {
			return {
				userKey: '',
				id: 0,
				indicatorDots: true,
				autoplay: false,
				mainData: {},
				shareData: {
					title: '',
					imgUrl: '',
					intro: '',
					url: '',
					baseUrl: ''
				},
				price: 0,
				categoryId: 0,
				brandModelId: 0,
				standardId: 0,
				skuId: 0,
				skuName: '',
				skuImg: '',
				num: 1,
				type: 0,
				scrollbar: true,
				swiper_class: {
					height: '400upx'
				},
				qrCodeUrl: '',
				isH5: false
			};
		},
		onShow() {
			this.$store.commit('judgeLogin'); //判断登录状态
		},
		onLoad(option) {
			var user = uni.getStorageSync('uerInfo');
			if (user != '') {
				this.userKey = user.userKey;
			}
			if (option.id) this.id = parseInt(option.id);
			this.getGoods();

			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			});
			// #endif

			//#ifdef H5
			this.isH5 = true;
			//#endif

			this.setShare();
		},
		onShareAppMessage(res) {
			this.setShare();
			return {
				path: this.shareData.baseUrl,
				title: this.shareData.title,
				imageUrl: ''
			};
		},
		onShareTimeline(res) { //分享到朋友圈
			this.setShare();
			let distSource = uni.getStorageSync('distSource');
			if (distSource) {
				return {
					title: this.shareData.title,
					type: 0,
					query: this.shareData.baseUrl,
					imageUrl: this.shareData.imgUrl
				}
			}
		},
		methods: {
			setShare() {
				var img = config.SITE + 'static/logo.png';
				img = this.mainData.goods_imgs;
				this.shareData.title = '爱秀装' + this.mainData.BrandModelName + '详情';
				this.shareData.intro = this.mainData.BrandModelName + '同一风格，上百件家具任意组合，比市场便宜50%';
				this.shareData.imgUrl = img;
				this.shareData.baseUrl = 'pages/furniture/info?id=' + this.id;
				this.shareData.url = config.SITE + '#/' + this.shareData.baseUrl;
			},
			selectSku(e) {
				//选择规格
				this.skuId = e.StandardId;
				this.skuName = e.StandardName;
				this.price = e.UnitPrice;
				if (e.ImgUrl) this.skuImg = e.ImgUrl;
			},
			showCart(type) {
				this.type = type;
				//购物车显示
				this.$nextTick(() => {
					this.$refs['sku'].open();
				});
				// }
			},
			numberChange(e) {
				this.num = parseInt(e);
			},
			getGoods() {
				//获取材料类别
				var _this = this;
				uni.showLoading({
					title: '数据查询中'
				});
				_this.$request.product
					.getGoods({
						goods_id: _this.id
					})
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 1) {
							_this.mainData = data.data;
							_this.price = data.data.money;

							uni.setNavigationBarTitle({
								title: _this.mainData.BrandModelName
							});
						} else {
							_this.$tools.toast(data.msg)
						}
					})
					.catch(err => {
						_this.$tools.loadingHide();
						//消息异常
						_this.$tools.toast('数据加载异常')
					});
			},
			saveOrder() {
				//订单支付
				uni.navigateTo({
					url: '/pages/product/confirmOrder?order=' + this.id + '_' + this.num
				});
			}
		}
	};
</script>

<style>
	.container {
		background-color: #ffffff;
		min-height: 100%;
	}

	.swiper {
		margin-bottom: 20upx;
		min-height: 450upx;
	}

	.topBanner {
		width: 750upx;
		background-color: #f5f5f5;
	}

	.banner-img {
		width: 750upx;
	}

	.ask {
		padding: 0 20upx;
		border-bottom: 13upx solid #f5f5f5;
	}

	.ask view {
		line-height: 40upx;
		margin-top: 8upx;
		font-size: 25upx;
	}

	.ask view text {
		font-weight: 600;
	}

	.ask-top {
		clear: both;
		height: 60upx;
	}

	.ask-price {
		font-size: 30upx;
		line-height: 60upx;
		float: left;
	}

	.ask-price text {
		color: #d98b40;
		font-size: 40upx !important;
	}

	.ask-intro {
		clear: both;
		height: 80upx;
	}

	.ask-intro view {
		float: left;
		background-color: #fae6d7;
		color: #db9049;
		height: 45upx;
		line-height: 45upx;
		width: 150upx;
		text-align: center;
		margin-right: 22upx;
		border-radius: 5upx;
	}

	.ask-zs {
		font-size: 28upx !important;
		padding-left: 20upx;
		padding-top: 2upx;
	}

	.ask-unit {
		height: 60upx;
		float: left;
		color: #868686;
		font-size: 20upx;
		padding-top: 5upx;
	}

	.ask-title {
		font-weight: 600;
		font-size: 40upx !important;
		line-height: 60upx !important;
	}

	.ask-title .tit-r {
		color: #2d3142;
		font-weight: 600;
		font-size: 35upx !important;
		line-height: 50upx !important;
	}

	.list {
		margin-top: 30upx;
	}

	.list-title {
		font-weight: 600;
		font-size: 35upx;
		margin-left: 10upx;
		line-height: 40upx;
	}

	.b_r_button {
		margin-top: 10upx !important;
		background-color: #00a869;
	}

	.bt-cn {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		background-color: #ffffff;
		box-shadow: 0px 0px 3px #bbb;
	}

	.t-l {
		float: left;
		height: 3rem;
		line-height: 3rem;
		font-size: 0.8rem;
		text-align: center;
		width: 450upx;
	}

	.t-l .mo {
		color: #de0b3e;
		font-size: 0.8rem;
		padding-right: 30upx;
	}

	.t-b-p {
		color: #2d3142;
		width: 200upx;
		float: left;
		font-size: 33upx;
		height: 120upx;
		line-height: 120upx;
		text-align: center;
		margin-left: 60upx;
		font-weight: 500;
	}

	.t-b-a {
		float: right;
		height: 75upx;
		width: 200upx;
		line-height: 75upx;
		background-color: #201f24;
		text-align: center;
		color: #f8d79f;
		font-size: 30upx;
		margin: 20upx 38upx 0 0;
		border-radius: 10upx;
		border: 0;
	}

	.attr {
		width: 710upx;
		margin: 0 auto;
		border: 1px solid #e8e8e8;
		border-top: 0;
		margin-top: 15upx;
	}

	.attr-title {
		color: #000000;
		padding: 0 10upx;
		height: 60upx;
		line-height: 60upx;
		border-top: 1px solid #e8e8e8;
		font-weight: 600;
	}

	.attr-item {
		border-top: 1px solid #e8e8e8;
		line-height: 50upx;
		color: #868686;
		overflow: hidden;
	}

	.attr-t {
		width: 200upx;
		float: left;
		line-height: 50upx;
		text-indent: 10upx;
		font-size: 23upx;
	}

	.attr-r {
		width: 500upx;
		line-height: 50upx;
		overflow: hidden;
		padding: 0 10upx;
		border-left: 1px solid #e8e8e8;
		font-size: 23upx;
	}

	.attr-item .attr-a {
		width: 220upx;
		line-height: 50upx;
		overflow: hidden;
		padding: 0 10upx;
		font-size: 23upx;
		float: left;
	}

	.attr-item .attr-b {
		width: 260upx;
		line-height: 50upx;
		overflow: hidden;
		padding: 0 10upx;
		border-left: 1px solid #e8e8e8;
		font-size: 23upx;
		float: left;
	}

	.attr-item .attr-c {
		width: 110upx;
		line-height: 50upx;
		overflow: hidden;
		padding: 0 10upx;
		border-left: 1px solid #e8e8e8;
		font-size: 23upx;
		float: left;
	}

	.attr-item .attr-d {
		width: 110upx;
		line-height: 50upx;
		overflow: hidden;
		padding: 0 10upx;
		border-left: 1px solid #e8e8e8;
		font-size: 23upx;
	}

	.con {
		width: 750upx;
		margin: 0 auto;
		padding: 0 20upx;
		border-top: 13upx solid #f5f5f5;
	}

	.dbh {
		height: 130upx;
		width: 100%;
		overflow: hidden;
	}

	.con-title {
		color: #000000;
		padding: 0 10upx;
		font-weight: 600;
		margin-top: 20upx;
	}

	.sku-main {
		background-color: #ffffff;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		//min-height: 700upx;
	}

	.sku-top {
		width: 100%;
		height: 210upx;
	}

	.sku-top image {
		width: 180upx;
		height: 180upx;
		float: left;
		margin: 30upx 0 0 30upx;
		margin-right: 25upx;
	}

	.sku-top .sku-r {
		padding-top: 130upx;
	}

	.sku-top .sku-price {
		height: 40upx;
		line-height: 40upx;
		color: #e0664f;
		font-size: 25upx;
	}

	.sku-top .sku-intro {
		height: 40upx;
		line-height: 40upx;
		font-size: 25upx;
		overflow: hidden;
	}

	.sku-center {
		width: 100%;
		padding-left: 30upx;
		margin-top: 50upx;
	}

	.sku-center .sku-item {
		width: 100%;
		max-height: 500upx;
	}

	.sku-center .sku-item .sku-i {
		float: left;
		padding: 7upx 30upx;
		border: 1px solid #ccc;
		font-size: 25upx;
		color: #333;
		border-radius: 8upx;
		float: left;
		margin-bottom: 15upx;
		margin-right: 20upx;
		box-sizing: border-box;
		white-space: nowrap;
	}

	.sku-center .sku-item .active {
		border: 1px solid #dc0000;
		color: #dc0000;
		background: #fff;
	}

	.sku-bt {
		width: 100%;
		padding-left: 30upx;
		margin-top: 50upx;
		clear: both;
		padding-bottom: 150upx;
	}

	.sku-tj {
		width: 80%;
		margin-left: 10%;
		text-align: center;
		position: fixed;
		bottom: 30upx;
		background-color: #1f1e23;
		height: 66upx;
		line-height: 66upx;
		color: #f8d79f;
		border-radius: 33upx;
	}

	.sku-tj-hui {
		background-color: #999999;
	}

	.tcdbg {
		position: absolute;
		z-index: 100;
		background-color: #FFFFFF;
		width: 70upx;
		height: 70upx;
		right: 30upx;
		top: 30upx;
	}

	.tcdbg image {
		width: 100%;
		height: 100%;
	}

	.cdbg_box {
		background-color: #FFFFFF;
		width: 600upx;
		height: 650upx;
	}

	.cdbg_box image {
		width: 440upx;
		height: 440upx;
		margin: 50upx 0 0 80upx;
	}

	.qr_down {
		width: 230upx;
		height: 44upx;
		line-height: 44upx;
		border-radius: 22px;
		background-color: #159f66;
		color: #FFFFFF;
		margin: 0 auto;
		text-align: center;
		font-size: 25upx;
		margin-top: 50upx;
	}

	.qr_intro {
		width: 230upx;
		height: 44upx;
		line-height: 44upx;
		border-radius: 22px;
		color: #999999;
		margin: 0 auto;
		text-align: center;
		font-size: 25upx;
		margin-top: 50upx;
	}

	.btn-a {
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		font-size: 35upx;
		text-align: center;
		background-color: #e2ac35;
		color: #FFFFFF;
		bottom: 0;
		position: fixed;
		font-weight: 600;
	}

	.btn-b {
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		font-size: 35upx;
		text-align: center;
		background-color: #EFEFEF;
		color: #000000;
		bottom: 0;
		position: fixed;
		font-weight: 600;
	}
</style>
