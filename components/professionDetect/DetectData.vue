<template>
	<view>
		<view class="data-container">
			<view class="data-header">
				<uni-datetime-picker v-model="queryForm.dataTime" type="daterange" />
				<view class="data-header-select">
					<uni-data-checkbox mode="tag" v-model="queryForm.timeType" :localdata="timeType" selectedColor="#2E9BFF"/>
					<button @click="open">要素</button>
				</view>
				<uni-drawer ref="drawer" mode="left" :mask-click="true" width="350">
					<scroll-view scroll-y="true" class="drawer-device-container">
						<button @click="close">关闭窗口</button>
						<view class="drawer-device-info" v-for="device in deviceTreeList" :key="device.deviceId">
							<view class="drawer-device-title">
								<view>{{device.deviceName}}</view>
							</view>
							<view class="drawer-device-select">
								<button class="drawer-device-select-button" v-for="(des,index) in device.DescriptionJson" :key="index">
									<text>{{des.name}}</text>
								</button>
							</view>
						</view>
					</scroll-view>
				</uni-drawer>
			</view>
			<view class="echarts-wrap">
				<myEcharts id="main" ref="mapChart" :echarts="echarts" :onInit="initChart" />
			</view>
		</view>
	</view>
</template>

<script>
	import * as echarts from '@/common/echarts.min.js';
	import myEcharts from '@/components/mpvue-echarts/src/echarts.vue';
	import {request} from "@/utils/request.js"
	export default {
		components: {
			myEcharts
		},
		props:['selectedPotentialPoint'],
		data() {
			return {
				echarts,
				deviceMenuList:[],
				deviceTreeList: [],
				queryForm: {
					timeType: '1',
					dataTime: ''
				},
				timeType: [
					{
						text: '今日',
						value: '0'
					},
					{
						text: '本周',
						value: '1'
					},
					{
						text: '本月',
						value: '2'
					},
				]
			}
		},
		watch:{
			selectedPotentialPoint:{
				deep:true,
				handler(newValue,oldValue){
					const id = newValue.potentialPointId
					this.getDeviceIndexTree(id)
				}
			}
		},
		onReady() {
			uni.hideHomeButton()
		},
		mounted() {
			const id = this.selectedPotentialPoint.potentialPointId
			console.log("加载了");
			this.getDeviceIndexTree(id)
		},
		methods: {
			initChart(canvas, width, height) {
				console.log('图标', canvas);
				let chart = null
				chart = echarts.init(canvas, null, {
					width: width,
					height: height
				});
				let option = {
					dataset: {
						source: [
							["type", "2022.07.01", "2022.07.02", "2022.07.03", "2022.07.04", "2022.07.05","2022.07.06","2022.07.07"],
							["雨量累计值[mm]", 320, 332, 301, 334, 390,310,355],
						]
					},
					legend: {},
					xAxis: {
						type: "category",
						axisTick: {
							show: false
						}
					},
					yAxis: {},
					dataZoom:[{}],
					series: [{
						type: "line",
						seriesLayoutBy: "row",
					}]
				}; // ECharts 配置项

				chart.setOption(option);

				return chart; // 返回 chart 后可以自动绑定触摸操作
			},
			open(){
				this.$refs.drawer.open()
			},
			close(){
				this.$refs.drawer.close()
			},
			buildDeviceTree(){
				let list = []
				this.deviceMenuList.map(item=>{
					// 监测设备
					const treeRoot = {
						deviceId: item.deviceId,
						deviceName: item.deviceName,
						disabled: true,
						DescriptionJson: []
					}
					try{
						const description = JSON.parse(item.monitorIndexItemList[0].monitorDescriptionJson)
						Object.keys(description).map(des=>{
							treeRoot.DescriptionJson.push({
								id: des, // 如【rain】
								name: description[des], // 如【累积雨量】
								monitorType: item.monitorIndexItemList[0].monitorType,
								// 监测id
								monitorIndexId: item.monitorIndexItemList[0].monitorIndexId,
								deviceId: item.deviceId,
								deviceName: item.deviceName
							})
						})
						list.push(treeRoot)
					}
					catch(error){
						console.log(error);
					}
					
				})
				this.deviceTreeList = [...list]
				console.log(this.deviceTreeList);
			},
			getDeviceIndexTree(id){
				request({
					url:'monitorDevice/getMonitorIndexTree',
					method:"post",
					data:{
						MonitorIndexTreeQueryReq:{
							potentialPointId:id
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.deviceMenuList = res.data.MonitorIndexTreeQueryRsp
						this.buildDeviceTree()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.echarts-wrap {
		width: 100%;
		height: 300px;
	}

	.data-container {
		padding: 10px;

		.data-header {
			.data-header-select{
				margin: 10px 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				button{
					background-color: #2E9BFF;
					color: white;
					font-size: 16px;
					width: 80px;
					height: 30px;
					line-height: 30px;
					margin: 0;
					padding: 0;
					&:active{
						background-color: #0873ff;
					}
				}
			}
		}
	}
	.drawer-device-container{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		// width: 100%;
		// padding: 10px;
		.drawer-device-title{
			border-top: 1px solid #E8E8E8;
			padding: 10px 0 5px 10px;
		}
		.drawer-device-select{
			width: 100%;
			display: grid;
			margin: 10px 0;
			justify-content: center;
			align-items: center;
			grid-template-columns: repeat(3,90px);
			grid-gap: 10px;
			grid-template-rows: 30px;
			.drawer-device-select-button{
				width: 100%;
				font-size: 16px;
				height: 30px;
				line-height: 30px;
				margin: 0 10px 0 0;
				padding: 0;
				background-color: #fff;
				color: black;
			}
		}
	}
</style>
