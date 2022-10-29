<template>
	<view style="width:100%;height:250px;">
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
		</map>
		
	</view>
</template>

<script>
	import {request} from "@/utils/request.js"
	export default {
		data() {
			return {
				// latitude: 23.2785,
				// longitude: 116.732805,
				scale: 9.5, 							//地图缩放程度
				enableSatellite:false,
				locationClass:['location'],
				fullClass:['full'],
				moreClass:['more'],
				markers:[],
				enableSatellite:false,	
				
			}
			
			
		},
		async mounted(){
			console.log('定位')
			await this.getLocation()
		},
		methods:{
			switchMap(){
				this.enableSatellite = !this.enableSatellite
			},
			getLocation(){
				uni.getLocation({
					type: 'gcj02',	
				}).then(res=>{
					console.log("位置",res)
					uni.createMapContext('map',this).moveToLocation()
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