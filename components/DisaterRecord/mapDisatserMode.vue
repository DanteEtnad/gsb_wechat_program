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
			<cover-view :class="locationClass" @click="getLocation">
				<cover-image src="../../static/Potential/locate.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
			<cover-view :class="fullClass">
				<cover-image src="../../static/Potential/view.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
			<cover-view :class="moreClass" @click="switchMap">
				<cover-image src="../../static/Potential/more.svg" style="width:20px;height:20px;" ></cover-image>
			</cover-view>
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
				latitude: this.DisasterInfoQueryData.disasterLatitude,
				longitude: this.DisasterInfoQueryData.disasterLongitude,
				scale: 9.5, 							//地图缩放程度
				enableSatellite:false,
				locationClass:['location'],
				fullClass:['full'],
				moreClass:['more'],
				markers:[],
				enableSatellite:false,
				iconUrl:{
					"001":'../../static/Potential/buwending.svg',
					"002":'../../static/Potential/huapo.svg',
					"003":'../../static/Potential/bengta.svg',
					"004":'../../static/Potential/nishiliu.svg',
					"005":'../../static/Potential/dimiantaxian.svg',
					"006":'../../static/Potential/diliefeng.svg',
					"007":'../../static/Potential/dimianchenjiang.svg',
				},
			}
			
			
		},
		async mounted(){
			console.log('地图')
			await this.showLocation()
		},
		methods:{
			switchMap(){
				this.enableSatellite = !this.enableSatellite
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
					type: 'gcj02',	
				}).then(res=>{
					console.log(res)
					uni.createMapContext('map',this).moveToLocation({
						longitude:this.DisasterInfoQueryData.disasterLongitude,
						latitude:this.DisasterInfoQueryData.disasterLatitude,
					})
				})
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