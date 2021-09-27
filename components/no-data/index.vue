<template>
  <view class="noDate">
    <img :src="nodata" alt />
    <view>{{value}}</view>
  </view>
</template>
<script>
import nodata from "static/images/nodata.png";
export default {
  props: {
    target: Object,
    default: function() {
      return {
        label: "",
        value: ""
      };
    }
  },
  data() {
    return {
      nodata: nodata,
	  value : '无数据'
    };
  },
  methods:{
	  showText(val){
		  console.log(val)
		  this.value = val;
	  }
  }
};
</script>
<style lang="less">
.noDate {
  text-align: center;
  margin-top: 40upx;
  position: fixed;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  img {
    width: 300upx;
  }
  view {
    color: #999999;
    font-size: 30upx;
  }
  // text-align: center;
  // background-image: url(~assets/DiagnosticAnalysis/nodata.png);
}
</style>