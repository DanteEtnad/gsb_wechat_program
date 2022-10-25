<template>
	<view style="width:100%;height:700px;">
		<map 
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
				latitude: 23.2785,
				longitude: 116.732805,
				scale: 9.5, 							//地图缩放程度
				enableSatellite:false,
				locationClass:['location'],
				fullClass:['full'],
				moreClass:['more'],
				markers:[],
				enableSatellite:false,	
				
			}
			
			
		},
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.latitude= data.latitude
				this.longitude=data.longitude
				console.log("this.latitude",this.latitude)
				console.log("this.longitude",this.longitude)
			})
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
				this.markers=[{
						id:0,
						longitude:this.longitude,
						latitude:this.latitude,
						title:'位置',
						iconPath:'../../static/Potential/locate.svg',
						width:32,
						height:32,
				}]
				console.log("markers",this.markers)
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