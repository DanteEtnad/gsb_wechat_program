<template>
	
	<view >
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<view class="report-container">
			<uni-forms ref="form" :model="createForm">
				<view class="report-info-container">
						<view style="flex:12">
							<view style="flex:16"><text>所属行政区<text style="color: red;">*</text></text></view>
						</view>	
						

								<view class="select-input">
									<uni-data-picker
									:localdata="options1"
									
									v-model="PatrolData.administrativeRegion"
									@change="areaChange" 
									:readonly="true"
									style="flex:6;background-color:  #F7F7F8;"
									>
									<!-- @nodeclick="onnodeclick" -->
									</uni-data-picker>
									
								</view>

			
				</view>
				
				
				
				<view class="report-info-container">
				<!-- 巡查开始时间 -->
						<view style="flex:12">
							<view style="flex:16"><text>巡查开始时间<text style="color: red;">*</text></text></view>
						</view>
						<view  style="flex:12">
							<view>{{PatrolData. patrolStartDate }}</view>
						</view>
				</view>
				<view class="report-info-container">
				<!-- 巡查结束时间 -->
				
						<view style="flex:12">
							<view style="flex:16"><text>巡查结束时间<text style="color: red;">*</text></text></view>
						</view>
				
						<view style="flex:12" >
							{{ PatrolData.patrolEndDate }}
							
						</view>
				
				</view>
				
				<view class="report-info-container">
					<view style="flex:12">
						<text>出动巡排查<text style="color: red;">*</text></text>
					</view>
					<view style="flex:12">
						<uni-easyinput
						@input="number"
						:disabled="true"
						:placeholder="PatrolData.patrolNumber"
						v-model="PatrolData.patrolNumber"
						>
						</uni-easyinput>
					</view>	
				</view>
		
				<view class="report-info-container">
					<view style="flex:12">
						<text>巡排查隐患<text style="color: red;">*</text></text>
					</view>
					<view style="flex:12">
						<uni-easyinput
						@input="pointnumber"
						:disabled="true"
						:placeholder="PatrolData.patrolPotentialPointNumber"
						v-model="PatrolData.patrolPotentialPointNumber"
						
						>
						</uni-easyinput>
					</view>	
				</view>
				
				<view class="report-info-container">
					<view style="flex:12">
						<text>隐患点</text>
					</view>
					<view style="flex:12">
						<uni-data-picker
						:localdata="potentialPoint"
						popup-title="隐患点"
						@nodeclick="potentialChange" 
						placeholder="请选择隐患点"
						:readonly="true"
						>
						</uni-data-picker>
					</view>
				</view>
				<view class="report-info-container" style="">
					<div class="potentialpailie">
						<view v-for="item in potentialData" :key ="item">
								<view style="display: grid; grid-template-columns: 5fr 2fr 1fr; gap: 10px; align-items: center; border-bottom: 1px solid black;" >
									<text>{{item.name}}</text>
									<text>{{item.type}}</text>
									<uni-icons type="closeempty" size="16" color="#000"></uni-icons>
								</view>
						</view>
					</div>
					
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
					:placeholder=PatrolData.reportPersonName
					:readonly="true"
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
						v-model=PatrolData.reportPersonMobile
						:disabled="true"
						>
						</uni-easyinput>
					</view>	
				</view>
				
				
				
				<view class="report-input-container">
					<view style="flex:8">
						<text>转移人数</text>
					</view>	
					<view style="flex:16">
						<uni-easyinput
						v-model=PatrolData.numberOfPeopleTransferred
						:disabled="true"
						>
						</uni-easyinput>
					</view>	
				</view>
		
				<view class="report-input-container">
					<view style="flex:8">
						<text>转移位置</text>
					</view>	
					<view style="flex:16">
						<uni-easyinput
						@input="locationtrans"
						v-model=PatrolData.transferPosition
						:disabled="true"
						>
						</uni-easyinput>
					</view>	
				</view>
				<view class="report-input-container">
					<view style="flex:8">
						<text>转移原因</text>
					</view>	
					<view style="flex:16">
						<uni-easyinput
						@input="reasontrans"
						v-model=PatrolData.reasonForTransfer
						:disabled="true"
						>
						</uni-easyinput>
					</view>	
				</view>
			</uni-forms>
		</view>		
				
				<view style="padding-left:  30%;">
					<u-radio-group 
					    v-model="value11"
					    placement="row">
						<u-radio activeColor="red" label="通过" customStyle="padding-right:20px;" size="30" @change="check"></u-radio>
						<u-radio activeColor="red" label="撤回" size="30" @change="pass"></u-radio>
					</u-radio-group>
				
				</view>
				<view class="report-container">
					<view class="report-input-container">
						<view style="flex:8">
						<text>审核备注</text>
					    </view>	
					    <view style="flex:16">
						<uni-easyinput
						@input="checkText"
						>
						</uni-easyinput>
			            </view>	
					</view>
				</view>
				
				<view class="report-container">
							<button  @click="openMessageDialog" class="submit-button">提交并发送短信</button>
							<uni-popup ref="message" background-color="#fff">
								<sendMessage  
								@closeDialog="closeMessageDialog" 
								@afterSendMessage="afterSendMessage" 
								:Patrol="Patrol"></sendMessage>
							</uni-popup>
				</view>
				
				
		
			</view>
			
		
</template>

