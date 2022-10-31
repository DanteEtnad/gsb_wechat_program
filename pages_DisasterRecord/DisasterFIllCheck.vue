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
		>
		</BasicInformationCheckMode>

		<DisasterInformationCheckMode 
		v-show="!textShow"
		:sendData="DisasterInfoQueryData"
		>
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
					<sendMessageTocheck 
					 @closeDialog="closeMessageDialog" 
					 @afterSendMessage="afterSendMessage" 
					 :checkForm="checkForm"></sendMessageTocheck>
				</uni-popup>
		</view>
		
		

	</view>
</template>

<script>
	import {request} from '@/utils/request.js'
	import DisasterInformationCheckMode  from "@/pages_DisasterRecord/components/DisasterInformationCheckMode.vue"
	import BasicInformationCheckMode from '@/pages_DisasterRecord/components/BasicInformationCheckMode.vue'
	import sendMessageTocheck from '@/pages_DisasterRecord/components/sendMessageTocheck.vue'
	import mapMode from '@/pages_DisasterRecord/components/mapMode.vue'
	export default {
		components:{
			DisasterInformationCheckMode,
			BasicInformationCheckMode,
			sendMessageTocheck,
			mapMode,
			
		},
		data() {
			return {
				show:false,
				textShow:true,
				mapshow:false,
				list:[{name:'基本信息填报',},{name:'灾情信息填报',}],
				DisasterInfoQueryData:{},
				checkForm:{
					disasterRecordId:'',
					approvalStatus:'',
				},
			}
		},
		mounted() {
			
			
		},
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.DisasterInfoQueryData= data.item
				console.log("this.DisasterInfoQueryData",this.DisasterInfoQueryData)
				
				
			})
		},
		
		methods: {
			check(e){
				this.checkForm.approvalStatus='CKD'
				this.checkForm.disasterRecordId=this.DisasterInfoQueryData.disasterRecordId
				console.log("this.checkForm",this.checkForm)
			},
			pass(e){
				this.checkForm.approvalStatus='BCK'
				this.checkForm.disasterRecordId=this.DisasterInfoQueryData.disasterRecordId
				console.log("this.checkForm",this.checkForm)
			},
			
			mapShow(){
				this.mapshow=!this.mapshow
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
			
				this.openMessageDialog()	
				
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
