<template>
	<view>
		<navBarMode
		:loactionName="DisasterInfoQueryData.disasterLocation"
		:statusBarHeight="statusBarHeight"
		:disasterRecordType="DisasterInfoQueryData.disasterRecordType"
		>
		</navBarMode>
		<mapDisatserMode 
		:DisasterInfoQueryData="DisasterInfoQueryData">
		</mapDisatserMode>
		<view class="item-container">
			<view class="item">
				<view class="item-info">
					<text class="item-info-text">发灾地点:</text>
					<text class=" item-info-text-right">{{DisasterInfoQueryData.disasterLocation}}</text> 
				</view>
				<view class="item-info">
					<text class="item-info-text">发生时间：</text>
					<text class=" item-info-text-right">{{timeTransform(DisasterInfoQueryData.disasterRecordDate)}}</text> 
				</view>
				<view class="item-info">
					<text class="item-info-text">登记时间：</text>
					<text class=" item-info-text-right">{{timeTransform(DisasterInfoQueryData.disasterSubmitDate)}}</text> 
				</view>
				<uni-row>
					<view style="display: flex;padding: 10px 5px 10px;padding-bottom: 2px;">
						<uni-col :span="15">
							<text class="item-info-text">灾害类型：{{dataCodeTransform(DisasterInfoQueryData.disasterRecordType,"disasterRecordType")}}</text>
						</uni-col>
						<uni-col :span="9"> 
							<text class=" item-info-text-right">灾害等级：{{dataCodeTransform(DisasterInfoQueryData.disasterRecordLevel,"disasterRecordLevel")}}级</text>
						</uni-col>
					</view>
				</uni-row>
				<uni-row>
					<view style="display: flex;padding: 10px 5px 10px;padding-top: 2px;  border-bottom: 1rpx dotted #c7c7c7;">
						<uni-col :span="15">
							<text class="item-info-text">灾害规模：{{dataCodeTransform(DisasterInfoQueryData.disasterScaleLevels,"disasterScaleLevels")}}</text>
						</uni-col>
						<uni-col :span="9"> 
							<text class=" item-info-text-right">引发因素: {{DisasterInfoQueryData.disasterTrigger}}</text>
						</uni-col>
					</view>
				</uni-row>
				<view class="item-info">
					<text class="item-info-text">经纬度：</text>
					<u-row>
						<text class=" item-info-text-right">
						{{disasterLongitude}}&nbsp;{{disasterLatitude}}
						</text> 
						<!-- <uni-icons color="#2E98FF" type="upload" size=24 @click=""></uni-icons> -->
						<image src="/static/Potential/back.svg" style="width:20px;height:20px;"></image>
					</u-row>
					
				</view>
				<view class="item-info">
					<text class="item-info-text">直线距离：</text>
					<text class=" item-info-text-right">{{DisasterInfoQueryData.distance}}km</text> 
				</view>
				<uni-row>
					<view style="display: flex;padding: 10px 5px 10px;padding-bottom: 2px;">
							<uni-col :span="15">
								<text class="item-info-text">受灾人口：{{DisasterInfoQueryData.disasterRecordPopulationAffected}}人</text>
							</uni-col>
							<uni-col :span="9"> 
								<text class=" item-info-text-right">死亡人口：{{DisasterInfoQueryData.disasterRecordPopulationDead}}人</text>
							</uni-col>
					</view>
				</uni-row>
				<uni-row>
					<view style="display: flex;padding: 10px 5px 10px;padding-top: 2px;  border-bottom: 1rpx dotted #c7c7c7;">
						<uni-col :span="15">
							<text class="item-info-text">受伤人口：{{DisasterInfoQueryData.disasterRecordPopulationInjured}}人</text>
						</uni-col>
						<uni-col :span="9"> 
							<text class=" item-info-text-right">失踪人口：{{DisasterInfoQueryData.disasterRecordPopulationMissing}}人</text>
						</uni-col>
					</view>
				</uni-row>
				<view class="item-info">
					<text class="item-info-text">经济损失：</text>
					<text class=" item-info-text-right">{{DisasterInfoQueryData.disasterRecordEconomicLoss}}万元</text> 
				</view>
				<uni-row>
					<view style="display: flex;border-bottom: 1rpx dotted #c7c7c7;padding: 10px 5px 10px">
						<uni-col :span="12">
							<text style="margin-left: 10px; font-size: 14px;">填报人：{{DisasterInfoQueryData.memberId}}</text>
						</uni-col>
						<uni-col :span="12"> 
							<text style=" font-size: 14px;">联系手机：{{DisasterInfoQueryData.memberPhone}}</text>
						</uni-col>
					</view>
				</uni-row>
				
				<view class="item-info">
					<text class="item-info-text">受灾对象：</text>
					<text class=" item-info-text-right">{{DisasterInfoQueryData.disasterTarget}}</text> 
				</view>
				<view class="item-info">
					<text class="item-info-text">防治措施：</text>
					<text class=" item-info-text-right">{{DisasterInfoQueryData.disasterPrevention}}</text> 
				</view>
				<view class="item-info">
					<text class="item-info-text">诱发原因：</text>
					<text style="  font-size: 14px; text-align:right; ">{{DisasterInfoQueryData.disasterRecordDescription}}</text> 
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins} from "@/utils/mixins.js"
	import mapDisatserMode from '@/pages_DisasterRecord/components/mapDisatserMode.vue'
	import navBarMode from '@/pages_DisasterRecord/components/navBarMode.vue'
	//将度转换成为度分秒
	import {request} from '@/utils/request.js'
	export default {
		components:{
			mapDisatserMode,
			navBarMode,
		},
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins],
		data() {
			return {
						statusBarHeight:0,
						navBarHeight: 80,
						DisasterInfoQueryData:{},
						disasterLatitude:0,
						disasterLongitude:0,
						
						memberData:[],
						
					}
		},
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.DisasterInfoQueryData= data.item
				console.log("this.DisasterInfoQueryData",this.DisasterInfoQueryData)
			})
		},
		mounted(){
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];	
			this.getMemberData();
			this.disasterLongitude=this.formatDegree(this.DisasterInfoQueryData.disasterLongitude);
			this.disasterLatitude=this.formatDegree(this.DisasterInfoQueryData.disasterLatitude);
			
		},
		methods: {
			formatDegree(value) {
				if(value != null && value != ''){
				    ///<summary>将度转换成为度分秒</summary>  
				    value = Math.abs(value);  //返回数的绝对值
				    var v1 = Math.floor(value);//度   //对数进行下舍入
				    var v2 = Math.floor((value - v1) * 60);//分  
				    var v3 = Math.round((value - v1) * 3600 % 60);//秒  //把数四舍五入为最接近的整数
				    return v1 + '°' + v2 + '′' + v3 + '′′';  
				}else{
					return '' + '度' + '' + '′' + '' + '′′';  
				}
			},
			getMemberData(){
				request({
					method:'GET',
					url:'member/getAllMembersIdAndName',
				})
				.then(res=>{
					if(res.code===2000){
						this.memberData=res.data.MembersIdAndNameRsp
						for(var i=0;i<this.memberData.length;i++){
							if(this.DisasterInfoQueryData.memberId==this.memberData[i].memberId){
									this.DisasterInfoQueryData.memberId=this.memberData[i].memberName
							}
						}
						
					}else{
						this.$message.error(res.message)
					}
					
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	body{
		background-color: #F7F7F8;
	}

	.item-container {
		padding:10px 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.item {
			width: 680rpx;
			background-color: white;
			border-radius: 10px;
			padding: 15px;
			.item-info {
				display: flex;
				justify-content: space-between;
				border-bottom: 1rpx dotted #c7c7c7;
				padding: 10px 5px 10px 
			}
			.item-info-text {
				margin-left: 10px; 
				font-size: 14px;
				
			}
			.item-info-text-right {
				font-size: 14px; 
				text-align:right;
				
			}
			
			
		}		
		
	}
</style>
