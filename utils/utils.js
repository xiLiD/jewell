const tools = {
	toast : function(){
		let args = arguments
		let icon = args.length > 1 ? args[1] : 'none';
		// console.log(args)
		uni.showToast({
			icon: icon,
			title: args[0].toString()
		});
	},
	loading : function(){
		let args = arguments
		let title = args.length > 0 ? args[0] : '数据查询中';
		uni.showLoading({
			title: title.toString()
		});
	},
	loadingHide(){
		uni.hideLoading();
	},
	
	 transformTime(timestamp = +new Date()) {
	     if (timestamp) {
			 // debugger
	         var time = new Date(timestamp);
	         var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
	         var M = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1); // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
	         var d = time.getDate() > 9 ? time.getDate() : '0' + time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
	         var h = time.getHours() > 9 ? time.getHours() : '0' + time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
	         var m = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
	         var s = time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
	         return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
	       } else {
	           return '';
	       }
	 }
}
export default tools;