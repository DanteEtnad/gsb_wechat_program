<template>
		<view>
			<!-- 自定义导航栏 -->
			<view class="navBarBox">
				<!-- 状态栏占位 -->
				<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
				<!-- 真正的导航栏内容 -->
				<view class="navBar">
					<view>
					<u-row>
						<uni-icons color="#fff" type="back" size=24 @click="back()"></uni-icons>
						<text>{{DailyPatrolResult.patrolTaskName}}</text>
					</u-row>
					</view>
				</view>
			</view>
			<!-- 页面内容 -->
		<view class="report-container">
			<view>
				<view style="width:100%;height:30vh">
					<map class="map" 
					id="map"
					:latitude="latitude" 
					:longitude="longitude" 
					:scale="scale"
					:markers="markers"
					@markertap="bindmarkertap"
					:enable-satellite="enableSatellite"
					:show-location="true">
					<view class="back" @click="goPotential">
						<image src="/static/Potential/back.svg" style="width:20px;height:20px;"></image>
					</view>
					<view class="location" @click="getLocation">
						<image src="/static/Potential/locate.svg" style="width:20px;height:20px;"></image>
					</view>
					<view class="more" @click="switchMap">
						<image src="/static/Potential/more.svg" style="width:20px;height:20px;"></image>
					</view>
						<uni-popup ref="popup">
							<scroll-view class="potential-point-info-container" scroll-y="true">
								<view class="potential-point-info-title">
									隐患点：{{potentialPointResult.potentialPointName}}
								</view>
								<view class="potential-point-info-row">
									<view>隐患点编号：</view>
									<view class="potential-point-info-main">{{potentialPointResult.potentialPointId}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>隐患点名称：</view>
									<view class="potential-point-info-main">{{potentialPointResult.potentialPointName}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>隐患点类型：</view>
									<view class="potential-point-info-main">{{dataCodeTransform(potentialPointResult.potentialPointType,'potentialPointTypes')}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>隐患点状态：</view>
									<view class="potential-point-info-main">{{dataCodeTransform(potentialPointResult.potentialPointStatus,'potentialPointStatuses')}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>行业分类：</view>
									<view class="potential-point-info-main">{{dataCodeTransform(potentialPointResult.industyType,'potentialPointIndustryTypes')}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>危害性：</view>
									<view class="potential-point-info-main">{{dataCodeTransform(potentialPointResult.potentialPointLevel.toString(),'potentialPointLevels')}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>稳定性：</view>
									<view class="potential-point-info-main">{{dataCodeTransform(potentialPointResult.potentialPointStability,'potentialPointStabilitys')}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>灾害体规模：</view>
									<view class="potential-point-info-main">{{dataCodeTransform(potentialPointResult.hazardScale||" ",'potentialPointHazardScales')}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>体积：</view>
									<view class="potential-point-info-main">{{potentialPointResult.potentialPointVolume}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>威胁人口：</view>
									<view class="potential-point-info-main">{{potentialPointResult.disasterPointThreatenPopulation}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>威胁财产：</view>
									<view class="potential-point-info-main">{{potentialPointResult.disasterPointThreatenProperty}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>隐患点描述：</view>
									<view class="potential-point-info-main">{{potentialPointResult.potentialPointDescription}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>地点：</view>
									<view class="potential-point-info-main">{{potentialPointResult.potentialPointLocation}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>位置描述：</view>
									<view class="potential-point-info-main">{{potentialPointResult.potentialPointLocation}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>经度：</view>
									<view class="potential-point-info-main">{{potentialPointResult.potentialPointLocationLongitude}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>纬度：</view>
									<view class="potential-point-info-main">{{potentialPointResult.potentialPointLocationLatitude}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>X：</view>
									<view class="potential-point-info-main">{{potentialPointResult['X-coordinate']}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>Y：</view>
									<view class="potential-point-info-main">{{potentialPointResult['Y-coordinate']}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>死亡人口：</view>
									<view class="potential-point-info-main">{{potentialPointResult.disasterPointPopulationDead}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>监测人：</view>
									<view class="potential-point-info-main">{{memberList[potentialPointResult.monitorPointMemberId]}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>监测人联系方式：</view>
									<view class="potential-point-info-main">{{potentialPointResult.monitorPointMemberPhone}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>监测点描述：</view>
									<view class="potential-point-info-main">{{potentialPointResult.monitorPointDescription}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>上报人：</view>
									<view class="potential-point-info-main">{{memberList[potentialPointResult.potentialPointEstablishMemberId]}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>上报方式：</view>
									<view class="potential-point-info-main">{{dataCodeTransform(potentialPointResult.potentialPointEstablishWay,'potentialPointEstablishWays')}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>排查编号：</view>
									<view class="potential-point-info-main">{{potentialPointResult.screenNumber||" "}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>上报时间：</view>
									<view>{{timeTransform(potentialPointResult.discoveryTime)}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>发现时间：</view>
									<view>{{timeTransform(potentialPointResult.discoveryTime)}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>排查时间：</view>
									<view>{{timeTransform(potentialPointResult.screenTime)}}</view>
								</view>
								<view class="potential-point-info-row">
									<view>图片：</view>
									<view class="potential-point-info-main"></view>
								</view>
							</scroll-view>
						</uni-popup>
					</map>
				</view>
			</view>
		<uni-forms ref="form" :model="createForm">
			<view class="report-info-container">
				<view style="flex:12">
					<text>任务名称<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:12">
					<text>{{DailyPatrolResult.patrolTaskName}}</text>
				</view>	
			</view>
			<view class="report-info-container">
				<view style="flex:12">
					<text>行政区划<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:12">
					<text>{{area}}</text>
				</view>	
			</view>
			<view class="report-info-container">
				<view style="flex:12">
					<text>任务地点<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
					<text>{{DailyPatrolResult.patrolTaskLocation}}</text>
				</view>	
			</view>
			<view class="report-info-container">
				<view style="flex:12">
					<text>上报人<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
					<text>{{memberList[DailyPatrolResult.reportPerson]}}</text>
				</view>	
			</view>
			<view class="report-info-container">
				<view style="flex:12">
					<text>上报人手机号<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
					<text>{{DailyPatrolResult.reportPersonMobile}}</text>
				</view>	
			</view>
			
			<view class="report-info-container">
			<!-- 巡查开始时间 -->

					<view style="flex:12">
						<view style="flex:16"><text>巡查开始时间<text style="color: red;">*</text></text></view>
					</view>
					<view  style="flex:12">
						<text>{{DailyPatrolResult.patrolStartDate}}</text>
					</view>

			</view>
			<view class="report-info-container">
			<!-- 巡查结束时间 -->
					<view style="flex:12">
						<view style="flex:16"><text>巡查结束时间<text style="color: red;">*</text></text></view>
					</view>
					<view  style="flex:12">
						<text>{{DailyPatrolResult.patrolEndDate}}</text>
					</view>
			</view>
			<view class="report-info-container">
				<view style="flex:12">
					<text>当前距离<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
					<text>{{DailyPatrolResult.currentDistance}}</text>
				</view>	
			</view>
			<view class="report-input-container">
				<view style="flex:12">
					<text>巡查描述</text>
				</view>	
				<view style="flex:12">
					<text>{{DailyPatrolResult.patrolResultDescription}}</text>
				</view>	
			</view>
			<view class="report-input-container">
				<view style="flex:12">
					<text>变形迹象<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:12">
					<view class="item-container" v-for="item in officeData" :key="item">
						<text>{{item}}</text>
				</view>	
			</view>
			</view>
			<view class="report-input-container">
				<view style="flex:12">
					<text>位置信息</text>
				</view>	
				<view style="flex:12">
					<text>{{DailyPatrolResult.patrolLocationInformation}}</text>
				</view>	
			</view>
			<view class="report-input-container">
				<view style="flex:12">
					<text>特征信息</text>
				</view>	
				<view style="flex:12">
					<text>{{DailyPatrolResult.characteristicInformation}}</text>
				</view>	
			</view>
			<view class="report-input-container">
				<view style="flex:12">
					<text>备注信息</text>
				</view>	
				<view style="flex:12">
					<text>{{DailyPatrolResult.reserveInformation}}</text>
				</view>	
			</view>
		</uni-forms>
	</view>
	</view>
</template>

<script>
	import {timeTransformMixins,dataCodeAreaTransformMixins,dataCodeTransformMixins,getAreaOptionsMixins,getMemberOptionsMixins} from "@/utils/mixins.js"
	import {request} from '@/utils/request.js'
	function getDate(type) {
	    const date = new Date();
	    let year = date.getFullYear();
	    let month = date.getMonth() + 1;
	    let day = date.getDate();
	    if (type === 'start') {
	        year = year - 10;
	    } else if (type === 'end') {
	        year = year + 10;
	    }
	    month = month > 9 ? month : '0' + month;
	    day = day > 9 ? day : '0' + day;
	    return JSON.parse(JSON.stringify(`${year}-${month}-${day}`));
	}
	export default {
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,getAreaOptionsMixins,getMemberOptionsMixins,timeTransformMixins],
		data() {
			return {
				datestart: getDate({ format: true}),
				dateend: getDate({ format: true}),
				startDate: getDate('start'),
				endDate: getDate('end'),
				area:'',
				person:'',
				officeData:[],
				DailyPatrolResultCreateReq:{
					characteristicInformation:'',
					currentDistance:'',
					isChannelBlockage:'N',
					isCrackDeformation:'N',
					isGroundCollapse:'N',
					isGroundDrum:'N',
					isHouseDeformation:'N',
					isSpringWaterEmerges:'N',
					isTreesAskew:'N',
					patrolAdcode:'',
					patrolEndDate:getDate({ format: true}),
					patrolLocationInformation:'',
					patrolResultDescription:'',
					patrolStartDate:getDate({ format: true}),
					patrolTaskLocation:'',
					patrolTaskName:'',
					reportPerson:'',
					reportPersonMobile:'',
					reserveInformation:'',
				},
				
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				statusBarHeight:0,
				navBarHeight: 70,
				createForm:{
					discription:'',
					position:'',
					remarks:'',
					location:''
				},
				popupLevel:'',
				popupData:{},
				DailyPatrolResult:{},
				options:[],
				memberData:[],
				scale: 13,
				mapContext:null,
				enableSatellite:false,
				markers:[],
				PotentialPointSurveyQueryReq:{
				potentialPointBelongCity:'',
				potentialPointBelongCounty:'',
				potentialPointBelongTown:'',
				potentialPointId:'',
				potentialPointName:'',
				potentialPointStatus:'',
				potentialPointType:'',
				},
				potentialPointResult:[],
				iconUrl:{
					"001":'/static/Potential/buwending.png',
					"002":'/static/Potential/huapo.png',
					"003":'/static/Potential/bengta.png',
					"004":'/static/Potential/nishiliu.png',
					"005":'/static/Potential/dimiantaxian.png',
					"006":'/static/Potential/diliefeng.png',
					"007":'/static/Potential/dimianchenjiang.png',
				},
				memberList:{},
				memberData:[],
			}
		},
		props:{
			
		},
		async mounted(){
			this.mapContext = uni.createMapContext("map",this)

		},
		created(){
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			this.getMemberData()
		},
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			
			eventChannel.on('openReport',data=>{
				this.DailyPatrolResult= data.item
				this.area=this.dataCodeAreaTransform(this.DailyPatrolResult.patrolAdcode)
				this.PotentialPointSurveyQueryReq.potentialPointName=this.DailyPatrolResult.patrolTaskName
				this.getPotentialPointQueryData()
				if (this.DailyPatrolResult.isCrackDeformation==='Y'){
					this.officeData.push('裂缝变形')
				}
				
				if (this.DailyPatrolResult.isGroundDrum==='Y'){
					this.officeData.push('新地鼓')
				}						
				if (this.DailyPatrolResult.isGroundCollapse==='Y'){
					this.officeData.push('地面塌陷')
				}
				if (this.DailyPatrolResult.isHouseDeformation==='Y'){
					this.officeData.push('房屋变形')
				}						
				if (this.DailyPatrolResult.isChannelBlockage==='Y'){
					this.officeData.push('沟道阻塞')
				}						
				if (this.DailyPatrolResult.isTreesAskew==='Y'){
					this.officeData.push('树木歪斜')
				}
				if (this.DailyPatrolResult.isSpringWaterEmerges==='Y'){
					this.officeData.push('泉水露出及变浑浊')
				}
				console.log("内容",this.DailyPatrolResult)
			})
		},
		methods: {
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
					console.log("成员",this.memberData)
					for(var i=0; i<this.memberData.length; i++){
						this.memberList[this.memberData[i].memberId]=this.memberData[i].memberName
						this.options.push({text:this.memberData[i].memberName,
						value:this.memberData[i].memberId
						})
					}
					console.log("选项",this.options)
				})
			},
			bindmarkertap(){
				this.$refs.popup.open('center')
				console.log("获得内容",this.DailyPatrolResult)
			},
			switchMap(){
				this.enableSatellite = !this.enableSatellite
			},
			goPotential(){
				this.latitude=this.potentialPointResult.potentialPointLocationLatitude
				this.longitude=this.potentialPointResult.potentialPointLocationLongitude
				console.log("经纬度位置",this.latitude)
				uni.createMapContext("map", this).moveToLocation({
									latitude: this.latitude,
									longitude: this.longitude,
								});
			},
			getLocation(){
				uni.getLocation({
					type: 'gcj02'
				}).then(res=>{
					this.location=res
				})
				this.mapContext.moveToLocation()
			},
			
			back(){
				uni.navigateBack()
			},
			getPotentialPointQueryData(){
				uni.showLoading({
					title: '加载中'
				});
				request({
					method:'POST',
					url:'potentialPointInfo/queryList',
					data:{
						PotentialPointInfoQueryListReq :this.PotentialPointSurveyQueryReq,
						QueryPagingParamsReq :{
							offset:0,
							queryCount:10
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
						if(res.data.QuerySummaryRsp.dataAmount==1){
							uni.hideLoading();
							uni.showToast({
								title: `找到了隐患点`,
								duration: 2000
							});
							this.potentialPointResult=res.data.PotentialPointInfoQueryListRsp[0]
							this.markers.push({
												 	id:0,
												 	longitude:this.potentialPointResult.potentialPointLocationLongitude,
												 	latitude:this.potentialPointResult.potentialPointLocationLatitude,
												 	title:this.potentialPointResult.potentialPointName,
												 	iconPath:this.iconUrl[this.potentialPointResult.potentialPointType],
												 	width:16,
												 	height:16
												 })
							this.goPotential()
						}
						else{
							uni.hideLoading();
							uni.showToast({
								title: `未找到隐患点`,
								duration: 2000
							});
						}
						console.log("data",this.potentialPointResult)
						console.log("全部data",res.data.PotentialPointInfoQueryListRsp)
					}else{
						this.$message.error(res.message)
					}

				})
				
			},
			
	},
	}
</script>

<style lang="scss" scoped>
	.navBarBox{}
	.navBarBox .statusBar {
		background: #2E9BFF;
	}
	.navBarBox .navBar {
		padding-left: 5rpx;
		height: 80rpx;
		padding-bottom: 8rpx;
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
		color: #fff;
		background: #2E9BFF;
		font-size: 14px;
	}
	body{
		background-color: #F7F7F8;
	}
	button{
		display: flex;
		justify-content: space-around;
		padding: 0 10px;
		width: 170rpx;
		height: 36px;
		line-height: 36px;
		background-color: #2E9BFF;
		color: white;
	}
	text{
		font-size: 14px;
	}
	.button-base{
		background: #2E9BFF;
		border-radius: 6px;
		font-size: 16px;
		color: #fff;
		padding: 0;
		margin: 0;
	}
	.Select-left {
		background-color: #F7F7F8;
		margin-bottom: 12px;
		font-size: 14px;
		height: 30px;
		border-radius: 8px; /*圆角*/
		.time{
			padding-left:12px;
			padding-top:5px;
		}	
	}
	.report-container{
		padding:10px 5px;
		border-radius: 10px;
		.report-info-container{
			margin: 5px 0;
			display: flex;
			align-items: center;
			border-bottom: 1px solid black;
			padding: 10px;
			background-color: white;
		}
		.report-input-container{
			margin: 5px 0;
			display: flex;
			align-items: center;
			border-bottom: 1px solid black;
			padding: 10px;
			background-color: white;
		}	

	}
	
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
	.back{
		@extend .icon-base;
		bottom:150px;
	}
	.location{
		@extend .icon-base;
		bottom:100px;
	}
	.more{
		@extend .icon-base;
		bottom:50px;
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
