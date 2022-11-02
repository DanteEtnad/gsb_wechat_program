<template>
	<view class="create-container">
		<uni-forms ref="form" :model="alertForm">
			<view class="create-input-container">
				<view style="flex:8">
					<text>名称<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:16">
					<uni-easyinput v-model="alertForm.alertName" placeholder="请输入名称" />
				</view>	
			</view>
			<view class="create-input-container">
				<view style="flex:8">
					<text>预警开始时间<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:16">
					<uni-datetime-picker type="datetime" placeholder="请选择时间" v-model="alertForm.alertStartTime"/>
				</view>	
			</view>
			<view class="create-input-container">
				<view style="flex:8">
					<text>预警结束时间<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:16">
					<uni-datetime-picker type="datetime" placeholder="请选择时间" v-model="alertForm.alertEndTime"/>
				</view>	
			</view>
			<view class="create-location-input-container">
				<text>预警地区<text style="color: red;">*</text></text>
				<view class="create-collapse-container">
					<uni-collapse accordion>
						<uni-collapse-item title="手风琴效果" v-for="(item,index) in createData" :key="index">
							<template v-slot:title>
								<view :class="[colorLevels[item.level]]">{{item.level}}</view>
							</template>
							<view class="collapse-item-container">
								<view class="collapse-item-main">
									<view class="collapse-item-main-container" @click="deleteMember(item.level,textIndex)"
												v-for="(text,textIndex) in item.location" :key="textIndex" v-show="item.location.length!==0">
										{{text}}
									</view>
								</view>
								<button  @click="editLocation(item)">编辑/添加</button>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</view>
			</view>
			<view class="create-picture-container">
				<view class="create-picture-input-container">
					<text>预警分布图</text>
					<button @click="imgGenerate">生成图片</button>
					<button @click="imgChange">替换图片</button>
				</view>
				<view style="display: flex;justify-content: space-around;" v-if="alertForm.alertMapUrl!==''">
					<u--image :src="alertForm.alertMapUrl" mode="aspectFit"></u--image>
				</view>
			</view>
			<button class="create-form-submit" @click="submit">提交并发送短信</button>
		</uni-forms>
		
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="popup-container">
				<view class="popup-header">
					<text :class="[colorLevels[popupLevel]]">{{popupLevel}}</text>
					<button @click="close">确定</button>
				</view>
				<view class="popup-main">
					<view class="popup-main-container" @click="deleteLocation(textIndex)"
								v-for="(text,textIndex) in popupData.location" :key="textIndex" v-show="popupData.location.length!==0">
						{{text}}
						<view class="popup-main-container-delete">
							<uni-icons type="closeempty" size="16" color="#000"></uni-icons>
						</view>
					</view>
				</view>
				<view class="popup-add">
					<uni-data-picker placeholder="请选择地区" popup-title="请选择地区" v-model="selectedLocation" :localdata="locationDataTree"/>
					<button @click="addLocation">添加</button>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="messagePopup" background-color="#fff">
			<AlertMessage ref="message" @closeDialog="closeMessageDialog" @afterSendMessage="afterSendMessage"/>
		</uni-popup>
	</view>
</template>

