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
				<uni-row>
					<text style="font-weight: 700; line-height: 50px; font-size: 14px;">变形迹象</text>
				</uni-row>
				<view style="padding: 5px;">
					<uni-row>
						<uni-col span="6">
							<button :plain=list[0].unselected style="border-color: #2E9BFF;" @click="choice(0)" :class="[list[0].selected?'select':'unselect']">{{list[0].title}}</button>
						</uni-col>
						<uni-col span="6">
							<button :plain=list[1].unselected style="border-color: #2E9BFF;" @click="choice(1)" :class="[list[1].selected?'select':'unselect']">{{list[1].title}}</button>
						</uni-col>
						<uni-col span="6">
							<button :plain=list[2].unselected style="border-color: #2E9BFF;" @click="choice(2)" :class="[list[2].selected?'select':'unselect']">{{list[2].title}}</button>
						</uni-col>
						<uni-col span="6">
							<button :plain=list[3].unselected style="border-color: #2E9BFF;" @click="choice(3)" :class="[list[3].selected?'select':'unselect']">{{list[3].title}}</button>
						</uni-col>
					</uni-row>
				</view>
				<view style="padding: 5px;">
					<uni-row>
						<uni-col span="6">
							<button :plain=list[4].unselected style="border-color: #2E9BFF;" @click="choice(4)" :class="[list[4].selected?'select':'unselect']">{{list[4].title}}</button>
						</uni-col>
						<uni-col span="6">
							<button :plain=list[5].unselected style="border-color: #2E9BFF;" @click="choice(5)" :class="[list[5].selected?'select':'unselect']">{{list[5].title}}</button>
						</uni-col>
						<uni-col span="12">
							<button :plain=list[6].unselected style="width: 100%; border-color: #2E9BFF;" @click="choice(6)" :class="[list[6].selected?'select':'unselect']">{{list[6].title}}</button>						
						</uni-col>
					</uni-row>
				</view>
				</uni-forms>
		</view>
		<view class="patrol-report-container" v-for="item in realshowData" :key="item">
			<view class="report-item">
				<view style="display: flex;justify-content: space-between;border-bottom: 1px dashed black;padding: 0 5px 5px" @click="openPatrolReportDialog(item)">
					<view style="display: flex;">
						<u--image class="logo" src="/static/document.svg" width="12px" height="18px" mode="aspectFit"></u--image>
						<text style="margin-left: 10px;font-family: 'Microsoft YaHei'; font-weight: 700;">{{item.patrolTaskName}}</text>
					</view>
					<view>
						<uni-icons type="forward" size="16"></uni-icons>
					</view>
				</view>
				<view class="report-item-info">
					<uni-row>
						<uni-col :span="20">
							<text>任务创建：{{item.patrolStartDate}}</text>
						</uni-col>
						<uni-col :span="4">
							<text>{{item.currentDistance}}km</text>
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
	import {request} from '@/utils/request.js'
	import {debounce} from "lodash"
	export default {
		data() {
			return {
				index: 1,
				queryForm:{
					key:'',
					level:'',
					now:'',
					status:'',
					createMethod:'',
					createTime:''
				},
                list: [{
                        selected: false,
						unselected:true,
                        title: '裂缝变形'
                    },
                    {
                        selected: false,
						unselected:true,
                        title: '新地鼓'
                    },
                    {
                        selected: false,
						unselected:true,
                        title: '地面塌陷'
                    },
                    {
                        selected: false,
						unselected:true,
                        title: '房屋变形'
                    },
                    {
                        selected: false,
						unselected:true,
                        title: '沟道堵塞'
                    }, 
					{
                        selected: false,
						unselected:true,
                        title: '树木歪斜'
                    },
					{
					    selected: false,
						unselected:true,
					    title: '泉水出露及变浑浊'
					}
                ],
                selectId: [],				
				reportData:[
					{
						name:'滑坡：凤鸣社区老鼠尾地段',
						createTime:'2022年6月6日 11:46',
						distance:'283.9km',
						deformationIndication:'裂缝变形、新地鼓、地面塌陷、房屋变形、 沟道阻塞、树木歪斜、泉水出露及变浑浊'
					},
					{
						name:'滑坡：凤鸣社区老鼠尾地段',
						createTime:'2022年6月6日 11:46',
						distance:'283.9km',
						deformationIndication:'裂缝变形、新地鼓、地面塌陷、房屋变形、 沟道阻塞、树木歪斜、泉水出露及变浑浊'
					}
				],
				officeData:[],
				showData:[],
				realshowData:[],
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
				potentialInfo:[],
				officePageInfo:{
					dataAmount:0,
					offset:0,
					queryCount:5,
					currentPage:1,
				},
				inputTextSave:"",
			}
		},
		created(){
		},
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			
			eventChannel.on('potential',data=>{
				this.potentialInfo= data.item
				
				console.log("user内容",this.potentialInfo)
			})
			this.DailyPatrolRequestForm.patrolTaskName=this.potentialInfo.potentialPointName
			this.getOfficeData()
		},
		onReachBottom() {
			if(this.officeData.length<this.officePageInfo.dataAmount){
				this.officePageInfo.currentPage++
				this.getOfficeData()
			}
			else{
			uni.showToast({
				title: `已经到底了`,
				duration: 2000
			});
			}
		},
		methods: {
			input(e) {
					this.inputTextSave = e
					console.log("输入的文本为：",this.inputTextSave)
			},
			search(){
				this.DailyPatrolRequestForm.patrolTaskName=this.inputTextSave
				console.log(this.DailyPatrolRequestForm.reportPerson)
				this.getOfficeData()
			},
			
			openCreateDialog(){
				uni.navigateTo({
					url:'/pages/DailyPatrol/DailyPatrolReportAdd'
				})
			},
			
			async openPatrolReportDialog(item){
				const response = await uni.navigateTo({
					url:'/pages/DailyPatrol/DailyPatrolReport',
				})
				response[1].eventChannel.emit('openReport',{
					item: item
				})
			},
			
			choice(index) {
				//当再次被选中时，取消当前选中项
			    if (this.list[index].selected == true) {
			        this.list[index].selected = false;
					this.list[index].unselected = true;
			        //取消选中时删除数组中的值
			        for (var i = 0; i < this.selectId.length; i++) {
			            if (this.selectId[i] === index) {
			                this.selectId.splice(i, 1);
			            }
			        }
			    } else {
			        this.list[index].selected = true;
					this.list[index].unselected = false;
			        this.selectId.push(index);
			    }
				this.showData=JSON.parse(JSON.stringify(this.officeData))
				this.realshowData=JSON.parse(JSON.stringify(this.officeData))
				if(this.selectId.length>0){
					this.showData=[];
				for(var j=0; j<this.selectId.length; j++){
					for(var k=0; k<this.officeData.length; k++){
						if(this.officeData[k].show.length>0){
						var check=0;
						for(var m=0; m<this.officeData[k].show.length; m++){
							if(this.officeData[k].show[m]===this.selectId[j]){
								check+=1;
								console.log("满足的报告编号",k)
								var already=0;
								for(var n=0; n<this.showData.length; n++){
									if(this.showData[n].dailyPatrolResultId===this.officeData[k].dailyPatrolResultId){
										already+=1;
									}
								}
								if(already===0){
									this.showData.push(this.officeData[k])
								}
								
							}
						}
						
						}
						}
					}
				this.realshowData=[];
				for (var o=0; o<this.showData.length; o++){
					var satisfy=0;
					for (var p=0; p<this.selectId.length; p++){
						for (var q=0; q<this.showData[o].show.length; q++){
							if (this.selectId[p]===this.showData[o].show[q]){
								satisfy+=1;
							}
						}
					}
					if (satisfy===this.selectId.length){
						this.realshowData.push(this.showData[o])
					}
				}

					}
				},
			
			getOfficeData:debounce(function(reset=false){
				uni.showLoading({
					title: '加载中'
				});
				request({
					method:'POST',
					url:'patrolManage/dailyPatrolResultQuery',
					data:{
						DailyPatrolResultQueryReq: this.DailyPatrolRequestForm,
						QueryPagingParamsReq :{
							offset: (this.officePageInfo.currentPage - 1) * this.officePageInfo.queryCount,
							queryCount:this.officePageInfo.queryCount
						},
					}
				})
				.then(res=>{
					if(res.code===2000){
						uni.hideLoading();
						uni.showToast({
							title: `加载完成`,
							duration: 2000
						});
						this.officeData = [...this.officeData,...res.data.PatrolResultQueryRsp]
						this.officePageInfo.dataAmount=res.data.QuerySummaryRsp.dataAmount
			
					}else{
						this.$message.error(res.message)
					}
					for (var j = 0; j < this.officeData.length; j++){
						this.officeData[j].deformationIndication='';
						this.officeData[j].show=[];
						if (this.officeData[j].isCrackDeformation==='Y'){
							this.officeData[j].deformationIndication+='裂缝变形 '
							this.officeData[j].show.push(0)
						}
			
						if (this.officeData[j].isGroundDrum==='Y'){
							this.officeData[j].deformationIndication+='新地鼓 '
							this.officeData[j].show.push(1)
						}						
						if (this.officeData[j].isGroundCollapse==='Y'){
							this.officeData[j].deformationIndication+='地面塌陷 '
							this.officeData[j].show.push(2)
						}
						if (this.officeData[j].isHouseDeformation==='Y'){
							this.officeData[j].deformationIndication+='房屋变形 '
							this.officeData[j].show.push(3)
						}						
						if (this.officeData[j].isChannelBlockage==='Y'){
							this.officeData[j].deformationIndication+='沟道阻塞 '
							this.officeData[j].show.push(4)
						}						
						if (this.officeData[j].isTreesAskew==='Y'){
							this.officeData[j].deformationIndication+='树木歪斜 '
							this.officeData[j].show.push(5)
						}
						if (this.officeData[j].isSpringWaterEmerges==='Y'){
							this.officeData[j].deformationIndication+='泉水露出及变浑浊 '
							this.officeData[j].show.push(6)
						}
			
					}
					this.showData=JSON.parse(JSON.stringify(this.officeData))
					this.realshowData=JSON.parse(JSON.stringify(this.officeData))
					console.log(this.officeData)
				})
				
			},300)
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
	
	
	.patrol-report-container{
		padding:10px 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.report-item{
			width: 680rpx;
			background-color: white;
			border-radius: 10px;
			padding: 10px;
			.report-item-info{
				margin: 10px 0 0;
			}
		}
	}
	.select{
		font-size: 12px; 
		font-weight: 700;
		color: #000000;
		background-color: #CEE8FF;
	}
	
	.unselect{
		font-size: 12px;
		font-weight: 700;
		background-color: #F7F7F8;
		color: #000000;
	}
</style>
