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
	}
}
export default tools;