import Vue from 'vue'
import store from './store'
import App from './App'

// import Json from './Json' //测试用数据
import api from '@/utils/api.js'
import tools from '@/utils/utils.js'
import { uniPopup } from './components/uni-popup/uni-popup.vue' 
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$tools = tools;

// 全局注册 弹窗组件

Vue.component('uni-popup',uniPopup)



Vue.prototype.$request = api;

App.mpType = 'app'

// 全局注册 无数据组件
import noData from 'components/no-data/index'

Vue.component('noData',noData)




const app = new Vue({
    ...App
})
app.$mount()