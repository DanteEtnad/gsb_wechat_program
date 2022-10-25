<template>
		<view>
			<!-- 自定义导航栏 -->
			<view class="navBarBox">
				<!-- 状态栏占位 -->
				<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
				<!-- 真正的导航栏内容 -->
				<view class="navBar">
					<view>
					<u-row>
						<uni-icons color="#fff" type="back" size=24 @click="backFn"></uni-icons>
						<view  @click="backFn" class="ellipsisStyle">{{loactionName}}</view>
					</u-row>

					</view>
				</view>
			</view>
			<!-- 页面内容 -->
		</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			loactionName:'',
			statusBarHeight:'',
		},
		created(){
			console.log("loactionName",this.loactionName)
			console.log("statusBarHeight",this.statusBarHeight)
		},
		
		methods: {
			//返回上一级事件
			  backFn(){
			  	 uni.navigateBack();
			  },
		},
	}
</script>

<style lang="scss" scoped>
	.navBarBox{}
	.navBarBox .statusBar {
		background: #2E9BFF;
	}
	.ellipsisStyle {
	   // width: 100px !important;
	   color: white;
	   overflow: hidden;
	   word-break: break-all;
	   text-overflow: ellipsis;
	   display: -webkit-box;
	   -webkit-box-orient: vertical;
	   -webkit-line-clamp: 2;
	   white-space: nowrap;
	   margin-bottom:5px;
	}
	.navBarBox .navBar {
		padding: 25rpx 25rpx;
		padding-bottom: 8rpx;
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		color: #fff;
		background: #2E9BFF;
		font-size: 16px;
	}
	
	
	
	
	
</style>
