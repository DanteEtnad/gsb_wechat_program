<template>
	<view class="container">
		<view class="header">
			<text>发送短信</text>
			<uni-icons type="closeempty" size="16" color="#fff" style="position: absolute;right:15px" @click="closeDialog"></uni-icons>
		</view>
		<view class="content">
			<view class="row" style="align-items: center;">
				<text style="flex: 2;">模板名称</text>
				<uni-data-select v-model="messageTemplateId" :localdata="messageTemplate" style="flex: 5;"/>
			</view>
			<view class="row">
				<text style="flex: 2;">模板内容</text>
				<view style="flex: 5;">
					<uni-easyinput v-model="templateContent" placeholder="请选择" type="textarea" :disabled="true" disableColor="#F7F7F8"/>
				</view>
			</view>
			<view class="row">
				<text style="flex: 2;">发送给</text>
				<view style="flex: 5;">
					<uni-data-checkbox v-model="memberType" :localdata="memberTypes"/>
					<uni-data-select v-model="telephoneNumber" :localdata="memberType===0?groups:members"/>
					<view class="message-member-container">
						<view v-for="(member,index) in sendForm.members" :key="index" @click="deleteMember(index)" class="message-member-item">
							{{memberOption[member]}}
							<view class="message-member-item-delete">
								<uni-icons type="closeempty" size="16" color="#000"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<button class="reset" @click="reset">重置</button>
			<button class="send" @click="sendMessage">发送</button>
		</view>
	</view>
</template>

<script>
	import {requestAuthority,request} from "@/utils/request.js"
	export default {
		props: {
			DisasterRecordForm: '',
		},
		name:"Message",
		data() {
			return {
				sendForm:{
					messageTemplateId: "",
					members: [],
					messageContent: ""
				},
				memberType:0,
				memberTypes:[
					{value:0,text:'短信组'},
					{value:1,text:'个人'}
				],
				messageTemplateId:'',
				templateType:'',
				members:[],
				memberOption:{},
				groups:[],
				messageTemplate:[],
				templateContent:'',
				telephoneNumber:''
			}
		},
		watch:{
			messageTemplateId:{
				deep:true,
				handler(newValue,oldValue){
					console.log(newValue,oldValue);
					if(newValue===""){
						this.templateContent = ""
					}else{
						const result = this.messageTemplate.find(item=>{
							return newValue === item.value
						})
						this.templateContent = result.content
					}
				}
			},
			telephoneNumber:{
				deep:true,
				handler(newValue,oldValue){
					if(newValue!==''){
						if(this.memberType===0){
							this.sendForm.members = [...this.sendForm.members,...newValue.split(';')]
						}else{
							this.sendForm.members.push(newValue)
						}
					}
				}
			}
		},
		mounted() {
			this.getMessageTemplate()
			this.gerMembers()
			this.getMessageGroup()
			console.log("短信里的DisasterRecordForm",this.DisasterRecordForm)
		},
		methods:{
			getMessageTemplate(){
				requestAuthority({
					url:'messageTemplate/query',
					method:"post",
					data:{
						MessageTemplateQueryReq:{},
						QueryPagingParamsReq:{
							offset:0,
							queryCount:9999
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.messageTemplate = res.data.MessageTemplateQueryRsp.map(item=>{
							return {
								value:item.messageTemplateId,
								text:item.messageTemplateName,
								content:item.templateContent
							}
						})
						console.log(this.messageTemplate);
					}
				})
			},
			gerMembers(){
				requestAuthority({
					url:'member/query',
					method:'post',
					data:{
						MemberQueryReq:{},
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
						let members = {}
						this.members.forEach(item=>{
							members[item.value] = item.text
						})
						this.memberOption = members
					}
				})
			},
			getMessageGroup(){
				requestAuthority({
					url:'messageGroup/query',
					method:'post',
					data:{
						MessageGroupQueryReq:{},
						QueryPagingParamsReq:{
							offset:0,
							queryCount:9999
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.groups = res.data.MessageGroupQueryRsp.map(item=>{
							return {
								value:item.messageGroupMemberId,
								text:item.messageGroupName
							}
						})
					}
				})
			},
			sendMessage(){
				if(this.messageTemplateId===''||this.sendForm.members.length===0){
					uni.showModal({
						title:'失败',
						content:'请选择模板或发送对象',
						showCancel:false
					})
				}else{
					const result = this.messageTemplate.find(item=>{
						return this.messageTemplateId === item.value
					})
					this.sendForm.messageTemplateId = result.value
					this.sendForm.messageContent = result.content
					console.log(this.sendForm);
					requestAuthority({
						url:'sendMessage/sendPatrolResultMessage',
						method:'post',
						data:{
							PatrolResultMessageReq:{...this.sendForm}
						}
					})
					.then(res=>{
						if(res.code===2000){
							this.reset()
							this.$emit('afterSendMessage')
							this.uploadDisasterRecord()
							console.log("表单提交成功")
						}
					})
				}
			},
			//上传灾害信息
			uploadDisasterRecord() {
				request({
						method: 'POST',
						url: 'disasterRecord/create',
						data: {
							DisasterRecordCreateReq: this.DisasterRecordForm
						}
					})
					.then(res => {
						if (res.code === 2000) {
							console.log("@success@", res)
						} else {
							this.$message.error(res.message)
						}
						console.log("@res@", res)
					})
			
			},
			
			reset(){
				this.sendForm = {
					messageTemplateId: "",
					members: [],
					messageContent: ""
				}
				this.memberType = 0
				this.templateContent = ''
				this.messageTemplateId = ''
				this.telephoneNumber = ''
			},
			closeDialog(){
				this.reset()
				this.$emit('closeDialog')
			},
			deleteMember(index){
				this.sendForm.members.splice(index,1)
			}
		}
	}
</script>

<style lang="scss">
	text{
		font-size: 16px;
	}
	.button-base{
		background: #2E9BFF;
		border-radius: 6px;
		font-size: 16px;
		color: #fff;
		padding: 0;
		margin: 0;
	}
	.container{
		//height: 400px;
		width: 300px;
		.header{
			position: relative;
			padding: 10px;
			background-color:#2E9BFF;
			color: #fff;
			text-align: center;
			// display: flex;
			// justify-content: space-between;
			// align-items: center;
		}
		.content{
			padding: 0 10px;
			.row{
				display: flex;
				align-items: flex-start;
				margin: 20px 0;
				.message-member-container{
					display: grid;
					grid-template-columns: 100px 100px;
					.message-member-item{
						margin: 5px;
						padding: 5px;
						background-color: #c8c7c6;
						border-radius: 6px;
						display:flex;
						justify-content:space-between;
						align-items: center;
						.message-member-item-delete{
							background-color:#fff;
							border-radius:50%;
							width: 20px;
							height: 20px;
							display: flex;
							justify-content: space-around;
							align-items: center;
						}
					}
				}
			}
		}
		.footer{
			padding: 10px;
			display: flex;
			justify-content: space-evenly;
			button.reset{
				@extend .button-base;
				background: #fff;
				color: #2E9BFF;
				border: #2E9BFF 1px solid;
				width: 120px;
				height: 36px;
				line-height: 36px;
			}
			button.send{
				@extend .button-base;
				width: 120px;
				height: 36px;
				line-height: 36px;
			}
		}
	}
	
</style>