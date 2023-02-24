<template>
	<view>
		<view class="data-container">
			<view class="data-header">
				<uni-datetime-picker v-model="dataTime" type="daterange"/>
				<view class="data-header-select">
					<uni-data-checkbox mode="tag" v-model="selectTimeType" :localdata="timeType" selectedColor="#2E9BFF"/>
					<button @click="open">要素</button>
				</view>
				<uni-drawer ref="drawer" mode="left" :mask-click="true" width="350">
					<scroll-view scroll-y="true" class="drawer-device-container">
						<button @click="close">关闭窗口</button>
						<view style="text-align: center;padding: 20px 0;" v-if="deviceTreeList.length===0">
							<h1>暂无数据</h1>
						</view>
						<view class="drawer-device-info" v-for="device in deviceTreeList" :key="device.deviceId">
							<view class="drawer-device-title">
								<view>{{device.deviceName}}</view>
							</view>
							<view class="drawer-device-select" v-if="device.DescriptionJson.length>0">
								<button class="drawer-device-select-button" v-for="(des,index) in device.DescriptionJson" :key="index" @click="getDeviceData(des.id,des.monitorIndexId,des.name)">
									<text>{{des.name}}</text>
								</button>
							</view>
              <view v-else>暂无数据</view>
						</view>
					</scroll-view>
				</uni-drawer>
			</view>
			<view class="echarts-wrap">
				<!-- <myEcharts id="main" ref="mapChart" :echarts="echarts" :onInit="initChart" /> -->
				<l-echart ref="chart"/>
			</view>
		</view>
	</view>
</template>

