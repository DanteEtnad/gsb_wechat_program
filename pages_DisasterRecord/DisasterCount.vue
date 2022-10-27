<template>
	<view>
		<view style="background-color: white;padding-left: 10px; padding-bottom: 10px; padding-top: 10px; font-size:12px;color: grey;" >
			{{currentYear}}年01月01日 至 {{currentDate}}
		</view>
		
		<!-- 日期范围选择 -->
		<!-- <view class="date">
			<text>aaaa</text>
			<uni-col :span="21">
				<uni-datetime-picker v-model="range" type="daterange" @change="timechange()" class="date" :border="false"  />
			</uni-col>
		</view> -->
		<!-- 灾情概况统计 -->
		<view>
			<view style="display: flex;justify-content: space-between;padding: 0px 5px 10px;background-color: white;">
				<text style="margin-left: 10px;  font-size: 14px;">今年灾情概况</text>
				<view>
					<text style=" font-size: 14px;">发灾</text>
					<text style=" font-size: 16px; color:#2E9BFF;">{{TotalCount}}</text> 
					<text style="margin-right: 10px; font-size: 14px;">次</text> 
				</view>
				
			</view>
		
		</view>
		
		<!-- 汕头市各区统计列表 -->
		<view class="Count-item-container">
			<view class="Count-item">
				<!-- 各列标题 -->
				<view style="display: flex;justify-content: space-between;border-bottom: 1px solid  #c7c7c7;padding:5px 5px 5px">
					<text style="margin-left: 10px; font-weight: 700; font-size: 14px;text-align: center;">行政区</text>
					<text style="margin-left: 10px; font-weight: 700; font-size: 14px;text-align: center;">发灾次数(次)</text>
					<text style="margin-left: 10px; font-weight: 700; font-size: 14px;text-align: center;">受灾人口(人)</text>
				</view>
				<!-- 各区详情 -->
				<view style="justify-content: space-between;border-bottom: 1rpx dotted #c7c7c7;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="5">
							<view class="Details-item-info">金平区</view>
						</uni-col>
						<uni-col :span="12">
							<view class="Details-item-info">{{(AlarmCountData[0].disasterCount)}}</view>
						</uni-col>
						<uni-col :span="6">
							<view class="Details-item-info">{{(AlarmCountData[0].peopleCount)}}</view>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1rpx dotted #c7c7c7;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="5">
							<view class="Details-item-info">龙湖区</view>
						</uni-col>
						<uni-col :span="12">
							<view class="Details-item-info">{{(AlarmCountData[1].disasterCount)}}</view>
						</uni-col>
						<uni-col :span="6">
							<view class="Details-item-info">{{(AlarmCountData[1].peopleCount)}}</view>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1rpx dotted #c7c7c7;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="5">
							<view class="Details-item-info">澄海区</view>
						</uni-col>
						<uni-col :span="12">
							<view class="Details-item-info">{{(AlarmCountData[2].disasterCount)}}</view>
						</uni-col>
						<uni-col :span="6">
							<view class="Details-item-info">{{(AlarmCountData[2].peopleCount)}}</view>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1rpx dotted #c7c7c7;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="5">
							<view class="Details-item-info">濠江区</view>
						</uni-col>
						<uni-col :span="12">
							<view class="Details-item-info">{{(AlarmCountData[3].disasterCount)}}</view>
						</uni-col>
						<uni-col :span="6">
							<view class="Details-item-info">{{(AlarmCountData[3].peopleCount)}}</view>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1rpx dotted #c7c7c7;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="5">
							<view class="Details-item-info">潮阳区</view>
						</uni-col>
						<uni-col :span="12">
							<view class="Details-item-info">{{(AlarmCountData[4].disasterCount)}}</view>
						</uni-col>
						<uni-col :span="6">
							<view class="Details-item-info">{{(AlarmCountData[4].peopleCount)}}</view>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1rpx dotted #c7c7c7;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="5">
							<view class="Details-item-info">潮南区</view>
						</uni-col>
						<uni-col :span="12">
							<view class="Details-item-info">{{(AlarmCountData[5].disasterCount)}}</view>
						</uni-col>
						<uni-col :span="6">
							<view class="Details-item-info">{{(AlarmCountData[5].peopleCount)}}</view>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1rpx dotted #c7c7c7;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="5">
							<view class="Details-item-info">南澳县</view>
						</uni-col>
						<uni-col :span="12">
							<view class="Details-item-info">{{(AlarmCountData[6].disasterCount)}}</view>
						</uni-col>
						<uni-col :span="6">
							<view class="Details-item-info">{{(AlarmCountData[6].peopleCount)}}</view>
						</uni-col>
					</uni-row>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	
	import {request} from '@/utils/request.js' 
	export default {
		data() {
			return {
				Date: new Date().toISOString().slice(0, 10),
				currentDate: '',
				currentYear: new Date().toISOString().slice(0, 4),
				year:'',
				//存放后端发来的灾情统计数据
				AlarmCountData:[],
				// 存放发送到后端的月份数据
				DisasterRecordStatisticsForm :{
					beginDate:"",
					endDate:"20221027",
					
				},
				//统计灾情总数
				TotalCount: 0,
				//渲染数据
				Distric:{
					JingPing:{disaterCount:0,threatenPopulation:0,code:"440511"},
					LongHu:{disaterCount:0,threatenPopulation:0,code:"440507"},
					ChengHai:{disaterCount:0,threatenPopulation:0,code:"440515"},
					HaoJiang:{disaterCount:0,threatenPopulation:0,code:"440512"},
					ChaoYang:{disaterCount:0,threatenPopulation:0,code:"440513"},
					ChaoNan:{disaterCount:0,threatenPopulation:0,code:"440514"},
					NanAo:{disaterCount:0,threatenPopulation:0,code:"440523"}
				}		
			}
			
		},
		created() {
			//调用后端请求数据函数
			this.getAlarmCountData()
			this.currentDate=this.timeTypeChange(this.Date)
			this.year=this.currentYear+"0000"
			console.log("this.year",this.year)
			console.log("this.currentDate",this.currentDate)
		},
		methods: {
			//时间转换格式
			timeTypeChange(Date){
				var timeTransform;
				timeTransform = Date.slice(0, 4)  +'年'+ Date.slice(5, 7) +'月'+ Date.slice(8, 10)+'日';
				return timeTransform;
				
			},
			
			// 获取选中时间value值并更新数据
			timechange:function(e) {
				this.DisasterRecordStatisticsForm.beginDate=this.timeTypeChange(e[0]);
				this.DisasterRecordStatisticsForm.endDate=this.timeTypeChange(e[1]);
				this.TotalCount=0;
				this.Distric.JingPing.disaterCount=0;
				this.Distric.LongHu.disaterCount=0;
				this.Distric.ChengHai.disaterCount=0;
				this.Distric.HaoJiang.disaterCount=0;
				this.Distric.ChaoYang.disaterCount=0;
				this.Distric.ChaoNan.disaterCount=0;
				this.Distric.NanAo.disaterCount=0;
				console.log(this.DisasterRecordStatisticsForm.beginDate);
				console.log(this.DisasterRecordStatisticsForm.endDate);
				this.getAlarmCountData();
				
			},
			//后端请求数据函数
			getAlarmCountData(){
				this.DisasterRecordStatisticsForm.beginDate=this.year
				request({
					method:'POST',
					url:'disasterRecord/statistics',
					data:{
						DisasterRecordStatisticsReq:this.DisasterRecordStatisticsForm,
						
						},
					
				})
				.then(res=>{
					if(res.code===2000){
						this.AlarmCountData=res.data.DisasterRecordStatisticsRsp  
						for(var i=0;i<7;i++){
							this.TotalCount=Number(this.AlarmCountData[i].disasterCount)+this.TotalCount
						}
						// 根据数据各自统计各区的情况
				
					}
					else{
						this.$message.error(res.message)
					}
					console.log("@res@",res)
				})
				
			},
		}
	}
</script>

<style lang="scss">
	body{
		background-color: #F7F7F8;
	}
	.date {
		display: flex;
		font-size: 1px;
		color: grey;
		
		padding: 0rpx 0rpx;
		background-color: white;
	}
	.Count-item-container {
		padding:10px 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.Count-item {
			width: 660rpx;
			background-color: white;
			border-radius: 10px;
			padding: 10px;
			.Details-item-info {
				// margin-left: 10px;  
				font-size: 14px;
				text-align: center;
			}
			
		}		
		
	}	

	

</style>
