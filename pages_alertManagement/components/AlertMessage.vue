<template>
	<view class="container">
		<view class="header">
			<text>发送短信</text>
			<uni-icons type="closeempty" size="16" color="#fff" style="position: absolute;right:15px" @click="closeDialog"></uni-icons>
		</view>
		<view class="content">
			<view class="row">
				<text style="flex: 2;">模板内容</text>
				<view style="flex: 5;">
					<uni-easyinput v-model="sendForm.messageContent" placeholder="请选择" type="textarea" :disabled="true" disableColor="#F7F7F8"/>
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
			<button class="send" @click="sendMessage">发送</button>
		</view>
	</view>
</template>

<script>
	import {requestAuthority,request} from "@/utils/request.js"
	export default {
		props:['AlertProcessMessageRsp'],
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
				templateType:'',
				members:[],
				memberOption:{},
				groups:[],
				telephoneNumber:''
			}
		},
		watch:{
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
		methods:{
			openMessageDialog(AlertProcessMessageRsp){
				this.gerMembers()
				this.getMessageGroup()
				this.sendForm.members = AlertProcessMessageRsp.members.map(item=>{
					return item.memberId
				})
				this.sendForm.messageTemplateId = AlertProcessMessageRsp.messageTemplateId
				this.sendForm.messageContent = AlertProcessMessageRsp.messageContent
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
				requestAuthority({
					url:'sendMessage/sendAlertProcessMessage',
					method:'post',
					data:{
						AlertProcessMessageReq:{...this.sendForm}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.$emit('afterSendMessage')
					}
				})
			},
			closeDialog(){
				// this.reset()
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