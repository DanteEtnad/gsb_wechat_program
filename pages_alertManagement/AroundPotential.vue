<template>
	<view style="width:100%;height:100vh">
		<map class="map" 
			id="map"
			:latitude="latitude" 
			:longitude="longitude" 
			:scale="scale"
			:enable-satellite="enableSatellite"
			:markers="markers"
			:show-location="true"
			@markertap="bindmarkertap"
			@tap="bindtap"
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
						<view style="width: 20px;height: 10px;background-color: #FCF66A;margin-right:10px;border-radius: 2px;"></view>
						<view>三级</view>
					</view>
					<view class="cover-alert-info">
						<view style="width: 20px;height: 10px;background-color: #019EF5;margin-right:10px;border-radius: 2px;"></view>
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
			<view style="display: flex;flex-direction: column;align-items: center;position: absolute;bottom: 5px;width:100%;">
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
			<view>
				<uni-search-bar 
					cancelButton="none" 
					placeholder="请输入隐患点信息，如地点名称..." 
					radius="20" 
					bgColor="#EEEEEE" 
					v-model="potentialPointName" 
					@blur="getPotentialPointData"
				/>
			</view>
			<uni-popup ref="popup">
				<scroll-view class="potential-point-info-container" scroll-y="true" v-if="isDialogVisible">
					<view class="potential-point-info-title">
						隐患点：{{selectedPotentialPoint.potentialPointId}}
					</view>
					<view class="potential-point-info-row">
						<view>隐患点编号：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.potentialPointId}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>隐患点名称：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.potentialPointName}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>隐患点类型：</view>
						<view class="potential-point-info-main">{{dataCodeTransform(selectedPotentialPoint.potentialPointType,'potentialPointTypes')}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>隐患点状态：</view>
						<view class="potential-point-info-main">{{dataCodeTransform(selectedPotentialPoint.potentialPointStatus,'potentialPointStatuses')}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>行业分类：</view>
						<view class="potential-point-info-main">{{dataCodeTransform(selectedPotentialPoint.industyType,'potentialPointIndustryTypes')}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>危害性：</view>
						<view class="potential-point-info-main">{{dataCodeTransform(selectedPotentialPoint.potentialPointLevel.toString(),'potentialPointLevels')}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>稳定性：</view>
						<view class="potential-point-info-main">{{dataCodeTransform(selectedPotentialPoint.potentialPointStability,'potentialPointStabilitys')}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>灾害体规模：</view>
						<view class="potential-point-info-main">{{dataCodeTransform(selectedPotentialPoint.hazardScale||" ",'potentialPointHazardScales')}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>体积：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.potentialPointVolume}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>威胁人口：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.disasterPointThreatenPopulation}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>威胁财产：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.disasterPointThreatenProperty}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>隐患点描述：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.potentialPointDescription}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>地点：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.potentialPointLocation}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>位置描述：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.potentialPointLocation}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>经度：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.potentialPointLocationLongitude}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>纬度：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.potentialPointLocationLatitude}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>X：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint['X-coordinate']}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>Y：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint['Y-coordinate']}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>死亡人口：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.disasterPointPopulationDead}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>监测人：</view>
						<view class="potential-point-info-main">{{memberList[selectedPotentialPoint.monitorPointMemberId]}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>监测人联系方式：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.monitorPointMemberPhone}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>监测点描述：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.monitorPointDescription}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>上报人：</view>
						<view class="potential-point-info-main">{{memberList[selectedPotentialPoint.potentialPointEstablishMemberId]}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>上报方式：</view>
						<view class="potential-point-info-main">{{dataCodeTransform(selectedPotentialPoint.potentialPointEstablishWay,'potentialPointEstablishWays')}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>排查编号：</view>
						<view class="potential-point-info-main">{{selectedPotentialPoint.screenNumber||" "}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>上报时间：</view>
						<view>{{timeTransform(selectedPotentialPoint.discoveryTime)}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>发现时间：</view>
						<view>{{timeTransform(selectedPotentialPoint.discoveryTime)}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>排查时间：</view>
						<view>{{timeTransform(selectedPotentialPoint.screenTime)}}</view>
					</view>
					<view class="potential-point-info-row">
						<view>图片：</view>
						<view class="potential-point-info-main"></view>
					</view>
				</scroll-view>
			</uni-popup>
		</map>
	</view>
</template>

<script>
	// import { loadModules } from "esri-loader";
	import * as dayjs from "@/utils/dayjs.min.js"
	import {dataCodeTransformMixins,timeTransformMixins} from "@/utils/mixins.js"
	import {request} from "@/utils/request.js"
	export default{
		mixins:[dataCodeTransformMixins,timeTransformMixins],
		data(){
			return{
				potentialPointName:'',
				mapContext:null,
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
				isDialogVisible:false,
				selectedPotentialPoint:{},
				memberList:{},
				memberData:[],
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
			this.getMemberData()
			this.mapContext = uni.createMapContext("map",this)
			console.log('地图')
			await this.getPotentialPointData()
		},
		methods:{
			getMemberData(){
				request({
					method:'GET',
					url:'member/getAllMembersIdAndName',
				})
				.then(res=>{
					if(res.code===2000){
						this.memberData=res.data.MembersIdAndNameRsp
					}else{
						this.$message.error(res.message)
					}
			
					for(var i=0; i<this.memberData.length; i++){
						this.memberList[this.memberData[i].memberId]=this.memberData[i].memberName
						}
				})
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
						PotentialPointInfoQueryListReq:{
							potentialPointName:this.potentialPointName
						},
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
									 	iconPath:this.iconUrl[potentialPoint.potentialPointType],
									 	width:16,
									 	height:16
									 })
								 }
						})
						this.markers = [...list]
						uni.showToast({
							title: `找到了${this.markers.length}个数据`,
							duration: 2000
						});
					}
				})
			},
			bindmarkertap(e){
				const id = e.detail.markerId
				console.log(e.detail.markerId);
				this.selectedPotentialPoint = this.potentialPointData[id]
				this.isDialogVisible = true
				this.$refs.popup.open('center')
				console.log(this.selectedPotentialPoint);
			},
			bindtap(e){
				console.log(e);
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
		bottom: -5px;
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
		bottom: -125px;
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
	.potential-point-info-container{
		background-color: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -125px; 
		margin-top: -200px; 
		width: 250px;
		height: 300px;
		padding: 10px;
		.potential-point-info-title{
			background-color: #fff;
			position: sticky;
			top: 0;
			padding:0 0 5px 0;
			font-size: 16px;
			text-align: center;
		}
		.potential-point-info-row{
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			padding: 5px 0;
			border-bottom: 1px solid #E8E8E8;
			.potential-point-info-main{
				width: 100px;
				text-align: right;
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
			}
			.potential-point-info-time{
				width: 125px;
				text-align: right;
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
			}
		}
	}
</style>