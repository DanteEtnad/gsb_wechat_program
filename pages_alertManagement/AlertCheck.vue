<template>
	<view>
		<view style="padding: 5px;background-color: white;">
			<uni-forms :model="queryForm" ref="queryForm">
				<uni-row>
					<uni-col :span="18">
						<uni-easyinput placeholder="请输入关键字" v-model="queryForm.alertName"></uni-easyinput>
					</uni-col>
					<uni-col :span="6">
						<button style="margin-left: 5px;" @click="getAlertData(true)">
							<text>搜索</text>
							<uni-icons type="search" size="16" color="#fff"></uni-icons>
						</button>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="12">
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">最高等级</text>
							<uni-data-select v-model="queryForm.alertLevel" :localdata="alertLevels" style="flex:5"></uni-data-select>
						</view>
					</uni-col>
					<uni-col :span="12"> 
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">当前进度</text>
							<uni-data-select v-model="queryForm.alertPhase" :localdata="alertPhases" style="flex:5"></uni-data-select>
						</view>
					</uni-col>
				</uni-row>
				<uni-row>
					<uni-col :span="12">
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">状态</text>
							<uni-data-select v-model="queryForm.alertState" :localdata="alertStates" style="flex:5"></uni-data-select>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="query-select-input">
							<text style="margin-right: 5px;flex:3">创建方式</text>
							<uni-data-select v-model="queryForm.alertSourceType" :localdata="alertSourceTypes" style="flex:5"></uni-data-select>
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
						<text style="margin-left: 10px;font-family: 'Microsoft YaHei';">{{item.alertName}}</text>
					</view>
					<view>
						<uni-icons type="forward" size="16"></uni-icons>
					</view>
				</view>
				<view class="alert-item-info">
					<uni-row>
						<uni-col :span="10">
							<text>最高预警等级：
								<text :style="{color:`${levelColor[dataCodeTransform(item.alertLevel.toString(),'alertLevels')]}`}">{{dataCodeTransform(item.alertLevel.toString(),'alertLevels')}}</text>
							</text>
						</uni-col>
						<uni-col :span="14">
							<text>当前进度：{{dataCodeTransform(item.alertSubphase.toString(),`alertSubphase${item.alertPhase}`)}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view class="alert-item-info">
					<uni-row>
						<uni-col :span="10">
							<text>状态：{{dataCodeTransform(item.alertState,'alertStates')}}</text>
						</uni-col>
						<uni-col :span="14">
							<text>创建方式：{{dataCodeTransform(item.alertSourceType,'alertSourceTypes')}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view class="alert-item-info">
					<uni-row>
						<uni-col :span="24">
							<text>创建时间：{{timeTransform(item.alertCreateTime)}}</text>
						</uni-col>
					</uni-row>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from "@/utils/request.js"
	import {dataCodeTransformMixins,timeTransformMixins} from "@/utils/mixins.js"
	import {debounce} from "lodash"
	export default {
		mixins:[dataCodeTransformMixins,timeTransformMixins],
		data() {
			return {
				queryForm:{
					alertId:"",
					alertName:"",
					alertLevel:"",
					alertState:"",
					alertPhase:"",
					alertSubphase:"",
					alertSourceType:"",
					alertSourceId:"",
					publishDateStart:"",
					publishDateEnd:""
				},
				officePageInfo: {
					dataAmount: 0,
					offset: 0,
					queryCount: 5,
					currentPage: 1,
				},
				levelColor:{
					'一级':'#DC0129',
					'二级':'#EB9A03',
					'三级':'#019EF5',
					'四级':'#01F51E'
				},
				alertLevels:[
					{value:'1',text:'一级'},
					{value:'2',text:'二级'},
					{value:'3',text:'三级'},
					{value:'4',text:'四级'},
				],
				alertPhases:[
					{value:'1',text:'生成'},
					{value:'2',text:'经办'},
					{value:'3',text:'审批'},
					{value:'4',text:'发布'},
				],
				alertStates:[
					{value:'BCK',text:'审批驳回'},
					{value:'CKD',text:'审批通过'},
					{value:'CKG',text:'审批中'},
					{value:'DEL',text:'已作废'},
					{value:'FCK',text:'待审批'},
					{value:'FIN',text:'已发布'},
					{value:'HDG',text:'经办中'},
					{value:'ORG',text:'初始化'},
				],
				alertSourceTypes:[
					{value:'MAN',text:'人工'},
					{value:'SYS',text:'系统'}
				],
				alertData:[]
			}
		},
		mounted() {
			// this.getAlertData(true)
		},
		onShow(){
			console.log('onShow');
			this.getAlertData(true)
		},
		onReachBottom() {
			if((this.officePageInfo.currentPage - 1) * this.officePageInfo.queryCount<=this.officePageInfo.dataAmount){
				this.officePageInfo.currentPage++
				this.getAlertData()
			}
			else{
			uni.showToast({
				title: `已经到底了`,
				duration: 2000
			});
			}
		},
		methods: {
			async openCheckDialog(item){
				const response = await uni.navigateTo({
					url:'/pages_alertManagement/AlertCheckDialog',
				})
				response[1].eventChannel.emit('openCheckDialog',{
					item: item
				})
			},
			getAlertData:debounce(function(reset=false){
				uni.showLoading({
					title: '加载中'
				});
				if(reset){
					this.officePageInfo.currentPage = 1
					this.alertData = []
				}
				request({
					url:'alertManage/queryAlertList',
					method:'post',
					data:{
						QueryAlertListReq:this.queryForm,
						QueryPagingParamsReq: {
							offset: (this.officePageInfo.currentPage - 1) * this.officePageInfo.queryCount,
							queryCount: this.officePageInfo.queryCount
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.alertData = [...this.alertData,...res.data.QueryAlertListRsp]
						this.officePageInfo.dataAmount = res.data.QuerySummaryRsp.dataAmount
						console.log(this.alertData);
						uni.hideLoading();
					}
				})
			},300),
			test(){
				
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
