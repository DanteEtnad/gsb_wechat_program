<template>
	<view style="padding: 20px 5px;margin-top:15px; background-color: white;">
		<view class="item-container">
			<!-- 受灾人口 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">受灾人口</view>
				</uni-col>
				<uni-col :span="15">
					<view class="select-input">
						<uni-easyinput
						placeholder="0" 
						:disabled="true"
						v-model="disaster.shouzai"
						@input="PopulationAffectedText"
						>
						</uni-easyinput>
					</view>
				</uni-col>
				<uni-col :span="1">
					<view style="padding-top: 7px;">人</view>
				</uni-col>
			</uni-row>
			<!-- 死亡人口 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">死亡人口</view>
				</uni-col>
				<uni-col :span="15">
					<view class="select-input">
						<uni-easyinput
						placeholder="0" 
						:disabled="true"
						v-model="disaster.dead"
						@input="PopulationDeadText"
						>
						</uni-easyinput>
					</view>
				</uni-col>
				<uni-col :span="1">
					<view style="padding-top: 7px;">人</view>
				</uni-col>
			</uni-row>
			<!-- 失踪人口 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">失踪人口</view>
				</uni-col>
				<uni-col :span="15">
					<view class="select-input">
						<uni-easyinput
						placeholder="0" 
						:disabled="true"
						v-model="disaster.miss"
						@input="PopulationMissedText"
						>
						</uni-easyinput>
					</view>
				</uni-col>
				<uni-col :span="1">
					<view style="padding-top: 7px;">人</view>
				</uni-col>
			</uni-row>
			<!-- 受伤人口 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">受伤人口</view>
				</uni-col>
				<uni-col :span="15">
					<view class="select-input">
						<uni-easyinput
						placeholder="0" 
						:disabled="true"
						v-model="disaster.hurt"
						@input="PopulationInjuredText"
						>
						</uni-easyinput>
					</view>
				</uni-col>
				<uni-col :span="1">
					<view style="padding-top: 7px;">人</view>
				</uni-col>
			</uni-row>
			<!-- 经济损失 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">经济损失</view>
				</uni-col>
				<uni-col :span="14">
					<view class="select-input">
						<uni-easyinput
						placeholder="0" 
						:disabled="true"
						v-model="disaster.jinji"
						@input="disasterRecordEconomicLossText"
						>
						</uni-easyinput>
					</view>
				</uni-col>
				<uni-col :span="3">
					<view style="padding-top: 7px;">万元</view>
				</uni-col>
			</uni-row>
			<!-- 受灾对象 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">受灾对象</view>
				</uni-col>
				<uni-col :span="16">
					<view class="select-input">
						<uni-easyinput
						v-model="disaster.duixiang"
						:disabled="true"
						placeholder="请输入对象" 
						@input="TargetText"
						>
						</uni-easyinput>
					</view>
				</uni-col>
			</uni-row>
			
			<!-- 诱发原因 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">诱发原因</view>
				</uni-col>
				<uni-col :span="16">
					<view class="select-input">
						<uni-easyinput type="textarea" :disabled="true" v-model="disaster.reason" placeholder="请输入诱发原因" @input="DescriptionText"/></view>
				</uni-col>
			</uni-row>
			<!-- 防治措施 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">防治措施</view>
				</uni-col>
				<uni-col :span="16">
					<uni-easyinput type="textarea" 	:disabled="true" v-model="disaster.cuoshi" placeholder="请输入防治措施" @input="PreventionText"/>
					
					<!-- <input type="text" name="local" placeholder="请输入防治措施" class="text-size"> -->
				</uni-col>
			</uni-row>
		</view>
		
	</view>
		
	
</template>

<script>
	import {request} from '@/utils/request.js'
	
	export default {
		props: {
			sendData: {},
		},
		data() {
			return {
				disaster:{
					shouzai:"",
					dead:'',
					miss:"",
					hurt:'',
					duixiang:'',
					reason:'',
					cuoshi:'',
					jinji:'',
					
				},
			}
		},
		mounted() {
			this.datamodel();
		},
		methods: {
			datamodel(){
				this.disaster.shouzai=this.sendData.disasterRecordPopulationAffected
				this.disaster.dead=this.sendData.disasterRecordPopulationDead
				this.disaster.miss=this.sendData.disasterRecordPopulationMissing
				this.disaster.hurt=this.sendData.disasterRecordPopulationInjured
				this.disaster.duixiang=this.sendData.disasterTarget
				this.disaster.reason=this.sendData.disasterRecordDescription
				this.disaster.cuoshi=this.sendData.disasterPrevention
				this.disaster.jinji=this.sendData.disasterRecordEconomicLoss
			},
			PopulationAffectedText(e){
				
			this.$emit("getPopulationAffected",e)				
			},
			PopulationDeadText(e){
			this.$emit("getPopulationDead",e)				
			},
			PopulationMissedText(e){
			this.$emit("getPopulationMissed",e)				
			},
			PopulationInjuredText(e){
			this.$emit("getPopulationInjured",e)				
			},
			TargetText(e){
			this.$emit("getTarget",e)				
			},
			DescriptionText(e){
			this.$emit("getDescription",e)				
			},
			PreventionText(e){
			this.$emit("getPrevention",e)				
			},
			disasterRecordEconomicLossText(e){
			this.$emit("getdisasterRecordEconomicLossText",e)				
			},
			
		},
	}
</script>

<style lang="scss">
	
	.item-container {
		// padding: 10px 5px;
		background-color: white;
		.Select-right {
			margin-top: 5px;
			margin-bottom: 20px;
			margin-left: 5px;
			font-size: 14px;
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
		.select-input{
			// align-items: center
			margin-right: 5px;
			margin-bottom: 12px;
			background-color: #F7F7F8;
			border-radius: 8px; /*圆角*/
		}
		.text-size {
			width: 200px;
			height: 80px;
			font-size: 14px;
			margin-right: 15px;
			margin-bottom: 10px;
			background-color: #F7F7F8;
			border-radius: 8px; /*圆角*/
		}
		
		
	}
</style>