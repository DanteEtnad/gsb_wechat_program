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
			
			
			
			<view class="report-input-container">
				<view style="flex:8">
					<text>转移人数</text>
				</view>	
				<view style="flex:16">
					<uni-easyinput
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
					>
					</uni-easyinput>
				</view>	
			</view>
		</uni-forms>
	</view>
	<view class="report-container">
				<button  @click="openMessageDialog" class="submit-button">提交并发送短信</button>
				<uni-popup ref="message" background-color="#fff">
					<sendMessage  @closeDialog="closeMessageDialog" @afterSendMessage="afterSendMessage" :DisasterRecordForm="DisasterRecordForm"></sendMessage>
				</uni-popup>
	</view>
	
	
	
	</view>
</template>

<script>
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,getAreaOptionsMixins,getMemberOptionsMixins} from "@/utils/mixins.js"
	import sendMessage from '@/components/DisaterRecord/sendMessage.vue'
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
				datestart: getDate({ format: true}),
				dateend: getDate({ format: true}),
				startDate: getDate('start'),
				endDate: getDate('end'),
				area:'',
				PatrolResultCreateReq:{
					administrativeRegion: '',
					numberOfPeopleTransferred: '',
					patrolArea:'',
					patrolEndDate:getDate({ format: true}),
					patrolNumber:'',
					patrolPlanDescription:'',
					patrolPlanFrequency:'',
					patrolPlanName:'',
					patrolPlanType:'',
					patrolPotentialPointNumber:'',
					patrolStartDate:getDate({ format: true}),
					patrolTeamId:'',
					potentialPointId:'',
					potentialType:'',
					reportPerson:'',
					reportPersonMobile:'',
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
					queryCount:99999,
					currentPage:0,
				},
				
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
				latitude: 39.909,
				longitude: 116.39742,
				iconPath: '/static/locate.svg'
				}, {
				latitude: 39.90,
				longitude: 116.39,
				iconPath: '/static/locate.svg'
				}],
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
				potentialData:[],
				options1:[],
				potentialPoint:[],
				choose:[],
				point:[],
			}
		},
		
		city:[					{value:'1',text:'汕头市'},					{value:'2',text:'长沙市'},				],				district:[					{value:'1',text:'金平区'},					{value:'2',text:'龙湖区'},					{value:'3',text:'澄海区'},					{value:'4',text:'濠江区'},					{value:'5',text:'潮阳区'},					{value:'6',text:'潮南区'},					{value:'7	',text:'南澳县'},				],
		
		props:{
			
		},
		created(){
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			this.getMemberData()
			this.options1 = this.getAreaOptions();
			this.getPotentialPointQueryData();
		},
		
		
		methods: {

			//发灾时间
			PatrolStartDateChange: function(e) {
			    this.PatrolResultCreateReq.patrolStartDate =e.detail.value
				this.datestart=e.detail.value
				console.log("填报内容",this.PatrolResultCreateReq)
			        },
			PatrolEndDateChange: function(e) {
			    this.PatrolResultCreateReq.patrolEndDate =e.detail.value
				this.dateend=e.detail.value
				console.log("填报内容",this.PatrolResultCreateReq)
			        },
			//时间映射
			timeTypeChange(Date){
				var timeTransform;
				timeTransform = Date.slice(0, 4)  + Date.slice(5, 7) + Date.slice(8, 10);
				return timeTransform;
			},
			number(e){
				this.PatrolResultCreateReq.patrolNumber=e
				console.log("填报内容",this.PatrolResultCreateReq)
			},
			pointnumber(e){
				this.PatrolResultCreateReq.patrolPotentialPointNumber=e
				console.log("填报内容",this.PatrolResultCreateReq)
			},
			
			peopletrans(e){
				this.PatrolResultCreateReq.numberOfPeopleTransferred=e
				console.log("填报内容",this.DailyPatrolResultCreateReq)
			},
			locationtrans(e){
				this.PatrolResultCreateReq.transferPosition=e
				console.log("填报内容",this.PatrolResultCreateReq)
			},			
			reasontrans(e){
				this.PatrolResultCreateReq.reasonForTransfer=e
				console.log("填报内容",this.PatrolResultCreateReq)
			},
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
					this.maintain()
			},
			maintain(){
				this.PatrolResultCreateReq.potentialPointId=[]
				this.PatrolResultCreateReq.potentialType=[]
				for(var i=0; i<this.choose.length; i++){
					this.PatrolResultCreateReq.potentialPointId.push(this.PotentialPointData[this.choose[i]].potentialPointId)
					this.PatrolResultCreateReq.potentialType.push(this.PotentialPointData[this.choose[i]].potentialPointType)
				}
				console.log("填报内容",this.PatrolResultCreateReq)
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
				this.maintain()
				this.potentialData.splice(item.number,1);
				console.log("表单内容",this.potentialData)
			},
			mobile(e){
				this.PatrolResultCreateReq.reportPersonMobile=e
				console.log("填报内容",this.PatrolResultCreateReq)
			},
			back(){
				uni.navigateBack()
			},
			personChange(e) {

				this.PatrolResultCreateReq.reportPerson=e.detail.value[0].value

				console.log("人",this.PatrolResultCreateReq.reportPerson)
				console.log("结果",e.detail.value)
				console.log("填报内容",this.PatrolResultCreateReq)
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
				this.PatrolResultCreateReq.administrativeRegion=e.detail.value[2].value
			},
			PatrolResultCreate(){
				let administrativeRegion=this.PatrolResultCreateReq.administrativeRegion
				let patrolStartDate=this.PatrolResultCreateReq.patrolStartDate
				let patrolEndDate=this.PatrolResultCreateReq.patrolEndDate
				let patrolNumber=this.PatrolResultCreateReq.patrolNumber
				let patrolPotentialPointNumber=this.PatrolResultCreateReq.patrolPotentialPointNumber
				let reportPerson=this.PatrolResultCreateReq.reportPerson
				let reportPersonMobile=this.PatrolResultCreateReq.reportPersonMobile
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
					console.log("填报内容",this.PatrolResultCreateReq)
					uni.showLoading({
						title: '正在提交'
					});
					request({
						method:'POST',
						url:'patrolManage/patrolResultCreate',
						data:{
							PatrolResultCreateReq :this.PatrolResultCreateReq
					
						},
					})
					.then(res=>{
						if(res.code===2000){
							uni.hideLoading();
							uni.showToast({
								title: `提交完成`,
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
			add(){				this.potentialData.push({						type:'',						potential:'',						number:this.potentialData.length,					})					console.log(this.potentialData);			},
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
					console.log("结果data",this.PotentialPointData)
				})
				
			},
			openMessageDialog(){
				this.PatrolResultCreate()
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
	.potentialpailie{
		display: flex;
		flex-direction: column;
	}

</style>
