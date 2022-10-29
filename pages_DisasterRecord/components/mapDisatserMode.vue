<template>
	<view style="width:100%;height:250px">
		<map 
			:show-location="true"
			id="map"
			class="map"
			:latitude="latitude" 
			:longitude="longitude" 
			:enable-satellite="enableSatellite"
			:scale="scale"
			:markers="markers"
			>
			<view :class="locationClass" @click="getLocation">
				<image src="/static/Potential/locate.svg" style="width:20px;height:20px;"></image>
			</view>
			<view :class="fullClass" @click="goDisaster">
				<image src="/static/Potential/view.svg" style="width:20px;height:20px;"></image>
			</view>
			<view :class="moreClass" @click="switchMap">
				<image src="/static/Potential/more.svg" style="width:20px;height:20px;" ></image>
			</view>
		</map>
		
	</view>
</template>

<script>
	import {request} from "@/utils/request.js"
	export default {
		props:{
			DisasterInfoQueryData:'',
			
		},
		data() {
			return {
				latitude: '26',
				longitude: '113',
				scale: 9.5, 							//地图缩放程度
				enableSatellite:false,
				locationClass:['location'],
				fullClass:['full'],
				moreClass:['more'],
				markers:[],
				location:[],
				iconUrl:{
					"001":'/static/Potential/buwending.png',
					"002":'/static/Potential/huapo.png',
					"003":'/static/Potential/bengta.png',
					"004":'/static/Potential/nishiliu.png',
					"005":'/static/Potential/dimiantaxian.png',
					"006":'/static/Potential/diliefeng.png',
					"007":'/static/Potential/dimianchenjiang.png',
				},
			}
			
			
		},
		async mounted(){
			console.log('地图')
			await this.showLocation()
			this.mapContext = uni.createMapContext("map",this)
		},
		methods:{
			switchMap(){
				this.enableSatellite = !this.enableSatellite
			},
			goDisaster(){
				console.log("信息",this.DisasterInfoQueryData)
				this.latitude=Number(this.DisasterInfoQueryData.disasterLatitude)
				this.longitude=Number(this.DisasterInfoQueryData.disasterLongitude)
				console.log("经纬度位置",this.latitude)
				uni.createMapContext("map", this).moveToLocation({
									latitude: this.latitude,
									longitude: this.longitude,
								});
			},
			showLocation(){
				this.latitude=this.DisasterInfoQueryData.disasterLatitude
				this.longitude=this.DisasterInfoQueryData.disasterLongitude
				let icon=this.iconUrl[this.DisasterInfoQueryData.disasterRecordType]
				console.log("icon",icon)
				this.markers=[{
						id:0,
						longitude:this.DisasterInfoQueryData.disasterLongitude,
						latitude:this.DisasterInfoQueryData.disasterLatitude,
						title:this.DisasterInfoQueryData.disasterLocation,
						iconPath:this.iconUrl[this.DisasterInfoQueryData.disasterRecordType],
						width:32,
						height:32,
				}]
				console.log("markers",this.markers)
			},

			getLocation(){
				
				uni.getLocation({
					type: 'gcj02'
				}).then(res=>{
					this.location=res
				})
				this.mapContext.moveToLocation()
			},
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
	.location{
		@extend .icon-base;
		bottom:80px;
	}
	.full{
		@extend .icon-base;
		bottom:50px;
	}
	.more{
		@extend .icon-base;
		bottom:20px;
	}
</style>