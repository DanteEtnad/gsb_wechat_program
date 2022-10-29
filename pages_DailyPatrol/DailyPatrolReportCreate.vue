<template>
	<view>
		<view style="padding: 5px;background-color: white;">
			<uni-forms :model="queryForm" ref="queryForm">
				<view style="margin-bottom: 10px; border-bottom: 1px dashed black;">
				<view style="margin-bottom: 10px;">
				<uni-row>
					<text style="margin-left: 5%; font-weight: 700;">选择隐患点</text>
				</uni-row>
				</view>
				</view>
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
							<text style="margin-right: 5px;flex:3">省市</text>
							<uni-data-select v-model="queryForm.city" :localdata="city" style="flex:5"></uni-data-select>
						</view>
					</uni-col>
					<uni-col :span="12"> 
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">区镇</text>
							<uni-data-select v-model="queryForm.district" :localdata="district" style="flex:5"></uni-data-select>
						</view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="12">
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">灾害规模</text>
							<uni-data-select v-model="queryForm.level" :localdata="alertLevels" style="flex:5"></uni-data-select>
						</view>
					</uni-col>
				</uni-row>
				</uni-forms>
		</view>
		<view class="potential-point-container" v-for="item in reportData" :key="item">
			<view class="point-item">
				<view style="display: flex;justify-content: space-between;border-bottom: 1px dashed black;padding: 0 5px 5px" @click="openPatrolReportDialog(item)">
					<view style="display: flex;">
						<u--image class="logo" src="/static/Collapse.svg" width="12px" height="18px" mode="aspectFit"></u--image>
						<text style="margin-left: 10px;font-family: 'Microsoft YaHei'; font-weight: 700;">{{item.name}}</text>
					</view>
					<view>
						<uni-icons type="forward" size="16"></uni-icons>
					</view>
				</view>
				<view class="point-item-info">
					<uni-row>
						<uni-col :span="16">
							<view class="point-item-text">
							<text style="overflow-x: auto;">详细地址: {{item.location}}</text>
							</view>
						</uni-col>
						<uni-col :span="6">
							<text>{{item.distance}}</text>
						</uni-col>
						<uni-col :span="2">
						<u--image class="logo" src="/static/locate.svg" width="12px" height="18px" mode="aspectFit"></u--image>
						</uni-col>
					</uni-row>
					<uni-row>
						<uni-col :span="24">
							<text>变形迹象：{{item.deformationIndication}}</text>
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
				city:[
					{value:'1',text:'汕头市'},
				],
				district:[
					{value:'1',text:'金平区'},
					{value:'2',text:'龙湖区'},
					{value:'3',text:'澄海区'},
					{value:'4',text:'濠江区'},
					{value:'5',text:'潮阳区'},
					{value:'6',text:'潮南区'},
					{value:'7	',text:'南澳县'},
				],
				alertLevels:[
					{value:'1',text:'小型'},
					{value:'2',text:'中型'},
					{value:'3',text:'大型'},
					{value:'4',text:'特大型'},
				],
				queryForm:{
					city:'',
					district:'',	
					key:'',
					level:'',
					now:'',
					status:'',
					createMethod:'',
					createTime:''
				},
				reportData:[
					{
						name:'凤鸣社区老鼠尾崩塌',
						location:'揭阳市榕城区地都镇凤鸣',
						distance:'283.47km',
						deformationIndication:'裂缝变形、新地鼓、地面塌陷、房屋变形、 沟道阻塞、树木歪斜、泉水出露及变浑浊'
					},
					{
						name:'凤鸣社区老鼠尾崩塌',
						location:'揭阳市榕城区地都镇凤鸣',
						distance:'283.47km',
						deformationIndication:'裂缝变形、新地鼓、地面塌陷、房屋变形、 沟道阻塞、树木歪斜、泉水出露及变浑浊'
					}
				]
			}
		},
		methods: {
			async openPatrolReportDialog(item){
				const response = await uni.navigateTo({
					url:'/pages/DailyPatrol/DailyPatrolReportDialog',
					success: function(res){
						res.eventChannel.emit('dataFromFather',{name: item.name,distance: item.distance})
					}
				})
			},
			
		}
	}
</script>

<style lang="scss">
	body{
		background-color: #F7F7F8;
	}
	text{
		font-size: 14px;
		font-weight: 400px;
		overflow: hidden;
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
	
	.potential-point-container{
		padding:10px 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.point-item{
			width: 680rpx;
			background-color: white;
			border-radius: 10px;
			padding: 10px;
		}
		.point-item-info{
			margin: 10px 0 0;
			
		}
	}
	.point-item-text{
			display: -webkit-box;
			overflow: hidden;
			word-break: break-all;  /* break-all(允许在单词内换行。) */
			text-overflow: ellipsis;  /* 超出部分省略号 */
			-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 1; /** 显示的行数 **/
	}
	
</style>
