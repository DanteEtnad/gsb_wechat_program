<template>
	<view style="width: 750rpx;height: 800px;" id="myMapView">
		<map style="width:100%;height:100%;" 
			:latitude="latitude" 
			:longitude="longitude" 
			:scale="scale"
		>
		</map>
	</view>
</template>

<script>
	// import { loadModules } from "esri-loader";
	export default{
		data(){
			return{
				longitude: 116.713, 		//经度
				latitude: 23.422, 			//纬度
				scale: 14, 							//地图缩放程度
				address: ''
			}
		},
		mounted(){
			console.log('地图')
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
</style>