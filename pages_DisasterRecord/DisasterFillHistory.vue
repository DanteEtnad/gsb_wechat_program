<template>
	<view>
		<!-- 搜索栏，新增栏，列表筛选 -->
		<view style="padding: 5px;background-color: white;">
			<uni-forms :model="disasterRecordForm" ref="disasterRecordForm">
				<uni-row>
					<uni-col :span="12">
						<uni-easyinput 
						placeholder="请输入关键字" 
						@input="input" 
						>
						</uni-easyinput>
					</uni-col>
					<uni-col :span="6">
						<button style="margin-left: 5px;" @click="search(5)">
							<text>搜索</text>
							<uni-icons type="search" size="16" color="#fff"></uni-icons>
						</button>
					</uni-col>
					<uni-col :span="6">
						<button @click="openCreateDialog(5)">
							<text>新增</text>
							<uni-icons type="plusempty" size="16" color="#fff"></uni-icons>
						</button>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="12">
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">灾害规模</text>
							<uni-data-select 
							v-model="disasterRecordForm.disasterScaleLevels" 
							@change="scalePickerChange" 
							:localdata="ScaleDisaster"
							 style="flex:5;background-color: #F7F7F8;">
							 </uni-data-select>
						</view>
					</uni-col>
					<uni-col :span="12"> 
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">引发因素</text>
							<uni-data-select 
							v-model="disasterRecordForm.disasterTrigger" 
							@change="TriggerPickerChange"
							:localdata="FactorsDisaster" 
							style="flex:5;background-color: #F7F7F8;">
							</uni-data-select>
						</view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="12">
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">灾害等级</text>
							<uni-data-select 
							v-model="disasterRecordForm.Levels" 
							@change="LevelPickerChange" 
							:localdata="LevelDisaster" 
							style="flex:5;background-color: #F7F7F8;">
							</uni-data-select>
						</view>
					</uni-col>
					<uni-col :span="12"> 
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">灾害类型</text>
							<uni-data-select 
							v-model="disasterRecordForm.disasterRecordType" 
							@change="TypePickerChange"
							:localdata="TypeDisaster" 
							style="flex:5;background-color: #F7F7F8;">
							</uni-data-select>
						</view>
					</uni-col>
				</uni-row>
				</uni-forms>
		</view>
		<view class="patrol-report-container" v-for="item in DisasterRecordQueryData" :key="item" @click="openCheckDialog(item)">
			<view class="report-item">
				<view style="display: flex;justify-content: space-between;border-bottom: 1px dotted  #c7c7c7;padding: 0 5px 5px" >
					<view style="display: flex;">
						<image v-if="item.disasterRecordType=='001'" src="/static/Potential/bengta.svg" style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else-if="item.disasterRecordType=='002'" src="/static/Potential/huapo.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else-if="item.disasterRecordType=='003'" src="/static/Potential/nishiliu.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else-if="item.disasterRecordType=='004'" src="/static/Potential/dimianchenjiang.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else-if="item.disasterRecordType=='005'" src="/static/Potential/dimiantaxian.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else-if="item.disasterRecordType=='006'" src="/static/Potential/dimianchenjiang.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else="item.disasterRecordType=='007'" src="/static/Potential/buwending.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<text style="margin-left: 10px;font-family: 'Microsoft YaHei';">{{item.disasterLocation}}</text>
						
						<!-- 根据审核状态选择样式 -->
						<span v-if="item.approvalStatus=='FCK'">
							<view style="margin-left: 10px; background-color: red;border-radius: 35px; color:white;width:55px;">
								<text style="margin-left: 5px;"> {{dataCodeTransform(item.approvalStatus,"approvalStatus")}} </text>
							</view>
						</span>
						<span v-else-if="item.approvalStatus=='CKD'">
							<view style="margin-left: 10px; background-color: skyblue;border-radius: 35px; color:white;width:65px;">
								<text style="margin-left: 5px;"> {{dataCodeTransform(item.approvalStatus,"approvalStatus")}} </text>
							</view>
						</span>
						<span v-else-if="item.approvalStatus=='BCK'">
							<view style="margin-left: 10px; background-color: dimgrey;border-radius: 35px; color:white;width:65px;">
								<text style="margin-left: 5px;"> {{dataCodeTransform(item.approvalStatus,"approvalStatus")}} </text>
							</view>
						</span>
						<span v-else-if="item.approvalStatus=='DEL'">
							<view style="margin-left: 10px; background-color: dimgrey;border-radius: 35px; color:white;width:65px;">
								<text style="margin-left: 5px;"> {{dataCodeTransform(item.approvalStatus,"approvalStatus")}} </text>
							</view>
						</span>
				
					</view>
					<view>
						<uni-icons type="forward" size="16"></uni-icons>
					</view>
				</view>
				<view class="report-item-info">
					<view style="padding-bottom: 5px;">
						<uni-row>
							<uni-col :span="15">
								<text>发灾时间：{{timeTransform(item.disasterRecordDate)}}</text>
							</uni-col>
							<uni-col :span="9">
								<text>灾害规模：{{dataCodeTransform(item.disasterScaleLevels,"disasterScaleLevels")}}</text>
							</uni-col>
						</uni-row>
					</view>
					
					<view style="padding-bottom: 5px;">
						<uni-row>
							<uni-col :span="15">
								<text>引发因素：{{item.disasterTrigger}}</text>
							</uni-col>
							<uni-col :span="9">
								<text>灾害等级：{{dataCodeTransform(item.disasterRecordLevel,"disasterRecordLevel")}}级</text>
							</uni-col>
						</uni-row>
					</view>
					
					<view style="padding-bottom: 5px;">
						<uni-row>
							<uni-col :span="15">
								<text>灾害类型：{{dataCodeTransform(item.disasterRecordType,"disasterRecordType")}}</text>
							</uni-col>
							<uni-col :span="9">
								<text>填报人：{{item.reportPersonName}}</text>
							</uni-col>
						</uni-row>
					</view>
					<view style="padding-bottom: 5px;">
						<uni-row>
							<uni-col :span="15">
								<text>受灾人口：{{item.disasterRecordPopulationAffected}}</text>
							</uni-col>
							<uni-col :span="9">
								<text>经济损失：{{item.disasterRecordEconomicLoss}}万元</text>
							</uni-col>
						</uni-row>
					</view>
					

					
				</view>
			</view>
		</view>
	
		
	</view>
