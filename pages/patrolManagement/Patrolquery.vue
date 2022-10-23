<template>
	<view>
		<view style="padding: 5px;background-color: white;">
			<uni-forms :model="queryForm" ref="queryForm">
				
				<uni-row>
					<uni-col :span="9"> 
					<view class="query-select-input">
						<text style="margin-right: 2px;flex:4">上报人</text>
						<uni-data-picker
						:localdata="options"
						popup-title="请选择上报人"
						@change="personChange" 
						style="flex:6;"
						>
						</uni-data-picker>
					</view>
					</uni-col>
					<uni-col :span="15"> 
						<view class="query-select-input">
							<text style="margin-right: 2px;flex:1">区镇</text>
							<uni-data-picker v-model="queryForm.level" :localdata="SelectProvince" @change="areaChange"  style="flex:5"></uni-data-picker>
						</view>
					</uni-col>
				</uni-row>
			 
			</uni-forms>
		</view>
		
	
		<view class="alert-item-container" v-for="item in officeData" :key="item" @click="openCheckDialog(item)">
			<view class="alert-item">
				<view style="display: flex;justify-content: space-between;border-bottom: 1px dashed black;padding: 0 5px 5px">
					<view style="display: flex;">
						<u--image class="logo" src="/static/document.svg" width="12px" height="18px" mode="aspectFit"></u--image>
						<text style="margin-left: 10px;font-family: 'Microsoft YaHei';">{{dataCodeAreaTransform(item.administrativeRegion,"potentialPointBelongTowns")}}</text>
						
					</view>
					<view>
						<uni-icons type="forward" size="16"></uni-icons>
					</view>
				</view>
				<view class="alert-item-info">
					<uni-row>
						<uni-col :span="24">
							<text>巡排查时间：{{item.patrolStartDate}}-{{item.patrolEndDate}}</text>
						</uni-col>
					</uni-row>
				</view>
				
				<view class="alert-item-info">
					<uni-row>
						<uni-col :span="12">
							<text>填报人：{{memberList[item.reportPerson]}}</text>
						</uni-col>
						<uni-col :span="12">
							<text>联系电话：{{item.reportPersonMobile}}</text>
						</uni-col>
					</uni-row>
				</view>
			</view>
			
		</view>
		
		
		
	</view>
</template>

<script>
	import {request} from '@/utils/request.js'
	import {debounce} from "lodash"	
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins,getAreaOptionsMixins} from "@/utils/mixins.js"
	//import {getClassList} from '@/servies/class.js'
	export default {
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins,getAreaOptionsMixins],
		data() {
			return {
				options:[],
				officePageInfo:{
					dataAmount:0,
					offset:0,
					queryCount:8,
					currentPage:1,
				},
				SelectProvince:[],
				queryForm:{
					key:'',
					level:'',
					now:'',
					status:'',
					createMethod:'',
					createTime:''
				},
				selectId: [],
				memberData:[],
				memberList:{},
				officeData:[],
				PatrolRequestForm:{
					patrolResultId:'',
					administrativeRegion:'',
					potentialType:'',
					reportPerson:'',
					reportPersonMobile:'',
					patrolStartDate:'',
					patrolEndDate:'',
					approvalRemarks:'',
				},
				inputTextSave:'',
			}
		},
		created(){
			this.getInfo();
		},
		mounted() {
				this.getInfo();
				this.SelectProvince = this.getAreaOptions();
				
		
		},
		onReachBottom() {
			if(this.officeData.length<this.officePageInfo.dataAmount){
				this.officePageInfo.currentPage++
				this.getInfo()
			}
			else{
			uni.showToast({
				title: `已经到底了`,
				duration: 2000
			});
			}
		},
		methods: {
			areaChange(e) {
				if (e.detail.value[2]==null){
					this.PatrolRequestForm.administrativeRegion=""
				}
				else {
					this.PatrolRequestForm.administrativeRegion=e.detail.value[2].value//440507007
					// this.PatrolRequestForm.administrativeRegion="440507"//
				}
				console.log("this.PatrolRequestForm.administrativeRegion",this.PatrolRequestForm.administrativeRegion)
				this.officeData=[]
				this.officePageInfo.currentPage=1
				this.getInfo()
			},
			input(e) {
					this.inputTextSave = e
					console.log("输入的文本为：",this.inputTextSave)
			},
			search(){
				this.PatrolRequestForm.reportPerson=this.inputTextSave
				console.log(this.DailyPatrolRequestForm.reportPerson)
				this.officeData=[]
				this.officePageInfo.currentPage=1
				this.getOfficeData()
			},
			getInfo:debounce(function(reset=false){
				uni.showLoading({
					title: '加载中'
				});
				request({
					method:'POST',
					url:'patrolManage/patrolResultQuery',
					data:{
						PatrolResultQueryReq:this.PatrolRequestForm,
						QueryPagingParamsReq:{
							offset: (this.officePageInfo.currentPage - 1) * this.officePageInfo.queryCount,
							queryCount:this.officePageInfo.queryCount
						}
						
					}
				})
				.then(res=>{
					this.officeData = [...this.officeData,...res.data.PatrolResultQueryRsp]
					this.officePageInfo.dataAmount=res.data.QuerySummaryRsp.dataAmount
					this.getMemberData()
				})
				.catch(error=>{
					console.log(error)
				})
			},300),
			personChange(e) {
				this.PatrolRequestForm.reportPerson=e.detail.value[0].value
				this.officeData=[]
				this.officePageInfo.currentPage=1
				this.getInfo()
			},
			getMemberData(){
				request({
					method:'GET',
					url:'member/getAllMembersIdAndName',
				})
				.then(res=>{
					if(res.code===2000){
						uni.hideLoading();
						uni.showToast({
							title: `加载完成`,
							duration: 2000
						});
						this.memberData=res.data.MembersIdAndNameRsp
					}else{
						this.$message.error(res.message)
					}
					console.log("成员",this.memberData)
					for(var i=0; i<this.memberData.length; i++){
						this.memberList[this.memberData[i].memberId]=this.memberData[i].memberName
						this.options.push({text:this.memberData[i].memberName,
						value:this.memberData[i].memberId
						})
					}
					console.log("成员",this.officeData)
				})
			},
			async openCheckDialog(item){
				const response = await uni.navigateTo({
					url:'/pages/patrolManagement/Patrolnewdetails',
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
