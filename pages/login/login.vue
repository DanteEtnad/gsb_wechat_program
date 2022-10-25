<template>
	<view>
		<view class="content" style="margin-left: 15px; margin-top:15%">
			<u--text color="#000000" size=16px text="欢迎登录"></u--text>
			<u--text color="#000000" size=18px text="汕头市地址灾害气象预报预警平台"></u--text>
		</view>
		<view class="form" style="margin-top: 20%; margin-left: 10%;margin-right: 10%;">
			<u--form
							label-width="70"
							labelPosition="left"
							:model="model1"
							:rules="rules"
							ref="form1"
					>
						<u-form-item
								label="手机号"
								prop="userInfo.name"
								borderBottom
								ref="item1"
						>
							<u--input
									v-model="model1.userInfo.name"
									border="none"
									placeholder="请输入手机号"
									@input = 'obtain'
							></u--input>
						</u-form-item>
						<u-button
							text="发送验证码"
							@click="getVerifyCode"
						></u-button>
						<u-form-item
								
								label="验证码"
								prop="code"
								borderBottom
							>
								<u--input
									v-model="model1.code"
									border="none"
									placeholder="请填验证码"
									@input="inputcode"
								></u--input>
						</u-form-item>			
					</u--form>
					<u-button
						type="primary"
						text="登录"
						@click="submit"
					></u-button>	
						<view style="margin-top:15px;">
							<u-button
								text="专业用户登录"
								@click="tologinside"
							></u-button>	
						</view>
		</view>

	</view>
</template>

<script>
	import {requestAuthority,request,requestAuthority1} from '@/utils/request.js'
	export default {
	data() {
		return {
			memberData:{},
			phoneNumber:"",
			phonecode:'',
			model1: {
				userInfo: {
					name: '',
				},
				code: ''
			},
			rules: {
				'userInfo.name': {
					type: 'string',
					required: true,
					message: '请填写手机号',
					trigger: ['blur', 'change']
				},
			code: {
				type: 'string',
					required: true,
					message: '请填写验证码',
					trigger: ['blur']
			},				
			},
		}
	},
methods: {
	tologinside(){
		uni.navigateTo({
			url:'/pages/login/logininside'
		})
	},
	obtain(e){
		this.phoneNumber=e;
		console.log(e);
		},
	inputcode(e) {
		this.phonecode=e;
		console.log(e);
	},
			getVerifyCode(){
				uni.showLoading({
					title: '发送中'
				});
						requestAuthority1({
							method:'POST',
							url:'login/verifyCode',
							data:{
								LoginVerifyCodeReq:{
									"userPhone":this.phoneNumber,
								}
							},
						})
						.then(res=>{if(res.code===2000){
							uni.hideLoading();
							uni.showToast({
								title: `验证码发送成功`,
								duration: 2000
							});}
							else{
								uni.hideLoading();
								uni.showToast({
									title: `验证码发送失败`,
									duration: 2000
								});
								console.log(error)
							}
							console.log("@res@",res)
						})
						.catch(error=>{
							
						})
					},
				submit(){
					requestAuthority1({
					method:'POST',
					url:'login/login',
					data:{
					LoginReq :{
							"userPhone":this.phoneNumber,
							"verifyCode":this.phonecode,
						}
					}
				})
				.then(res=>{
						uni.setStorageSync('token',res.data.tokenRsp.token)
						let token = uni.getStorageSync('token')
						console.log("token",token)
						uni.navigateTo({
						url:'/pages_index_normal/index_feizhuanye'
							})
						uni.$u.toast('登录成功')
					})
					.catch(error=>{
						uni.$u.toast('验证码错误')
					})
			},
			},
		}
		// 	console.log("this.phoneNumber",this.phoneNumber);
		// 	console.log("this.phonecode",this.phonecode);
</script>


<style lang="scss" scoped>
.box {
    font-size: 15px;
	color: red;
	font-weight: bold;
}
.form{
	font-size: 10px;
	color: red;
}
</style>