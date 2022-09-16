<template>
	<view class="create-container">
		<uni-forms ref="form" :model="createForm">
			<view class="create-input-container">
				<view style="flex:8">
					<text>名称<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:16">
					<uni-easyinput v-model="createForm.name" placeholder="请输入名称" />
				</view>	
			</view>
			<view class="create-input-container">
				<view style="flex:8">
					<text>预警开始时间<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:16">
					<uni-datetime-picker type="date" placeholder="请选择时间" v-model="createForm.startTime"/>
				</view>	
			</view>
			<view class="create-input-container">
				<view style="flex:8">
					<text>预警结束时间<text style="color: red;">*</text></text>
				</view>	
				<view style="flex:16">
					<uni-datetime-picker type="date" placeholder="请选择时间" v-model="createForm.endTime"/>
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
								<button  @click="addLocation(item)">编辑/添加</button>
								<view class="collapse-item-main">
									<text>
										{{item.location}}
									</text>
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</view>
			</view>
			<view class="create-picture-input-container">
				<text>预警分布图</text>
				<button>生成图片</button>
				<button>替换图片</button>
			</view>
			<button class="create-form-submit">提交并发送短信</button>
		</uni-forms>
		
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="popup-container">
				<view class="popup-header">
					<text :class="[colorLevels[popupLevel]]">{{popupLevel}}</text>
					<button>确定</button>
				</view>
				<view class="popup-main">
					<text>{{popupData.location}}</text>
					<button>添加</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				createForm:{
					name:'',
					startTime:'',
					endTime:'',
					location:''
				},
				popupLevel:'',
				popupData:{},
				createData:[
					{
						level:'一级',
						location:'金霞街道，珠池街道、新津街道，龙祥街道，金霞街道，珠池街道、新津街道，龙祥街道，金霞街道，珠池街道、新津街道，龙祥街道，'
					},
					{
						level:'二级',
						location:'金霞街道，珠池街道、新津街道，龙祥街道，金霞街道，珠池街道、新津街道，龙祥街道，金霞街道，珠池街道、新津街道，龙祥街道，'
					},
					{
						level:'三级',
						location:'金霞街道，珠池街道、新津街道，龙祥街道，金霞街道，珠池街道、新津街道，龙祥街道，金霞街道，珠池街道、新津街道，龙祥街道，'
					},
					{
						level:'四级',
						location:'金霞街道，珠池街道、新津街道，龙祥街道，金霞街道，珠池街道、新津街道，龙祥街道，金霞街道，珠池街道、新津街道，龙祥街道，'
					}
				],
				colorLevels:{
					'一级':'collapse-title-first',
					'二级':'collapse-title-second',
					'三级':'collapse-title-third',
					'四级':'collapse-title-forth'
				},
			}
		},
		methods: {
			addLocation(data){
				this.popupData = data
				this.popupLevel = data.level
				this.$refs.popup.open('bottom')
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
			position: absolute;
			width: 343px;
			height: 40px;
			line-height: 40px;
			bottom: 50px;
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
					}
					.collapse-item-main{
						margin: 5px 0;
					}
				}
			}
		}
		.create-picture-input-container{
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			button{
				@extend .button-base;
				width: 107px;
				height: 36px;
				line-height: 36px;
			}
		}
	}
	.popup-container{
		padding: 15px;
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
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			button{
				@extend .button-base;
				margin-top: 10px;
				width: 81px;
				height: 36px;
				line-height: 36px;
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
		background-color: #FCF66A;
	}
	.collapse-title-forth{
		@extend .collapse-title;
		background-color: #019EF5;
	}
</style>
