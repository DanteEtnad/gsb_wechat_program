<template>
	<view style="width:100%;height:100vh">
		<!-- <l-echart ref="chart"/> -->
		<map class="map" 
			:latitude="latitude" 
			:longitude="longitude" 
			:scale="scale"
			:enable-satellite="enableSatellite"
			:markers="markers"
		>
			<cover-view :class="classObj">
				<cover-view class="cover-alert-img">
					<cover-view style="margin-bottom: 20px;">
						预警图例
					</cover-view>
					<cover-view class="cover-alert-info">
						<cover-view style="width: 20px;height: 10px;background-color: #DC0129;margin-right:10px;border-radius: 2px;"></cover-view>
						<cover-view>一级</cover-view>
					</cover-view>
					<cover-view class="cover-alert-info">
						<cover-view style="width: 20px;height: 10px;background-color: #EB9A03;margin-right:10px;border-radius: 2px;"></cover-view>
						<cover-view>二级</cover-view>
					</cover-view>
					<cover-view class="cover-alert-info">
						<cover-view style="width: 20px;height: 10px;background-color: #FCF66A;margin-right:10px;border-radius: 2px;"></cover-view>
						<cover-view>三级</cover-view>
					</cover-view>
					<cover-view class="cover-alert-info">
						<cover-view style="width: 20px;height: 10px;background-color: #019EF5;margin-right:10px;border-radius: 2px;"></cover-view>
						<cover-view>四级</cover-view>
					</cover-view>
				</cover-view>
				<cover-view class="cover-potential-img">
					<cover-view style="margin-bottom: 20px;">
						隐患点图例
					</cover-view>
					<cover-view class="cover-potential-info-container">
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/滑坡.svg" class="cover-potential-icon"></cover-image>
							<cover-view>滑坡</cover-view>
						</cover-view>
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/崩塌.svg" class="cover-potential-icon"></cover-image>
							<cover-view>崩塌</cover-view>
						</cover-view>
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/泥石流.svg" class="cover-potential-icon"></cover-image>
							<cover-view>泥石流</cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="cover-potential-info-container">
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/地面塌陷.svg" class="cover-potential-icon"></cover-image>
							<cover-view>地面塌陷</cover-view>
						</cover-view>
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/地面沉降.svg" class="cover-potential-icon"></cover-image>
							<cover-view>地面沉降</cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="cover-potential-info-container">
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/地裂缝.svg" class="cover-potential-icon"></cover-image>
							<cover-view>地裂缝</cover-view>
						</cover-view>
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/不稳定斜坡.svg" class="cover-potential-icon"></cover-image>
							<cover-view>不稳定斜坡</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
			<cover-view style="display: flex;flex-direction: column;align-items: center;position: absolute;bottom: 50px;width:100%;">
				<cover-image src="../../static/Potential/icon_back.svg" 
					style="width: 32px;height: 32px;" 
					v-show="!isUp" 
					@click="showImage(true,'cover-info-container-active','location-active','full-active','more-active')"></cover-image>
				<cover-image src="../../static/Potential/icon_up.svg" 
					style="width: 32px;height: 32px;" 
					v-show="isUp" 
					@click="showImage(false,'cover-info-container','location','full','more')"></cover-image>
			</cover-view>
			<cover-view :class="locationClass" @click="getLocation">
				<cover-image src="../../static/Potential/定位.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
			<cover-view :class="fullClass">
				<cover-image src="../../static/Potential/全景.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
			<cover-view :class="moreClass"  @click="switchMap">
				<cover-image src="../../static/Potential/更多.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
		</map>
	</view>
</template>

