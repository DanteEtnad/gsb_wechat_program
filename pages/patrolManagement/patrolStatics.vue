<template>
	<view>
		<view class="year">
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				 <view class="data">2022-07-07</view>
			</picker>
			<view>--</view>
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				 <view class="data">{{ date }}</view>
			</picker>
		</view>
		<view>
			<uni-col :span="18">
				<view class="situation">今年巡查概况</view>
			</uni-col>
			<uni-col :span="6">
				<view class="times" >巡查{{count}}次</view>
			</uni-col>
		</view>
		<view class="Count-item-container">
			<view class="Count-item">
				<view style="display: flex;justify-content: space-between;border-bottom: 1px dashed black;padding:5px 5px 5px">
					<text style="margin-left: 10px; font-weight: 700; font-size: 14px;text-align: center;">行政区</text>
					<text style="margin-left: 10px; font-weight: 700; font-size: 14px;text-align: center;">巡排查次数(次)</text>
				</view>
				<view style="justify-content: space-between;border-bottom: 1px dashed grey;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="18">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">金平区</text>
						</uni-col>
						<uni-col :span="6">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">{{officeData[0].dataCount}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1px dashed grey;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="18">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">龙湖区</text>
						</uni-col>
						<uni-col :span="6">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">{{officeData[1].dataCount}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1px dashed grey;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="18">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">澄海区</text>
						</uni-col>
						<uni-col :span="6">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">{{officeData[2].dataCount}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1px dashed grey;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="18">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">濠江区</text>
						</uni-col>
						<uni-col :span="6">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">{{officeData[3].dataCount}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1px dashed grey;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="18">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">潮阳区</text>
						</uni-col>
						<uni-col :span="6">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">{{officeData[4].dataCount}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1px dashed grey;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="18">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">潮南区</text>
						</uni-col>
						<uni-col :span="6">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">{{officeData[5].dataCount}}</text>
						</uni-col>
					</uni-row>
				</view>
				<view style="justify-content: space-between;border-bottom: 1px dashed grey;padding: 10px 5px 10px">
					<uni-row>
						<uni-col :span="18">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">南澳县</text>
						</uni-col>
						<uni-col :span="6">
							<text style="margin-left: 10px;  font-size: 14px;text-align: center;">{{officeData[6].dataCount}}</text>
						</uni-col>
					</uni-row>
				</view>
				
				
			
			</view>
			
		</view>
	
		
		
	</view>
	
</template>

<script>
	import {request} from '@/utils/request.js'
	// import {getClassList} from '@/servies/class.js'
	function getDate(type) {
	const date = new Date();
 
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
 
	if (type === 'start') {
		year = year - 10;
	} else if (type === 'end') {
		year = year + 10;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;
 
	return `${year}-${month}-${day}`;
}
	export default {
		data() {
			return {
				testInfo:null,	
				date: getDate({
			  				format: true
			  			}),
			  			startDate: getDate('start'),
			  			endDate: getDate('end'),
						count: 0,
						time: 0,
						people: 0,
						officeData:[],
						
			}
			
		},
		onLoad(){
			this.getInfo()
		},

		methods: {
			// 请求数据
			// async __init(){
			// 	const data={
			// 		number:this.number,
					
			// 	}
			// 	const res =await getClassList(data)
			// 	console.log(res)
			// 	this.testInfo=res
			// },
			
			getInfo(){
				request({
					method:'POST',
					url:'patrolManage/patrolResultStatisticsByArea',
					data:{
						PatrolResultStatisticsByAreaReq:{
							startTime:'',
							endTime:'',
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
					this.officeData=res.data.PatrolResultStatisticsByAreaRsp
					console.log("结果为",res)}
					else{
						uni.hideLoading();
						uni.showToast({
							title: `加载失败`,
							duration: 2000
						});
						this.$message.error(res.message)
					}
					console.log("@res@",res)
					for (let i = 0; i < this.officeData.length; i++) {
					   this.count += Number(this.officeData[i].dataCount);
					}
				})
				.catch(error=>{
					console.log(error)
				})
			},
			
			bindDateChange: function(e) {
			this.date = e.detail.value;
			}
			
		}
	}
</script>

<style lang="scss">
	body{
		background-color: #F7F7F8;
	}
	.year {
		display: flex;
		font-size: 14px;
		color: grey;
		padding: 20rpx 20rpx;
		background-color: white;
	}
	.situation {
		display: flex;
		font-size: 14px;
		background-color: white;
		padding: 10rpx 20rpx;
		
	}
	.times {
		margin-left: 5px; 
		display: flex;
		font-size: 14px;
		background-color: white;
		padding: 10rpx 0rpx;
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
				margin: 10px 0 10px;
				font-size: 10px;
			}
			
		}		
		
	}	

</style>

