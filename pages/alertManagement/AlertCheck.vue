<template>
	<view>
		<view style="padding: 5px;background-color: white;">
			<uni-forms :model="queryForm" ref="queryForm">
				<uni-row>
					<uni-col :span="18">
						<uni-easyinput placeholder="请输入关键字" v-model="queryForm.key"></uni-easyinput>
					</uni-col>
					<uni-col :span="6">
						<button style="margin-left: 5px;">
							<text>搜索</text>
							<uni-icons type="search" size="16" color="#fff"></uni-icons>
						</button>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="12">
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">最高等级</text>
							<uni-data-select v-model="queryForm.level" :localdata="alertLevels" style="flex:5"></uni-data-select>
						</view>
					</uni-col>
					<uni-col :span="12"> 
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">当前进度</text>
							<uni-data-select v-model="queryForm.level" :localdata="alertLevels" style="flex:5"></uni-data-select>
						</view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="12">
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">状态</text>
							<uni-data-select v-model="queryForm.level" :localdata="alertLevels" style="flex:5"></uni-data-select>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">创建方式</text>
							<uni-data-select v-model="queryForm.level" :localdata="alertLevels" style="flex:5"></uni-data-select>
						</view>
					</uni-col>
				</uni-row>
			</uni-forms>
		</view>
		<view class="alert-item-container" v-for="item in alertData" :key="item" @click="openCheckDialog(item)">
			<view class="alert-item">
				<view style="display: flex;justify-content: space-between;border-bottom: 1px dashed black;padding: 0 5px 5px">
					<view style="display: flex;">
						<u--image class="logo" src="/static/document.svg" width="12px" height="18px" mode="aspectFit"></u--image>
						<text style="margin-left: 10px;font-family: 'Microsoft YaHei';">汕头市地质灾害气象风险预警预报结果</text>
					</view>
					<view>
						<uni-icons type="forward" size="16"></uni-icons>
					</view>
				</view>
				<view class="alert-item-info">
					<uni-row>
						<uni-col :span="10">
							<text>最高预警等级：<text :style="{color:`${levelColor[item.level]}`}">{{item.level}}</text></text>
						</uni-col>
						<uni-col :span="14">
							<text>当前进度：{{item.now}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view class="alert-item-info">
					<uni-row>
						<uni-col :span="10">
							<text>状态：{{item.status}}</text>
						</uni-col>
						<uni-col :span="14">
							<text>创建方式：{{item.createMethod}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view class="alert-item-info">
					<uni-row>
						<uni-col :span="24">
							<text>创建时间：{{item.createTime}}</text>
						</uni-col>
					</uni-row>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryForm:{
					key:'',
					level:'',
					now:'',
					status:'',
					createMethod:'',
					createTime:''
				},
				levelColor:{
					'一级':'#DC0129',
					'二级':'#EB9A03',
					'三级':'#FCF66A',
					'四级':'#019EF5'
				},
				alertLevels:[
					{value:'1',text:'一级'},
					{value:'2',text:'二级'},
					{value:'3',text:'三级'},
					{value:'4',text:'四级'},
				],
				alertData:[
					{
						level:'一级',
						now:'预警预报结果会商',
						status:'进行中',
						createMethod:'自动',
						createTime:'2022-07-22 14:54:23'
					},
					{
						level:'二级',
						now:'预警预报结果会商',
						status:'进行中',
						createMethod:'自动',
						createTime:'2022-07-22 14:54:23'
					},
					{
						level:'三级',
						now:'预警预报结果会商',
						status:'进行中',
						createMethod:'自动',
						createTime:'2022-07-22 14:54:23'
					},
					{
						level:'四级',
						now:'预警预报结果会商',
						status:'进行中',
						createMethod:'自动',
						createTime:'2022-07-22 14:54:23'
					},{
						level:'一级',
						now:'预警预报结果会商',
						status:'进行中',
						createMethod:'自动',
						createTime:'2022-07-22 14:54:23'
					}
				]
			}
		},
		methods: {
			async openCheckDialog(item){
				const response = await uni.navigateTo({
					url:'/pages/alertManagement/AlertCheckDialog',
				})
				response[1].eventChannel.emit('openCheckDialog',{
					item: item
				})
			}
		}
	}
</script>

<style lang="scss">
	body{
		background-color: #F7F7F8;
	}
	text{
		font-size: 14px;
	}
	button{
		display: flex;
		justify-content: space-around;
		padding: 0 10px;
		width: 170rpx;
		height: 36px;
		line-height: 36px;
		background-color: #2E9BFF;
		color: white;
	}
	.query-select-input{
		display: flex;
		align-items: center;
		padding: 5px;
	}
	.alert-item-container{
		padding:10px 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.alert-item{
			width: 680rpx;
			background-color: white;
			border-radius: 10px;
			padding: 10px;
			.alert-item-info{
				margin: 10px 0 0;
			}
		}
	}
</style>
