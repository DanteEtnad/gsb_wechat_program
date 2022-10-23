<template>
	<view>
		<view style="padding: 15px; background-color: white;">
			<!-- 搜索栏 -->
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
				<uni-col :span="11">
					<view class="select-input">
						<text style="margin-right: 5px;flex:4">灾害规模</text>
						<uni-data-select 
						v-model="DisasterRecordQueryListForm.disasterScaleLevels" 
						@change="scalePickerChange"
						:localdata="ScaleDisaster" 
						style="flex:4;background-color:  #F7F7F8;" >
						</uni-data-select>
					</view>
				</uni-col>
				<uni-col :span="13"> 
					<view class="select-input-left">
						<text style="margin-right: 5px;flex:3">引发因素</text>
						<uni-data-select 
						v-model="DisasterRecordQueryListForm.Trigger" 
						@change="factorPickerChange"
						:localdata="FactorsDisaster" 
						style="flex:5;background-color:  #F7F7F8;">
						</uni-data-select>
					</view>
				</uni-col>
			</uni-row>
		</view>
		
		<navigator url="/pages/information/informationSkip" hover-class="none">
			<view class="item-container" v-for="item in DisasterRecordQueryListData" :key="item" @click="openCheckDialog(item)">
				<view class="Details-item">
					<view style="display: flex;justify-content: space-between;border-bottom: 1rpx dotted #c7c7c7;padding: 0 5px 5px">
						<view style="display: flex;">
							<image v-if="item.disasterRecordType=='001'" src="/static/Potential/bengta.svg" style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else-if="item.disasterRecordType=='002'" src="/static/Potential/huapo.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else-if="item.disasterRecordType=='003'" src="/static/Potential/nishiliu.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else-if="item.disasterRecordType=='004'" src="/static/Potential/dimianchenjiang.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else-if="item.disasterRecordType=='005'" src="/static/Potential/dimiantaxian.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else-if="item.disasterRecordType=='006'" src="/static/Potential/dimianchenjiang.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<image v-else="item.disasterRecordType=='007'" src="/static/Potential/buwending.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
							<text style="margin-left: 10px; font-weight: 700; font-size: 14px;">{{item.disasterLocation}}</text> 
						</view>
						
						<view>
							<uni-icons type="forward" size=".Details-item6"></uni-icons>
						</view>
					</view>
					<view class="Details-item-info">
						<uni-row>
							<uni-col :span="18">
								<text class="ellipsisStyle">详细位置：{{item.disasterLocation}}</text>
							</uni-col>
							<uni-col :span="6">
								<view style="padding: 0px 2px;"> {{item.distance}}km</view>
							</uni-col>
						</uni-row>
					</view>
					<view class="Details-item-info">
						<uni-row>
							<uni-col :span="16">
								<text>发灾时间：<text>{{timeTransform(item.disasterRecordDate)}}</text></text>
							</uni-col>
							<uni-col :span="8">
								<text style="padding: 0px 2px;">灾害规模：{{dataCodeTransform(item.disasterScaleLevels,"disasterScaleLevels")}}</text>
							</uni-col>
						</uni-row>
					</view>
					<view class="Details-item-info">
						<uni-row>
							<uni-col :span="24">
								<text>引发因素：<text>{{item.disasterTrigger}}</text></text>
							</uni-col>	
						</uni-row>
					</view>
				</view>
				
			</view>
		</navigator>
		
		
		
		</view>
		
		
	</view>
</template>

