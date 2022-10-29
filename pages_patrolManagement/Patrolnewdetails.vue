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
						<uni-icons color="#fff" type="back" size=24 @click="back()"></uni-icons>
						<text>{{dataCodeAreaTransform(PatrolData.administrativeRegion,"potentialPointBelongTowns")}}</text>
					</u-row>
					</view>
				</view>
			</view>
		<view style="margin-left:10px;margin-top:10px;margin-right:10px;">
			<view class="report-info-container" style="display:flex;">
				<view class="right">
					<view>所属行政区:</view>
				</view>
				<view clss="left">
					<view style="color:#A8712D">{{dataCodeAreaTransform(PatrolData.administrativeRegion,"potentialPointBelongTowns")}}</view>
				</view>	
			</view>
			<view class="report-info-container">
				<view style="display:flex;padding-top:2px;"	>
					<view class="right">巡查开始时间:</view>
					<view clss="left">
						{{PatrolData.patrolStartDate}}
					</view>	
				</view>
				<view style="display:flex;padding-top:18px;">
					<view class="right">巡查结束时间:</view>
					<view clss="left">
						{{PatrolData.patrolEndDate}}
					</view>	
				</view>
			</view>
			
			<view class="report-info-container">
				<view style="display:flex;padding-top:2px;"	>
					<view class="right">出动巡排查:</view>
					<view clss="left">
						{{PatrolData.patrolNumber}}次
					</view>	
				</view>
				<view style="display:flex;padding-top:18px;">
					<view class="right">巡排查隐患:</view>
					<view clss="left">
						{{PatrolData.patrolPotentialPointNumber}}次
					</view>	
				</view>
			</view>
			
			<view class="report-info-container">
				<view style="display:flex;padding-top:2px;"	>
					<view class="right">填报人:</view>
					<view clss="left">
						{{memberList[PatrolData.reportPerson]}}
					</view>	
				</view>
				<view style="display:flex;padding-top:18px;">
					<view class="right">填报人手机号:</view>
					<view clss="left">
						{{PatrolData.reportPersonMobile}}
					</view>	
				</view>
			</view>
					
			<view class="report-info-container">
				<view style="display:flex;padding-top:6px;"	>
					<view class="right">转移人数:</view>
					<view clss="left">
						{{PatrolData.numberOfPeopleTransferred}}
					</view>	
				</view>
				
			</view>		
					
				
			<view class="report-info-container">
				<view style="display:flex;padding-top:6px;height:100px;"	>
					<view class="right">转移位置:</view>
					<view clss="left">
						{{PatrolData.transferPosition}}
					</view>	
				</view>
				
			</view>		
					
			<view class="report-info-container">
				<view style="display:flex;height:100px;"	>
					<view class="right">转移原因:</view>
					<view clss="left">
						{{PatrolData.transferPosition}}
					</view>	
				</view>
				
			</view>
		
	</view>
	</view>
</template>

<script>
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins} from "@/utils/mixins.js"
	import {request} from '@/utils/request.js'
	export default {
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins],
		data() {
			return {
				statusBarHeight:0,
				PatrolData:{},
				memberList:{},
				memberData:[],	
				
			}
		},
		
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.PatrolData= data.item
				console.log("this.PatrolData",this.PatrolData)
			})
		},
		
		
		mounted() {
				this.getMemberData();
				this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		
		},	

		methods: {
			back(){
				uni.navigateBack()
			},
			getMemberData(){
				request({
					method:'GET',
					url:'member/getAllMembersIdAndName',
				})
				.then(res=>{
					if(res.code===2000){
						uni.hideLoading();
						uni.showToast({
							title: `加载完成`,
							duration: 2000
						});
						this.memberData=res.data.MembersIdAndNameRsp
					}else{
						this.$message.error(res.message)
					}
					console.log("5555555555555555555",this.memberData)
					for(var i=0; i<this.memberData.length; i++){
						this.memberList[this.memberData[i].memberId]=this.memberData[i].memberName
					}
					console.log("李彪",this.memberList)
				})
			},
			
			
		},
	}
</script>

<style lang="scss">
	body{
		background-color: #F7F7F8;
	}
	
	.navBarBox{}
	.navBarBox .statusBar {
		background: #2E9BFF;
	}
	.navBarBox .navBar {
		padding-left: 5rpx;
		height: 80rpx;
		padding-bottom: 8rpx;
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		color: #fff;
		background: #2E9BFF;
		font-size: 14px;
	}
	
	
	.report-info-container{
		padding: 10px;
		background-color: white;
		margin-bottom:5px;
		
		.right{
			padding-left:2px;
			padding-right:10px;
		}
		.left{
			padding-left:2px;
			
		}
		
	}
	
</style>
