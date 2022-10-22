<template>
	<view>
		<view style="padding: 15px; background-color: white;">
			<!-- 搜索栏 -->
			<view style="margin-bottom: 10px; border-bottom: 1px dashed black;">
			<view style="margin-bottom: 10px;">
			<uni-row>
				<text style="margin-left: 5%; font-weight: 700;">选择隐患点</text>
			</uni-row>
			</view>
			</view>
			<uni-row>
				<uni-col :span="17">
					<uni-easyinput 
					placeholder="请输入关键字" 
					@input="input" 
					>
					</uni-easyinput>
				</uni-col>
				<uni-col :span="7">
					<button @click="search(5)" style="margin-left: 15px;">
						<text>搜索</text>
						<uni-icons type="search" size="18" color="#fff"  ></uni-icons>
					</button>
				</uni-col>
			</uni-row>
			<!-- 省市选择列表 -->
			<uni-row>
				<uni-col :span="11">
					<view class="select-input">
						<text style="margin-right: 5px;flex:2">省市</text>
						<uni-data-select 
						v-model="DisasterRecordQueryListForm.province" 
						:localdata="SelectProvince" 
						style="flex:6; background-color: #F7F7F8;">
						</uni-data-select>
					</view>
				</uni-col>
				<uni-col :span="13"> 
					<view class="select-input-left">
						<text style="margin-right: 5px;flex:2">区镇</text>
						<uni-data-picker
						:localdata="options"
						popup-title="请选择地区"
						@change="areaChange" 
						style="flex:6;background-color:  #F7F7F8;"
						>
						</uni-data-picker>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="12">
				<view @click="getLocation">
					<text style="margin-right: 5px;flex:2">获取当前距离</text>
					<image src="/static/Potential/locate.svg" style="width:20px;height:20px;"></image>
				</view>
				</uni-col>
			</uni-row>

		</view>
		
		<navigator url="/pages/information/informationSkip" hover-class="none">
			<view class="item-container" v-for="item in PotentialPointData" :key="item" @click="openDailyPatrolPotential(item)">
				<view class="Details-item">
					<view style="display: flex;justify-content: space-between;border-bottom: 1rpx dotted #c7c7c7;padding: 0 5px 5px">
						<view style="display: flex;">
							<image v-if="item.potentialPointType=='001'" src="/static/Potential/bengta.svg" style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else-if="item.potentialPointType=='002'" src="/static/Potential/huapo.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else-if="item.potentialPointType=='003'" src="/static/Potential/nishiliu.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else-if="item.potentialPointType=='004'" src="/static/Potential/dimianchenjiang.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else-if="item.potentialPointType=='005'" src="/static/Potential/dimiantaxian.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else-if="item.potentialPointType=='006'" src="/static/Potential/dimianchenjiang.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else="item.potentialPointType=='007'" src="/static/Potential/buwending.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<text style="margin-left: 10px; font-weight: 700; font-size: 14px;">{{item.potentialPointName}}</text> 
						</view>
						
						<view>
							<uni-icons type="forward" size=".Details-item6"></uni-icons>
						</view>
					</view>
					<view class="Details-item-info">
						<uni-row>
							<uni-col :span="20">
								<text class="ellipsisStyle">详细位置：{{item.potentialPointLocation}}</text>
							</uni-col>
							<uni-col :span="4">
								<text style="padding: 0px 2px;">{{item.distance}}</text>
							</uni-col>
						</uni-row>
					</view>
					<view class="Details-item-info">
						<uni-row>
							<uni-col :span="16">
								<text>发灾时间：<text>{{timeTransform(item.discoveryTime)}}</text></text>
							</uni-col>
							<uni-col :span="8">
								<text style="padding: 0px 2px;">灾害规模：{{dataCodeTransform(item.hazardScale,"potentialPointHazardScales")}}</text>
							</uni-col>
						</uni-row>
					</view>
					<view class="Details-item-info">
						<uni-row>
							<uni-col :span="24">
								<text>巡查次数：<text>{{item.patrolAmount}}</text></text>
							</uni-col>	
						</uni-row>
					</view>
				</view>
				
			</view>
		</navigator>
		<view>
			<uni-row>
			<uni-col span="12">
				<button :disabled=bup @click="up()">
					<text>上一页</text>
				</button>
			</uni-col>
			<uni-col span="12">
				<button :disabled=bdown @click="down()">
					<text>下一页</text>
				</button>
			</uni-col>
			</uni-row>
		</view>
	</view>

