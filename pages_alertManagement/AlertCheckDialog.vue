<template>
	<view class="check-container">
		<view class="check-status-container">
			<uni-row>
				<view class="check-status">
					<text>当前进度：</text>
					<text>{{transformAlertSubphase(dataCodeTransform(alert.alertSubphase.toString(),`alertSubphase${alert.alertPhase}`))}}</text>
					<!-- <text>{{dataCodeTransform(alert.alertSubphase.toString(),`alertSubphase${alert.alertPhase}`)}}</text> -->
				</view>
			</uni-row>
			<uni-row>
				<view class="check-status">
					<text>流程状态：</text>
					<text>{{dataCodeTransform(alert.alertState,'alertStates')}}</text>
				</view>
			</uni-row>
			<uni-row>
				<view class="check-status">
					<text>执行人：</text>
					<text>由汕头市气象局和汕头市自然局相关部门执行</text>
				</view>
			</uni-row>
			<uni-row v-if="alert.alertState==='CKD'">
				<view class="check-status">
					<text style="flex: 2;">发布对象：</text>
					<view style="flex: 5;">
						<uni-data-select v-model="memberId" :localdata="members"/>
					</view>
				</view>
			</uni-row>
			<uni-row v-if="alert.alertState!=='FIN'">
				<view class="check-status">
					<text>操作：</text>
					<view class="check-status-button">
						<button @click="publish" v-if="alert.alertState==='CKD'">发布</button>
						<button @click="alertHandle" v-else-if="alert.alertState==='ORG'||alert.alertState==='HDG'">通过</button>
						<button @click="alertCheck" v-else>通过</button>
						<button @click="openUpdateDialog">修改</button>
						<button @click="alertDelete">终止</button>
					</view>
				</view>
			</uni-row>
		</view>
		<view class="check-info-container">
			<view class="check-info-text">
				<text>{{alert.alertName}}</text>
			</view>
			<view class="check-info-text"> 
				<text>{{timeTransform(alert.alertStartTime)}} - {{timeTransform(alert.alertEndTime)}}</text>
			</view>
			<view class="check-info-picture">
				<u--image :src="alert.alertMapUrl" mode="aspectFit"></u--image>
			</view>
			<view class="check-info-text">
				<p style="color: rgba(0,0,0,.65);text-indent:2em" v-for="(description,index) in alertDescription" :key="index">
					{{description}}
				</p>
			</view>
		</view>
		<uni-popup ref="messagePopup" background-color="#fff">
			<AlertMessage ref="message" @closeDialog="closeMessageDialog" @afterSendMessage="afterSendMessage"/>
		</uni-popup>
	</view>
</template>

