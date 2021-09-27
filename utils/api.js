import Request from '@/utils/request.js'
let request = new Request().http

const getToken = (data) => {
	let user = uni.getStorageSync('uerInfo')
	if (user) {
		data.token = user.token
	}
	return data
	console.log(DATA)
}
//全局定义请求头
export default {
	common: {
		// //支付
		paySundries: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Pay/paySundries",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 发送验证码
		sendCode: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Applogin/sms",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
	//会员
	user: {
		// 短信登录
		msgLogin: function(data) {
			return request({
				url: "/gzh/Applogin/msgLgion",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 账号密码登录
		login: function(data) {
			return request({
				url: "/gzh/Applogin/lgion",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 修改密码
		changePwd: function(data) {
			return request({
				url: "/gzh/Applogin/changePwd",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 注册
		register: function(data) {
			return request({
				url: "/gzh/Applogin/register",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 验证码注册
		smsRegister: function(data) {
			return request({
				url: "/gzh/Applogin/register",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 信息查询	
		getUserData: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Personal/getUserData",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 信息查询
		setdatum: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/User/setdatum",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 修改支付密码
		updPayPsw: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Personal/updPayPsw",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 修改手机号码
		updPhone: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Personal/updPhone",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 我的好友
		friends: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Personal/friends",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 升级信息
		getUp: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Admission/getUp",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
	//收货地址
	address: {
		// 列表
		gradeList: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Address/getAddress",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 添加
		addAddress: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Address/addAddress",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 删除
		delAddress: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Address/delAddress",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 设置
		defaulst: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Address/defaulst",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
	//首页
	index: {
		//分类
		classify: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Index/classify",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//广告
		carousel: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Index/carousel",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
	//竞拍商城
	product: {
		//商品列表
		getGoodsList: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Goods/getGoodsList",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//商品详情
		getGoods: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Goods/getGoods",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//抢购
		rush: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Purchase/rush",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 待开始倒计时	
		getTime: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Refresh/getTime",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
	//新闻
	news: {
		//新闻列表
		article: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/index/article",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//新闻详情
		articleDetails: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/index/articleDetails",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//资讯列表
		msg: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/index/msg",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//资讯详情
		msgDetails: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/index/msgDetails",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
	//元宝商城
	shop: {


		//商品列表
		getGoodsList: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Goldbalancegoods/goldindex",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//商品详情
		getGoods: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Goldbalancegoods/getgoldGoods",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},

		//抢购
		rush: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Pay/getgPay",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},

	},
	//订单
	order: {
		//订单列表
		orderlist: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Order/orderlist",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//实物订单
		physicalOrder: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Order/physicalOrder",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//详情
		particulars: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Order/particulars",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//确认订单
		setPayDocument: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Pay/setPayDocument",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//取消订单
		delOrder: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Order/delOrder",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//取消订单
		resell: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Order/resell",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//转拍查询
		transfer: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Pay/transfer",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//转拍查询
		substitution: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Order/substitution",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//转拍提交
		transfer: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Order/transfer",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//置换成银元宝
		receivingGoods: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Order/receivingGoods",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
	//账户
	account: {
		//查询
		shouPay: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Personal/shouPay",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//上传
		addPay: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Personal/addPay",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//流水
		billList: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/billList",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//提现
		withdrawal: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Pay/withdrawal",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//转赠
		tyransfer: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/tyransfer",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//冲押金
		dChon: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Pay/dChon",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//金元宝明细
		goldIngot: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/goldIngot",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//团队奖励
		recommend: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/recommend",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//上次提现数据
		getbank: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Withdrawal/getbank",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//提现记录
		withdrawallist: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Withdrawal/withdrawallist",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
	//入场券
	card: {
		//列表
		gradeList: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Admission/admissionList",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
}
/*
请求样式：
    自定义名字: function(data) {
        return request({
            url: "/banner", //请求头
            method: "GET", //请求方式 
            data: data,    //请求数据
            token: token, // 可传  
            hideLoading: false, //加载样式
        })
    },
*/
