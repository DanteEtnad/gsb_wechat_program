<template>
	<view>
		<u-sticky bgColor="#fff">
			<u-tabs :list="list" :scrollable="false" @click="handleTabsClick"></u-tabs>
		</u-sticky>
		<alertTextMode ref="text" v-show="textShow" :isAlert="isAlert"></alertTextMode>
		<alertMapMode ref="map" v-show="!textShow" :isAlert="isAlert" :mapUrl="mapUrl"></alertMapMode>
	</view>
</template>

<script>
	import {dataCodeTransformMixins} from '@/utils/mixins.js'
	import {request} from '@/utils/request.js'
	import alertTextMode from '@/components/alertManagement/AlertTextMode.vue'
	import alertMapMode from '@/components/alertManagement/AlertMapMode.vue'
	export default {
		components:{
			alertTextMode,
			alertMapMode
		},
		mixins:[dataCodeTransformMixins],
		data() {
			return {
				mapUrl:'',
				isAlert:false,
				todayTime:'',
				textShow:true,
				list:[{name:'图文模式',},{name:'地图模式',}]
			}
		},
		mounted() {
			this.getAlertData()
		},
		methods: {
			addZero(value){
				return value<10?`0${value}`:value
			},
			getAlertData(){
				uni.showLoading({
					title: '加载中'
				});
				let date = new Date()
				let year = date.getFullYear()
				let month = this.addZero(date.getMonth()+1)
				let day = this.addZero(date.getDate())
				let hour=this.addZero(date.getHours());
				let minute=this.addZero(date.getMinutes());
				let second=this.addZero(date.getSeconds());
				this.todayTime = `${year}${month}${day}${hour}${minute}${second}`
				//this.todayTime = "20220919100000"
				console.log('现在是：',this.todayTime);
				request({
					url:'alertManage/queryAlertList',
					method:'post',
					data:{
						QueryAlertListReq:{
							//alertId: "457042754011164",
							alertState:"FIN"
						},
						QueryPagingParamsReq:{
							offset:0,
							queryCount:9999
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						const alertData = res.data.QueryAlertListRsp.filter(item=>{
							return item.alertStartTime <= this.todayTime && item.alertEndTime >= this.todayTime
						})
						uni.hideLoading();
						uni.showToast({
							title: `加载完成`,
							duration: 2000
						});
						//const alertData = res.data.QueryAlertListRsp
						if(alertData.length !== 0){
							this.isAlert = true
							this.mapUrl = this.getAlertMap(alertData[0])
							//this.getAlertMap(alertData[0])
							this.$refs.text.init(alertData[0])
							this.$refs.map.getPotentialPointData()
						}
					}
				})
			},
			async getAlertMap(alertData){
				let areas = []
				let areaLevels = []
				areaLevels.push(alertData.alertLevelFirstAdcode.split(',').filter(item=>{return item.length===9}))
				areaLevels.push(alertData.alertLevelSecondAdcode.split(',').filter(item=>{return item.length===9}))
				areaLevels.push(alertData.alertLevelThirdAdcode.split(',').filter(item=>{return item.length===9}))
				areaLevels.push(alertData.alertLevelFourthAdcode.split(',').filter(item=>{return item.length===9}))
				areaLevels.forEach((item,index)=>{
					areas = [...areas,...item.map(area=>{
						return {
							level:index+1,
							areaName:this.dataCodeTransform(area,'potentialPointBelongTowns')
						}
					})]
				})
				let mapForm = {
					alertName:alertData.alertName,
					name:alertData.alertName,
					imgTitle:alertData.alertMapTitle,
					effectiveStartTime:alertData.alertStartTime,
					effectiveEndTime:alertData.alertEndTime,
					alertAreaLevel:areas,
					mode:1
				}
				console.log('mapForm',mapForm)
				try{
					const res = await request({
						url:'alertManage/generateAlertAreaMap',
						method:'post',
						data:{
							AlertAreaMapReq:mapForm
						}
					})
					if(res.code===2000){
						return res.data.AlertAreaMapUrl
					}
				}catch(error){
					console.log(error)
				}
			},
			handleTabsClick(index){
				console.log(index.name)
				if(index.name==='图文模式'){
					this.textShow = true
				}else{
					this.textShow = false
				}
			}
		}
	}
</script>

<style>

</style>
