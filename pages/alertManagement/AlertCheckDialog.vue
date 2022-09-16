<template>
	<view class="check-container">
		<view class="check-status-container">
			<uni-row>
				<view class="check-status">
					<text>当前进度：</text>
					<text>预警技术负责人复核</text>
				</view>
			</uni-row>
			<uni-row>
				<view class="check-status">
					<text>流程状态：</text>
					<text>审批中</text>
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
				<text>汕头市地质灾害气象风险预警预报结果</text>
			</view>
			<view class="check-info-text"> 
				<text>2022-07-13 20:00-2022-07-14 20:00</text>
			</view>
			<view class="check-info-picture">
				<u--image src="/static/test.jpg" mode="aspectFit"></u--image>
			</view>
			<view class="check-info-text">
				<p style="color: rgba(0,0,0,.65);text-indent:2em">
					地质灾害气象风险预警级别为1级(红色)的区域有：榕城区仙桥街道、梅云街道、东升街道、东阳街道、京冈街道、渔湖镇、炮台镇、地都镇、登岗镇、揭东区曲西街道、云路镇、锡场镇、玉湖镇、埔田镇、惠来县侨园镇部分区域，气象因素致地质灾害的风险较高。请启动地质灾害隐患点24小时巡查监测。
				</p>
				<p style="color: rgba(0,0,0,.65);text-indent:2em">
					地质灾害气象风险预警级别为2级(橙色)的区域有：榕城区仙桥街道、梅云街道、东升街道、东阳街道、京冈街道、渔湖镇、炮台镇、地都镇、登岗镇、揭东区曲西街道、云路镇、锡场镇、玉湖镇、埔田镇、惠来县侨园镇部分区域，气象因素致地质灾害的风险较高。请启动地质灾害隐患点24小时巡查监测。
				</p>
				<p style="color: rgba(0,0,0,.65);text-indent:2em">
					地质灾害气象风险预警级别为3级(黄色)的区域有：榕城区仙桥街道、梅云街道、东升街道、东阳街道、京冈街道、渔湖镇、炮台镇、地都镇、登岗镇、揭东区曲西街道、云路镇、锡场镇、玉湖镇、埔田镇、惠来县侨园镇部分区域，气象因素致地质灾害的风险较高。请启动地质灾害隐患点24小时巡查监测。
				</p>
				<p style="color: rgba(0,0,0,.65);text-indent:2em">
					地质灾害气象风险预警级别为4级(蓝色)的区域有：榕城区仙桥街道、梅云街道、东升街道、东阳街道、京冈街道、渔湖镇、炮台镇、地都镇、登岗镇、揭东区曲西街道、云路镇、锡场镇、玉湖镇、埔田镇、惠来县侨园镇部分区域，气象因素致地质灾害的风险较高。请启动地质灾害隐患点24小时巡查监测。
				</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				now:'',
				status:'',
			}
		},
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',item=>{
				console.log(item)
				this.now = item.now
				this.status = item.now
			})
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
