/*
    微信支付方法(uni-app h5)适用
    获取微信加签信息
    @param{data}:获取的微信加签
    @param{res}:成功回调
    @param{fail}:失败回调
     
    @warn:因为package为严格模式下的保留字，不能用作变量.
    @use
     
        wPay({
            appId,
            timeStamp,
            nonceStr,
            signature,
            package,
            paySign
        },res=>{
            console.log('调用成功!');
        },fail=>{
            console.log('调用失败!');
        })
*/
import config from '../../config/config.js'
const wexinPay = (data, cb, errorCb) => {
	let [appId, timestamp, nonceStr, signature, packages, paySign, signType] = [config.H5Wei.AppId, data.timeStamp,
		data
		.nonceStr,
		data.signature,
		data.package, data.paySign, data.signType
	];

	function jsApiCall() {
		console.log(timestamp)
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				nonceStr: nonceStr,
				timeStamp: timestamp,
				package: packages,
				signType: signType,
				paySign: paySign,
				appId: appId
			}, //josn串
			function(res) {
				if (res.err_msg.indexOf("ok") >= 0) {
					cb(res);
				} else {
					errorCb(res);
				}
			}
		);
	}

	function callpay() {
		if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', jsApiCall);
				document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
			}
		} else {
			jsApiCall();
		}
	}

	setTimeout(callpay(), 0);
}

export default wexinPay;