<script>
	import {requestAuthority,request} from "@/utils/request.js"
	import {dataCodeTransformMixins,timeTransformMixins,getMemberOptionsMixins} from "@/utils/mixins.js"
	import AlertMessage from "@/pages_alertManagement/components/AlertMessage.vue"
	export default {
		mixins:[dataCodeTransformMixins,timeTransformMixins,getMemberOptionsMixins],
		components:{
			AlertMessage
		},
		data() {
			return {
				AlertProcessMessageRsp:{},
				alert:{},
				officeData:[],
				alertDescription:[],
				queryForm:{
					alertId:''
				},
				members:[],
				memberId:'',
			}
		},
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.alert = data.item
				this.queryForm.alertId = data.item.alertId
				this.alertDescription = this.alert.alertDescription.split("；")
			})
		},
		mounted() {
			this.getMembersOptions()
			this.gerMembers()
		},
		methods: {
			alertHandle(){
				request({
					url:'alertManage/alertHandle',
					method:'post',
					data:{
						AlertHandleReq:{
							...this.queryForm,
							operateProcedureResult:'Y'
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.AlertProcessMessageRsp = res.data.AlertProcessMessageRsp
						this.openMessageDialog(this.AlertProcessMessageRsp)
					}else{
						uni.showModal({
							title:'失败',
							content:res.message,
							showCancel:false
						})
					}
				})
			},
			alertCheck(){
				request({
					url:'alertManage/alertCheck',
					method:'post',
					data:{
						AlertCheckReq:{
							...this.queryForm,
							operateProcedureResult:'Y'
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.AlertProcessMessageRsp = res.data.AlertProcessMessageRsp
						this.openMessageDialog(this.AlertProcessMessageRsp)
					}else{
						uni.showModal({
							title:'失败',
							content:res.message,
							showCancel:false
						})
					}
				})
			},
			async openUpdateDialog(){
				const response = await uni.navigateTo({
					url:'/pages_alertManagement/AlertUpdateDialog',
				})
				response[1].eventChannel.emit('openUpdateDialog',{
					item: this.alert
				})
			},
			alertDelete(){
				request({
					url:'alertManage/alertDelete',
					method:'post',
					data:{
						AlertDeleteReq:{
							...this.queryForm
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						uni.showModal({
							title:'成功',
							content:'终止成功,点击确定返回',
							showCancel:false
						}).then(res=>{
							uni.redirectTo({
								url:'/pages/alertManagement/AlertCheck',
							})
						})
					}else{
						uni.showModal({
							title:'失败',
							content:res.message,
							showCancel:false
						})
					}
				})
			},
			gerMembers(){
				requestAuthority({
					url:'member/query',
					method:'post',
					data:{
						MemberQueryReq:{
							"memberId": "",
							"unitId": "",
							"memberName": "",
							"memberStatus": "",
							"memberGender": "",
							"memberIdentityCard": ""
						},
						QueryPagingParamsReq:{
							offset:0,
							queryCount:9999
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.members = res.data.MemberQueryRsp.map(item=>{
							return {
								value:item.memberId,
								text:item.memberName,
							}
						})
					}
				})
			},
			publish(){
				if(this.memberId===''){
					uni.showModal({
						title:'失败',
						content:'请选择发布对象',
						showCancel:false
					})
					return
				}
				request({
					url:'alertManage/alertPublish',
					method:'post',
					data:{
						AlertPublishReq:{
							...this.queryForm,
							memberId:this.memberId
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.AlertProcessMessageRsp = res.data.AlertProcessMessageRsp
						this.openMessageDialog(this.AlertProcessMessageRsp)
					}else{
						uni.showModal({
							title:'失败',
							content:res.message,
							showCancel:false
						})
					}
				})
			},
			transformAlertSubphase(str){
				switch(str){
					case '生成':return '风险预警单创建';
					case '会商':return '预警预报结果会商';
					case '复核':return '预警技术负责人复核';
					case '四级审批':return '预警中心和气象台领导审核';
					case '三级审批':return '各局主管科室领导审核';
					case '二级审批':return '各局主管领导签批';
					case '一级审批':return '联合向市委和市政府汇报';
					case '发布':return '已发布';
				}
			},
			openMessageDialog(AlertProcessMessageRsp){
				this.$refs.messagePopup.open('center')
				this.$refs.message.openMessageDialog(AlertProcessMessageRsp)
			},
			closeMessageDialog(){
				this.$refs.messagePopup.close()
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
	.button-base{
		background: #2E9BFF;
		border-radius: 6px;
		font-size: 16px;
		color: #fff;
		padding: 0;
		margin: 0;
	}
	.check-container{
		.check-status-container{
			background-color: white;
			padding: 10px 5px;
			margin-bottom: 10px;
			.check-status{
				padding: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.check-status-button{
					display: flex;
					justify-content: space-evenly;
					button{
						@extend .button-base;
						margin-left: 10px;
						width: 80px;
						height: 36px;
						line-height: 36px;
					}
				}
			}
		}
		.check-info-container{
			background-color: white;
			padding: 10px 5px;
			.check-info-text{
				padding: 0 10px;
			}
			.check-info-picture{
				display: flex;
				justify-content: space-around;
			}
		}
	}
</style>
