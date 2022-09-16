<template>
	<view class="submit-container">
		<u-form ref='form' :model="submitForm">
			<view class="submit-content">
				<view class="submit-input">
					<uni-row>
						<text>时间：{{submitForm.time}}</text>
					</uni-row>
				</view>
				<view class="submit-input">
					<uni-row>
						<text>标题：</text>
					</uni-row>
					<uni-row>
						<textarea placeholder="请输入标题" v-model="submitForm.title"/>
					</uni-row>
				</view>
				<view class="submit-input">
					<uni-row>
						<text>地点：</text>
					</uni-row>
					<uni-row>
						<textarea placeholder="请输入具体地点" v-model="submitForm.location"/>
					</uni-row>
				</view>
				<view class="submit-input">
					<uni-row>
						<text>详情：</text>
					</uni-row>
					<uni-row>
						<textarea placeholder="请输入上报的具体情况描述，原因和现状等" v-model="submitForm.infomation"/>
					</uni-row>
				</view>
				<button class="form-button">拍照/录像</button>
				<button class="submit-button">上报</button>
			</view>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				submitForm:{
					time:'',
					title:'',
					location:'',
					infomation:''
				},
				rules:[]
			}
		},
		created() {
			this.submitForm.time = this.dayjs().format('YYYY-MM-DD HH:mm:ss')
			console.log(this.submitForm.time)
		},
		methods: {
			test(){
				console.log(this.submitForm)
			}
		}
	}
</script>

<style lang="scss">
	text{
		font-size: 13px;
	}
	.button-base{
		background: #2E9BFF;
		border-radius: 6px;
		font-size: 16px;
		color: #fff;
		padding: 0;
		margin: 0;
	}
	textarea{
		margin-top: 5px;
		font-size: 13px;
		background-color: rgb(247,247,248);
		border-radius: 8px;
		padding: 10px;
		height: 70px;
	}
	.submit-container{
		padding: 15px;
		.submit-content{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
			.submit-input{
				margin: 10px 0;
			}
			.form-button{
				@extend .button-base;
				width: 160px;
				height: 36px;
				line-height: 36px;
			}
			.submit-button{
				@extend .button-base;
				width: 343px;
				height: 40px;
				line-height: 40px;
				position: absolute;
				bottom: 20px;
			}
		}
		
	}
	
</style>
