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
						<text>{{DailyPatrolResult.potentialPointName}}</text>
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
										隐患点：{{DailyPatrolResult.potentialPointName}}
									</view>
									<view class="potential-point-info-row">
										<view>隐患点编号：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.potentialPointId}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>隐患点名称：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.potentialPointName}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>隐患点类型：</view>
										<view class="potential-point-info-main">{{dataCodeTransform(DailyPatrolResult.potentialPointType,'potentialPointTypes')}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>隐患点状态：</view>
										<view class="potential-point-info-main">{{dataCodeTransform(DailyPatrolResult.potentialPointStatus,'potentialPointStatuses')}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>行业分类：</view>
										<view class="potential-point-info-main">{{dataCodeTransform(DailyPatrolResult.industyType,'potentialPointIndustryTypes')}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>危害性：</view>
										<view class="potential-point-info-main">{{dataCodeTransform(DailyPatrolResult.potentialPointLevel.toString(),'potentialPointLevels')}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>稳定性：</view>
										<view class="potential-point-info-main">{{dataCodeTransform(DailyPatrolResult.potentialPointStability,'potentialPointStabilitys')}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>灾害体规模：</view>
										<view class="potential-point-info-main">{{dataCodeTransform(DailyPatrolResult.hazardScale||" ",'potentialPointHazardScales')}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>体积：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.potentialPointVolume}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>威胁人口：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.disasterPointThreatenPopulation}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>威胁财产：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.disasterPointThreatenProperty}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>隐患点描述：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.potentialPointDescription}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>地点：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.potentialPointLocation}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>位置描述：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.potentialPointLocation}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>经度：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.potentialPointLocationLongitude}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>纬度：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.potentialPointLocationLatitude}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>X：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult['X-coordinate']}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>Y：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult['Y-coordinate']}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>死亡人口：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.disasterPointPopulationDead}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>监测人：</view>
										<view class="potential-point-info-main">{{memberList[DailyPatrolResult.monitorPointMemberId]}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>监测人联系方式：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.monitorPointMemberPhone}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>监测点描述：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.monitorPointDescription}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>上报人：</view>
										<view class="potential-point-info-main">{{memberList[DailyPatrolResult.potentialPointEstablishMemberId]}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>上报方式：</view>
										<view class="potential-point-info-main">{{dataCodeTransform(DailyPatrolResult.potentialPointEstablishWay,'potentialPointEstablishWays')}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>排查编号：</view>
										<view class="potential-point-info-main">{{DailyPatrolResult.screenNumber||" "}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>上报时间：</view>
										<view>{{timeTransform(DailyPatrolResult.discoveryTime)}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>发现时间：</view>
										<view>{{timeTransform(DailyPatrolResult.discoveryTime)}}</view>
									</view>
									<view class="potential-point-info-row">
										<view>排查时间：</view>
										<view>{{timeTransform(DailyPatrolResult.screenTime)}}</view>
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
				<view style="flex:8">
					<text>任务名称<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:16">
					<text>{{DailyPatrolResult.potentialPointName}}</text>
				</view>	
			</view>
			<view class="report-info-container">
				<view style="flex:8">
					<text>行政区划<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:16">
					<text>{{area}}</text>
				</view>	
			</view>
			<view class="report-info-container">
				<view style="flex:8">
					<text>任务地点<text style="color: red;">*</text></text>
				</view>
				<view style="flex:16">
					<uni-easyinput
					@input="taskLocation"
					>
					</uni-easyinput>
				</view>	
			</view>
			<view class="report-info-container">
				<view style="flex:12">
				<text>上报人<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
				<uni-data-picker
				:localdata="options"
				popup-title="请选择上报人"
				@change="personChange" 
				style="flex:6;background-color:  #F7F7F8;"
				>
				</uni-data-picker>
				</view>
			</view>
			<view class="report-info-container">
				<view style="flex:12">
					<text>上报人手机号<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
					<uni-easyinput
					@input="mobile"
					>
					</uni-easyinput>
				</view>	
			</view>
			
			<view class="report-info-container">
			<!-- 巡查开始时间 -->

					<view style="flex:12">
						<view style="flex:16"><text>巡查开始时间<text style="color: red;">*</text></text></view>
					</view>
					<view  style="flex:12">
						<picker mode="date" :value="datestart" :start="startDate" :end="endDate" @change="PatrolStartDateChange">
					            <view>{{ datestart }}</view>
						</picker>
					</view>
			</view>
			<view class="report-info-container">
			<!-- 巡查结束时间 -->

					<view style="flex:12">
						<view style="flex:16"><text>巡查结束时间<text style="color: red;">*</text></text></view>
					</view>

					<view style="flex:12">
						<picker mode="date" :value="dateend" :start="startDate" :end="endDate" @change="PatrolEndDateChange">
					            <view>{{ dateend }}</view>
						</picker>
					</view>

			</view>
			<view class="report-info-container">
				<view style="flex:8">
					<text>当前距离<text style="color: red;">*</text></text>
				</view>
				<view style="flex:16">
					<uni-easyinput
					:value=distance
					:placeholder=distance
					@input="currentDistance"
					>
					</uni-easyinput>
				</view>	
			</view>
			<view class="report-input-container">
				<view style="flex:8">
					<text>巡查描述</text>
				</view>	
				<view style="flex:16">
					<uni-easyinput
					@input="discription"
					>
					</uni-easyinput>
				</view>	
			</view>
			<view class="report-input-container">
				<view style="flex:8">
					<text>变形迹象<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:16">
					<checkbox-group @change="checkboxChange">
						<view>
						<u-row>
							<u-col span="6">
								<checkbox value="isCrackDeformation" />裂缝变形
							</u-col>
							<u-col span="6">
								<checkbox value="isGroundDrum" />新地鼓
							</u-col>
						</u-row>
						</view>
						<view>
						<u-row>
							<u-col span="6">
								<checkbox value="isGroundDrum" />地面塌陷
							</u-col>
							<u-col span="6">
								<checkbox value="isHouseDeformation" />房屋变形
							</u-col>
						</u-row>
						</view>
						<view>
						<u-row>
							<u-col span="6">
								<checkbox value="isChannelBlockage" />沟道阻塞
							</u-col>
							<u-col span="6">
								<checkbox value="isTreesAskew"/>树木歪斜
							</u-col>
						</u-row>
						</view>
						<view>
						<u-row>
							<u-col span="12">
								<checkbox value="isSpringWaterEmerges" />泉水出露及变浑浊
							</u-col>
						</u-row>
						</view>
					</checkbox-group>
				</view>	
			</view>
			<view class="report-input-container">
				<view style="flex:8">
					<text>位置信息</text>
				</view>	
				<view style="flex:16">
					<uni-easyinput
					@input="LocationInformation"
					>
					</uni-easyinput>
				</view>	
			</view>
			<view class="report-input-container">
				<view style="flex:8">
					<text>特征信息</text>
				</view>	
				<view style="flex:16">
					<uni-easyinput
					@input="characteristicInformation"
					>
					</uni-easyinput>
				</view>	
			</view>
			<view class="report-input-container">
				<view style="flex:8">
					<text>备注信息</text>
				</view>	
				<view style="flex:16">
					<uni-easyinput
					@input="reserveInformation"
					>
					</uni-easyinput>
				</view>	
			</view>
		</uni-forms>
	</view>
	<view class="report-container">
				<button @click="DailyPatrolCreate">提交</button>
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
				location:[],
				markers:[],
				longitude:'100', 		//经度
				latitude: '50', 			//纬度
				scale: 13, 							//地图缩放程度
				mapContext:null,
				enableSatellite:false,
				fromLocation:'',
				toLocation:'',
				iconUrl:{
					"001":'/static/Potential/buwending.png',
					"002":'/static/Potential/huapo.png',
					"003":'/static/Potential/bengta.png',
					"004":'/static/Potential/nishiliu.png',
					"005":'/static/Potential/dimiantaxian.png',
					"006":'/static/Potential/diliefeng.png',
					"007":'/static/Potential/dimianchenjiang.png',
				},
				distance:'',
				memberList:{},
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
			
			eventChannel.on('openCheckDialog',data=>{
				this.DailyPatrolResult= data.item
				console.log("隐患点内容",this.DailyPatrolResult)
				this.latitude=this.DailyPatrolResult.potentialPointLocationLatitude
				this.longitude=this.DailyPatrolResult.potentialPointLocationLongitude
				console.log("经纬度",this.latitude)
				this.DailyPatrolResultCreateReq.patrolTaskName=this.DailyPatrolResult.potentialPointName
				this.DailyPatrolResultCreateReq.patrolAdcode=this.DailyPatrolResult.potentialPointBelongTown
				this.area=this.dataCodeAreaTransform(this.DailyPatrolResult.potentialPointBelongTown)
				console.log("内容",this.DailyPatrolResultReq)
				this.markers.push({
									 	id:0,
									 	longitude:this.DailyPatrolResult.potentialPointLocationLongitude,
									 	latitude:this.DailyPatrolResult.potentialPointLocationLatitude,
									 	title:this.DailyPatrolResult.potentialPointName,
									 	iconPath:this.iconUrl[this.DailyPatrolResult.potentialPointType],
									 	width:16,
									 	height:16
									 })
				this.fromLocation=this.fromLocation+this.DailyPatrolResult.potentialPointLocationLatitude+','+this.DailyPatrolResult.potentialPointLocationLongitude
				console.log("标记",this.fromLocation)
				this.distance=this.DailyPatrolResult.distance
				this.DailyPatrolResultCreateReq.currentDistance=this.distance
				this.mapContext.moveToLocation()
			})
		},
		methods: {
			bindmarkertap(){
				this.$refs.popup.open('center')
				console.log("获得内容",this.DailyPatrolResult)
			},
			getDistance() {
				console.log("标记1",this.fromLocation)
				console.log("标记2",this.toLocation)
			  uni.request({
			    url: 'https://apis.map.qq.com/ws/distance/v1/', //距离计算接口地址。
			    method: 'GET',
			    data: {
			      mode: 'walking',
			      from: this.fromLocation,
			      to: this.toLocation,
			      key: 'YPSBZ-X2HKG-WHWQQ-INE4R-BSYCF-M3BNJ'
			    },
			    success: (res) => {
			      console.log(res);
			      let hw = res.data.result.elements[0].distance; //拿到距离(米)
			      if (hw && hw !== -1) {
			        if (hw < 1000) {
			          hw = hw + 'm';
			        }
			        //转换成公里
			        else {
			          hw = (hw / 2 / 500).toFixed(2) + 'km'
			        }
			      } else {
			        hw = "距离太近或请刷新重试"
			      }
				  this.distance=hw
				  this.DailyPatrolResultCreateReq.currentDistance=this.distance
			      console.log("距离为",hw);
			    }
			  });
			},
			switchMap(){
				this.enableSatellite = !this.enableSatellite
			},
			goPotential(){
				this.latitude=this.DailyPatrolResult.potentialPointLocationLatitude
				this.longitude=this.DailyPatrolResult.potentialPointLocationLongitude
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
					this.toLocation=''
					this.toLocation=this.toLocation+JSON.stringify(this.location[1].latitude)+','+JSON.stringify(this.location[1].longitude)
					console.log("位置",this.toLocation)
					console.log("经纬度",this.location)
					this.getDistance()
				})
				this.mapContext.moveToLocation()
			},
			checkboxChange(e){
			console.log("值",e.detail.value)
			this.DailyPatrolResultCreateReq.isCrackDeformation='N'
			this.DailyPatrolResultCreateReq.isGroundDrum='N'
			this.DailyPatrolResultCreateReq.isGroundCollapse='N'
			this.DailyPatrolResultCreateReq.isHouseDeformation='N'
			this.DailyPatrolResultCreateReq.isChannelBlockage='N'
			this.DailyPatrolResultCreateReq.isTreesAskew='N'
			this.DailyPatrolResultCreateReq.isSpringWaterEmerges='N'
			for(var i=0; i<e.detail.value.length; i++){
				switch(e.detail.value[i]){
					case "isCrackDeformation" :this.DailyPatrolResultCreateReq.isCrackDeformation='Y';break;
					case "isGroundDrum" :this.DailyPatrolResultCreateReq.isGroundDrum='Y';break;
					case "isGroundCollapse" :this.DailyPatrolResultCreateReq.isGroundCollapse='Y';break;
					case "isHouseDeformation" :this.DailyPatrolResultCreateReq.isHouseDeformation='Y';break;
					case "isChannelBlockage" :this.DailyPatrolResultCreateReq.isChannelBlockage='Y';break;
					case "isTreesAskew" :this.DailyPatrolResultCreateReq.isTreesAskew='Y';break;
					case "isSpringWaterEmerges" :this.DailyPatrolResultCreateReq.isSpringWaterEmerges='Y';break;
				}
			}
			console.log("填报内容",this.DailyPatrolResultCreateReq)
			},
			//发灾时间
			PatrolStartDateChange: function(e) {
			    this.DailyPatrolResultCreateReq.patrolStartDate =e.detail.value
				this.datestart=e.detail.value
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			        },
			PatrolEndDateChange: function(e) {
			    this.DailyPatrolResultCreateReq.patrolEndDate =e.detail.value
				this.dateend=e.detail.value
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			        },
			//时间映射
			timeTypeChange(Date){
				var timeTransform;
				timeTransform = Date.slice(0, 4)  + Date.slice(5, 7) + Date.slice(8, 10);
				return timeTransform;
			},
			addLocation(data){
				this.popupData = data
				this.popupLevel = data.level
				this.$refs.popup.open('bottom')
			},
			taskLocation(e){
				this.DailyPatrolResultCreateReq.patrolTaskLocation=e
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			},
			currentDistance(e){
				this.DailyPatrolResultCreateReq.currentDistance=e
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			},
			discription(e){
				this.DailyPatrolResultCreateReq.patrolResultDescription=e
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			},
			LocationInformation(e){
				this.DailyPatrolResultCreateReq.patrolLocationInformation=e
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			},			
			reserveInformation(e){
				this.DailyPatrolResultCreateReq.reserveInformation=e
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			},
			characteristicInformation(e){
				this.DailyPatrolResultCreateReq.characteristicInformation=e
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			},
			mobile(e){
				this.DailyPatrolResultCreateReq.reportPersonMobile=e
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			},
			back(){
				uni.navigateBack()
			},
			personChange(e) {

				this.DailyPatrolResultCreateReq.reportPerson=e.detail.value[0].value

				console.log("人",this.DailyPatrolResultCreateReq.reportPerson)
				console.log("结果",e.detail.value)
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			},
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
			DailyPatrolCreate(){
				//表单校验
				let patrolTaskLocation=this.DailyPatrolResultCreateReq.patrolTaskLocation
				let reportPerson=this.DailyPatrolResultCreateReq.reportPerson
				let reportPersonMobile=this.DailyPatrolResultCreateReq.reportPersonMobile
				let patrolStartDate=this.DailyPatrolResultCreateReq.patrolStartDate
				let patrolEndDate=this.DailyPatrolResultCreateReq.patrolEndDate
				let isCrackDeformation=this.DailyPatrolResultCreateReq.isCrackDeformation
				let isGroundDrum=this.DailyPatrolResultCreateReq.isGroundDrum
				let isGroundCollapse=this.DailyPatrolResultCreateReq.isGroundCollapse
				let isHouseDeformation=this.DailyPatrolResultCreateReq.isHouseDeformation
				let isChannelBlockage=this.DailyPatrolResultCreateReq.isChannelBlockage
				let isTreesAskew=this.DailyPatrolResultCreateReq.isTreesAskew
				let isSpringWaterEmerges=this.DailyPatrolResultCreateReq.isSpringWaterEmerges
				let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
				if(!patrolTaskLocation){
					uni.showToast({
					title:"请输入任务地点",
					icon:"none"
					})
				}else if(!reportPerson){
					uni.showToast({
					title:"请选择填报人",
					icon:"none"
					})
				}else if(!phoneReg.test(reportPersonMobile)|| !reportPersonMobile){
					uni.showToast({
						title:"手机格式不正确",
						icon:"none"
					})
				}else if(patrolStartDate>patrolEndDate){
					uni.showToast({
						title:"开始时间不能小于结束时间",
						icon:"none"
					})
				}else if(!((isCrackDeformation!='N')||(isGroundDrum!='N')||(isGroundCollapse!='N')||
				(isHouseDeformation!='N')||(isChannelBlockage!='N')||(isTreesAskew!='N')||(isSpringWaterEmerges!='N'))){
					uni.showToast({
						title:"请选择至少一种变形迹象",
						icon:"none"
					})
				}else{
					request({
						method:'POST',
						url:'patrolManage/dailyPatrolResultCreate',
						data:{
							DailyPatrolResultCreateReq :this.DailyPatrolResultCreateReq
						},
					})
					.then(res=>{
						if(res.code===2000){
							uni.showModal({
								title:'成功',
								content:'提交成功,点击确定返回',
								showCancel:false
							}).then(res=>{
								uni.navigateBack()
							})
						}else{
						}
					})
				}
				console.log("填报内容",this.DailyPatrolResultCreateReq)

				
				
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
