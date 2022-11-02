<template>
	<view>
		<view class="daliy-alert-container" v-if="isAlert">
			<view style="font-size: 14px;">
				发布时间：{{timeTransform(alertData.alertPublishTime)}}
				</view>
			<view style="font-size: 14px;">
				预警时段：{{timeTransform(alertData.alertStartTime)}}-{{timeTransform(alertData.alertEndTime)}}
				</view>
			<view style="display: flex;justify-content: space-around;">
				<u--image :src="mapUrl" mode="aspectFit"></u--image>
			</view>
			<view class="daliy-alert-text-container">
				<uni-row v-for="(alertLevel,index) in alertLevels" :key="index">
					<view class="daliy-alert-text-title">
						<view :style="{width:'24px',height:'12px',marginRight:'5px',backgroundColor:`${alertLevel.color}`,borderRadius:'3px'}"></view>
						<!-- <view style="height: 12px;width: 24px;"></view> -->
						<text>{{alertLevel.name}}</text>
					</view>
					<view class="daliy-alert-text-content">
						<uni-row>
							<uni-row v-for="item in alertLevel.data" :key="item">
								<text>{{item.county}}：</text>
								<text style="color:rgba(0,0,0,.65)">{{item.town}}；</text>
							</uni-row>
						</uni-row>
					</view>
				</uni-row>
			</view>
		</view>
		<view style="text-align: center;padding: 20px 0;" v-else>
			<h1>{{text}}</h1>
		</view>
	</view>
</template>

<script>
	import {request} from '@/utils/request.js'
	import {dataCodeTransformMixins,timeTransformMixins,getNowDateMixins} from '@/utils/mixins.js'
	export default {
		mixins:[dataCodeTransformMixins,timeTransformMixins,getNowDateMixins],
		props:['isAlert'],
		data(){
			return{
				text:'今日暂无预警',
				mapUrl:'',
				alertData:'',
				todayTime:'',
				alertLevels:[
					{
						name:'一级（红色预警）',
						color:'#DC0129',
						data:[]
					},
					{
						name:'二级（橙色预警）',
						color:'#EB9A03',
						data:[]
					},
					{
						name:'三级（蓝色预警）',
						color:'#019EF5',
						data:[]
					},
					{
						name:'四级（绿色预警）',
						color:'#01F51E',
						data:[]
					}
				]
			}
		},
		methods:{
			init(data){
				this.alertData = data
				this.getAlertLocation(this.alertData.alertLevelFirstAdcode,0)
				this.getAlertLocation(this.alertData.alertLevelSecondAdcode,1)
				this.getAlertLocation(this.alertData.alertLevelThirdAdcode,2)
				this.getAlertLocation(this.alertData.alertLevelFourthAdcode,3)
				this.mapUrl = this.alertData.alertMapUrl
				console.log(this.alertLevels);
			},
			getAlertLocation(levelAdcode,index){
				let alertLevelAdcode = levelAdcode.split(',').filter(item=>item.length===9&&item!=='undefined')
				let m = new Map()
				alertLevelAdcode.forEach(item=>{
					if(!m.get(item.slice(0,6))){
						m.set(item.slice(0,6),this.dataCodeTransform(item.slice(0,6),'potentialPointBelongCountys'))
					}
				})
				m.forEach((item,key)=>{
					let town = []
					alertLevelAdcode.forEach(Adcode=>{
						if(Adcode.slice(0,6)===key){
							town.push(this.dataCodeTransform(Adcode,'potentialPointBelongTowns'))
						}
					})
					this.alertLevels[index].data.push({
						county:item,
						town:town.join(',')
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	body{
		background-color: rgb(247,247,248);
	}
	text{
		font-size: 16px;
	}
	.daliy-alert-container{
		padding: 10px;
		.daliy-alert-text-container{
			.daliy-alert-text-title{
				display: flex;
				align-items: center;
				padding: 5px 0;
			}
			.daliy-alert-text-content{
				background-color: white;
				border-radius:8px;
				margin: 0 5px;
				padding: 10px;
			}
		}
	}
</style>