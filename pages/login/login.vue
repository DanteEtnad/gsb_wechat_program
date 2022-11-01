<template>
	<view style="position: absolute; background :linear-gradient(35deg,white,rgba(212,237,244,0.8));width: 100%;height: 100%;">
		<view>
			<view class="content" style="margin-left: 12.6%; margin-top:25%">
				<view style="margin-bottom: 20px;">
					<u--text color="#000000" size=16px text="欢迎登录"></u--text>
				</view>
				<u--text color="#000000" size=18px text="汕头市地址灾害气象预报预警平台"></u--text>
			</view>
			<view class="form" style="margin-top: 30%; margin-left: 10%;margin-right: 10%;margin-bottom: 10%;">
				<u--form
								label-width="80"
								labelPosition="left"
								:model="model1"
								:rules="rules"
								ref="form1"
								
						>
							<u-form-item
									label="手机号码"
									prop="userInfo.name"
									borderBottom
									ref="item1"
							>
								<u--input
										v-model="model1.userInfo.name"
										border="none"
										placeholder="请输入手机号码"
										@input = 'obtain'
								></u--input>
							</u-form-item>
							<u-form-item
									style="position: relative;"
									label="验证码"
									prop="code"
									borderBottom
								>
									<template>
										<view style="position: relative;">
											<u--input
												v-model="model1.code"
												border="none"
												placeholder="请填验证码"
												@input="inputcode"
											></u--input>
											<button 
												class="button11"
												@click="getVerifyCode"
											>获取验证码</button>
										</view>
									</template>
									
							</u-form-item>
						</u--form>
						
							<view style="margin-top:32%;">
								<u-button
									color="linear-gradient(to right, rgba(66, 83, 216,0.5), rgba(163,205,57,0.5))"
									text="专业用户登录"
									@click="tologinside"
								></u-button>	
							</view>
			</view>
					
		</view>
		<view class="content" style="margin-left: 12.6%; margin-top:25%">
		<button style = "position: absolute;width: 80%;height: 40px;left: 10%;top:49.5%;background: #2E9BFF;border-radius: 6px;font-family: Microsoft YaHei;
								font-size: 16px;color: white;"
			@click="submit"
		>登录</button>
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
				let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
				if(phoneReg.test(this.phoneNumber)){
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
								});
								}
								else{
									uni.hideLoading();
									uni.showToast({
										title: res.message,
										duration: 2000,
										icon:'error'
									});
									console.log(error)
								}
								console.log("@res@",res)
							})
							.catch(error=>{
							
							})
				}else{
					uni.hideLoading();
					uni.showToast({
						title: `手机格式错误`,
						duration: 2000,
						icon:'error'
					});
				}

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
.button11{
		z-index: 200;
		position: absolute;
		right: 0px;
		top: 0px;
		width: 100px;
		height: 120%;
		background: rgba(0, 0, 0, 0.05);border-radius: 6px;font-family: Microsoft YaHei;
		font-size: 14px;
		color: #2E9BFF;
		font-weight: 400;
		line-height: 30px;
		letter-spacing: 0px;
		text-align: center;
}
</style>