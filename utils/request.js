import operate from './operate.js'
// vuex 的使用  详情参考官网 https://uniapp.dcloud.io/vue-vuex
import store from '../store/index.js'  

export default class Request {
    http(param) {
        // 请求参数
        var url = param.url,
            method = param.method,
            header = {},
            data = param.data || {},
            // token = param.token || "",
            hideLoading = param.hideLoading || false;

        //拼接完整请求地址
        var requestUrl = operate.api + url;

        //请求方式:GET或POST(POST需配置
        // header: {'content-type' : "application/x-www-form-urlencoded"},)
        if (method) {
            method = method.toUpperCase(); //小写改为大写
            if (method == "POST") {
                header = {
                    'content-type': "application/x-www-form-urlencoded"
                };
            } else {
                header = {
                    'content-type': "application/json"
                };
            }
			// let userInfo = uni.getStorageSync('uerInfo')
			
			// var user = uni.getStorageSync('uerInfo')
			// console.log(user)
			// if(userInfo){
			// 	header.token = userInfo.token
			// }
			// var user = uni.getStorageSync('uerInfo');
			// console.log(user)
			// if(user.token){
			// 	header.token = user.token
			// }
			// if(store.token){
			// 	header.token = store.token
			// }
        }

        //加载圈
        if (!hideLoading) {
            uni.showLoading({
                title: '加载中...'
            });
        }

        // 返回promise
        return new Promise((resolve, reject) => {
            // 请求
            uni.request({
                url: requestUrl,
                data: data,
                method: method,
                header: header,
                success: (res) => {
					console.log(res)
                    // 判断 请求api 格式是否正确
                    // if (res.statusCode && res.statusCode != 200) {
                    //     uni.showToast({
                    //         title: "api错误" + res.errMsg,
                    //         icon: 'none'
                    //     });
                    //     return;
                    // }
                    // // code判断:200成功,不等于200错误
                    // if (res.data.status) {
                    //     if (res.data.status != '200') {
                    //         uni.showToast({
                    //             title: "" + res.data.msg,
                    //             icon: 'none'
                    //         });
                    //         return;
                    //     }
                    // } else {
                    //     uni.showToast({
                    //         title: "status!=200" + res.data.msg,
                    //         icon: 'none'
                    //     });
                    //     return;
                    // }
                    // 将结果抛出
					console.log(res)
					if(res.data.status == -1){
						uni.showToast({
						        title: "登录失效!" + res.data.msg,
						        icon: 'none'
						    });
							uni.redirectTo({
								url : '/pages/member/login?back=0'
							})
					}
                    resolve(res.data)
                },
                //请求失败
                fail: (e) => {
                    uni.showToast({
                        title: "" + e.data.msg,
                        icon: 'none'
                    });
                    resolve(e.data);
                },
                //请求完成
                complete() {
                    // let _this = this;
                    // //隐藏加载
                    if (!hideLoading) {
                        uni.hideLoading()
                        // _this.$tools.loadingHide();
                    }
                    resolve();
                    return;
                }
            })
        })
    }
}