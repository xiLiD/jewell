<template>
	<view class="container">
		<template>
			<form>
				<view class="t-box">
					<view class="t-item">
						<input type="text" class="t-input" name="id_card_name" v-model="id_card_name" placeholder="身份证姓名" />
					</view>
					<view class="t-item">
						<input type="text" class="t-input" name="id_card" v-model="id_card" placeholder="身份证号码" />
					</view>
					<view class="t-item"><input type="text" class="t-input" maxlength="8" name="user_name" v-model="user_name" placeholder="昵称" /></view>
					<view class="t-item"><input type="text" class="t-input" name="tel" v-model="tel" placeholder="请输入手机号码" /></view>
					<view class="t-item">
						<input type="text" class="t-input" name="code" v-model="code" placeholder="请输入验证码" />
						<button class="seehouse_get_nub" @click="sendCode" v-if="showText == true">获取验证码</button>
						<view v-else class="sends">({{ second }}秒)重新获取</view>
					</view>
					
					<view class="t-item">
						<!-- 						<input type="password" class="t-input" name="passWord" v-model="passWord"
							placeholder="用户密码" /> -->
						<pwInput :inputInfo="{name:'passWord',placeholder:'用户密码'}" ref='userPwd'></pwInput>
					</view>

					<view class="t-item">
						<pwInput :inputInfo="{name:'passWorda',placeholder:'确认密码'}" ref='passWorda'></pwInput>
					</view>
					<view class="t-item">
						<!-- 					<input type="text" class="t-input" name="payWord" v-model="payWord"
							placeholder="支付密码" /> -->
						<pwInput :inputInfo="{name:'payWord',placeholder:'支付密码'}" ref='payWord'></pwInput>
					</view>
					<view class="t-item"><input class="t-input" name="nvitationCode" v-model="nvitationCode" placeholder="邀请码" /></view>
					
				</view>

				<view class="b-box"><button class="blt-botton" @click="btnRegister">提交注册</button></view>
			</form>
		</template>
	</view>
</template>

