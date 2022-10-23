<template>
	<view>
		<view style="padding: 5px;background-color: white;">
			<uni-forms :model="queryForm" ref="queryForm">
				<uni-row>
					<uni-col :span="18">
						<uni-easyinput placeholder="请输入关键字" @input="input" v-model="queryForm.key"></uni-easyinput>
					</uni-col>
					<uni-col :span="6">
						<button style="margin-left: 5px;" @click="search()">
							<text>搜索</text>
							<uni-icons type="search" size="16" color="#fff"></uni-icons>
						</button>
					</uni-col>
				</uni-row>
				</uni-forms>
		</view>
		<view class="potential-point-container" v-for="item in memberData" :key="item">
			<view class="point-item">
				<view style="border-bottom: 1px dashed black;padding: 0 5px 5px" @click="openDailyPatrolUser(item)">
					<uni-row>
						<uni-col :span="2">
						<u--image class="logo" src="/static/user.svg" width="12px" height="18px" mode="aspectFit"></u--image>
						</uni-col>
						<uni-col :span="9">
						<text style="margin-left: 10px;font-family: 'Microsoft YaHei'; font-weight: 700;">{{item.memberName}}</text>
						</uni-col>
						<uni-col :span="9">
						<text style="margin-left: 10px;font-family: 'Microsoft YaHei'; font-weight: 700;">{{item.memberMobile}}</text>
						</uni-col>
						<uni-col :span="2">
						<u--image class="logo" src="/static/Mobile.svg" width="18px" height="20px" mode="aspectFit"></u--image>
						</uni-col>
						<uni-col :span="2"></uni-col>
						<uni-icons type="forward" size="16"></uni-icons>
					</uni-row>
				</view>
				<view class="point-item-info">
					<uni-row>
						<text>巡查次数：{{item.patrolAmount}}</text>
					</uni-row>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {request} from '@/utils/request.js'
	import {requestAuthority} from '@/utils/request.js'
	import {debounce} from "lodash"
	export default {
		props:{
			currentPage:{
                type:Number,
                default:0
            }
		},
		watch:{
			currentPage(curVal,oldVal){
				if(curVal){
					this.currentPage=curVal
					console.log("发生了边话,值为",this.currentPage)
					if(this.memberData.length<this.officePageInfo.dataAmount){
						this.officePageInfo.currentPage=this.currentPage
						this.getMemberData()
					}
					else{
					uni.showToast({
						title: `已经到底了`,
						duration: 2000
					});
					}
				}
			}
		},
		data() {
			return {
				officePageInfo:{
					dataAmount:0,
					offset:0,
					queryCount:8,
					currentPage:1,
				},
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
				],
				officeData:[],
				memberData:[],
				DailyPatrolRequestForm:{						
						dailyPatrolResultId:'',
						patrolEndDate:'',
						patrolStartDate:'',
						patrolTaskLocation:'',
						patrolTaskName:'',			
						reportPerson:'',
						reportPersonMobile:'',
						patrolAdcode:'',
						
				},
				MemberQueryReq:{
						memberId:'',
						unitId:'',
						memberName:'',
						memberMobile:'',
						isLeader:'',
						memberPosition:'',
						memberStatus:'',
						memberGender:'',
						memberIdentityCard:'',
						
				},
				inputTextSave:"",
				totalNum:0,
			}
		},
		mounted() {
			this.getMemberData(true);
		},
		created(){

		},
		onLoad() {

		},

		methods: {
			
			input(e) {
					this.inputTextSave = e
					console.log("输入的文本为：",this.inputTextSave)
			},
			search(){
				this.MemberQueryReq.memberName=this.inputTextSave
				console.log(this.DailyPatrolRequestForm.reportPerson)
				this.totalNum=0
				this.officePageInfo.currentPage=1
				this.memberData=[]
				this.getMemberData()
			},
			async openDailyPatrolUser(item){
				const response = await uni.navigateTo({
					url:'/pages/DailyPatrol/DailyPatrolUser',
				})
				response[1].eventChannel.emit('user',{
					item: item
				})
			},
			getOfficeData(i){
				request({
					method:'POST',
					url:'patrolManage/dailyPatrolResultQuery',
					data:{
						DailyPatrolResultQueryReq: {						
						dailyPatrolResultId:'',
						patrolEndDate:'',
						patrolStartDate:'',
						patrolTaskLocation:'',
						patrolTaskName:'',			
						reportPerson:this.memberData[i].memberId,
						reportPersonMobile:'',
						patrolAdcode:'',
						
				},
						QueryPagingParamsReq:{
							offset:0,
							queryCount:9999,
						},
					}
				})
				.then(res=>{
					if(res.code===2000){
						this.officeData=res.data.PatrolResultQueryRsp;
						this.patrolAmount=res.data.QuerySummaryRsp.dataAmount;
						this.memberData[i].patrolAmount=this.patrolAmount;
						console.log("次数为",i)
						console.log("结果",this.memberData)
					}else{
						this.$message.error(res.message)
					}

				})
				
			},
			getMemberData:debounce(function(reset=false){
				uni.showLoading({
					title: '加载中'
				});
				requestAuthority({
					method:'POST',
					url:'member/query',
					data:{
						MemberQueryReq: this.MemberQueryReq,
						QueryPagingParamsReq: {
							offset: (this.officePageInfo.currentPage - 1) * this.officePageInfo.queryCount,
							queryCount:this.officePageInfo.queryCount
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						uni.hideLoading();
						uni.showToast({
							title: `加载完成`,
							duration: 2000
						});
						this.memberData= [...this.memberData,...res.data.MemberQueryRsp]
						this.officePageInfo.dataAmount=res.data.QuerySummaryRsp.dataAmount
						console.log("总数",this.officePageInfo.dataAmount)
					}else{
						this.$message.error(res.message)
					}

					for (var i =this.totalNum; i<this.memberData.length; i++){
						this.getOfficeData(i);
					}
					this.totalNum=this.memberData.length
					console.log("成员",this.memberData)
				})
				

			},300),

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
