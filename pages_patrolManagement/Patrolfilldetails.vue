<template>
		<view>

		<view class="report-container">
			
		<uni-forms ref="form" :model="createForm">
			
			<view class="report-info-container">
			<!-- 巡查开始时间 -->
					<view style="flex:12">
						<view style="flex:16"><text>所属行政区<text style="color: red;">*</text></text></view>
					</view>	
							<view class="select-input">
								<uni-data-picker
								:localdata="options1"
								v-model="PatrolData.administrativeRegion"
								popup-title="请选择地区"
								@change="areaChange" 
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
				<view style="flex:12">
					<text>出动巡排查<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
					<uni-easyinput
					v-model="PatrolData.patrolNumber"
					@input="number"
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
								<uni-icons type="closeempty" size="16" color="#000" @click="minus(item)"></uni-icons>
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
				v-model="PatrolData.reportPerson"
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
					v-model=PatrolData.reportPersonMobile
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
					@input="peopletrans"
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
					>
					</uni-easyinput>
				</view>	
			</view>
		</uni-forms>
	</view>
	<view class="report-container">
				<button  @click="openMessageDialog" class="submit-button">修改并发送短信</button>
				<uni-popup ref="message" background-color="#fff">
					<sendMessage  @closeDialog="closeMessageDialog" @afterSendMessage="afterSendMessage" :DisasterRecordForm="DisasterRecordForm"></sendMessage>
				</uni-popup>
	</view>
	
	
	
	</view>
</template>