<script>
	var graceChecker = require('@/common/graceChecker.js');
	import pwInput from '@/components/input/PwInput'
	export default {
		components: {
			pwInput
		},
		data() {
			return {
				tel: '',
				code: '',
				passWord: '',
				passWorda: '',
				payWord: '',
				nvitationCode: '', //邀请码
				second: 90,
				showText: true,
				id_card_name: '',
				id_card: '',
				user_name : ''
			};
		},
		onLoad(option) {
			if (option.nvitationCode) this.nvitationCode = parseInt(option.nvitationCode);
		},
		methods: {
			sendCode() {
				//发送验证码
				var _this = this;
				if (_this.tel == '') {
					_this.$tools.toast('请填写正确的手机号码')
					return false;
				}

				//发送验证码
				_this.$request.common
					.sendCode({
						phone: _this.tel,
						type: 2
					})
					.then(data => {
						_this.$tools.loadingHide();
						if (data.status == 200) {
							_this.showText = false;
							var interval = setInterval(() => {
								let times = --_this.second;
								_this.second = times < 10 ? '0' + times : times; //小于10秒补 0
							}, 1000);
							setTimeout(() => {
								clearInterval(interval);
								_this.second = 90;
								_this.showText = true;
							}, 90000);
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
			btnRegister() {
				var _this = this;
				//定义表单规则
				var rule = [{
						name: 'userName',
						checkType: 'phoneno',
						errorMsg: '电话号码不正确'
					},
					{
						name: 'code',
						checkType: 'string',
						checkRule: '6,6',
						errorMsg: '验证码6个字符'
					},
					{
						name: 'pawd',
						checkType: 'string',
						checkRule: '6,20',
						errorMsg: '密码为6-20个字符'
					},
					{
						name: 'pay_paw',
						checkType: 'string',
						checkRule: '6,6',
						errorMsg: '支付密码为6个字符'
					},
					{
						name: 'invitation',
						checkType: 'string',
						checkRule: '6,6',
						errorMsg: '邀请码为6个字符'
					},
				];
				if(_this.user_name == ''){
					this.$tools.toast('昵称不能为空!');
					return;
				}
				if (_this.$refs['userPwd'].getPassWord() != _this.$refs['passWorda'].getPassWord()) {
					this.$tools.toast('两次输入的密码不一致!')
					return;
				}
				if (!_this.isCardName(_this.id_card_name)) {
					this.$tools.toast('身份证姓名格式不正确!')
					return;
				}
				if (!_this.isCardNo(_this.id_card)) {
					this.$tools.toast('身份证格式不正确!')
					return;
				}
				let formData = {
					userName: _this.tel,
					code: _this.code,
					pawd: _this.$refs['userPwd'].getPassWord(),
					pay_paw: _this.$refs['payWord'].getPassWord(),
					id_card : _this.id_card,
					id_card_name : _this.id_card_name,
					invitation: _this.nvitationCode,
					user_name : _this.user_name
				}
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					_this.$tools.loading('数据提交中')
					_this.$request.user
						.register(formData)
						.then(data => {
							_this.$tools.loadingHide();
							if (data.status == 200) {
								_this.$tools.toast('注册成功!')
								_this.$tools.loading('前往登录中...')
								setTimeout(() => {
									_this.$tools.loadingHide();
									// uni.navigateTo({
									// 	url: '/pages/member/login'
									// });
									uni.reLaunch({
										url: '/pages/member/login'
									})
								}, 500)

							} else {
								_this.$tools.toast(data.msg)
							}
						})
						.catch(err => {
							_this.$tools.loadingHide();
							//消息异常
							_this.$tools.toast('数据加载异常')
						});
				} else {
					_this.$tools.toast(graceChecker.error)
				}
			},
			isCardName(name){
				var regName =/^[\u4e00-\u9fa5]{2,4}$/; 
				if(!regName.test(name)){  
				   return false; 
				}
				return true
			},
			isCardNo(num) {
				num = num.toUpperCase();
				//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
				if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
					return false;
				}
				//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
				//下面分别分析出生日期和校验位 
				var len, re;
				len = num.length;
				if (len == 15) {
					re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
					var arrSplit = num.match(re);
			
					//检查生日日期是否正确 
					var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
					var bCorrectDay;
					bCorrectDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
						(
							dtmBirth.getDate() == Number(arrSplit[4]));
					if (!bCorrectDay) {
						return false;
					} else {
						//将15位身份证转成18位 
						//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
						var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
						var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
						var nTemp = 0,
							i;
						num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
						for (i = 0; i < 17; i++) {
							nTemp += num.substr(i, 1) * arrInt[i];
						}
						num += arrCh[nTemp % 11];
						return true;
					}
				}
				if (len == 18) {
					re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
					var arrSplit = num.match(re);
			
					//检查生日日期是否正确 
					var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
					var bCorrectDay;
					bCorrectDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
						(dtmBirth.getDate() == Number(arrSplit[4]));
					if (!bCorrectDay) {
						return false;
					} else {
						//检验18位身份证的校验码是否正确。 
						//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
						var valnum;
						var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
						var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
						var nTemp = 0,
							i;
						for (i = 0; i < 17; i++) {
							nTemp += num.substr(i, 1) * arrInt[i];
						}
						valnum = arrCh[nTemp % 11];
						if (valnum != num.substr(17, 1)) {
							return false;
						}
						return true;
					}
				}
				return false;
			}
		},
		
	};
</script>

<style>
	page {
		background-color: #ffffff !important;
	}

	.t-box {
		background-color: #ffffff;
		width: 92%;
		margin-left: 4%;
		padding: 11.25upx 0 7.5upx 0;
		margin-top: 37.5upx;
	}

	.t-item {
		border-bottom: 1px solid #efefef;
		margin: 37.5upx 0 56upx 0;
		clear: both;
	}

	.t-t {
		width: 150upx;
		text-align: right;
		float: left;
		font-size: 30upx;
	}

	.t-input {
		margin: 19upx 0 3.75upx 0;
		height: 49upx;
		line-height: 49upx;
		font-size: 26upx;
	}

	.b-box {
		width: 92%;
		margin-left: 4%;
	}

	.blt-botton {
		color: #f8d79f;
		background-color: #201f24;
		margin-bottom: 19upx;
		width: 100%;
		text-align: center;
		height: 86upx;
		line-height: 86upx;
		border-radius: 11upx;
		font-size: 30upx;
	}

	.blt-r {
		color: #5e5e5e;
		font-size: 22.5upx;
		float: left;
	}

	.blt-z {
		color: #5e5e5e;
		font-size: 22.5upx;
		float: right;
	}

	.seehouse_get_nub {
		display: inline-block;
		min-width: 150upx;
		height: 52.5upx;
		line-height: 52.5upx;
		font-size: 22.5upx;
		border-radius: 7.5upx;
		text-align: center;
		background-color: #ffffff;
		border: 1px solid #9a9a9a;
		color: #9a9a9a;
		text-decoration: none;
		float: right;
		margin-top: -60upx;
		z-index: 100;
	}

	.sends {
		display: inline-block;
		min-width: 150upx;
		height: 52.5upx;
		line-height: 52.5upx;
		font-size: 22.5upx;
		border-radius: 7.5upx;
		text-align: center;
		background-color: #ffffff;
		border: 1px solid #9a9a9a;
		color: #9a9a9a;
		text-decoration: none;
		padding: 0 5.625upx;
		float: right;
		margin-top: -60upx;
		z-index: 100;
	}
</style>