</template>

<script>
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins} from "@/utils/mixins.js"
	import {request} from '@/utils/request.js'
	import {debounce} from "lodash"
	export default {
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins],
		data() {
			return {
				index: 1,
				//保存输入框value
				inputTextSave:"",
				//接收灾害历史记录数据
				DisasterRecordQueryData:[],
				//定义接收多少数据
				bup:true,
				bdown:false,
				page:0,
				totalpage:0,
				officePageInfo:{
					dataAmount:0,
					offset:0,
					queryCount:5,
					currentPage:1,
				},
				//存储发送到后端的表单
				disasterRecordForm:{
					disasterRecordId:"",
					potentialPointId:"",
					disasterRecordType:"",
					disasterScaleLevels:"",
					disasterLocation:"",
					disasterTrigger:"",
					disasterRecordLevel:"",
					disasterAdcode:"",
					},
				// 灾害规模列表值
                ScaleDisaster: [
					{value:'005',text:'微型'},{value:'004',text:'小型'},{value:'003',text:'中型'},
                	{value:'002',text:'大型'},{value:'001',text:'巨型'},
                	],
				// 灾害等级列表值
				LevelDisaster: [
					{value:'1',text:'一级'},{value:'2',text:'二级'},
					{value:'3',text:'三级'},{value:'4',text:'四级'},
					],
				// 灾害引发因素列表值
                FactorsDisaster: [
                	{value:'降雨',text:'降雨'},{value:'地震',text:'地震'},{value:'开挖坡脚',text:'开挖坡脚'},{value:'坡脚冲刷',text:'坡脚冲刷'},
                	{value:'坡脚浸润',text:'坡脚浸润'},{value:'坡体切割',text:'坡体切割'},{value:'动水压力',text:'动水压力'},{value:'卸荷',text:'卸荷'},
					{value:'风化',text:'风化'},{value:'爆破振动',text:'爆破振动'},
                	],
				// 灾害类型列表值
				TypeDisaster: [
					{value:'007',text:'不稳定斜坡'},{value:'004',text:'地面塌陷'},{value:'006',text:'地面沉降'},{value:'002',text:'滑坡'},
					{value:'001',text:'崩塌'},{value:'003',text:'泥石流'},{value:'005',text:'地裂缝'},
					],
                selectId: [],
				memberData:[],		
				
			}
		},
	
		mounted() {
				this.getDisasterRecordQueryData(true)
		},	
		onReachBottom() {
			if((this.officePageInfo.currentPage - 1) * this.officePageInfo.queryCount<=this.officePageInfo.dataAmount){
				this.officePageInfo.currentPage++
				this.getDisasterRecordQueryData()
			}
			else{
			uni.showToast({
				title: `已经到底了`,
				duration: 2000
			});
			}
		},
		methods: {
			// 获取输入框文本内容函数
			input(e) {
					this.inputTextSave = e
					console.log("输入的文本为：",this.inputTextSave)
			},
			
			// 搜索函数
			search(a){
				// this.disasterRecordForm.disasterRecordName=this.inputTextSave
				this.disasterRecordForm.disasterLocation=this.inputTextSave
				console.log(this.disasterRecordForm.disasterLocation)
				this.DisasterRecordQueryData=[]
				this.officePageInfo.currentPage=1
				this.getDisasterRecordQueryData()
				
			},
			// 灾害规模下列列表更新数据函数
			scalePickerChange(e) {		
			 
				this.disasterRecordForm.disasterScaleLevels=e
				console.log('规模列表数据改变',this.disasterRecordForm.disasterScaleLevels) 
				this.DisasterRecordQueryData=[]
				this.officePageInfo.currentPage=1
				this.getDisasterRecordQueryData()
			},
			// 灾害等级下列列表更新数据函数
			LevelPickerChange(e) {		
				 
				this.disasterRecordForm.disasterRecordLevel=e
				console.log('灾害等级列表数据改变',this.disasterRecordForm.disasterRecordLevel) 
				this.DisasterRecordQueryData=[]
				this.officePageInfo.currentPage=1
				this.getDisasterRecordQueryData()
			},
			// 灾害类型下列列表更新数据函数
			TypePickerChange(e) {		
				
				this.disasterRecordForm.disasterRecordType=e
				console.log('类型列表数据改变',this.disasterRecordForm.disasterRecordType) 
				this.DisasterRecordQueryData=[]
				this.officePageInfo.currentPage=1
				this.getDisasterRecordQueryData()
			},
			//引发因素下列列表更新数据函数
			TriggerPickerChange(e) {
				
				this.disasterRecordForm.disasterTrigger=e
				console.log('因素列表数据改变',this.disasterRecordForm.disasterTrigger) 
				this.DisasterRecordQueryData=[]
				this.officePageInfo.currentPage=1
				this.getDisasterRecordQueryData()
			},
			// 跳转页面函数
			openCreateDialog(a){
				uni.navigateTo({
					url:'/pages_DisasterRecord/DisasterFill',
					
				})
				// console.log(a)
			},
			
			
			//发送请求灾害类型数据函数
			getDisasterRecordQueryData:debounce(function(reset=false){
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
						DisasterRecordQueryListReq:this.disasterRecordForm,
						QueryPagingParamsReq:{
							offset: (this.officePageInfo.currentPage - 1) * this.officePageInfo.queryCount,
							queryCount:this.officePageInfo.queryCount
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						// this.DisasterRecordQueryData=res.data.DisasterRecordQueryListRsp
						this.officePageInfo.dataAmount=res.data.QuerySummaryRsp.dataAmount
						this.DisasterRecordQueryData = [...this.DisasterRecordQueryData,...res.data.DisasterRecordQueryListRsp]
						uni.showToast({
						       title: `加载完成`,
						       duration: 2000
						      });
						uni.hideLoading();
					}else{
						this.$message.error(res.message)
					}
					console.log("@res@",res)
					this.getMemberData()
					uni.showToast({
					       title: `加载完成`,
					       duration: 2000
					      });
					uni.hideLoading();
				})
				
			},300),
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
					for(var j=0; j<this.DisasterRecordQueryData.length; j++){
						for(var i=0; i<this.memberData.length; i++){
							if(this.DisasterRecordQueryData[j].memberId==this.memberData[i].memberId){
								this.DisasterRecordQueryData[j].reportPersonName=this.memberData[i].memberName
							}
			
						}
					}
					console.log("成员",this.DisasterRecordQueryData)
				})
			},
			choice(index) {
				//当再次被选中时，取消当前选中项
			    if (this.list[index].selected == true) {
			        this.list[index].selected = false;
					this.list[index].unselected = true;
			        //取消选中时删除数组中的值
			        for (var i = 0; i < this.selectId.length; i++) {
			            if (this.selectId[i] === this.list[index].title) {
			                this.selectId.splice(i, 1);
			            }
			        }
			    } else {
			        this.list[index].selected = true;
					this.list[index].unselected = false;
			        this.selectId.push(this.list[index].title)
			    }
			},
			
			async openCheckDialog(item){
					const response = await uni.navigateTo({
						url:'/pages_DisasterRecord/DisasterFillchange',
					})
					response[1].eventChannel.emit('openCheckDialog',{
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
	text{
		font-size: 14px;
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
	
	.query-select-input {
		display: flex;
		align-items: center;
		padding: 5px;
		// font-size: 10px;
	}
	.patrol-report-container{
		padding:10px 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.report-item{
			width: 680rpx;
			background-color: white;
			border-radius: 10px;
			padding: 10px;
			.report-item-info{
				margin-bottom: 10px;
				margin: 10px 0 0;
				font-size: 10px; 
			}
		}
	}
	.select{
		font-size: 12px; 
		color: #000000;
		background-color: #CEE8FF;
	}
	
	.unselect{
		font-size: 12px;
		background-color: #F7F7F8;
		color: #000000;
	}
</style>
