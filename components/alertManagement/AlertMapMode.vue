<template>
	<view style="width:100%;height:100vh">
		<map class="map" 
			:latitude="latitude" 
			:longitude="longitude" 
			:scale="scale"
		>
			<cover-view :class="classObj">
				<cover-view class="cover-alert-img">
					<cover-view style="margin-bottom: 20px;">
						预警图例
					</cover-view>
					<cover-view class="cover-alert-info">
						<cover-view style="width: 20px;height: 10px;background-color: #DC0129;margin-right:10px;border-radius: 2px;"></cover-view>
						<cover-view>一级</cover-view>
					</cover-view>
					<cover-view class="cover-alert-info">
						<cover-view style="width: 20px;height: 10px;background-color: #EB9A03;margin-right:10px;border-radius: 2px;"></cover-view>
						<cover-view>二级</cover-view>
					</cover-view>
					<cover-view class="cover-alert-info">
						<cover-view style="width: 20px;height: 10px;background-color: #FCF66A;margin-right:10px;border-radius: 2px;"></cover-view>
						<cover-view>三级</cover-view>
					</cover-view>
					<cover-view class="cover-alert-info">
						<cover-view style="width: 20px;height: 10px;background-color: #019EF5;margin-right:10px;border-radius: 2px;"></cover-view>
						<cover-view>四级</cover-view>
					</cover-view>
				</cover-view>
				<cover-view class="cover-potential-img">
					<cover-view style="margin-bottom: 20px;">
						隐患点图例
					</cover-view>
					<cover-view class="cover-potential-info-container">
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/滑坡.svg" class="cover-potential-icon"></cover-image>
							<cover-view>滑坡</cover-view>
						</cover-view>
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/崩塌.svg" class="cover-potential-icon"></cover-image>
							<cover-view>崩塌</cover-view>
						</cover-view>
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/泥石流.svg" class="cover-potential-icon"></cover-image>
							<cover-view>泥石流</cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="cover-potential-info-container">
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/地面塌陷.svg" class="cover-potential-icon"></cover-image>
							<cover-view>地面塌陷</cover-view>
						</cover-view>
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/地面沉降.svg" class="cover-potential-icon"></cover-image>
							<cover-view>地面沉降</cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="cover-potential-info-container">
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/地裂缝.svg" class="cover-potential-icon"></cover-image>
							<cover-view>地裂缝</cover-view>
						</cover-view>
						<cover-view class="cover-potential-info">
							<cover-image src="../../static/Potential/不稳定斜坡.svg" class="cover-potential-icon"></cover-image>
							<cover-view>不稳定斜坡</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
			<cover-view style="display: flex;flex-direction: column;align-items: center;position: absolute;bottom: 50px;width:100%;">
				<cover-image src="../../static/Potential/icon_back.svg" 
					style="width: 32px;height: 32px;" 
					v-show="!isUp" 
					@click="showImage(true,'cover-info-container-active')"></cover-image>
				<cover-image src="../../static/Potential/icon_up.svg" 
					style="width: 32px;height: 32px;" 
					v-show="isUp" 
					@click="showImage(false,'cover-info-container')"></cover-image>
			</cover-view>
			<cover-view style="position: absolute;padding: 3px;background-color: rgba(255,255,255,.75);bottom: 320px;right: 10px;border-radius: 4px;">
				<cover-image src="../../static/Potential/定位.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
			<cover-view style="position: absolute;padding: 3px;background-color: rgba(255,255,255,.75);bottom: 280px;right: 10px;border-radius: 4px;">
				<cover-image src="../../static/Potential/全景.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
			<cover-view style="position: absolute;padding: 3px;background-color: rgba(255,255,255,.75);bottom: 240px;right: 10px;border-radius: 4px;">
				<cover-image src="../../static/Potential/更多.svg" style="width:20px;height:20px;"></cover-image>
			</cover-view>
		</map>
	</view>
</template>

<script>
	// import { loadModules } from "esri-loader";
	export default{
		data(){
			return{
				longitude: 116.713, 		//经度
				latitude: 23.422, 			//纬度
				scale: 14, 							//地图缩放程度
				address: '',
				isUp:false,
				classObj:['cover-info-container'],
			}
		},
		mounted(){
			console.log('地图')
		},
		methods:{
			showImage(status,activeClassName){
				this.isUp = status
				this.classObj.pop()
				this.classObj.push(activeClassName)
			}
		}
	}
</script>

<style lang="less">
	.map{
		width:100%;
		height:100%;
		position: relative;
	}
	.cover-info-container-active{
		position: absolute;
		width: 100%;
		height: 180px;
		background-color: rgba(255,255,255,.75);
		border-radius: 20px;
		bottom: 40px;
		display: flex;
		.cover-alert-img{
			padding: 10px;
			flex:1;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cover-alert-info{
				margin-top: 5px;
				display: flex;
				align-items: center;
			}
		}
		.cover-potential-img{
			padding: 10px;
			flex:2;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cover-potential-info-container{
				display: flex;
				.cover-potential-info{
					display: flex;
					align-items: center;
					font-size: 14px;
					margin: 7px;
					.cover-potential-icon{
						width:16px;
						height:16px;
						margin-right:7px;
					}
				}
			}
		}
	}
	.cover-info-container{
		position: absolute;
		width: 100%;
		height: 180px;
		background-color: rgba(255,255,255,.75);
		border-radius: 20px;
		bottom: -80px;
		display: flex;
		.cover-alert-img{
			padding: 10px;
			flex:1;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cover-alert-info{
				margin-top: 5px;
				display: flex;
				align-items: center;
			}
		}
		.cover-potential-img{
			padding: 10px;
			flex:2;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cover-potential-info-container{
				display: flex;
				.cover-potential-info{
					display: flex;
					align-items: center;
					font-size: 14px;
					margin: 7px;
					.cover-potential-icon{
						width:16px;
						height:16px;
						margin-right:7px;
					}
				}
			}
		}
	}
</style>