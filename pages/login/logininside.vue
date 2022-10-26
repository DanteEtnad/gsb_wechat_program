<template>
		<view style="position: absolute; background :linear-gradient(35deg,white,rgba(212,237,244,0.8));width: 100%;height: 100%;">
		<view>
		<view class="content" style="margin-left: 12.6%; margin-top:25%">
		<view style="margin-bottom: 20px;">
			<u--text color="#000000" size=16px text="欢迎登录"></u--text>
		</view>
		<u--text color="#000000" size=18px text="汕头市地址灾害气象预报预警平台"></u--text>
	</view>
	</view>
		<view  class="form" style="margin-top: 20%; margin-left: 10%;margin-right: 10%;">
			<u--form
							labelPosition="left"
							:model="model1"
							:rules="rules"
							ref="form1"
					>
						<u-form-item
								label="账号"
								prop="userInfo.name"
								borderBottom
								ref="item1"
						>
							<u--input
									v-model="model1.userInfo.name"
									border="none"
									placeholder="请输入账号"
									@input = 'obtain'
							></u--input>
						</u-form-item>
						<u-form-item
								label="密码"
								prop="code"
								borderBottom
							>
								<u--input
									v-model="model1.code"
									border="none"
									placeholder="请填写密码"
									@input="inputpwd"
								></u--input>
						</u-form-item>			
					</u--form>
					<view style="margin-top: 7%;margin-right: 2%;">
					<u-button
						type="primary"
						text="登录"
						@click="submit"
					></u-button>	
					</view>
		</view>

	</view>
</template>

<script>
	import md5 from"@/store/md5.js"
	import {requestAuthority,request,requestAuthority1} from '@/utils/request.js'
	export default {
	data() {
		return {
			memberData:{},
			memberMobile:"",
			memberLoginPassword:'',
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
					message: '请填写账号',
					trigger: ['blur', 'change']
				},
			code: {
				type: 'string',
					required: true,
					message: '请填写密码',
					trigger: ['blur']
			},				
			},
		}
	},
methods: {
	backFn(){
	       uni.navigateBack();
	     },
	obtain(e){
		this.memberMobile=e;
		console.log(e);
		},
	inputpwd(e) {
		this.memberLoginPassword=e;
		console.log(e);
	},
	submit(){
		requestAuthority({
				method:'POST',
				url:'login/login',
				data:{
					UserLoginReq:{
						"memberMobile":this.memberMobile, //"13512345678",
						"memberLoginPassword": md5(this.memberLoginPassword.trim())//"c6f057b86584942e415435ffb1fa93d4",
					}
				}
			})
			.then(res=>{
					console.log("访问结果",res)
					uni.setStorageSync('token',res.data.UserLoginRsp.token.token)
					let token = uni.getStorageSync('token')
					console.log("token",token)
					uni.navigateTo({
					url:'/pages_index_normal/index_normal?phone='+this.memberMobile
						})
					uni.$u.toast('登录成功')
				})
				.catch(error=>{
							uni.$u.toast('密码错误')
						})
			},
		},
		}
</script>
<style lang="scss">

</style>