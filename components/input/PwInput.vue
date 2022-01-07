<template>
    <view>
		<input :id="inputInfo.name" v-model="pwdCover" type="text" :name="inputInfo.name"  :placeholder="inputInfo.placeholder" autocomplete="off" @input="setPassword"></input>
	</view>
</template>

<script>
//自定义密码输入框
//input元素光标操作
export default { 
	props : {
		inputInfo : Object
	},
    data(){
        return{
            pwdCover:"", //自定义的密码符号
			password : ''
        };
    },
	mounted(){
		this.pwdCover = "";
		this.password = "";
	},
    methods:{
        setPassword(e) {
            let reg = /[0-9a-zA-Z]/g; // 只允许输入字母和数字
            let nDot = /[^●]/g; // 非圆点字符
            let index = -1; // 新输入的字符位置
            let lastChar = void 0; // 新输入的字符
			// this.password = this.pwdCover;
			let val = e.detail.value;
			// console.log(val)
			// this.password = val
            let realArr = this.password.split(''); // 真实密码数组
            let coverArr = val.split(''); // 文本框显示密码数组
            let coverLen = val.length; // 文本框字符串长度
            let realLen = this.password.length; // 真实密码长度
            // 找到新输入的字符及位置
            coverArr.forEach((el, idx) => {
                if(nDot.test(el)) {
                    index = idx;
                    lastChar = el;
                }
            });
            // 判断输入的字符是否符合规范，不符合的话去掉该字符
            if(lastChar && !reg.test(lastChar)) {
                coverArr.splice(index, 1);
                this.pwdCover = coverArr.join('');
                return;
            }
            if (realLen < coverLen) {
              	// 新增字符
              	realArr.splice(index, 0, lastChar);
            } else if (coverLen <= realLen && index !== -1) {
                // 替换字符（选取一个或多个字符直接替换）
                realArr.splice(index, realLen - (coverLen - 1), lastChar);
            } else {
                // 删除字符，因为 val 全是 ● ，没有办法匹配，不知道是从末尾还是中间删除的字符，删除了几个，不好对 password 处理，所以可以通过光标的位置和 val 的长度来判断
                let idName = this.inputInfo.name;
				let pos = document.getElementById(idName).selectionEnd; // 获取光标位置
                realArr.splice(pos, realLen - coverLen);
            }
            // 将 pwdCover 替换成 ●
            this.pwdCover = val.replace(/\S/g, '●');
            this.password = realArr.join('');
        },
		getPassWord(){
			return this.password
		}	
    },
}
</script>

<style scoped lang="scss">
.pw_input_cp{
    width: 100%;
}
input {
	font-size:12px;
	// padding: 10upx 0;
	height: 48upx;
	height: 100%;
	font-size: 26upx;
	line-height: initial;
}
</style>