<template>
	<view class="info-container">
		<view class="info-main-row">
			<view>统一编号：</view>
			<view class="info-main-text">{{selectedPotentialPoint.potentialPointId}}</view>
		</view>
		<view class="info-main-row">
			<view>监测点名称：</view>
			<view class="info-main-text">{{selectedPotentialPoint.potentialPointName}}</view>
		</view>
		<view class="info-main-row">
			<view>地理位置：</view>
			<view class="info-main-text">{{selectedPotentialPoint.potentialPointLocation}}</view>
		</view>
		<view class="info-main-row">
			<view>隐患点类型：</view>
			<view class="info-main-text">{{dataCodeTransform(selectedPotentialPoint.potentialPointType,'potentialPointTypes')}}</view>
		</view>
		<view class="info-main-row">
			<view>监测设备：</view>
			<view class="info-main-text">{{deviceData.length===0?'无':`${deviceData[0].deviceName}等`}}</view>
		</view>
		<view class="info-main-row">
			<view>土壤类型：</view>
			<view class="info-main-text"></view>
		</view>
		<view class="info-main-row">
			<view>监测员：</view>
			<view style="display: flex;">
				<view style="margin-right: 5px;">{{memberList[selectedPotentialPoint.potentialPointEstablishMemberId]}}</view>
				<view>{{selectedPotentialPoint.potentialPointEstablishMemberPhone}}</view>
			</view>
		</view>
		<view class="info-main-device" v-for="(device,index) in deviceData" :key="device.deviceId">
			<view>设备{{index+1}}:</view>
			<view class="info-main-device-row">
				<view>编号：{{device.deviceId}}</view>
				<view>隐患点：{{selectedPotentialPoint.potentialPointName}}</view>
			</view>
			<view class="info-main-device-row">
				<view>设备制造：{{dataCodeTransform(device.deviceManufacturersType,'deviceManufacturersTypes')}}</view>
				<view>负责人ID：{{device.deviceResponsibilityMemberId}}</view>
			</view>
			<view class="info-main-device-row">
				<view>负责人电话：{{device.deviceResponsibilityMemberPhone}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {dataCodeTransformMixins,getMemberOptionsMixins} from "@/utils/mixins.js"
	import {request} from "@/utils/request.js"
	export default {
		name:'DetectInfo',
		props:['selectedPotentialPoint'],
		mixins:[dataCodeTransformMixins,getMemberOptionsMixins],
		data(){
			return{
				deviceData:[],
				memberOptions:[],
				memberList:{}
			}
		},
		watch:{
			selectedPotentialPoint:{
				deep:true,
				handler(newValue,oldValue){
					const id = newValue.potentialPointId
					this.getDeviceData(id)
				}
			}
		},
		mounted() {
			const id = this.selectedPotentialPoint.potentialPointId
			this.getMembersOptions()
			this.getDeviceData(id)
		},
		methods:{
			getDeviceData(id){
				request({
					url:'monitorDevice/query',
					method:'post',
					data:{
						MonitorDeviceQueryReq:{
							potentialPointId:id
						},
						QueryOffsetReq: {
							queryCount: 9999,
							offset: 0
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.deviceData = res.data.MonitorDeviceQueryRsp
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.info-container{
		padding: 0 10px;
		.info-main-row{
			display: flex;
			justify-content: space-between;
			padding: 8px 5px;
			border-top: 1px solid #E8E8E8;
			.info-main-text{
				width: 200px;
				text-align: right;
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
			}
		}
		.info-main-device{
			padding: 8px 5px;
			border-top: 1px solid #E8E8E8;
			.info-main-device-row{
				font-size: 12px;
				display: flex;
				justify-content: space-between;
				padding: 8px 0;
			}
		}
	}
</style>