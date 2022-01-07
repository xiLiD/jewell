import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config/config'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		login: false, //是否登录
		id: 0,
		id_card: "",
		id_card_name: "",
		information_state: 0,
		user_pay_state: 0,
		invitation: "",
		openid: "",
		phone: 0,
		pid: 0,
		token: "",
		user_fen: 0,
		user_head: "",
		user_name: "",
		user_type: 0
	},
	mutations: {
		login(state, provider) {
			state.login = true;

			state.id = provider.id;
			state.id_card = provider.id_card;
			state.id_card_name = provider.id_card_name;
			state.information_state = provider.information_state;
			state.user_pay_state = provider.user_pay_state;
			state.invitation = provider.invitation;
			state.openid = provider.openid;
			state.phone = provider.phone;
			state.pid = provider.pid;
			state.token = provider.token;
			state.user_fen = provider.user_fen;
			state.user_head = provider.user_head;
			state.user_name = provider.user_name;
			state.user_type = provider.user_type;
			
			// state.token = '37f34f1a770233695df0fa00d4adcb9ca03688d9'
			
			console.log(state)
			// return
			uni.setStorage({ //将用户信息保存在本地  
				key: 'uerInfo',
				data: provider
			})
			var user = uni.getStorageSync('uerInfo')
			console.log('user',user)
			console.log('state',state)	
				
		},
		setInformation() { //设置账户状态
			var user = uni.getStorageSync('uerInfo');
			user.information_state = 1;
			uni.setStorage({ //将用户信息保存在本地  
				key: 'uerInfo',
				data: user
			})
		},
		setUserPay() { //设置账户状态
			var user = uni.getStorageSync('uerInfo');
			user.user_pay_state = 1;
			uni.setStorage({ //将用户信息保存在本地  
				key: 'uerInfo',
				data: user
			})
		},
		logout(state) {
			state.login = false;
			state.id = 0;
			state.id_card = "";
			state.id_card_name = "";
			state.information_state = 0;
			state.user_pay_state = 0;
			state.invitation = "";
			state.openid = "";
			state.phone = 0;
			state.pid = 0;
			state.token = "";
			state.user_fen = 0;
			state.user_head = "";
			state.user_name = "";
			state.user_type = 0;

			uni.removeStorage({
				key: 'uerInfo'
			})
		},
		judgeLogin() {
			//处理登录
			var user = uni.getStorageSync('uerInfo');
			if (user == '') {
				// uni.navigateTo({
				// 	url: '/pages/member/login?isBack=0'
				// });
				uni.reLaunch({
					url: '/pages/member/login'
				})
				return;
			} else {
				var information_state = user.information_state; //基础信息
				var user_pay_state = user.user_pay_state; //支付信息
				// if (information_state != 1) {
				// 	uni.navigateTo({
				// 		url: '/pages/member/information'
				// 	});
				// } else if (user_pay_state != 1) {
				// 	uni.navigateTo({
				// 		url: '/pages/account/setCard?source=1'	
				// 	});
				// }
			}
		}
	}
})

export default store
