<template>
	<view>
		<view style="padding: 5px;background-color: white;">
			<uni-forms :model="queryForm" ref="queryForm">
				<uni-row>
					<uni-col :span="12">
						<uni-easyinput placeholder="请输入关键字" v-model="queryForm.key"></uni-easyinput>
					</uni-col>
					<uni-col :span="6">
						<button style="margin-left: 5px;">
							<text>搜索</text>
							<uni-icons type="search" size="16" color="#fff"></uni-icons>
						</button>
					</uni-col>
					<uni-col :span="6">
						<button @click="openCreateDialog">
							<text>新增</text>
							<uni-icons type="plusempty" size="16" color="#fff"></uni-icons>
						</button>
					</uni-col>
				</uni-row>

					<uni-row>
						<uni-col :span="24"> 
							<view class="query-select-input">
								<text style="margin-right: 5px;flex:4">区镇</text>
								<uni-data-select v-model="queryForm.level" :localdata="alertLevels" style="flex:5"></uni-data-select>
							</view>
						</uni-col>
					</uni-row>
					
			</uni-forms>
		</view>
		
	
		<view class="alert-item-container" v-for="item in officeData" :key="item" @click="openCheckDialog1(item)">
			<view class="alert-item">
				<view style="display: flex;justify-content: space-between;border-bottom: 1px dashed black;padding: 0 5px 5px">
					<view style="display: flex;">
						<u--image class="logo" src="/static/document.svg" width="12px" height="18px" mode="aspectFit"></u--image>
						<text style="margin-left: 10px;font-family: 'Microsoft YaHei';">{{dataCodeAreaTransform(item.administrativeRegion,"potentialPointBelongTowns")}}</text>
						
					</view>
					
					<span v-if="item.approvalResults=='N'">
						<view style="margin-left: 10px; background-color: red;border-radius: 35px; color:white;width:65px;">
							<text style="margin-left: 5px;"> {{dataCodeTransform(item.approvalResults,"approvalResults")}} </text>
						</view>
					</span>
					<span v-else-if="item.approvalResults=='Y'">
						<view style="margin-left: 10px; background-color: skyblue;border-radius: 35px; color:white;width:75px;">
							<text style="margin-left: 5px;"> {{dataCodeTransform(item.approvalResults,"approvalResults")}} </text>
						</view>
					</span>
					<span v-else-if="item.approvalResults=='W'">
						<view style="margin-left: 10px; background-color: dimgrey;border-radius: 35px; color:white;width:75px;">
							<text style="margin-left: 5px;"> {{dataCodeTransform(item.approvalResults,"approvalResults")}} </text>
						</view>
					</span>
					
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
							<text>填报人：{{item.reportPersonName}}</text>
						</uni-col>
						<uni-col :span="12">
							<text>联系电话：{{item.reportPersonMobile}}</text>
						</uni-col>
					</uni-row>
				</view>
			</view>
			
		</view>
		
		<view>
			<uni-row>
			<uni-col span="12">
				<button :disabled=bup @click="up()">
					<text>上一页</text>
				</button>
			</uni-col>
			<uni-col span="12">
				<button :disabled=bdown @click="down()">
					<text>下一页</text>
				</button>
			</uni-col>
			</uni-row>
		</view>
		
		
	</view>
</template>

