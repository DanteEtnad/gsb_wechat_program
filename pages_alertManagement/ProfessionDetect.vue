<template>
	<view style="width:100%;height:100vh">
		<map class="map" 
			id="map"
			:latitude="latitude" 
			:longitude="longitude" 
			:scale="scale"
			:markers="markers"
			:enable-satellite="enableSatellite"
			:show-location="true"
			@markertap="bindmarkertap"
		>
			<view class="cover-container" @click="showImage('location-active','full-active','more-active')" v-if="showPoint">
				<view class="cover-detect-type">
					<image src="/static/Potential/online.svg" class="cover-detect-type-icon"></image>
					<view>
						在线监测点
					</view>
				</view>
				<view class="cover-detect-type">
					<image src="/static/Potential/outline.svg" class="cover-detect-type-icon"></image>
					<view>
						离线监测点
					</view>
				</view>
			</view>
			<view :class="locationClass" @click="getLocation">
				<image src="/static/Potential/locate.svg" style="width:20px;height:20px;"></image>
			</view>
			<view :class="fullClass" @click="showMap">
				<image src="/static/Potential/view.svg" style="width:20px;height:20px;"></image>
			</view>
			<view :class="moreClass" @click="switchMap">
				<image src="/static/Potential/more.svg" style="width:20px;height:20px;"></image>
			</view>
			<scroll-view class="pop-container" v-if="isDataVisible" scroll-y="true">
        <button @click="cloesPop">关闭窗口</button>
				<view style="width: 100%;position: sticky;top: 0;background-color: #fff;">
					<u-tabs :list="list" :scrollable="false" @click="swtichComponent"/>
				</view>
				<DetectData :selectedPotentialPoint="selectedMonitorDevice" v-if="showComponent===0"/>
				<DetectInfo :selectedPotentialPoint="selectedMonitorDevice" v-if="showComponent===1"/>
				<DetectPicture :selectedPotentialPoint="selectedMonitorDevice" v-if="showComponent===2"/>
			</scroll-view>
		</map>
	</view>
</template>

<script>
	import DetectData from "@/pages_alertManagement/components/professionDetect/DetectData.vue"
	import DetectInfo from "@/pages_alertManagement/components/professionDetect/DetectInfo.vue"
	import DetectPicture from "@/pages_alertManagement/components/professionDetect/DetectPicture.vue"
	import { request } from "@/utils/request"
	// import { loadModules } from "esri-loader";
	export default{
		components:{
			DetectData,
			DetectInfo
		},
		data(){
			return{
				mapContext:null,
				showPoint:true,
				list:[{name:'监测点数据'},{name:'监测点信息'},{name:'监测点照片'}],
				longitude: 116.713, 		//经度
				latitude: 23.222, 			//纬度
				scale: 9, 							//地图缩放程度
				address: '',
				locationClass:['location'],
				fullClass:['full'],
				moreClass:['more'],
				showComponent:0,
				potentialPointData:[],
				monitorDeviceData:[],
				isDataVisible:false,
				selectedPotentialPoint:{},
				selectedMonitorDevice:{},
				markers:[],
				enableSatellite:false
			}
		},
		async mounted(){
			this.mapContext = uni.createMapContext("map",this)
			console.log('地图')
			await this.getMonitorDeviceData()
		},
		methods:{
			showImage(location,full,more){
				this.locationClass.pop()
				this.locationClass.push(location)
				this.fullClass.pop()
				this.fullClass.push(full)
				this.moreClass.pop()
				this.moreClass.push(more)
			},
			getMonitorDeviceData(){
				uni.showLoading({
					title: '加载中'
				});
				request({
					url:"monitorDevice/query",
					method:"post",
					data:{
						MonitorDeviceQueryReq:{
							monitorDeviceManufacturersType:""
						},
						QueryOffsetReq:{
							"offset": 0,
							"queryCount": 99999
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						uni.hideLoading();
						uni.showToast({
							title: `加载完成`,
							duration: 2000
						});
						this.monitorDeviceData = res.data.MonitorDeviceQueryRsp
						let list = this.monitorDeviceData.map((monitorDevice,index)=>{
							if(monitorDevice.latitude <= 90 && monitorDevice.latitude >= -90 &&
								 monitorDevice.longitude <= 180 && monitorDevice.longitude >= -180){
									 return{
									 	id:index,
									 	longitude:monitorDevice.longitude,
									 	latitude:monitorDevice.latitude,
									 	title:monitorDevice.deviceName,
									 	iconPath:monitorDevice.deviceStatus==="1"?"/static/Potential/online.png":"/static/Potential/outline.png",
									 	width:16,
									 	height:16
									 }
								 }
						}).filter(item=>typeof item!=='undefined')
						this.markers = [...list]
						console.log("标记点",this.markers)
						uni.showToast({
							title: `找到${this.markers.length}个监测点`,
							duration: 2000
						});
					}
				})
			},
			switchMap(){
				this.enableSatellite = !this.enableSatellite
			},
			test(e){
				console.log(e);
			},
			bindmarkertap(e){
				this.showPoint = false
				this.showImage('location-active','full-active','more-active')
				const id = e.detail.markerId
				console.log(e.detail.markerId);
				this.selectedMonitorDevice = this.monitorDeviceData[id]
				this.isDataVisible = true
				console.log(this.selectedMonitorDevice);
			},
			swtichComponent(item){
				this.showComponent = item.index
			},
			getLocation(){
				this.mapContext.moveToLocation()
				uni.getLocation({
					type: 'gcj02'
				}).then(res=>{
					console.log("位置",res)
				})
			},
			showMap(){
				uni.createMapContext("map",this).moveToLocation({
					longitude:113.75,
					latitude:22.6,
				})
				this.scale = 6;
			},
      cloesPop(){
        this.showPoint = true
        this.isDataVisible = false
				this.showImage('location','full','more')
      }
		}
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
		height: 20px;
		background-color: rgba(255,255,255,.75);
		right: 10px;
		border-radius: 4px;
	}
	.location-active{
		@extend .icon-base;
		bottom:600px;
	}
	.full-active{
		@extend .icon-base;
		bottom:560px;
	}
	.more-active{
		@extend .icon-base;
		bottom:520px;
	}
	.location{
		@extend .icon-base;
		bottom:130px;
	}
	.full{
		@extend .icon-base;
		bottom:90px;
	}
	.more{
		@extend .icon-base;
		bottom:50px;
	}
	.cover-container{
		position: absolute;
		width: 100%;
		bottom: 0;
		background-color: rgba(255,255,255,.75);
		border-radius: 20px;
		display: flex;
		justify-content: space-evenly;
		.cover-detect-type{
			padding: 10px;
			display: flex;
			align-items: center;
			.cover-detect-type-icon{
				width: 16px;
				height: 16px;
			}
		}
	}
	.pop-container{
		background-color: #fff;
		height: 500px;
		width: 100%;
		bottom: 0;
		border-radius: 20px;
		box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.08);
		position: absolute;
	}
</style>