<script>
	// import echarts from '@/pages_alertManagement/components/echarts.min.js';
	import * as echarts from '@/pages_alertManagement/components/echarts.min.js';
	// import myEcharts from '@/components/mpvue-echarts/src/echarts.vue';
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue';
	import {getNowDateMixins} from "@/utils/mixins.js"
	import {request} from "@/utils/request.js"
	export default {
		components: {
			// myEcharts,
			LEchart
		},
		mixins:[getNowDateMixins],
		props:['selectedPotentialPoint'],
		data() {
			return {
				echarts,
				deviceMenuList:[],
				deviceTreeList: [],
				selectTimeType:'',
				dataTime: [],
				deviceTime:[],
				deviceData:[],
				dataOption:{
					dataset: {
						source: [
							[],
							[]
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
					dataZoom: [
					    //1.横向使用滚动条
					    // {
					    //     type: 'slider',//有单独的滑动条，用户在滑动条上进行缩放或漫游。inside是直接可以是在内部拖动显示
					    //     show: false,//是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
					    //     start: 0,//数据窗口范围的起始百分比0-100
					    //     end: 50,//数据窗口范围的结束百分比0-100
					    //     xAxisIndex: [0],// 此处表示控制第一个xAxis，设置 dataZoom-slider 组件控制的 x轴 可是已数组[0,2]表示控制第一，三个；xAxisIndex: 2 ，表示控制第二个。yAxisIndex属性同理
					    //     bottom: -10 //距离底部的距离
					    // },
					    //2.在内部可以横向拖动
					    {
					        type: 'inside',// 内置于坐标系中
					        start: 0,
					        end: 30,
					        xAxisIndex: [0]
					    },
					    //3.纵向使用滚动条
					    // {
					    //     type: 'slider',
					    //     show: false,
					    //     yAxisIndex: [0],//设置组件控制的y轴
					    //     left: '93%',//距离左侧的距离 可以使百分比，也可以是像素 left: '30'（30像素）
					    //     start: 29,
					    //     end: 36
					    // },
					    //4.在内部可以纵向拖动
					    // {
					    //     type: 'inside',
					    //     yAxisIndex: [0],
					    //     start: 29,
					    //     end: 36
					    // }
					],
					series: [{
						type: "line",
						seriesLayoutBy: "row",
					}]
				},
				queryForm: {
					monitorDataId:'',
					monitorIndexId:'',
					startTime:`${this.getNowDate(0)} 00:00:00`,
					endTime:'',
					monitorType:''
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
				],
				selectedDes:{
					id:"",
					monitorIndexId:"",
					name:"",
					status:false
				}
			}
		},
		watch:{
			selectedPotentialPoint:{
				deep:true,
				handler(newValue,oldValue){
					this.init()
					const id = newValue.potentialPointId
					this.getDeviceIndexTree(id)
				}
			},
			selectTimeType:{
				deep:true,
				handler(newValue){
					let now = new Date()
					let year = now.getFullYear()
					let month = now.getMonth()+1
					let day = now.getDate()
					month = month < 10 ? '0' + month : month
					day = day < 10 ? '0' + day : day
					if(newValue==='0'){
						this.queryForm.startTime = `${this.getNowDate(0)} 00:00:00`
						this.dataTime = [`${this.getNowDate(-1)}`,`${this.getNowDate(0)}`]
					}
					if(newValue==='1'){
						this.queryForm.startTime = `${this.getNowDate(-7)} 00:00:00`
						this.dataTime = [`${this.getNowDate(-7)}`,`${this.getNowDate(0)}`]
					}
					if(newValue==='2'){
						this.queryForm.startTime = `${year}-${month}-01 00:00:00`
						this.dataTime = [`${year}-${month}-01`,`${this.getNowDate(0)}`]
					}
					console.log(this.queryForm);
					console.log(this.dataTime);
					this.changeDeviceData()
				}
			}
		},
		onReady() {
			uni.hideHomeButton()
		},
		mounted() {
			this.init()
			const id = this.selectedPotentialPoint.potentialPointId
			console.log("加载了");
			this.getDeviceIndexTree(id)
		},
		methods: {
			init(){
				this.$refs.chart.init(echarts,chart=>{
					chart.setOption({
						dataset: {
							source: [
								[],
								[]
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
						dataZoom: [
						    //1.横向使用滚动条
						    // {
						    //     type: 'slider',//有单独的滑动条，用户在滑动条上进行缩放或漫游。inside是直接可以是在内部拖动显示
						    //     show: true,//是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
						    //     start: 0,//数据窗口范围的起始百分比0-100
						    //     end: 50,//数据窗口范围的结束百分比0-100
						    //     xAxisIndex: [0],// 此处表示控制第一个xAxis，设置 dataZoom-slider 组件控制的 x轴 可是已数组[0,2]表示控制第一，三个；xAxisIndex: 2 ，表示控制第二个。yAxisIndex属性同理
						    //     bottom: -10 //距离底部的距离
						    // },
						    //2.在内部可以横向拖动
						    {
						        type: 'inside',// 内置于坐标系中
						        start: 0,
						        end: 30,
						        xAxisIndex: [0]
						    },
						    //3.纵向使用滚动条
						    // {
						    //     type: 'slider',
						    //     show: true,
						    //     yAxisIndex: [0],//设置组件控制的y轴
						    //     left: '93%',//距离左侧的距离 可以使百分比，也可以是像素 left: '30'（30像素）
						    //     start: 29,
						    //     end: 36
						    // },
						    //4.在内部可以纵向拖动
						    // {
						    //     type: 'inside',
						    //     yAxisIndex: [0],
						    //     start: 29,
						    //     end: 36
						    // }
						],
						series: [{
							type: "line",
							seriesLayoutBy: "row",
						}]
					});
				})
				this.$refs.chart.resize({width: 375, height: 300})
				// this.$refs.chart.resize({width: 100vh, height: 100vh})
				// this.$refs.chart.resize()
			},
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
				//this.$refs.mapChart.setChart(chart)
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
            const description = item.monitorIndexItemList[0].monitorDescriptionJson===''?{}:JSON.parse(item.monitorIndexItemList[0].monitorDescriptionJson);
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
			},
			getDeviceData(id,monitorIndexId,name){
				this.selectedDes.id = id
				this.selectedDes.monitorIndexId = monitorIndexId
				this.selectedDes.name = name
				this.selectedDes.status = true
				let deviceData = []
				let deviceTime = []
				this.close()
				deviceData.push(name)
				deviceTime.push('type')
				this.queryForm.monitorIndexId = monitorIndexId
				this.$refs.chart.showLoading()
				request({
					url:'monitorDevice/queryMonitorData',
					method:'post',
					data:{
						MonitorDataQueryReq:this.queryForm
					}
				})
				.then(res=>{
					if(res.code === 2000){
						res.data.MonitorDataQueryRsp.map(item=>{
							deviceData.push(item.dataObject[id])
							deviceTime.push(item.monitorDataTime)
						})
						this.deviceData = deviceData
						this.deviceTime = deviceTime
						console.log(this.deviceData);
						console.log(this.deviceTime);
						this.dataOption.dataset.source[1] = this.deviceData
						this.dataOption.dataset.source[0] = this.deviceTime
						setTimeout(()=>{
							console.log(this.dataOption);
							this.$refs.chart.hideLoading()
							this.$refs.chart.setOption(this.dataOption,true)
						},1000)
						
					}
				})
			},
			changeDeviceData(){
				if(this.selectedDes.status){
					this.getDeviceData(this.selectedDes.id,this.selectedDes.monitorIndexId,this.selectedDes.name)
				}
			}
		}
	}
</script>

<style lang="scss">
	.echarts-wrap {
		width: 300px;
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
