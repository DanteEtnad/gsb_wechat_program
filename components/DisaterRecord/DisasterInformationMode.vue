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
							@input="PopulationAffectedText"
							>
							</uni-easyinput>
						</view>
				</uni-col>
				<uni-col :span="1">
					<view style="padding-top: 7px;">人</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="item-container">
			<!-- 死亡人口 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">死亡人口</view>
				</uni-col>
				<uni-col :span="15">
					<view class="select-input">
						<uni-easyinput
						placeholder="0" 
						@input="PopulationDeadText"
						>
						</uni-easyinput>
					</view>
				</uni-col>
				<uni-col :span="1">
					<view style="padding-top: 7px;">人</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="item-container">
			<!-- 失踪人口 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">失踪人口</view>
				</uni-col>
				<uni-col :span="15">
					<view class="select-input">
						<uni-easyinput
						placeholder="0" 
						@input="PopulationMissedText"
						>
						</uni-easyinput>
					</view>
				</uni-col>
				<uni-col :span="1">
					<view style="padding-top: 7px;">人</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="item-container">
			<!-- 受伤人口 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">受伤人口</view>
				</uni-col>
				<uni-col :span="15">
					<view class="select-input">
						<uni-easyinput
						placeholder="0" 
						@input="PopulationInjuredText"
						>
						</uni-easyinput>
					</view>
				</uni-col>
				<uni-col :span="1">
					<view style="padding-top: 7px;">人</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="item-container">
			<!-- 经济损失 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">经济损失</view>
				</uni-col>
				<uni-col :span="14">
					<view class="select-input">
						<uni-easyinput
						placeholder="0" 
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
		</view>
		<view class="item-container">
			<!-- 受灾对象 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">受灾对象</view>
				</uni-col>
				<uni-col :span="16">
					<view class="select-input">
						<uni-easyinput
						placeholder="请输入对象" 
						@input="TargetText"
						>
						</uni-easyinput>
					</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="item-container">
			<!-- 诱发原因 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">诱发原因</view>
				</uni-col>
				<uni-col :span="16">
					<view class="select-input"><uni-easyinput type="textarea" v-model="value" placeholder="请输入诱发原因" @input="DescriptionText"/></view>
				</uni-col>
			</uni-row>
		</view>
		<view class="item-container">
			<!-- 防治措施 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">防治措施</view>
				</uni-col>
				<uni-col :span="16">
					<uni-easyinput type="textarea" v-model="value" placeholder="请输入防治措施" @input="PreventionText"/>
					
					<!-- <input type="text" name="local" placeholder="请输入防治措施" class="text-size"> -->
				</uni-col>
			</uni-row>
		</view>
		</view>
	</view>
		
	
</template>

<script>
	import {request} from '@/utils/request.js'
	
	export default {
		data() {
			return {

			}
		},
	
		methods: {
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
		border-bottom: 1px solid black;
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