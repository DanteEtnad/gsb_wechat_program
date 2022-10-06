<template>
	<view style="width:100%;height:100vh">
		<map class="map" 
			:latitude="latitude" 
			:longitude="longitude" 
			:scale="scale"
			:markers="markers"
			:enable-satellite="enableSatellite"
			@markertap="bindmarkertap"
		>
			<cover-view class="cover-container" @click="showImage('location-active','full-active','more-active')">
				<cover-view class="cover-detect-type">
					<cover-image src="../../static/Potential/online.svg" class="cover-detect-type-icon"></cover-image>
					<cover-view>
						在线监测点
					</cover-view>
				</cover-view>
				<cover-view class="cover-detect-type">
					<cover-image src="../../static/Potential/outline.svg" class="cover-detect-type-icon"></cover-image>
					<cover-view>
						离线监测点
					</cover-view>
				</cover-view>
			</cover-view>
			<cover-view :class="locationClass">
				<cover-image src="../../static/Potential/定位.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
			<cover-view :class="fullClass">
				<cover-image src="../../static/Potential/全景.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
			<cover-view :class="moreClass" @click="switchMap">
				<cover-image src="../../static/Potential/更多.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
			<scroll-view class="pop-container" v-if="isDataVisible" scroll-y="true">
				<view style="width: 100%;position: sticky;top: 0;background-color: #fff;">
					<u-tabs :list="list" :scrollable="false" @click="swtichComponent"/>
				</view>
				<DetectData :selectedPotentialPoint="selectedPotentialPoint" v-if="showComponent===0"/>
				<DetectInfo :selectedPotentialPoint="selectedPotentialPoint" v-if="showComponent===1"/>
				<DetectPicture :selectedPotentialPoint="selectedPotentialPoint" v-if="showComponent===2"/>
			</scroll-view>
		</map>
	</view>
</template>

<script>
	import DetectData from "@/components/professionDetect/DetectData.vue"
	import DetectInfo from "@/components/professionDetect/DetectInfo.vue"
	import DetectPicture from "@/components/professionDetect/DetectPicture.vue"
	import { request } from "../../utils/request"
	// import { loadModules } from "esri-loader";
	export default{
		components:{
			DetectData,
			DetectInfo
		},
		data(){
			return{
				list:[{name:'监测点数据'},{name:'监测点信息'},{name:'监测点照片'}],
				longitude: 116.713, 		//经度
				latitude: 23.222, 			//纬度
				scale: 9, 							//地图缩放程度
				address: '',
				locationClass:['location'],
				fullClass:['full'],
				moreClass:['more'],
				// showComponent:[
				// 	{
				// 		name:'DetectData',
				// 		status:true
				// 	},
				// 	{
				// 		name:'DetectInfo',
				// 		status:false
				// 	},
				// 	{
				// 		name:'DetectPicture',
				// 		status:false
				// 	},
				// ],
				showComponent:0,
				potentialPointData:[],
				isDataVisible:false,
				selectedPotentialPoint:{},
				markers:[],
				enableSatellite:false
			}
		},
		async mounted(){
			console.log('地图')
			await this.getPotentialPointData()
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
						let list = []
						this.potentialPointData.map((potentialPoint,index)=>{
							if(potentialPoint.potentialPointLocationLatitude <= 90 && potentialPoint.potentialPointLocationLatitude >= -90 &&
								 potentialPoint.potentialPointLocationLongitude <= 180 && potentialPoint.potentialPointLocationLongitude >= -180){
									 list.push({
									 	id:index,
									 	longitude:potentialPoint.potentialPointLocationLongitude,
									 	latitude:potentialPoint.potentialPointLocationLatitude,
									 	title:potentialPoint.potentialPointName,
									 	iconPath:potentialPoint.ifMonitorPoint==="Y"?"../../static/Potential/online.svg":"../../static/Potential/outline.svg",
									 	width:16,
									 	height:16
									 })
								 }
						})
						this.markers = [...list]
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
				this.showImage('location-active','full-active','more-active')
				const id = e.detail.markerId
				console.log(e.detail.markerId);
				this.selectedPotentialPoint = this.potentialPointData[id]
				this.isDataVisible = true
				console.log(this.selectedPotentialPoint);
			},
			swtichComponent(item){
				this.showComponent = item.index
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