<script>
	import {request} from '@/utils/request.js'
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins,getAreaOptionsMixins} from "@/utils/mixins.js"
	import {debounce} from "lodash"
	export default {
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins,getAreaOptionsMixins],
		data() {
			return {
				placeholderStyle: "primaryColor:rgba(0,0,0,0)",
				style:"color:blue",
				index:0,
				area:[],
				options:[],
				DisasterRecordQueryListForm:{
					disasterRecordId:"",
					potentialPointId:"",
					disasterRecordType:"",
					disasterScaleLevels:"",
					disasterLocation:"",
					disasterTrigger:"",
					disasterRecordLevel:"",
					disasterAdcode:"",
					
					},
				bup:true,
				bdown:false,
				page:0,
				totalpage:0,
				DisasterRecordQueryListData:[],
				officePageInfo:{
					dataAmount:0,
					offset:0,
					queryCount:5,
					currentPage:1,
				},
				SelectProvince: [{value:'440500',text:'汕头市'}],
				
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
				selectId: [],
				location:[],
				toLocation:'',
				fromLocation:'',
				disasterDisatance:[],
			}
		},
		
		mounted() {
			this.getDisasterRecordQueryListData(true);
			this.options = this.getAreaOptions();
			this.getLocation();
			
		},	
		onReachBottom() {
			if((this.officePageInfo.currentPage - 1) * this.officePageInfo.queryCount<=this.officePageInfo.dataAmount){
				this.officePageInfo.currentPage++
				this.getDisasterRecordQueryListData()
			}
			else{
			uni.showToast({
				title: `已经到底了`,
				duration: 2000
			});
			}
		},
		methods: {
			
			getLocation(){
				uni.getLocation({
					type: 'gcj02'
				}).then(res=>{
					this.location=res
					this.toLocation=this.toLocation+JSON.stringify(this.location[1].latitude)+','+JSON.stringify(this.location[1].longitude)
					console.log("位置",this.toLocation)
					console.log("经纬度",this.location)
				})
			},
			//计算所有距离
			getDistance(){
				var locationforDisaster;
				for(var i=0;i<this.DisasterRecordQueryListData.length;i++){
					this.disasterDisatance[i]=0
				}
				for(var i=0;i<this.DisasterRecordQueryListData.length;i++){
					locationforDisaster=this.DisasterRecordQueryListData[i].disasterLatitude+','+this.DisasterRecordQueryListData[i].disasterLongitude
					// locationforDisaster='39.071510,117.190091'
					console.log("locationforDisaster",locationforDisaster)
					this.disasterDisatance[i]=this.caculateDistance(locationforDisaster)
					
				}
				for(var i=0;i<this.DisasterRecordQueryListData.length;i++){
					if(this.disasterDisatance[i]==undefined){
						this.disasterDisatance[i]=0
					}
					this.DisasterRecordQueryListData[i].distance=this.disasterDisatance[i]
				}
			
				console.log("this.disasterDisatance",this.disasterDisatance)
				console.log("this.DisasterRecordQueryListData",this.DisasterRecordQueryListData)
				
			},
			//计算距离函数
			caculateDistance(fromLocation) {
				console.log("标记1",fromLocation)
				console.log("标记2",this.toLocation)
			  uni.request({
			      url: 'https://apis.map.qq.com/ws/distance/v1/', //距离计算接口地址。
			      method: 'GET',
			      data: {
			        mode: 'walking',
			        from: fromLocation,
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
			        console.log("距离为",hw);
			      }
			    });
			  },
			
			// 获取输入框文本内容函数
			input(e) {
					this.inputTextSave = e
					console.log("输入的文本为：",this.inputTextSave)
			},
			// 灾害规模列表下列列表更新数据函数
			scalePickerChange(e) {		
				this.DisasterRecordQueryListForm.disasterScaleLevels=e
				console.log('灾害规模下拉列表改变',this.DisasterRecordQueryListForm.disasterScaleLevels) 
				this.DisasterRecordQueryListData=[]
				this.officePageInfo.currentPage=1
				this.getDisasterRecordQueryListData()
			},
			// 引发因素列表下列列表更新数据函数
			factorPickerChange(e) {		
				this.DisasterRecordQueryListForm.disasterTrigger=e
				console.log('引发因素下拉列表改变',this.DisasterRecordQueryListForm.disasterTrigger) 
				this.DisasterRecordQueryListData=[]
				this.officePageInfo.currentPage=1
				this.getDisasterRecordQueryListData()
			
			},
			//地区列表下列列表更新数据函数
			areaChange(e) {
				if (e.detail.value[2]==null){
					this.DisasterRecordQueryListForm.disasterAdcode=""
				}
				else {
					this.DisasterRecordQueryListForm.disasterAdcode=e.detail.value[2].value
				}
				console.log("this.DisasterRecordQueryListForm.disasterAdcode",this.DisasterRecordQueryListForm.disasterAdcode)
				this.DisasterRecordQueryListData=[]
				this.officePageInfo.currentPage=1
				this.getDisasterRecordQueryListData()
			},
			
			// 搜索函数
			search(a){
				this.DisasterRecordQueryListForm.disasterLocation=this.inputTextSave
				console.log(this.DisasterRecordQueryListForm.disasterLocation)
				this.DisasterRecordQueryListData=[]
				this.officePageInfo.currentPage=1
				this.getDisasterRecordQueryListData()
			},
			
		
			getDisasterRecordQueryListData:debounce(function(reset=false){
				uni.showLoading({
					title: '加载中'
				})
				if(reset){
					this.officePageInfo.currentPage = 1
					this.DisasterRecordQueryListData = []
				}
				request({
					method:'POST',
					url:'disasterRecord/queryList',
					data:{
						DisasterRecordQueryListReq :this.DisasterRecordQueryListForm,
						QueryPagingParamsReq :{
							offset: (this.officePageInfo.currentPage - 1) * this.officePageInfo.queryCount,
							queryCount:this.officePageInfo.queryCount
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						// this.officePageInfo.dataAmount=res.data.QuerySummaryRsp.dataAmount
						// this.totalpage=Math.floor(parseInt(this.officePageInfo.dataAmount)/parseInt(this.officePageInfo.queryCount));
						// if(this.totalpage==0){
						// 	this.bdown=true
						// 	console.log("总页数",this.totalpage)
						// }
						this.DisasterRecordQueryListData = [...this.DisasterRecordQueryListData,...res.data.DisasterRecordQueryListRsp]
						// this.DisasterRecordQueryListData=res.data.DisasterRecordQueryListRsp 
						this.officePageInfo.dataAmount=res.data.QuerySummaryRsp.dataAmount
						console.log("@res@",res)
						this.getDistance()
						uni.showToast({
						       title: `加载完成`,
						       duration: 2000
						      });
						uni.hideLoading();
					}else{
						this.$message.error(res.message)
					}
				})
			},300),
			async openCheckDialog(item){
				const response = await uni.navigateTo({
					url:'/pages/DisasterRecord/DisasterDetailsDialog',
				})
				response[1].eventChannel.emit('openCheckDialog',{
					item: item
				})
		}
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
