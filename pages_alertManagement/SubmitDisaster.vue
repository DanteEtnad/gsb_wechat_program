<template>
	<view class="submit-container">
		<u-form ref='form' :model="submitForm">
			<view class="submit-content">
				<view class="submit-input">
					<uni-row>
						<text>时间：{{submitForm.DangerReportTime}}</text>
					</uni-row>
				</view>
				<view class="submit-input">
					<uni-row>
						<text>标题：</text>
					</uni-row>
					<uni-row>
						<textarea placeholder="请输入标题" v-model="submitForm.DangerReportTitle"/>
					</uni-row>
				</view>
				<view class="submit-input">
					<uni-row>
						<text>地点：</text>
					</uni-row>
					<uni-row>
						<textarea placeholder="请输入具体地点" v-model="submitForm.DangerReportArea"/>
					</uni-row>
				</view>
				<view class="submit-input">
					<uni-row>
						<text>详情：</text>
					</uni-row>
					<uni-row>
						<textarea placeholder="请输入上报的具体情况描述，原因和现状等" v-model="submitForm.DangerReportDetails"/>
					</uni-row>
				</view>
				<button class="form-button" @click="takePhoto">拍照</button>
				<view style="display: flex;justify-content: space-around;" v-if="picUrl.length>0">
					<u--image :src="picUrl" mode="aspectFit"></u--image>
				</view>
				<button class="submit-button" @click="submit">上报</button>
			</view>
		</u-form>
	</view>
</template>

<script>
	import {request} from "@/utils/request.js"
	import {REQUEST_BASEURL,token} from "@/utils/request.js"
	export default {
		data() {
			return {
				picUrl:'',
				submitForm:{
					DangerReportTime:'',
					DangerReportTitle:'',
					DangerReportArea:'',
					DangerReportDetails:''
				}
			}
		},
		created() {
			this.submitForm.DangerReportTime = this.dayjs().format('YYYY-MM-DD HH:mm:ss')
			// console.log(this.submitForm.DangerReportTime)
		},
		methods: {
			async submit(){
				const [err,res] = await uni.uploadFile({
					url: `${REQUEST_BASEURL}/dangerReport/dangerCreate`, //仅为示例，非真实的接口地址
					filePath: this.picUrl,
					name: 'file',
					formData: {
						'DangerReportTime': this.submitForm.DangerReportTime,
						'DangerReportTitle': this.submitForm.DangerReportTitle,
						'DangerReportArea': this.submitForm.DangerReportArea,
						'DangerReportDetails': this.submitForm.DangerReportDetails,
					},
					header:{
						"gsb-Token": token
					}
				})
				if(res){
					const data = JSON.parse(res.data)
					if(data.code===2000){
						uni.showModal({
							title:'成功',
							content:'上报成功,点击确定返回',
							showCancel:false
						}).then(res=>{
							uni.navigateBack({
								delta:2
							})
						})
					}
				}
				if(err){
					// console.log(err);
				}
			},
			async takePhoto(){
				const [err,res] = await uni.chooseImage({
					count:1,
				})
				if(res){
					console.log(res)
					this.picUrl = res.tempFilePaths[0]
				}
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
				margin: 20px 0;
				line-height: 36px;
			}
			.submit-button{
				@extend .button-base;
				width: 343px;
				height: 40px;
				line-height: 40px;
				margin: 20px 0;
			}
		}
		
	}
	
</style>
