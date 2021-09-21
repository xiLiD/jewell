import MinRequest from './MinRequest'
import con from './config/config'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
  return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
  return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
  config.baseURL = con.API_SITE
  return config
})

export default {
  apis: {
	  common:{//公共
	  	sting (data) {return minRequest.post('/gzh/Wxlogin/sting', data)},//签名
	  	sendCode (data) {return minRequest.post('/gzh/Wxlogin/getCode', data)},//发送验证码
	  	paySundries (data) {return minRequest.post('/gzh/Pay/paySundries', data)},//支付
	  },
	  user:{//会员
	  	getuser (data) {return minRequest.get('/gzh/Wxlogin/getuser', data)},//登录
	  	setdatum (data) {return minRequest.post('/gzh/User/setdatum', data)},//完善信息
	  	getUserData (data) {return minRequest.post('/gzh/Personal/getUserData', data)},//信息查询
	  	updPayPsw (data) {return minRequest.post('/gzh/Personal/updPayPsw', data)},//修改支付密码
	  	updPhone (data) {return minRequest.post('/gzh/Personal/updPhone', data)},//修改手机号码
	  	friends (data) {return minRequest.post('/gzh/Personal/friends', data)},//我的好友
	  	getUp (data) {return minRequest.post('/gzh/Admission/getUp', data)},//升级信息
	  },
	  index:{//首页
	  	classify (data) {return minRequest.post('/gzh/Index/classify', data)},//分类
	  	carousel (data) {return minRequest.post('/gzh/Index/carousel', data)},//广告
	  },
	  account:{//账户
	  	shouPay (data) {return minRequest.post('/gzh/Personal/shouPay', data)},//查询
	  	addPay (data) {return minRequest.post('/gzh/Personal/addPay', data)},//上传
	  	billList (data) {return minRequest.post('/gzh/Bill/billList', data)},//流水
	  	withdrawal (data) {return minRequest.post('/gzh/Pay/withdrawal', data)},//提现
	  	tyransfer (data) {return minRequest.post('/gzh/Bill/tyransfer', data)},//转赠
	  	dChon (data) {return minRequest.post('/gzh/Pay/dChon', data)},//冲押金
	  	goldIngot (data) {return minRequest.post('/gzh/Bill/goldIngot', data)},//金元宝明细
	  	recommend (data) {return minRequest.post('/gzh/Bill/recommend', data)},//团队奖励
	  	getbank (data) {return minRequest.post('/gzh/Withdrawal/getbank', data)},//上次提现数据
	  	withdrawallist (data) {return minRequest.post('/gzh/Withdrawal/withdrawallist', data)},//提现记录
	  },
	  product:{//竞拍商城
	  	getGoodsList (data) {return minRequest.post('/gzh/Goods/getGoodsList', data)},//商品列表
	  	getGoods (data) {return minRequest.post('/gzh/Goods/getGoods', data)},//商品详情
	  	rush (data) {return minRequest.post('/gzh/Purchase/rush', data)},//抢购
		getTime (data) {return minRequest.post('/gzh/Refresh/getTime', data)},// 待开始倒计时
		
	  },
	  shop:{//元宝商城
	  	getGoodsList (data) {return minRequest.post('/gzh/Goldbalancegoods/goldindex', data)},//商品列表
	  	getGoods (data) {return minRequest.post('/gzh/Goldbalancegoods/getgoldGoods', data)},//商品详情
	  	rush (data) {return minRequest.post('/gzh/Pay/getgPay', data)},//抢购
	  },
	  card:{//入场券
	  	gradeList (data) {return minRequest.post('/gzh/Admission/admissionList', data)},//商品列表
	  },
	  address:{//收货地址
	  	gradeList (data) {return minRequest.post('/gzh/Address/getAddress', data)},//列表
	  	addAddress (data) {return minRequest.post('/gzh/Address/addAddress', data)},//添加
	  	delAddress (data) {return minRequest.post('/gzh/Address/delAddress', data)},//删除
	  	defaulst (data) {return minRequest.post('/gzh/Address/defaulst', data)},//设置
	  },
	  news:{//新闻
	  	article (data) {return minRequest.post('/gzh/index/article', data)},//新闻列表
	  	articleDetails (data) {return minRequest.post('/gzh/index/articleDetails', data)},//新闻详情
	  	msg (data) {return minRequest.post('/gzh/index/msg', data)},//资讯列表
	  	msgDetails (data) {return minRequest.post('/gzh/index/msgDetails', data)},//资讯详情
	  },
	  order:{//订单
	  	orderlist (data) {return minRequest.post('/gzh/Order/orderlist', data)},//订单列表
	  	physicalOrder (data) {return minRequest.post('/gzh/Order/physicalOrder', data)},//实物订单
	  	particulars (data) {return minRequest.post('/gzh/Order/particulars', data)},//详情
	  	setPayDocument (data) {return minRequest.post('/gzh/Pay/setPayDocument', data)},//确认订单
	  	delOrder (data) {return minRequest.post('/gzh/Order/delOrder', data)},//取消订单
	  	resell (data) {return minRequest.post('/gzh/Order/resell', data)},//转拍查询
	  	transfer (data) {return minRequest.post('/gzh/Pay/transfer', data)},//转拍提交
	  	substitution (data) {return minRequest.post('/gzh/Order/substitution', data)},//置换成银元宝
	  	receivingGoods (data) {return minRequest.post('/gzh/Order/receivingGoods', data)},//确认订单
	  }
  }
}

