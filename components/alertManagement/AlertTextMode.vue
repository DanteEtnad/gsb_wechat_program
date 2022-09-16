<template>
	<view class="daliy-alert-container">
		<view style="font-size: 14px;">发布时间：2022-07-13 13:25:12</view>
		<view style="font-size: 14px;">预警时段：2022-07-13 20:00 - 2022-07-14 20:00</view>
		<view style="display: flex;justify-content: space-around;">
			<u--image src="/static/test.jpg" mode="aspectFit"></u--image>
		</view>
		<view class="daliy-alert-text-container">
			<uni-row v-for="(alertLevel,index) in alertLevels" :key="index">
				<view class="daliy-alert-text-title">
					<view :style="{width:'24px',height:'12px',marginRight:'5px',backgroundColor:`${alertLevel.color}`,borderRadius:'3px'}"></view>
					<!-- <view style="height: 12px;width: 24px;"></view> -->
					<text>{{alertLevel.name}}</text>
				</view>
				<view class="daliy-alert-text-content">
					<uni-row>
						<uni-row v-for="item in alertLevel.data" :key="item">
							<text>{{item.county}}：</text>
							<text style="color:rgba(0,0,0,.65)">{{item.town}}；</text>
						</uni-row>
					</uni-row>
				</view>
			</uni-row>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				alertLevels:[
					{
						name:'一级（红色预警）',
						color:'#DC0129',
						data:[
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							},
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							},
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							}
						]
					},
					{
						name:'二级（橙色预警）',
						color:'#EB9A03',
						data:[
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							},
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							},
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							}
						]
					},
					{
						name:'三级（黄色预警）',
						color:'#FCF66A',
						data:[
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							},
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							},
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							}
						]
					},
					{
						name:'四级（蓝色预警）',
						color:'#019EF5',
						data:[
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							},
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							},
							{
								county:'濠江区',
								town:'金霞街道，珠池街道、新津街道，龙祥街道'
							}
						]
					}
				]
			}
		}
	}
</script>

<style lang="scss">
	body{
		background-color: rgb(247,247,248);
	}
	text{
		font-size: 16px;
	}
	.daliy-alert-container{
		padding: 10px;
		.daliy-alert-text-container{
			.daliy-alert-text-title{
				display: flex;
				align-items: center;
				padding: 5px 0;
			}
			.daliy-alert-text-content{
				background-color: white;
				border-radius:8px;
				margin: 0 5px;
				padding: 10px;
			}
		}
	}
</style>