<template>
	<div class="wrap">
		<div ref="box" class="box">
			<div ref="marquee" class="marquee">{{text}}</div>
			<div ref="copy" class="copy"></div>
		</div>
		<div ref="node" class="node">{{text}}</div>
	</div>
</template>
<script>
	export default {
		name: 'Marquee',
		props: ['lists'], // 父组件传入数据， 数组形式 [ "连雨不知春去","一晴方觉夏深"]
		data() {
			return {
				text: '', // 数组文字转化后的字符串
				interval: ''
			}
		},
		methods: {
			move() {
				let self = this;
				if (this.clear) {
					return;
				}
				// 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
				let width = self.$refs.node.getBoundingClientRect().width
				self.$refs.copy.innerText = self.text // 文字副本填充
				let distance = 0 // 位移距离
				console.log(self.$refs.box.style)
				if (self.$refs.box.style != "") {
					self.interval = setInterval(() => {
						distance = distance - 1
						// 如果位移超过文字宽度，则回到起点
						if (-distance >= width) {
							distance = 16
						}
						self.$refs.box.style.transform = 'translateX(' + distance + 'px)'
					}, 20)
				}
				// 设置位移
			}
		},
		beforeDestroy() {
			console.log('销毁')
			let self = this;
			self.clear = true;
			clearInterval(self.interval)
			self.interval = null
		},
		// 把父组件传入的arr转化成字符串
		mounted: function() {
			for (let i = 0; i < this.lists.length; i++) {
				this.text += ' ' + this.lists[i]
			}

		},
		onShow(){
			console.log('显示')
		},
		// 更新的时候运动
		updated: function() {
			console.log('修改')
			let self = this;
			self.clear = false;
			self.move()
		}
	}
</script>
<style scoped>
	.wrap {
		overflow: hidden;
	}

	.box {
		width: 80000%;
	}

	.box div {
		float: left;
	}

	.marquee {
		margin: 0 16px 0 0;
		font-size: 28upx;
	}

	.node {
		position: absolute;
		z-index: -999;
		top: -999999px;
	}
</style>