<script>
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins,getAreaOptionsMixins} from "@/utils/mixins.js"
	import sendMessage from '@/pages_patrolManagement/components/sendMessage.vue'
	import {request} from '@/utils/request.js'
	export default {
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins,getAreaOptionsMixins],
		components:{
			
			sendMessage,
		
			
		},
		data() {
			return {
				PatrolResultApprovalReq:{
					patrolResultId:'',
					approvalResults:'',
					approvalRemarks:'',
					
				},
				Patrol:{
					approvalResults:'',
					patrolResultId:'',
					approvalRemarks:'',
					
				},
				officePageInfo:{
					dataAmount:0,
					offset:0,
					queryCount:99999,
					currentPage:0,
				},
				PotentialPointSurveyQueryReq:{
				potentialPointBelongCity:'',
				potentialPointBelongCounty:'',
				potentialPointBelongTown:'',
				potentialPointId:'',
				potentialPointName:'',
				potentialPointStatus:'',
				potentialPointType:'',
				},
				PotentialPointData:[],
				potentialData:[],
				potentialList:{},
				PatrolData:{},
				memberData:[],
				memberList:{},
				options1:[],
				
			}
		},
		
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.PatrolData= data.item
				console.log("this.PatrolData",this.PatrolData)
			})
		},
		mounted() {
			this.location=this.dataCodeAreaTransform(this.PatrolData.administrativeRegion,"potentialPointBelongTowns")
			console.log("location",this.location)
			this.options1=this.getAreaOptions()
			this.getPotentialPointQueryData()

			}
			
		,
		methods: {
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
					
					}else{
						this.$message.error(res.message)
					}
					for(var i=0; i<this.PotentialPointData.length; i++){
						this.potentialList[this.PotentialPointData[i].potentialPointId]=this.PotentialPointData[i].potentialPointName
					}
					console.log("列表为",this.potentialList)
					this.Patrol.potentialType=JSON.parse(this.PatrolData.potentialType)
					this.Patrol.potentialPointId=JSON.parse(this.PatrolData.potentialPointId)
					console.log("类型列表",this.Patrol.potentialType)
					console.log("类型列表长度",this.Patrol.potentialType.length)
					for(var j=0;j<this.Patrol.potentialType.length;j++){
						let name=this.potentialList[this.Patrol.potentialPointId[j]]
						let type=''
						switch(this.Patrol.potentialType[j]){
							case "001" :type="斜坡";break;
							case "002" :type="滑坡";break;
							case "003" :type="崩塌";break;
							case "004" :type="泥石流";break;
							case "005" :type="地面沉降与地裂缝";break;
						}
						console.log("名字是",name)
						console.log("类型是",type)
						this.potentialData.push({
									type:type,		
									name:name,
								})
							
						}
					console.log("结果data",this.PotentialPointData)
				})
				
			},
			check(e){
				this.Patrol.approvalResults='Y'
				this.Patrol.patrolResultId=this.PatrolData.patrolResultId
				console.log("this.Patrol.approvalResults",this.Patrol.approvalResults)
			},
			pass(e){
				this.Patrol.approvalResults='N'
				this.Patrol.patrolResultId=this.PatrolData.patrolResultId
				console.log("this.Patrol.approvalResults",this.Patrol.approvalResults)
			},
			checkText(e){
				this.Patrol.approvalRemarks=e
				console.log("this.Patrol.approvalRemarks",this.Patrol.approvalRemarks)
			},
			openMessageDialog(){
				console.log('1111111111111',this.Patrol)
				this.$refs.message.open('center')
			},
			close(){
				this.$refs.popup.close()
			},
			closeMessageDialog(){
				this.$refs.message.close()
			},
			afterSendMessage(){
				this.closeMessageDialog()
				uni.showModal({
					title:'成功',
					content:'发送成功,点击确定返回',
					showCancel:false
				}).then(res=>{
					uni.navigateBack()
				})
			},
		},
	}
</script>

<style lang="scss">

	text{
		font-size: 13px;
	}
	.submit-button{
		display: flex;
		justify-content: space-around;
		padding: 0 10px;
		width: 500rpx;
		height: 36px;
		line-height: 36px;
		background-color: #2E9BFF;
		color: white;
			}
	.button-base{
		background: #2E9BFF;
		border-radius: 6px;
		font-size: 16px;
		color: #fff;
		padding: 0;
		margin: 0;
	}
	.popup {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: 100vh;
		background-color: rgba(0,0,0,0.6);
		z-index: 9998;
	}
	.popup-info{
		position: fixed;
		width: 550upx;
		height:  900upx;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		font-size: 30upx;
		
		border-radius: 20upx;
		background-color: #fff;
		z-index: 9999;
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
	
	.map_view {
		color: deepskyblue;
		// padding: 12px 0px;
		padding-bottom: 6px;
		padding-top: 6px;
		background-color:  white;
		text-align: center;
	}
	.btn-submit {
		padding: 40px 0px;
		.btn {
			background-color: #2E9BFF;
			color: #F7F7F8;
			width: 280px;
			font-size: 16px;
			border-radius: 10px; /*圆角*/
		}
	}
	button{
		display: flex;
		justify-content: space-around;
		padding: 0 10px;
		width: 70rpx;
		height: 36px;
		line-height: 36px;
		background-color: #2E9BFF;
		color: white;
	}
	textarea{
		margin-top: 5px;
		font-size: 13px;
		background-color: rgb(247,247,248);
		border-radius: 8px;
		padding: 10px;
		height: 200px;
	}
	.submit-container{
		padding: 15px;
		.submit-content{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
			.submit-input{
				margin: 10px 0;
			}
			.form-button{
				@extend .button-base;
				width: 80px;
				height: 36px;
				line-height: 36px;
			}
			.submit-button{
				@extend .button-base;
				width: 343px;
				height: 40px;
				line-height: 40px;
				position: absolute;
				bottom: 20px;
			}
		}
		
	}
</style>
