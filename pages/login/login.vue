<template>
	<view>
		<view class="content" style="margin-left: 15px; margin-top:15%">
			<u--text color="#000000" size=16px text="欢迎登录"></u--text>
			<u--text color="#000000" size=18px text="汕头市地址灾害气象预报预警平台"></u--text>
		</view>
		<view class="form" style="margin-top: 20%; margin-left: 10%;">
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
									placeholder="请输入手机号或者成员编号"
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
								></u--input>
						</u-form-item>			
					</u--form>
					<u-button
						type="primary"
						text="登录"
						customStyle="margin-top: 50px"
						@click="submit"
					></u-button>				
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
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

		};
	},
	methods: {
		submit() {
			console.log('name', this.model1.userInfo.name);
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(res => {
					uni.$u.toast('登录成功')
					uni.navigateTo({
						url:'/pages/index_normal/index_normal?name=' + this.model1.userInfo.name
					})
				}).catch(errors => {
					uni.$u.toast('登录失败')
				})
			},
		
		
	},
}
</script>