</template>

<script>
	import {request} from '@/utils/request.js'
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins,getAreaOptionsMixins} from "@/utils/mixins.js"
	export default {
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins,getAreaOptionsMixins],
		data() {
			return {
				placeholderStyle: "primaryColor:rgba(0,0,0,0)",
				style:"color:blue",
				index:0,
				PotentialPointSurveyQueryReq:{
				potentialPointBelongCity:'',
				potentialPointBelongCounty:'',
				potentialPointBelongTown:'',
				potentialPointId:'',
				potentialPointName:'',
				potentialPointStatus:'',
				potentialPointType:'',
				},
					queryForm:{
						key:'',
						level:'',
						now:'',
						status:'',
						createMethod:'',
						createTime:''
					},
				PotentialPointData:[],
				bup:true,
				bdown:false,
				page:0,
				totalpage:0,
				officePageInfo:{
					dataAmount:0,
					offset:0,
					queryCount:5,
					currentPage:0,
				},
				SelectProvince: [{value:'440500',text:'广东省汕头市'}],
				ScaleDisaster: 
				[
					{value:'005',text:'微型'},{value:'004',text:'小型'},{value:'003',text:'中型'},
					{value:'002',text:'大型'},{value:'001',text:'巨型'},
					],
				FactorsDisaster: [
					{value:'降雨',text:'降雨'},{value:'地震',text:'地震'},{value:'开挖坡脚',text:'开挖坡脚'},{value:'坡脚冲刷',text:'坡脚冲刷'},
					{value:'坡脚浸润',text:'坡脚浸润'},{value:'坡体切割',text:'坡体切割'},{value:'动水压力',text:'动水压力'},{value:'卸荷',text:'卸荷'},
					{value:'风化',text:'风化'},{value:'爆破振动',text:'爆破振动'},
					],
				inputTextSave:"",
				selectScaleValueSave:'',
				options:[],
				patrolAmount:0,
				DailyPatrolRequestForm:{						
						dailyPatrolResultId:'',
						patrolEndDate:'',
						patrolStartDate:'',
						patrolTaskLocation:'',
						patrolTaskName:'',			
						reportPerson:'',
						reportPersonMobile:'',
						patrolAdcode:'',
						
				},
				fromLocation:'',
				toLocation:'',
				distance:'',
			}
		},
		
		created	(){
			this.getLocation()
			this.getPotentialPointQueryData();
			this.options=this.getAreaOptions();
			console.log("options为：",this.getAreaOptions())
		},	
		methods: {
			getLocation(){
				uni.getLocation({
					type: 'gcj02'
				}).then(res=>{
					this.location=res
					console.log("位置",this.location)
					this.toLocation=''
					this.toLocation=this.toLocation+JSON.stringify(this.location[1].latitude)+','+JSON.stringify(this.location[1].longitude)
					console.log("weizhii",this.toLocation)
				})
				for (var i =0; i<this.PotentialPointData.length; i++){
				this.fromLocation='';
				console.log("经纬度",this.PotentialPointData[i].potentialPointLocationLatitude)
				this.fromLocation=this.fromLocation+this.PotentialPointData[i].potentialPointLocationLatitude+','+this.PotentialPointData[i].potentialPointLocationLongitude;
				this.getDistance(i)
				}
			},
			getDistance(i) {
				this.distance='未定义',
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
			  }).then(res=>{
				  console.log("结果",res[1].data);
				  let hw = res[1].data.result.elements[0].distance; //拿到距离(米)
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
				  console.log("距离为",hw);
				  this.distance=hw;
				  console.log("距离为",this.distance);
				  this.PotentialPointData[i].distance=this.distance
			  })
			},
			down(){
				this.officePageInfo.offset+=5;
				this.getPotentialPointQueryData();
				this.page+=1;
				if(this.page!=0){
					this.bup=false;
				}
				if(this.page==this.totalpage){
					this.bdown=true;
				}
			
			},
			up(){
				this.officePageInfo.offset-=5;
				this.getPotentialPointQueryData();
				this.page-=1;
				if(this.page==0){
					this.bup=true;
				}
				if(this.page!=this.totalpage){
					this.bdown=false;
				}
			
			},
			// 获取输入框文本内容函数
			input(e) {
					this.inputTextSave = e
					console.log("输入的文本为：",this.inputTextSave)
			},
			// 隐患点列表下列列表更新数据函数
			areaChange(e) {
				if (e.detail.value[2]==null){
					this.PotentialPointSurveyQueryReq.potentialPointBelongTown=""
				}
				else {
					this.PotentialPointSurveyQueryReq.potentialPointBelongTown=e.detail.value[2].value
				}
				console.log("town",this.PotentialPointSurveyQueryReq.potentialPointBelongTown)
				console.log("结果",e.detail.value)
				this.getPotentialPointQueryData()
			},
			// 灾害规模列表下列列表更新数据函数
			scalePickerChange(e) {		
				
			},
			// 搜索函数
			search(){
				this.PotentialPointSurveyQueryReq.potentialPointName=this.inputTextSave
				console.log(this.PotentialPointSurveyQueryReq.potentialPointName)
				this.getPotentialPointQueryData()
			},
			getOfficeData(i){
				request({
					method:'POST',
					url:'patrolManage/dailyPatrolResultQuery',
					data:{
						DailyPatrolResultQueryReq: {						
						dailyPatrolResultId:'',
						patrolEndDate:'',
						patrolStartDate:'',
						patrolTaskLocation:'',
						patrolTaskName:this.PotentialPointData[i].potentialPointName,			
						reportPerson:'',
						reportPersonMobile:'',
						patrolAdcode:'',
						
				},
						QueryPagingParamsReq:{
							offset:0,
							queryCount:10,
						},
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.patrolAmount=res.data.QuerySummaryRsp.dataAmount;
						this.PotentialPointData[i].patrolAmount=this.patrolAmount;
						console.log("次数为",i)
						console.log("结果",this.PotentialPointData)
					}else{
						this.$message.error(res.message)
					}
				})
				
			},
			getPotentialPointQueryData(){
				request({
					method:'POST',
					url:'potentialPointInfo/queryList',
					data:{
						PotentialPointInfoQueryListReq :this.PotentialPointSurveyQueryReq,
						QueryPagingParamsReq :{
							offset:this.officePageInfo.offset,
							queryCount:this.officePageInfo.queryCount
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.PotentialPointData=res.data.PotentialPointInfoQueryListRsp
						this.officePageInfo.dataAmount=res.data.QuerySummaryRsp.dataAmount
						console.log("总数",this.officePageInfo.dataAmount)
						this.totalpage=Math.floor(parseInt(this.officePageInfo.dataAmount)/parseInt(this.officePageInfo.queryCount));
						if(this.totalpage==0){
							this.bdown=true
						}
					}else{
						this.$message.error(res.message)
					}
					for (var i =0; i<this.PotentialPointData.length; i++){
						this.PotentialPointData[i].patrolAmount=0;
						this.getOfficeData(i);
					}
					console.log("结果data",this.PotentialPointData)
				})
			},
			async openDailyPatrolPotential(item){
				const response = await uni.navigateTo({
					url:'/pages/DailyPatrol/DailyPatrolPotential',
				})
				response[1].eventChannel.emit('potential',{
					item: item
				})
			},
		}
	}
</script>

<style lang="scss">
	body{
		background-color: #F7F7F8;
	}
	button {
		display: flex;
		justify-content: space-around;
		padding: 0 10px;
		width: 170rpx;
		height: 36px;
		line-height: 36px;
		background-color: #2E9BFF;
		color: white;
		}
	text {
		font-size: 14px;
		font-weight: 400px;
		overflow: hidden;
	}
	.ellipsisStyle {
	   // width: 100px !important;
	   color: #262626;
	   overflow: hidden;
	   word-break: break-all;
	   text-overflow: ellipsis;
	   display: -webkit-box;
	   -webkit-box-orient: vertical;
	   -webkit-line-clamp: 2;
	   white-space: nowrap;
	}
	
	.select-input {
		display: flex;
		align-items: center;
		margin-top: 15px;
		margin-right: 15px;
		// padding: 5px;
		// font-size: 10px;
	}
	.select-input-left {
		display: flex;
		align-items: center;
		margin-top: 15px;
	}
	.item-container {
		margin: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.Details-item {
			width: 650rpx;
			background-color: white;
			border-radius: 10px;
			padding: 10px;
			.Details-item-info {
				margin: 10px 0 0;
				// font-size: 12px;
			}
			
		}		
		
	}	
	
</style>