<script>
	// import SHANTOU_AREA_BOUNDARY from '../../static/mapData/shantou-area-boundary.json'
	// import SHANTOU_TOWN_BOUNDARY from '../../static/mapData/shantou-town-boundary.json'
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min.js';
	import myEcharts from '@/components/mpvue-echarts/src/echarts.vue';
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue';
	// import { loadModules } from "esri-loader";
	import {request} from "@/utils/request.js"
	export default{
		components: {
			myEcharts,
			LEchart
		},
		data(){
			return{
				dataOption:{
					series: [
						{
							name: '汕头市地图',
							type: 'map',
							map: 'ShanTou',
							label: {
								show: true
							},
						}
					]
				},
				longitude: 116.713, 		//经度
				latitude: 23.222, 			//纬度
				scale: 9, 							//地图缩放程度
				address: '',
				isUp:false,
				classObj:['cover-info-container'],
				locationClass:['location'],
				fullClass:['full'],
				moreClass:['more'],
				markers:[],
				potentialPointData:[],
				enableSatellite:false,
				iconUrl:{
					"001":'../../static/Potential/不稳定斜坡.svg',
					"002":'../../static/Potential/滑坡.svg',
					"003":'../../static/Potential/崩塌.svg',
					"004":'../../static/Potential/泥石流.svg',
					"005":'../../static/Potential/地面塌陷.svg',
					"006":'../../static/Potential/地裂缝.svg',
					"007":'../../static/Potential/地面沉降.svg',
				}
			}
		},
		async mounted(){
			//this.init()
			console.log('地图')
			await this.getPotentialPointData()
		},
		methods:{
			initMapData(jsonData){
				let newData = jsonData
				for(let i=0;i<jsonData.features.length;i++){
					let geometry = jsonData.features[i].geometry
					if(geometry.type==="MultiPolygon"){
						console.log(jsonData.features[i].properties.name);
						console.log(geometry);
					}
					if(geometry.type==="Polygon"&&geometry.coordinates[0][0][0][0]){
						console.log(jsonData.features[i].properties.name);
						let newGeometry = []
						geometry.coordinates.forEach(item=>{
							newGeometry = [...newGeometry,...item[0]]
						})
						//console.log(newGeometry);
						newData.features[i].geometry.coordinates = [newGeometry]
					}
				}
				return newData
			},
			init(){
				const BOUNDARY = this.initMapData(SHANTOU_AREA_BOUNDARY)
				console.log(BOUNDARY);
				this.$refs.chart.init(echarts,async chart => {
					chart.showLoading()
					const data = await this.getData()
					chart.hideLoading()
					echarts.registerMap('ShanTou', BOUNDARY);
					const option = {
						series: [
							{
								name: '汕头市地图',
								type: 'map',
								map: 'ShanTou',
							}
						]
					}
					chart.setOption(option);
				})
				//this.$refs.chart.resize()
			},
			showImage(status,activeClassName,location,full,more){
				this.isUp = status
				this.classObj.pop()
				this.classObj.push(activeClassName)
				this.locationClass.pop()
				this.locationClass.push(location)
				this.fullClass.pop()
				this.fullClass.push(full)
				this.moreClass.pop()
				this.moreClass.push(more)
			},
			getPotentialPointData(){
				request({
					url:"potentialPointInfo/queryList",
					method:"post",
					data:{
						PotentialPointInfoQueryListReq:{},
						QueryPagingParamsReq:{
							"offset": 0,
							"queryCount": 9999
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.potentialPointData = res.data.PotentialPointInfoQueryListRsp
						let list = this.potentialPointData.map((potentialPoint,index)=>{
							if(potentialPoint.potentialPointLocationLatitude <= 90 && potentialPoint.potentialPointLocationLatitude >= -90 &&
								 potentialPoint.potentialPointLocationLongitude <= 180 && potentialPoint.potentialPointLocationLongitude >= -180){
									 return {
									 	id:index,
									 	longitude:potentialPoint.potentialPointLocationLongitude,
									 	latitude:potentialPoint.potentialPointLocationLatitude,
									 	title:potentialPoint.potentialPointName,
									 	iconPath:this.iconUrl[potentialPoint.potentialPointType],
									 	width:16,
									 	height:16
									 }
								 }
						}).filter(item=>typeof item!=='undefined')
						this.markers = [...list]
						console.log(this.markers);
					}
				})
			},
			switchMap(){
				this.enableSatellite = !this.enableSatellite
			},
			getData() {
				return new Promise(resolve => {
					uni.request({
						url: 'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/HK.json',
						success(res) {
							setTimeout(() => {
								resolve(res.data);
							}, 2000)
						}
					});
				});
			},
			getLocation(){
				uni.getLocation({
					type: 'gcj02',
					success: function (res) {
						console.log('当前：' + res);
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					},
					fail:function (error) {
						console.log(error);
					},
				});
			},
		},	
	}
</script>

<style lang="scss">
	.map{
		width:100%;
		height:100%;
		position: relative;
	}
	.icon-base{
		position: absolute;
		padding: 3px;
		background-color: rgba(255,255,255,.75);
		right: 10px;
		border-radius: 4px;
	}
	.location-active{
		@extend .icon-base;
		bottom:320px;
	}
	.full-active{
		@extend .icon-base;
		bottom:280px;
	}
	.more-active{
		@extend .icon-base;
		bottom:240px;
	}
	.location{
		@extend .icon-base;
		bottom:200px;
	}
	.full{
		@extend .icon-base;
		bottom:160px;
	}
	.more{
		@extend .icon-base;
		bottom:120px;
	}
	.cover-info-container-active{
		position: absolute;
		width: 100%;
		height: 180px;
		background-color: rgba(255,255,255,.75);
		border-radius: 20px;
		bottom: 40px;
		display: flex;
		.cover-alert-img{
			padding: 10px;
			flex:1;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cover-alert-info{
				margin-top: 5px;
				display: flex;
				align-items: center;
			}
		}
		.cover-potential-img{
			padding: 10px;
			flex:2;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cover-potential-info-container{
				display: flex;
				.cover-potential-info{
					display: flex;
					align-items: center;
					font-size: 14px;
					margin: 7px;
					.cover-potential-icon{
						width:16px;
						height:16px;
						margin-right:7px;
					}
				}
			}
		}
	}
	.cover-info-container{
		position: absolute;
		width: 100%;
		height: 180px;
		background-color: rgba(255,255,255,.75);
		border-radius: 20px;
		bottom: -80px;
		display: flex;
		.cover-alert-img{
			padding: 10px;
			flex:1;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cover-alert-info{
				margin-top: 5px;
				display: flex;
				align-items: center;
			}
		}
		.cover-potential-img{
			padding: 10px;
			flex:2;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cover-potential-info-container{
				display: flex;
				.cover-potential-info{
					display: flex;
					align-items: center;
					font-size: 14px;
					margin: 7px;
					.cover-potential-icon{
						width:16px;
						height:16px;
						margin-right:7px;
					}
				}
			}
		}
	}
</style>