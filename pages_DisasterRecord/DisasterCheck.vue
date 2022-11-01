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
						<uni-icons type="search" size="16" color="#fff"  ></uni-icons>
					</button>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col :span="11">
					<view style="display: flex;margin-top: 5px;">
						<text style="margin-top: 5px;margin-right: 5px;	font-size 12px;">填报人</text>	
						<!-- <uni-easyinput
						placeholder="请输入姓名" 
						@input="inputName" 
						>
						</uni-easyinput> -->
						<uni-data-select  v-model="telephoneNumber" :localdata="members" placeholder="请选择填报人" @change="NameText"/>
					</view>
				</uni-col>
				<uni-col :span="13">
						<view style="display: flex;margin-top: 5px;">
							<text style="margin-top: 5px;margin-right: 5px;margin-left: 5px;font-size 12px;">审核情况</text>	
							<view class="input-set">
								<uni-data-select 
								:localdata="check_select" 
								@change="CheckPickerChange" 
								v-model="disasterRecordForm.approvalStatus">
								</uni-data-select>
							</view>
						</view>
				</uni-col>
			</uni-row>
			
		
		</view>
			
		<view class="Details-item-container" v-for="item in DisasterRecordQueryData " :key="item" @click="openCheckDialog(item)">
			<view class="Details-item">
				<view style="display: flex;justify-content: space-between;border-bottom: 1px dotted  #c7c7c7;padding: 0 5px 5px">
					<view style="display: flex;">
						<image v-if="item.disasterRecordType=='001'" src="/static/Potential/bengta.svg" style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else-if="item.disasterRecordType=='002'" src="/static/Potential/huapo.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else-if="item.disasterRecordType=='003'" src="/static/Potential/nishiliu.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else-if="item.disasterRecordType=='004'" src="/static/Potential/dimianchenjiang.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else-if="item.disasterRecordType=='005'" src="/static/Potential/dimiantaxian.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else-if="item.disasterRecordType=='006'" src="/static/Potential/dimianchenjiang.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<image v-else="item.disasterRecordType=='007'" src="/static/Potential/buwending.svg"  style="width: 18px; height: 24px;" mode="aspectFit"></image>
						<!-- <text style="margin-left: 10px; font-weight: 700; font-size: 12px;">{{item.disasterLocation}}</text> -->
						<text style="margin-left: 10px;font-family: 'Microsoft YaHei';font-size: 13px;">{{item.disasterLocation}}</text>
						 <!-- 根据审核状态选择样式 -->
						 <span v-if="item.approvalStatus=='FCK'">
						 	<view style="margin-left: 10px; background-color: red;border-radius: 35px; color:white;width:65px;">
						 		<text style="margin-left: 5px;"> {{dataCodeTransform(item.approvalStatus,"approvalStatus")}} </text>
						 	</view>
						 </span>
						 <span v-else-if="item.approvalStatus=='CKD'">
						 	<view style="margin-left: 10px; background-color: skyblue;border-radius: 35px; color:white;width:75px;">
						 		<text style="margin-left: 5px;"> {{dataCodeTransform(item.approvalStatus,"approvalStatus")}} </text>
						 	</view>
						 </span>
						 <span v-else-if="item.approvalStatus=='BCK'">
						 	<view style="margin-left: 10px; background-color: dimgrey;border-radius: 35px; color:white;width:75px;">
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
				<view class="Details-item-info">
					<uni-row>
						<uni-col :span="13">
								<text>发灾时间：<text>{{timeTransform(item.disasterRecordDate)}}</text></text>
						</uni-col>
						<uni-col :span="11">
							<text style="padding: 0px 2px;">灾害规模：{{dataCodeTransform(item.disasterScaleLevels,"disasterScaleLevels")}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view class="Details-item-info">
					<uni-row>
						<uni-col :span="13">
								<text>引发因素：<text>{{item.disasterTrigger}}</text></text>
						</uni-col>
						<uni-col :span="11">
							<text style="padding: 0px 2px;">灾害等级：{{dataCodeTransform(item.disasterRecordLevel,"disasterRecordLevel")}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view class="Details-item-info">
					<uni-row>
						<uni-col :span="13">
								<text>受灾人口：<text>{{item.disasterRecordPopulationAffected}}</text></text>
						</uni-col>
						<uni-col :span="11">
							<text style="padding: 0px 2px;">经济损失：{{item.disasterRecordEconomicLoss}}万元</text>
						</uni-col>
					</uni-row>
				</view>
				<view class="Details-item-info">
					<uni-row>
						<uni-col :span="13">
								<text>填报人：<text>{{item.reportPersonName}}</text></text>
						</uni-col>
						<uni-col :span="11">
							<text style="padding: 0px 2px;">联系电话：{{item.memberPhone}}</text>
						</uni-col>
					</uni-row>
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
				//接收灾害历史记录数据
				DisasterRecordQueryData:[],
				memberData:[],
				ALLData:[],
				inputTextSave:'',
				inputTextName:'',
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
					disasterRecordId:'',
					potentialPointId:'',
					disasterRecordType:'',
					disasterRecordLevel:'',
					disasterLocation:'',
					disasterScaleLevels:'',
					disasterTrigger:'',
					approvalStatus:'',
					memberId:'',
					},
				check_select: [
					{value:'CKD',text:'审核通过'},
					{value:'FCK',text:'待审核'},
					{value:'BCK',text:'审核否决'},
					{value:'DEL',text:'作废'},

					],
					status:[],
				members:[],
					
			
			}
		},
		mounted() {
				this.getDisasterRecordQueryData(true)
				this.gerMembers()
				// this.getAllData()
		
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
			
			//填报人获取
			NameText(e) {
				this.officePageInfo.currentPage = 1
				this.DisasterRecordQueryData = []
				this.disasterRecordForm.memberId=e
				console.log("this.disasterRecordForm.memberId",this.disasterRecordForm.memberId)
				this.getDisasterRecordQueryData()
							
			},
			//审核情况筛选逻辑
			CheckPickerChange(e) {
				this.officePageInfo.currentPage = 1
				this.DisasterRecordQueryData = []
				this.disasterRecordForm.approvalStatus=e
				console.log("this.disasterRecordForm.approvalStatus",this.disasterRecordForm.approvalStatus)
				this.getDisasterRecordQueryData()
			
			},
			
			input(e) {
				this.inputTextSave = e
				console.log("输入的文本为：",this.inputTextSave)
			},
			inputName(e){
				this.inputTextName = e
				console.log("输入的文本为：",this.inputTextName)
			},
			search(e){
				this.disasterRecordForm.disasterLocation=this.inputTextSave
				this.disasterRecordForm.memberId=this.inputTextName
				console.log(this.disasterRecordForm.disasterLocation)
				this.officePageInfo.currentPage = 1
				this.DisasterRecordQueryData = []
				this.getDisasterRecordQueryData()
				// this.firstshow()
			},
			//展示分页结果需要获取的部分数据
			getDisasterRecordQueryData:debounce(function(reset=false){
				uni.showLoading({
					title: '加载中'
				})
				if(reset){
					this.officePageInfo.currentPage = 1
					this.DisasterRecordQueryData = []
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
			gerMembers(){
				request({
					method:'GET',
					url:'member/getAllMembersIdAndName',
				})
				.then(res=>{
					if(res.code===2000){
						this.members = res.data.MembersIdAndNameRsp.map(item=>{
							return {
								value:item.memberId,
								text:item.memberName,
							}
						})
						
						
						console.log("members",this.members)
					}else{
						this.$message.error(res.message)
					}
					
				})
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
	
			
			async openCheckDialog(item){
					const response = await uni.navigateTo({
						url:'/pages_DisasterRecord/DisasterFIllCheck',
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
		font-size: 14px;
		}
	
	 .input-set {
		 width:90px
	 }
	 .Details-item-container {
	 	padding:10px 5px;
	 	display: flex;
	 	flex-direction: column;
	 	align-items: center;
	 	.Details-item {
	 		width: 680rpx;
	 		background-color: white;
	 		border-radius: 10px;
	 		padding: 10px;
	 		.Details-item-info {
	 			margin: 10px 0 10px;
	 			font-size: 12px;
	 		}
	 		
	 	}		
	 	
	 }	
	 	
	 
	 
</style>
