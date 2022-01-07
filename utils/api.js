import Request from '@/utils/request.js'
let request = new Request().http

const getToken = (data) => {
	let user = uni.getStorageSync('uerInfo')
	if (user) {
		data.token = user.token
		// data.token = '1cdcd38cb368eeda083310ca7d7978f47a08f09d'
	}
	return data
	// console.log(DATA)
}
//全局定义请求头
export default {
	blind : {
		// 查询用户抽奖次数
		usergiftinfo: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/gift/usergiftinfo",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 用户抽奖接口
		havegift: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/gift/havegift",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 查询最近10条所有用户中奖记录
		selectgift: function(data) {
			data = getToken(data)
			
			return request({

				url: "/gzh/gift/selectgift",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 查询奖品列表
		recentlog: function(data) {
			data = getToken(data)
			
			return request({
				hideLoading : true,				
				url: "/gzh/gift/recentlog",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 查询我的中奖记录
		mygift: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/gift/mygift",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 根据奖品ID查询奖品详细信息
		giftinfo: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/giftinfo",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
	income : {
		// 查询当天订单收益
		earning: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/earning",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 查询当月订单收益
		monthearning: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/monthearning",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	},
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
		// 入场券购买
		getcode: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Common/getcode",
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
		// 我的好友  打赏
		  reward: function(data) {
		   data = getToken(data)
		   return request({
		    url: "/gzh/Bill/reward",
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
		// 订单拆分
		substitution: function(data) {
		 data = getToken(data)
		 return request({
		  url: "/gzh/Order/substitution",
		  method: "POST", //请求方式
		  data: data, //请求数据
		 })
		},
		// 添加银行卡
		addblank: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Personal/addblank",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 查询银行卡
		findblank: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Personal/findblank",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 开分公司
		setZiAdmin: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/User/setZiAdmin",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		}
	},
	// 排行榜
	  paihang: function(data) {
	   data = getToken(data)
	   return request({
	    url: "/gzh/user/paihang",
	    method: "POST", //请求方式
	    data: data, //请求数据
	   })
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
		//转拍提交
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
		// //转拍提交
		// transfer: function(data) {
		// 	data = getToken(data)
		// 	return request({
		// 		url: "/gzh/Order/transfer",
		// 		method: "POST", //请求方式
		// 		data: data, //请求数据
		// 	})
		// },
		//置换成银元宝
		receivingGoods: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Order/receivingGoods",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		//确认付款
		comfirmmoney: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Order/comfirmmoney",
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
		//查询流水类型
		billType: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/getbilltype",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		
		
		// 当天团队
		teamearning: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/teamearning",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 本月团队
		monthteam: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/monthteam",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 佣金
		billbalance: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/billbalance",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
		// 团队佣金
		monthbalance: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/Bill/monthbalance",
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
	passway : {
		greenload: function(data) {
			data = getToken(data)
			return request({
				url: "/gzh/User/greenload",
				method: "POST", //请求方式
				data: data, //请求数据
			})
		},
	}
}