<script>
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,getAreaOptionsMixins,getMemberOptionsMixins} from "@/utils/mixins.js"
	import sendMessage from '@/pages_components/DisaterRecord/sendMessage.vue'
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
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,getAreaOptionsMixins,getMemberOptionsMixins],
		
		components:{
	
			sendMessage,
		
			
		},
		data() {
			return {
				Patrol:{
					approvalResults:'',
					patrolResultId:'',
					approvalRemarks:'',
					
				},
				PatrolData:[],
				datestart: getDate({ format: true}),
				dateend: getDate({ format: true}),
				startDate: getDate('start'),
				endDate: getDate('end'),
				area:'',
				PatrolResultMaintainReq:{
					administrativeRegion: '',
					patrolNumber:'',
					patrolPotentialPointNumber:'',
					potentialPointId:[],
					potentialType:[],
					reportPerson:'',
					reportPersonMobile:'',
					patrolEndDate:getDate({ format: true}),
					patrolStartDate:getDate({ format: true}),
					numberOfPeopleTransferred: '',
					transferPosition:'',
					reasonForTransfer:'',
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
				
				officePageInfo:{
					dataAmount:0,
					offset:0,
					queryCount:9999,
					currentPage:0,
				},
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
				potentialList:{},
				options:[],
				memberData:[],
				potentialData:[],
				options1:[],
				potentialPoint:[],
				choose:[],
				point:[],
			}
		},
		
		
		
		
		props:{
			
		},
		created(){
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			this.getMemberData()
			this.options1 = this.getAreaOptions();
			this.getPotentialPointQueryData();
		},
		
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.PatrolData= data.item
				this.PatrolResultMaintainReq=data.item
				console.log("this.PatrolData",this.PatrolData)
				console.log("this.administrativeRegion",this.administrativeRegion)
				
			})
		},
		
		
		methods: {
			potentialChange(e){
				this.potentialData.push({
						type:'未选择',
						num:'',
						number:this.potentialData.length,
						name:'',
						nameId:'',
					})
				this.point=this.potentialData[this.potentialData.length-1]
				for(var i=0; i<this.PotentialPointData.length; i++){
					if(this.PotentialPointData[i].potentialPointName==e.text){
						this.choose.push(i)
						this.point.num=i
						this.point.name=this.PotentialPointData[i].potentialPointName
						this.point.nameId=this.PotentialPointData[i].potentialPointId
						switch(this.PotentialPointData[i].potentialPointType){
							case "001" :this.point.type="斜坡";break;
							case "002" :this.point.type="滑坡";break;
							case "003" :this.point.type="崩塌";break;
							case "004" :this.point.type="泥石流";break;
							case "005" :this.point.type="地面沉降与地裂缝";break;
						}
					}
					}
					console.log("隐患点内容",this.potentialData)
					this.maintain()
			},
			maintain(){
				this.PatrolResultMaintainReq.potentialPointId=[]
				this.PatrolResultMaintainReq.potentialType=[]
				for(var i=0; i<this.choose.length; i++){
					this.PatrolResultMaintainReq.potentialPointId.push(this.PotentialPointData[this.choose[i]].potentialPointId)
					this.PatrolResultMaintainReq.potentialType.push(this.PotentialPointData[this.choose[i]].potentialPointType)
				}
				console.log("隐患点内容",this.potentialData)
				console.log("填报内容",this.PatrolResultMaintainReq)
			},
			minus(item){
				for(var i=item.number+1; i<this.potentialData.length; i++){
					this.potentialData[i].number-=1;
				}
				console.log(item.number);
				console.log(this.potentialData);
				for(var j=0; j<this.choose.length; j++){
					if(this.choose[j]==item.num){
						this.choose.splice(j,1)
					}
				}
				console.log("choose内容",this.choose)
				this.maintain()
				this.potentialData.splice(item.number,1);
				console.log("隐患点内容",this.potentialData)
				console.log("表单内容",this.potentialData)
			},
			//发灾时间
			PatrolStartDateChange: function(e) {
			    this.PatrolResultMaintainReq.patrolStartDate =e.detail.value
				this.datestart=e.detail.value
				console.log("填报内容",this.PatrolResultMaintainReq)
			        },
			PatrolEndDateChange: function(e) {
			    this.PatrolResultMaintainReq.patrolEndDate =e.detail.value
				this.dateend=e.detail.value
				console.log("填报内容",this.PatrolResultMaintainReq)
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
			number(e){
				this.PatrolResultMaintainReq.patrolNumber=e
				console.log("填报内容",this.PatrolResultMaintainReq)
			},
			pointnumber(e){
				this.PatrolResultMaintainReq.patrolPotentialPointNumber=e
				console.log("填报内容",this.PatrolResultMaintainReq)
			},
			
			peopletrans(e){
				this.PatrolResultMaintainReq.numberOfPeopleTransferred=e
				console.log("填报内容",this.PatrolResultMaintainReq)
			},
			locationtrans(e){
				this.PatrolResultMaintainReq.transferPosition=e
				console.log("填报内容",this.PatrolResultMaintainReq)
			},			
			reasontrans(e){
				this.PatrolResultMaintainReq.reasonForTransfer=e
				console.log("填报内容",this.PatrolResultMaintainReq)
			},
			
			mobile(e){
				this.PatrolResultMaintainReq.reportPersonMobile=e
				console.log("填报内容",this.PatrolResultMaintainReq)
			},
			back(){
				uni.navigateBack()
			},
			personChange(e) {

				this.PatrolResultMaintainReq.reportPerson=e.detail.value[0].value

				console.log("人",this.PatrolResultMaintainReq.reportPerson)
				console.log("结果",e.detail.value)
				console.log("填报内容",this.PatrolResultMaintainReq)
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
						this.options.push({text:this.memberData[i].memberName,
						value:this.memberData[i].memberId
						})
					}
					console.log("选项",this.options)
				})
			},
			areaChange(e) {
				this.PatrolResultMaintainReq.administrativeRegion=e.detail.value[2].value
			},
			PatrolMaintain(){
				
				let administrativeRegion=this.PatrolResultMaintainReq.administrativeRegion
				let patrolStartDate=this.PatrolResultMaintainReq.patrolStartDate
				let patrolEndDate=this.PatrolResultMaintainReq.patrolEndDate
				let patrolNumber=this.PatrolResultMaintainReq.patrolNumber
				let patrolPotentialPointNumber=this.PatrolResultMaintainReq.patrolPotentialPointNumber
				let reportPerson=this.PatrolResultMaintainReq.reportPerson
				let reportPersonMobile=this.PatrolResultMaintainReq.reportPersonMobile
				let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/

				if(!administrativeRegion){
					uni.showToast({
					title:"请选择所属行政区",
					icon:"none"
					})
				}
				else if(patrolStartDate>patrolEndDate){
					uni.showToast({
						title:"开始时间不能小于结束时间",
						icon:"none"
					})
				}
				else if(!patrolNumber){
					uni.showToast({
					title:"请输入出动巡排查次数",
					icon:"none"
					})
				}else if(!patrolPotentialPointNumber){
					uni.showToast({
					title:"请输入巡排查隐患次数",
					icon:"none"
					})
				}else if(!reportPerson){
					uni.showToast({
					title:"请选择上报人",
					icon:"none"
					})
				}else if(!phoneReg.test(reportPersonMobile)|| !reportPersonMobile){
					uni.showToast({
						title:"手机格式不正确",
						icon:"none"
					})
				}
				else{
					console.log("填报内容",this.PatrolResultMaintainReq)
					uni.showLoading({
						title: '正在修改'
					});
					request({
						method:'POST',
						url:'patrolManage/patrolResultMaintain',
						data:{
							PatrolResultMaintainReq :this.PatrolResultMaintainReq
					
						},
					})
					.then(res=>{
						if(res.code===2000){
							uni.hideLoading();
							uni.showToast({
								title: `修改成功`,
								duration: 2000
							});
							this.$refs.message.open('center')
						}else{
							uni.hideLoading();
							uni.showToast({
								title: `提交失败`,
								duration: 2000
							});
						}
					})
				}

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
					
					}else{
						this.$message.error(res.message)
					}
					for(var i=0; i<this.PotentialPointData.length; i++){
						this.potentialPoint.push({text:this.PotentialPointData[i].potentialPointName,
						value:this.PotentialPointData[i].potentialPointId
						})
					}
					for(var i=0; i<this.PotentialPointData.length; i++){
						this.potentialList[this.PotentialPointData[i].potentialPointId]=this.PotentialPointData[i].potentialPointName
					}
					console.log("列表为",this.potentialList)
					console.log("neitong为",this.PatrolData)
					console.log("neitong2为",this.PatrolData.potentialType)
					this.Patrol.potentialType=JSON.parse(this.PatrolData.potentialType)	
					this.Patrol.potentialPointId=JSON.parse(this.PatrolData.potentialPointId)
					console.log("类型列表",this.Patrol.potentialType)
					console.log("类型列表长度",this.Patrol.potentialType.length)
					for(var j=0;j<this.Patrol.potentialType.length;j++){

						let name=this.potentialList[this.Patrol.potentialPointId[j]]
						for(var i=0; i<this.PotentialPointData.length; i++){
							if(this.PotentialPointData[i].potentialPointName==name){
								this.choose.push(i)
							}
							}
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
									number:j,
									num:this.choose[j],
								})
							
						}
						console.log("choose内容",this.choose)
						this.maintain()
						console.log("隐患点内容",this.potentialData)
					console.log("结果data",this.PotentialPointData)
				})
				
			},
			openMessageDialog(){
				this.PatrolMaintain()
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
	.submit-button{		display: flex;
		justify-content: space-around;
		padding: 0 10px;
		width: 500rpx;
		height: 36px;
		line-height: 36px;
		background-color: #2E9BFF;
		color: white;			}



</style>
