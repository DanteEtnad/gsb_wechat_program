<template>
	<view>
		<view class="map_view" @click="mapShow">显示地图</view>
		<mapMode v-show="mapshow"></mapMode>
		<u-sticky bgColor="#fff">
			<u-tabs :list="list" :scrollable="false" @click="handleTabsClick"></u-tabs>
		</u-sticky>
		<BasicInformationCheckMode 
		 v-show="textShow"
		 :sendData="DisasterInfoQueryData"
		 @getDate="getDate"
		 @getLocal="getLocal"
		 @getType="getType"
		 @getPotentialId="getPotentialId"
		 @longitude1="longitude1"
		 @longitude2="longitude2"
		 @longitude3="longitude3"
		 @latitude1="latitude1"
		 @latitude2="latitude2"
		 @latitude3="latitude3"
		 @getScale="getScale"
		 @getFactors="getFactors"
		 @getLevel="getLevel"
		 @getName="getName"
		 @getPhone="getPhone"
		 @getCity="getCity">
		</BasicInformationCheckMode>

		<DisasterInformationCheckMode 
		v-show="!textShow"
		:sendData="DisasterInfoQueryData"
		@getPopulationAffected="getPopulationAffected"
		@getPopulationDead="getPopulationDead"
		@getPopulationMissed="getPopulationMissed"
		@getPopulationInjured="getPopulationInjured"
		@getdisasterRecordEconomicLossText="getdisasterRecordEconomicLossText"
		@getTarget="getTarget"
		@getDescription="getDescription"
		@getPrevention="getPrevention">
		</DisasterInformationCheckMode>
		<view style="padding-left:  30%;">
			<u-radio-group 
			    v-model="value"
			    placement="row">
				<u-radio activeColor="#2E9BFF" label="通过" customStyle="padding-right:20px;" size="30" @change="check" ></u-radio>
				<u-radio activeColor="#2E9BFF" label="否决" size="30" @change="pass"></u-radio>
			</u-radio-group>
		
		</view>
		
		<view class="btn-submit">
				<button  
				class="btn" 
				type="btn-sure" 
				form-type="submit" 
				@tap="tapPopup"
				>
				<!-- @click="submit" -->
				审核并发送短信
				</button>
				<uni-popup ref="message" background-color="#fff">
					<sendMessageTochang  @closeDialog="closeMessageDialog" @afterSendMessage="afterSendMessage" :DisasterRecordForm="DisasterRecordForm"></sendMessageTochang>
				</uni-popup>
		</view>
		
		

	</view>
</template>

