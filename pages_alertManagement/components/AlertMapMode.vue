<template>
	<view style="width:100%;height:100vh">
		<!-- <l-echart ref="chart"/> -->
		<map class="map" 
			id="map"
			:latitude="latitude" 
			:longitude="longitude" 
			:scale="scale"
			:enable-satellite="enableSatellite"
			:markers="markers"
			:show-location="true"
		>
			<view :class="classObj">
				<view class="cover-alert-img">
					<view style="margin-bottom: 20px;">
						预警图例
					</view>
					<view class="cover-alert-info">
						<view style="width: 20px;height: 10px;background-color: #DC0129;margin-right:10px;border-radius: 2px;"></view>
						<view>一级</view>
					</view>
					<view class="cover-alert-info">
						<view style="width: 20px;height: 10px;background-color: #EB9A03;margin-right:10px;border-radius: 2px;"></view>
						<view>二级</view>
					</view>
					<view class="cover-alert-info">
						<view style="width: 20px;height: 10px;background-color: #019EF5;margin-right:10px;border-radius: 2px;"></view>
						<view>三级</view>
					</view>
					<view class="cover-alert-info">
						<view style="width: 20px;height: 10px;background-color: #01F51E;margin-right:10px;border-radius: 2px;"></view>
						<view>四级</view>
					</view>
				</view>
				<view class="cover-potential-img">
					<view style="margin-bottom: 20px;">
						隐患点图例
					</view>
					<view class="cover-potential-info-container">
						<view class="cover-potential-info">
							<image src="/static/Potential/huapo.svg" class="cover-potential-icon"></image>
							<view>滑坡</view>
						</view>
						<view class="cover-potential-info">
							<image src="/static/Potential/bengta.svg" class="cover-potential-icon"></image>
							<view>崩塌</view>
						</view>
						<view class="cover-potential-info">
							<image src="/static/Potential/nishiliu.svg" class="cover-potential-icon"></image>
							<view>泥石流</view>
						</view>
					</view>
					<view class="cover-potential-info-container">
						<view class="cover-potential-info">
							<image src="/static/Potential/dimiantaxian.svg" class="cover-potential-icon"></image>
							<view>地面塌陷</view>
						</view>
						<view class="cover-potential-info">
							<image src="/static/Potential/dimianchenjiang.svg" class="cover-potential-icon"></image>
							<view>地面沉降</view>
						</view>
					</view>
					<view class="cover-potential-info-container">
						<view class="cover-potential-info">
							<image src="/static/Potential/diliefeng.svg" class="cover-potential-icon"></image>
							<view>地裂缝</view>
						</view>
						<view class="cover-potential-info">
							<image src="/static/Potential/buwending.svg" class="cover-potential-icon"></image>
							<view>不稳定斜坡</view>
						</view>
					</view>
				</view>
			</view>
			<view style="display: flex;flex-direction: column;align-items: center;position: absolute;bottom: 50px;width:100%;">
				<image src="/static/Potential/icon_back.svg" 
					style="width: 32px;height: 32px;" 
					v-show="!isUp" 
					@click="showImage(true,'cover-info-container-active','location-active','full-active','more-active')"></image>
				<image src="/static/Potential/icon_up.svg" 
					style="width: 32px;height: 32px;" 
					v-show="isUp" 
					@click="showImage(false,'cover-info-container','location','full','more')"></image>
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
		</map>
	</view>
</template>

<script>

	import {request} from "@/utils/request.js"
	export default{
		components: {

		},
		props:['isAlert','mapUrl'],
		data(){
			return{
				mapContext:null,
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
					"001":'/static/Potential/buwending.png',
					"002":'/static/Potential/huapo.png',
					"003":'/static/Potential/bengta.png',
					"004":'/static/Potential/nishiliu.png',
					"005":'/static/Potential/dimiantaxian.png',
					"006":'/static/Potential/diliefeng.png',
					"007":'/static/Potential/dimianchenjiang.png',
				}
			}
		},
		async mounted(){
			console.log('地图')
			//await this.getPotentialPointData()
			this.mapContext = uni.createMapContext("map",this)
		},
		methods:{
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
						if(this.isAlert){
							this.addAlertMap()
						}
					}
				})
			},
			switchMap(){
				this.enableSatellite = !this.enableSatellite
			},
			getLocation(){
				this.mapContext.moveToLocation()
				uni.getLocation({
					type: 'gcj02'
				}).then(res=>{
					console.log(res)
				})
			},
			addAlertMap(){
				uni.createMapContext("map",this).addGroundOverlay({
					id:114514,
					src:this.mapUrl,
					bounds:{
						southwest:{
							longitude:116.10,
							latitude:22.95
						},
						northeast:{
							longitude:117.15,
							latitude:23.7
						}
					}
				})
				.then(res=>{
					console.log(res);
				})
			},
			showMap(){
				uni.createMapContext("map",this).moveToLocation({
					longitude:113.75,
					latitude:22.6,
				})
				this.scale = 6;
			}
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
		height: 20px;
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