<script>
	import {getAreaOptionsMixins,dataCodeTransformMixins} from "@/utils/mixins.js"
	import {request} from "@/utils/request.js"
	import AlertMessage from "@/pages_alertManagement/components/AlertMessage.vue"
	export default {
		mixins:[getAreaOptionsMixins,dataCodeTransformMixins],
		components:{
			AlertMessage
		},
		data() {
			return {
				AlertProcessMessageRsp:{},
				locationMap:new Map(),
				selectedLocation:"",
				alertForm:{
					alertName:'',
					alertDescription:'',
					alertLevel:1,
					alertMapTitle:'',
					alertStartTime:'',
					alertEndTime:'',
					alertLevelFirstAdcode:'',
					alertLevelSecondAdcode:'',
					alertLevelThirdAdcode:'',
					alertLevelFourthAdcode:'',
					alertSourceType:'MAN',
					alertMapUrl:'',
				},
				createForm:{
					name:'',
					startTime:'',
					endTime:'',
					location:''
				},
				popupLevel:'',
				popupData:{},
				createData:[
					{level:'一级',location:[]},
					{level:'二级',location:[]},
					{level:'三级',location:[]},
					{level:'四级',location:[]}
				],
				colorLevels:{
					'一级':'collapse-title-first',
					'二级':'collapse-title-second',
					'三级':'collapse-title-third',
					'四级':'collapse-title-forth'
				},
				locationLevel:{
					'一级':'alertLevelFirstAdcode',
					'二级':'alertLevelSecondAdcode',
					'三级':'alertLevelThirdAdcode',
					'四级':'alertLevelFourthAdcode'
				},
				text:[
					'地质灾害气象风险预警级别为1级(红色)的区域有：',
					'地质灾害气象风险预警级别为2级(橙色)的区域有：',
					'地质灾害气象风险预警级别为3级(黄色)的区域有：',
					'地质灾害气象风险预警级别为4级(蓝色)的区域有：'
				],
				locationDataTree:[],
			}
		},
		mounted() {
			this.locationDataTree = this.getAreaOptions()[0].children;
		},
		methods: {
			deleteLocation(index){
				const location = this.popupData.location.splice(index,1).join('')
				this.locationMap.delete(location)
			},
			editLocation(data){
				this.popupData = data
				this.popupLevel = data.level
				this.$refs.popup.open('bottom')
			},
			addLocation(){
				const location = this.dataCodeTransform(this.selectedLocation,'potentialPointBelongTowns')
				if(this.locationMap.get(location)){
					let level = this.locationMap.get(location)
					uni.showModal({
						title:'失败',
						content:`${level}已有该街道`,
						showCancel:false
					})
				}else{
					this.locationMap.set(location,this.popupLevel)
					this.popupData.location.push(location)
					
					if(this.alertForm[this.locationLevel[this.popupLevel]]===""){
						this.alertForm[this.locationLevel[this.popupLevel]] = this.selectedLocation
					}else{
						this.alertForm[this.locationLevel[this.popupLevel]] += `,${this.selectedLocation}`
					}
					console.log(this.selectedLocation,location,this.alertForm);
				}
			},
			close(){
				this.$refs.popup.close()
			},
			submit(){
				let createForm = {...this.alertForm}
					createForm.alertStartTime = createForm.alertStartTime.split('-').join('').split(':').join('').split(' ').join('')
					createForm.alertEndTime = createForm.alertEndTime.split('-').join('').split(':').join('').split(' ').join('')
					createForm.alertDescription = ''
					createForm.alertMapTitle = '汕头市地质灾害气象风险预警预报结果'
					this.createData.forEach((item,index)=>{
						let location = item.location.join(',')
						if(location!==''){
							createForm.alertDescription += `${this.text[index]}${location}；`
						}
					})
					console.log(createForm);
					if(createForm.alertName===''||createForm.alertStartTime===''||createForm.alertEndTime===''){
						uni.showModal({
							title:'失败',
							content:'请输入日期或名字',
							showCancel:false
						})
					}else{
						if(createForm.alertStartTime.length!==14||createForm.alertEndTime.length!==14){
							uni.showModal({
								title:'失败',
								content:'请选择时间',
								showCancel:false
							})
						}else{
							request({
								url:'alertManage/alertGenerate',
								method:'post',
								data:{
									AlertGenerateReq:createForm
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
						}
					}
			},
			openMessageDialog(AlertProcessMessageRsp){
				this.$refs.message.openMessageDialog(AlertProcessMessageRsp)
				this.$refs.messagePopup.open('center')
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
			imgGenerate(){
				console.log(this.alertForm)
				let areas = []
				let mapForm = {
					alertName:this.alertForm.alertName,
					name:this.alertForm.alertName,
					imgTitle:'汕头市地质灾害气象风险预警预报结果',
					effectiveStartTime:this.alertForm.alertStartTime.split('-').join('').split(':').join('').split(' ').join(''),
					effectiveEndTime:this.alertForm.alertEndTime.split('-').join('').split(':').join('').split(' ').join(''),
					alertAreaLevel:[],
					mode:0
				}
				
				console.log(this.createData)
				this.createData.forEach((item,index)=>{
					if(item.location.length!==0){
						areas = [...areas,...item.location.map(area=>{
							return{
								level:index+1,
								areaName:area
							}
						})]
					}
				})
				mapForm.alertAreaLevel = areas
				console.log(mapForm);
				if(this.alertForm.alertName===''||this.alertForm.alertStartTime===''||this.alertForm.alertEndTime===''){
					uni.showModal({
						title:'失败',
						content:'请输入日期或名字',
						showCancel:false
					})
				}else{
					if(mapForm.effectiveStartTime.length!==14||mapForm.effectiveEndTime.length!==14){
						uni.showModal({
							title:'失败',
							content:'请选择时间',
							showCancel:false
						})
					}else{
						uni.showLoading({
							title: '加载中'
						});
						request({
							url:'alertManage/generateAlertAreaMap',
							method:'post',
							data:{
								AlertAreaMapReq:mapForm
							}
						})
						.then(res=>{
							if(res.code===2000){
								this.alertForm.alertMapUrl = res.data.AlertAreaMapUrl
								uni.hideLoading();
							}
						})
					}
				}
			},
			imgChange(){
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
				}).then(res=>{
					console.log(res[1].tempFilePaths[0],this);
					this.alertForm.alertMapUrl = res[1].tempFilePaths[0]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.create-container{
		padding: 15px;
		.create-form-submit{
			@extend .button-base;
			width: 343px;
			height: 40px;
			line-height: 40px;
			margin: 10px auto;
		}
		.create-input-container{
			margin: 5px 0;
			display: flex;
			align-items: center;
		}
		.create-location-input-container{
			margin-top: 25px;
			display: flex;
			flex-direction: column;
			.create-collapse-container{
				padding: 10px;
				.collapse-item-container{
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					button{
						@extend .button-base;
						width: 81px;
						height: 36px;
						line-height: 36px;
						margin: 5px 0;
					}
					.collapse-item-main{
						margin: 5px 0;
						display: grid;
						grid-template-columns: 20vw 20vw 20vw 20vw;
						text-align: center;
						.collapse-item-main-container{
							margin: 5px 5px 0 0;
							padding: 5px;
							background-color: #c8c7c6;
							border-radius: 6px;
						}
					}
				}
			}
		}
		.create-picture-container{
			display: flex;
			flex-direction: column;
			.create-picture-input-container{
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				margin: 10px 0;
				button{
					@extend .button-base;
					width: 107px;
					height: 36px;
					line-height: 36px;
				}
			}
		}
	}
	.popup-container{
		padding: 15px;
		height: 400px;
		.popup-header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid rgba(0, 0, 0, 0.06);
			padding: 0 0 5px 0;
			button{
				@extend .button-base;
				width: 81px;
				height: 36px;
				line-height: 36px;
			}
		}
		.popup-main{
			padding: 10px 0;
			display: grid;
			grid-template-columns: 28vw 28vw 28vw;
			// align-items: flex-end;
			border-bottom: 1px solid rgba(0, 0, 0, 0.06);
			button{
				@extend .button-base;
				margin-top: 10px;
				width: 81px;
				height: 36px;
				line-height: 36px;
			}
			.popup-main-container{
				margin: 5px 5px 0 0;
				padding: 5px;
				background-color: #c8c7c6;
				border-radius: 6px;
				display:flex;
				justify-content:space-between;
				align-items: center;
				.popup-main-container-delete{
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
		.popup-add{
			padding: 5px 0;
			button{
				@extend .button-base;
				margin-top: 10px;
				width: 81px;
				height: 36px;
				line-height: 36px;
				float: right;
			}
		}
	}
	.collapse-title{
		width: 40px;
		height: 20px;
		line-height: 20px;
		color: white;
		border-radius: 2px;
		font-size: 14px;
		text-align: center;
		margin: 10px 5px;
	}
	.collapse-title-first{
		@extend .collapse-title;
		background-color: #DC0129;
	}
	.collapse-title-second{
		@extend .collapse-title;
		background-color: #EB9A03;
	}
	.collapse-title-third{
		@extend .collapse-title;
		background-color: #019EF5;
	}
	.collapse-title-forth{
		@extend .collapse-title;
		background-color: #01F51E;
	}
</style>
