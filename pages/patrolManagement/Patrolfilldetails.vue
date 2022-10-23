<template>
		<view>
			<!-- 自定义导航栏 -->
			
			<!-- 页面内容 -->
		<view class="report-container">
						
			<view class="report-info-container">
			<!-- 巡查开始时间 -->
			
					
					<view style="flex:12">
						<view style="flex:16"><text>市县镇村<text style="color: red;">*</text></text></view>
					</view>	
					
						{{dataCodeAreaTransform(PatrolData.administrativeRegion,"potentialPointBelongTowns")}}
					
					</view>
			
			
			
			<view class="report-info-container">
			<!-- 巡查开始时间 -->
			
					<view style="flex:12">
						<view style="flex:16"><text>巡查开始时间<text style="color: red;">*</text></text></view>
					</view>
					<view  style="flex:12">
						{{PatrolData.patrolStartDate}}
					</view>
			</view>
			<view class="report-info-container">
			<!-- 巡查结束时间 -->
			
					<view style="flex:12">
						<view style="flex:16"><text>巡查结束时间<text style="color: red;">*</text></text></view>
					</view  style="flex:12">
					      {{PatrolData.patrolEndDate}}
			        
			        </view>
			
			<view class="report-info-container">
				<view style="flex:12">
					<text>出动巡排查<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
					{{PatrolData.patrolNumber}}
				</view>	
			</view>
			
			<view class="report-info-container">
				<view style="flex:12">
					<text>巡排查隐患<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
					{{PatrolData.patrolPotentialPointNumber}}
				</view>	
			</view>
			
			<view class="report-info-container">

			</view>
			
			<view class="report-info-container">
				<view style="flex:12">
				<text>上报人<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
				{{PatrolData.reportPersonName}}
				</view>
			</view>
			<view class="report-info-container">
				<view style="flex:12">
					<text>上报人手机号<text style="color: red;">*</text></text>
				</view>
				<view style="flex:12">
					{{PatrolData.reportPersonMobile}}
				</view>	
			</view>
			
			
			
			<view class="report-input-container">
				<view style="flex:8">
					<text>转移人数</text>
				</view>	
				<view style="flex:16">
					{{PatrolData.numberOfPeopleTransferred}}
				</view>	
			</view>

			<view class="report-input-container">
				<view style="flex:8">
					<text>转移位置</text>
				</view>	
				<view style="flex:16">
					{{PatrolData.transferPosition}}
				</view>	
			</view>
			<view class="report-input-container">
				<view style="flex:8">
					<text>转移原因</text>
				</view>	
				<view style="flex:16">
					{{PatrolData.reasonForTransfer}}
				</view>	
			</view>
	
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
				PatrolData:[],
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
		
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.PatrolData= data.item
				console.log("this.PatrolData",this.PatrolData)
			})
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
			addLocation(data){
				this.popupData = data
				this.popupLevel = data.level
				this.$refs.popup.open('bottom')
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
			DailyPatrolCreate(){
				console.log("填报内容",this.DailyPatrolResultCreateReq)
				request({
					method:'POST',
					url:'patrolManage/dailyPatrolResultCreate',
					data:{
						DailyPatrolResultCreateReq :this.DailyPatrolResultCreateReq

					},
				})
				.then(res=>{
					if(res.code===2000){
					}else{
					}
				})
			},
			add(){				this.potentialData.push({						type:'',						potential:'',						number:this.potentialData.length,					})					console.log(this.potentialData);			},			minus(item){				for(var i=item.number+1; i<this.potentialData.length; i++){					this.potentialData[i].number-=1;				}				console.log(item.number);				console.log(this.potentialData);				this.potentialData.splice(item.number,1);			},
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
			
			padding: 10px;
			background-color: white;
		}
		.report-input-container{
			margin: 5px 0;
			display: flex;
			align-items: center;
			
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