<script>
	import {request} from '@/utils/request.js'
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins} from "@/utils/mixins.js"
	//import {getClassList} from '@/servies/class.js'
	export default {
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins],
		data() {
			return {
				bup:true,
				bdown:false,
				page:0,
				totalpage:0,
				officePageInfo:{
					dataAmount:0,
					offset:0,
					queryCount:8,
					currentPage:0,
				},
				queryForm:{
					key:'',
					level:'',
					now:'',
					status:'',
					createMethod:'',
					createTime:''
				},
				selectId: [],
				levelColor:{
					'一级':'#DC0129',
					'二级':'#EB9A03',
					'三级':'#FCF66A',
					'四级':'#019EF5'
				},
				alertLevels:[
					{value:'1',text:'龙湖区'},
					{value:'2',text:'潮阳区'},
					{value:'3',text:'金平区'},
					{value:'4',text:'澄海区'},
				],
				officeData:[],
				
				memberData:[],
				
				alertData:[
					{
						level:'0次',
						now:'0处',
						status:'test1',
						createMethod:'13111',
						createTime:'2022-07-22 14:54:23'
					},
					{
						level:'1次',
						now:'3处',
						status:'test2',
						createMethod:'13112',
						createTime:'2022-07-22 14:54:23'
					},
					{
						level:'2次',
						now:'5处',
						status:'test3',
						createMethod:'13113',
						createTime:'2022-07-22 14:54:23'
					},
					{
						level:'3次',
						now:'0处',
						status:'test4',
						createMethod:'13114',
						createTime:'2022-07-22 14:54:23'
					}
				]
			}
		},
		created(){
			this.getInfo();
		},
		mounted() {
				this.getInfo();
				
		
		},	
		methods: {
			down(){
				this.officePageInfo.offset+=8;
				this.getInfo();
				this.page+=1;
				if(this.page!=0){
					this.bup=false;
				}
				if(this.page==this.totalpage){
					this.bdown=true;
				}
				//取消选中时删除数组中的值
				for (var i = 0; i < this.selectId.length; i++) {
				    this.list[this.selectId[i]].selected = false;
				    this.list[this.selectId[i]].unselected = true; 
				}
				this.selectId=[];
			},
			up(){
				this.officePageInfo.offset-=8;
				this.getInfo();
				this.page-=1;
				if(this.page==0){
					this.bup=true;
				}
				if(this.page!=this.totalpage){
					this.bdown=false;
				}
			
				//取消选中时删除数组中的值
				for (var i = 0; i < this.selectId.length; i++) {
				    this.list[this.selectId[i]].selected = false;
				    this.list[this.selectId[i]].unselected = true; 
				}
				this.selectId=[];
			},
			
			getMemberData(){
				request({
					method:'GET',
					url:'member/getAllMembersIdAndName',
				})
				.then(res=>{
					if(res.code===2000){
						this.memberData=res.data.MembersIdAndNameRsp
					}else{
						this.$message.error(res.message)
					}
					console.log("成员",this.memberData)
					for(var j=0; j<this.officeData.length; j++){
						for(var i=0; i<this.memberData.length; i++){
							if(this.officeData[j].reportPerson==this.memberData[i].memberId){
								this.officeData[j].reportPersonName=this.memberData[i].memberName
							}
			
						}
					}
					console.log("成员",this.officeData)
				})
			},
			getInfo(){
				request({
					method:'POST',
					url:'patrolManage/patrolResultQuery',
					data:{
						PatrolResultQueryReq:{
							patrolResultId:'',
							administrativeRegion:'',
							potentialType:'',
							reportPerson:'',
							reportPersonMobile:'',
							patrolStartDate:'',
							patrolEndDate:'',
							approvalRemarks:'',
							approvalResults:'',
						},
						QueryPagingParamsReq:{
							offset:this.officePageInfo.offset,
							queryCount:this.officePageInfo.queryCount
								
							
							
						}
						
					}
				})
				.then(res=>{
					this.officeData=res.data.PatrolResultQueryRsp
					this.officePageInfo.dataAmount=res.data.QuerySummaryRsp.dataAmount
					console.log("总数",this.officePageInfo.dataAmount)
					this.totalpage=Math.floor(parseInt(this.officePageInfo.dataAmount)/parseInt(this.officePageInfo.queryCount));
					if(this.totalpage==0){
						this.bdown=true
						console.log("总页数",this.totalpage)
					}
					console.log("@res@",res)
					this.getMemberData()
				})
				.catch(error=>{
					console.log(error)
				})
				console.log(this.officeData)

			},
			async openCheckDialog1(item){
				const response = await uni.navigateTo({
					url:'/pages/patrolManagement/Patrolfilldetails',
				})
				response[1].eventChannel.emit('openCheckDialog',{
					item: item
				})
				
			},
			openCreateDialog(){
				uni.navigateTo({
					url:'/pages/patrolManagement/Patrolnew',
				})
			},
			openCheckDialog(){
				uni.navigateTo({
					url:'/pages/patrolManagement/Patrolnew',
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
	text{
		font-size: 14px;
	}
	.button-base{
		background: #2E9BFF;
		border-radius: 6px;
		font-size: 16px;
		color: #fff;
		padding: 0;
		margin: 0;
	}
	.Select-left {
		background-color: #F7F7F8;
		margin-bottom: 12px;
		font-size: 14px;
		height: 30px;
		border-radius: 8px; /*圆角*/
		.time{
			padding-left:12px;
			padding-top:5px;
		}	
	}
	.report-container{
		padding:10px 5px;
		border-radius: 10px;
		.report-info-container{
			margin: 5px 0;
			display: flex;
			align-items: center;
			
			padding: 10px;
			background-color: white;
		}
		.report-input-container{
			margin: 5px 0;
			display: flex;
			align-items: center;
			
			padding: 10px;
			background-color: white;
		}	
	
	}
	.submit-button{
		display: flex;
		justify-content: space-around;
		padding: 0 10px;
		width: 500rpx;
		height: 36px;
		line-height: 36px;
		background-color: #2E9BFF;
		color: white;
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