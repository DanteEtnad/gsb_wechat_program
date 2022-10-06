<template>
	<view class="check-container">
		<view class="check-status-container">
			<uni-row>
				<view class="check-status">
					<text>当前进度：</text>
					<text>{{dataCodeTransform(alert.alertPhase.toString(),'alertPhases')}}</text>
				</view>
			</uni-row>
			<uni-row>
				<view class="check-status">
					<text>流程状态：</text>
					<text>{{dataCodeTransform(alert.alertState,'alertStates')}}</text>
				</view>
			</uni-row>
			<uni-row>
				<view class="check-status">
					<text>执行人：</text>
					<text>由汕头市气象局和汕头市自然局相关部门执行</text>
				</view>
			</uni-row>
			<uni-row>
				<view class="check-status">
					<text>操作：</text>
					<view class="check-status-button">
						<button>通过</button>
						<button>修改</button>
						<button>终止</button>
					</view>
				</view>
			</uni-row>
		</view>
		<view class="check-info-container">
			<view class="check-info-text">
				<text>{{alert.alertName}}</text>
			</view>
			<view class="check-info-text"> 
				<text>{{timeTransform(alert.alertStartTime)}} - {{timeTransform(alert.alertEndTime)}}</text>
			</view>
			<view class="check-info-picture">
				<u--image src="/static/test.jpg" mode="aspectFit"></u--image>
			</view>
			<view class="check-info-text">
				<p style="color: rgba(0,0,0,.65);text-indent:2em" v-for="(description,index) in alertDescription" :key="index">
					{{description}}
				</p>
			</view>
		</view>
	</view>
</template>

<script>
	import {request} from "@/utils/request.js"
	import {dataCodeTransformMixins,timeTransformMixins,getMemberOptionsMixins} from "@/utils/mixins.js"
	export default {
		mixins:[dataCodeTransformMixins,timeTransformMixins,getMemberOptionsMixins],
		data() {
			return {
				alert:{},
				officeData:[],
				alertDescription:[]
			}
		},
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.alert = data.item
				this.alertDescription = this.alert.alertDescription.split("；")
			})
		},
		mounted() {
			this.getMembersOptions()
		},
		methods: {
			
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
	.button-base{
		background: #2E9BFF;
		border-radius: 6px;
		font-size: 16px;
		color: #fff;
		padding: 0;
		margin: 0;
	}
	.check-container{
		.check-status-container{
			background-color: white;
			padding: 10px 5px;
			margin-bottom: 10px;
			.check-status{
				padding: 10px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.check-status-button{
					display: flex;
					justify-content: space-evenly;
					button{
						@extend .button-base;
						margin-left: 10px;
						width: 80px;
						height: 36px;
						line-height: 36px;
					}
				}
			}
		}
		.check-info-container{
			background-color: white;
			padding: 10px 5px;
			.check-info-text{
				padding: 0 10px;
			}
			.check-info-picture{
				display: flex;
				justify-content: space-around;
			}
		}
	}
</style>