<script>
	import {request} from '@/utils/request.js'
	import DisasterInformationCheckMode  from "@/pages_DisasterRecord/components/DisasterInformationCheckMode.vue"
	import BasicInformationCheckMode from '@/pages_DisasterRecord/components/BasicInformationCheckMode.vue'
	import sendMessageTochang from '@/pages_DisasterRecord/components/sendMessageTochang.vue'
	import mapMode from '@/pages_DisasterRecord/components/mapMode.vue'
	export default {
		components:{
			DisasterInformationCheckMode,
			BasicInformationCheckMode,
			sendMessageTochang,
			mapMode,
			
		},
		data() {
			return {
				show:false,
				textShow:true,
				mapshow:false,
				list:[{name:'基本信息填报',},{name:'灾情信息填报',}],
				DisasterRecordForm:{
					approvalStatus:'',
					disasterRecordId:'',
					potentialPointId:'',
					disasterAdcode:'',
					disasterLocation:'',
					disasterRecordDate:'',
					disasterSubmitDate:'',
					disasterDistance:'暂无',
					disasterLongitude:'0',
					disasterLatitude:'0',
					disasterRecordType:'',
					disasterScaleLevels:'',
					disasterRecordLevel :'',
					disasterTrigger:'',
					disasterRecordPopulationAffected:'',
					disasterRecordPopulationDead:'',
					disasterRecordPopulationMissing:'',
					disasterRecordPopulationInjured:'',
					disasterRecordEconomicLoss:'',
					disasterTarget:'',
					disasterRecordDescription:'',
					disasterPrevention:'',
					memberId:'',
					memberPhone:'',	
				},
				DisasterInfoQueryData:{},
				longitudeSave:[],
				latitudeSave:[],
			
				Longitude:'',
				Latitude:'',
				
				
			}
		},
		mounted() {
			this.changedata()
			
		},
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.DisasterInfoQueryData= data.item
				
				
			})
		},
		
		methods: {
			check(e){
				this.DisasterRecordForm.approvalStatus='CKD'
				console.log("this.DisasterRecordForm.approvalStatus",this.DisasterRecordForm.approvalStatus)
			},
			pass(e){
				this.DisasterRecordForm.approvalStatus='BCK'
				console.log("this.DisasterRecordForm.approvalStatus",this.DisasterRecordForm.approvalStatus)
			},
			changedata(){
				this.DisasterRecordForm.disasterRecordId=this.DisasterInfoQueryData.disasterRecordId
				this.DisasterRecordForm.potentialPointId=this.DisasterInfoQueryData.potentialPointId
				this.DisasterRecordForm.disasterAdcode=this.DisasterInfoQueryData.disasterAdcode
				this.DisasterRecordForm.disasterLocation=this.DisasterInfoQueryData.disasterLocation
				this.DisasterRecordForm.disasterRecordDate=this.DisasterInfoQueryData.disasterRecordDate
				this.DisasterRecordForm.disasterSubmitDate=this.DisasterInfoQueryData.disasterSubmitDate
				this.DisasterRecordForm.disasterDistance=this.DisasterInfoQueryData.disasterDistance
				this.DisasterRecordForm.disasterLongitude=this.DisasterInfoQueryData.disasterLongitude
				this.DisasterRecordForm.disasterLatitude=this.DisasterInfoQueryData.disasterLatitude
				this.DisasterRecordForm.disasterRecordType=this.DisasterInfoQueryData.disasterRecordType
				this.DisasterRecordForm.disasterScaleLevels=this.DisasterInfoQueryData.disasterScaleLevels
				this.DisasterRecordForm.disasterRecordLevel=this.DisasterInfoQueryData.disasterRecordLevel
				this.DisasterRecordForm.disasterTrigger=this.DisasterInfoQueryData.disasterTrigger
				this.DisasterRecordForm.disasterRecordPopulationAffected=this.DisasterInfoQueryData.disasterRecordPopulationAffected
				this.DisasterRecordForm.disasterRecordPopulationDead=this.DisasterInfoQueryData.disasterRecordPopulationDead
				this.DisasterRecordForm.disasterRecordPopulationMissing=this.DisasterInfoQueryData.disasterRecordPopulationMissing
				this.DisasterRecordForm.disasterRecordPopulationInjured=this.DisasterInfoQueryData.disasterRecordPopulationInjured
				this.DisasterRecordForm.disasterRecordEconomicLoss=this.DisasterInfoQueryData.disasterRecordEconomicLoss
				this.DisasterRecordForm.disasterTarget=this.DisasterInfoQueryData.disasterTarget
				this.DisasterRecordForm.disasterRecordDescription=this.DisasterInfoQueryData.disasterRecordDescription
				this.DisasterRecordForm.disasterPrevention=this.DisasterInfoQueryData.disasterPrevention
				this.DisasterRecordForm.memberId=this.DisasterInfoQueryData.memberId
				this.DisasterRecordForm.memberPhone=this.DisasterInfoQueryData.memberPhone
				
					
			},
			mapShow(){
				this.mapshow=!this.mapshow
			},
			getDate(e){
				this.DisasterRecordForm.disasterRecordDate=this.timeTypeChange(e)
				console.log("this.DisasterRecordForm.disasterRecordDate",this.DisasterRecordForm.disasterRecordDate)
			},				
			getLocal(e){
				this.DisasterRecordForm.disasterLocation=e
				console.log("this.DisasterRecordForm.disasterLocation",this.DisasterRecordForm.disasterLocation)
			},
			getType(e){
				this.DisasterRecordForm.disasterRecordType=e
				console.log("this.DisasterRecordForm.disasterLocation",this.DisasterRecordForm.disasterRecordType)
			},
			getScale(e) {
				this.DisasterRecordForm.disasterScaleLevels=e
				console.log("this.DisasterRecordForm.disasterScaleLevels",this.DisasterRecordForm.disasterScaleLevels)
				
			},
			getPotentialId(e) {
				this.DisasterRecordForm.potentialPointId=e
				console.log("this.DisasterRecordForm.potentialPointId",this.DisasterRecordForm.potentialPointId)
			},
			getFactors(e){
				this.DisasterRecordForm.disasterTrigger=e
				console.log("this.DisasterRecordForm.disasterTrigger",this.DisasterRecordForm.disasterTrigger)
				
			},
			getLevel(e){
				this.DisasterRecordForm.disasterRecordLevel=e
				console.log("this.DisasterRecordForm.disasterRecordLevel",this.DisasterRecordForm.disasterRecordLevel)
				
			},
			getName(e) {
				this.DisasterRecordForm.memberId=e
				console.log("this.DisasterRecordForm.memberId",this.DisasterRecordForm.memberId)
				
			},
			getPhone(e) {
				this.DisasterRecordForm.memberPhone=e
				console.log("this.DisasterRecordForm.memberPhone",this.DisasterRecordForm.memberPhone)
			
			},
			getPopulationAffected(e) {
				this.DisasterRecordForm.disasterRecordPopulationAffected=e
				console.log("this.DisasterRecordForm.disasterRecordPopulationAffected",this.DisasterRecordForm.disasterRecordPopulationAffected)
			},
			getdisasterRecordEconomicLossText(e) {
				this.DisasterRecordForm.disasterRecordEconomicLoss=e
				console.log("this.DisasterRecordForm.disasterRecordEconomicLossText",this.DisasterRecordForm.disasterRecordEconomicLoss)
			},
			getPopulationDead(e) {
				this.DisasterRecordForm.disasterRecordPopulationDead=e
				console.log("this.DisasterRecordForm.disasterRecordPopulationDead",this.DisasterRecordForm.disasterRecordPopulationDead)
			},
			getPopulationMissed(e) {
				this.DisasterRecordForm.disasterRecordPopulationMissing=e
				console.log("this.DisasterRecordForm.disasterRecordPopulationMissing",this.DisasterRecordForm.disasterRecordPopulationMissing)
			},
			getPopulationInjured(e) {
				this.DisasterRecordForm.disasterRecordPopulationInjured=e
				console.log("this.DisasterRecordForm.disasterRecordPopulationInjured",this.DisasterRecordForm.disasterRecordPopulationInjured)
			},
			getTarget(e){
				this.DisasterRecordForm.disasterTarget=e
					console.log("this.DisasterRecordForm.disasterTarget",this.DisasterRecordForm.disasterTarget)
				
			},
			getDescription(e){
				this.DisasterRecordForm.disasterRecordDescription=e
				console.log("this.DisasterRecordForm.disasterRecordDescription",this.DisasterRecordForm.disasterRecordDescription)
				
			},
			getPrevention(e){
				this.DisasterRecordForm.disasterPrevention=e
				console.log("this.DisasterRecordForm.disasterPrevention",this.DisasterRecordForm.disasterPrevention)
				
			},
			getCity(e){
				this.DisasterRecordForm.disasterAdcode=e
				console.log("this.DisasterRecordForm.disasterAdcode",this.DisasterRecordForm.disasterAdcode)
			},
			longitude1(e){
				this.longitudeSave[0]=e
				console.log("this.longitudeSave[0]",this.longitudeSave[0])
			},
			longitude2(e){
				this.longitudeSave[1]=e
				console.log("this.longitudeSave[1]",this.longitudeSave[1])
			},
			longitude3(e){
				this.longitudeSave[2]=e
				console.log("this.longitudeSave[2]",this.longitudeSave[2])
			},
			latitude1(e){
				this.latitudeSave[0]=e
				console.log("this.latitudeSave[0]",this.latitudeSave[0])
			},
			latitude2(e){
				this.latitudeSave[1]=e
				console.log("this.latitudeSave[1]",this.latitudeSave[1])
			},
			latitude3(e){
				this.latitudeSave[2]=e
				console.log("this.latitudeSave[2]",this.latitudeSave[2])
			
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
			
			// 弹窗
			tapPopup() {
				//度分秒(DMS)换算成度(DDD)
				this.Longitude=Number(this.longitudeSave[0])+Number(this.longitudeSave[1]/60)+Number(this.longitudeSave[2]/3600)
				this.Latitude=Number(this.latitudeSave[0])+Number(this.latitudeSave[1]/60)+Number(this.latitudeSave[2]/3600)
				this.Longitude=this.Longitude.toFixed(6);//保留6位小数
				this.Latitude=this.Latitude.toFixed(6);//保留6位小数
				this.DisasterRecordForm.disasterLongitude=this.Longitude
				this.DisasterRecordForm.disasterLatitude=this.Latitude
				console.log("this.DisasterRecordForm.disasterLongitude",this.DisasterRecordForm.disasterLongitude)
				console.log("this.DisasterRecordForm.disasterLatitude",this.DisasterRecordForm.disasterLatitude)
				console.log("this.DisasterRecordForm啊啊啊",this.DisasterRecordForm)
				//表单校验
				let date=this.DisasterRecordForm.disasterRecordDate
				let Adcode=this.DisasterRecordForm.disasterAdcode
				let location=this.DisasterRecordForm.disasterLocation
				let type=this.DisasterRecordForm.disasterRecordType
				let long=this.DisasterRecordForm.disasterLongitude
				let lat=this.DisasterRecordForm.disasterLatitude
				let scale=this.DisasterRecordForm.disasterScaleLevels
				let Trigger=this.DisasterRecordForm.disasterTrigger
				let level=this.DisasterRecordForm.disasterRecordLevel
				let name =this.DisasterRecordForm.memberId
				let phone=this.DisasterRecordForm.memberPhone
				let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
				let longreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/ //纬度校验
				let latreg =  /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/ //经度校验
				if(!date){
					uni.showToast({
					title:"请选择日期",
					icon:"none"
					})
				}else if(!Adcode){
					uni.showToast({
					title:"请选择市县镇村",
					icon:"none"
					})
				}else if(!location){
					uni.showToast({
					title:"请输入镇村",
					icon:"none"
					})
				}else if(!type){
					uni.showToast({
					title:"请选择灾害类型",
					icon:"none"
					})
				}else if(!scale){
					uni.showToast({
					title:"请选择灾害规模",
					icon:"none"
					})
				}else if(!Trigger){
					uni.showToast({
					title:"请选择引发因素",
					icon:"none"
					})
				}else if(!level){
					uni.showToast({
					title:"请选择灾害等级",
					icon:"none"
					})
				}else if(!name){
					uni.showToast({
					title:"请输入填报人姓名",
					icon:"none"
					})
				}else if(!phoneReg.test(phone)|| !phone){
					uni.showToast({
						title:"手机格式不正确",
						icon:"none"
					})
				}else{
					this.openMessageDialog()
				}
				
				
			},
			
			//时间映射
			timeTypeChange(Date){
				var timeTransform;
				timeTransform = Date.slice(0, 4)  + Date.slice(5, 7) + Date.slice(8, 10);
				return timeTransform;
			},
			handleTabsClick(index){
				console.log(index.name)
				if(index.name==='灾情信息填报'){
					this.textShow = false
				}else{
					this.textShow = true
				}
			}
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #F7F7F8;
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
	
		
	
</style>
