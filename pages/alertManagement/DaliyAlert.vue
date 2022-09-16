<template>
	<view>
		<u-sticky bgColor="#fff">
			<u-tabs :list="list" :scrollable="false" @click="handleTabsClick"></u-tabs>
		</u-sticky>
		<alertTextMode v-show="textShow"></alertTextMode>
		<alertMapMode v-show="!textShow"></alertMapMode>
	</view>
</template>

<script>
	import {request} from '@/utils/request.js'
	import alertTextMode from '@/components/alertManagement/AlertTextMode.vue'
	import alertMapMode from '@/components/alertManagement/AlertMapMode.vue'
	export default {
		components:{
			alertTextMode,
			alertMapMode
		},
		data() {
			return {
				textShow:true,
				list:[{name:'图文模式',},{name:'地图模式',}]
			}
		},
		methods: {
			getInfo(){
				request({
					method:'POST',
					url:'potentialPointSurvey/query',
					data:{
						"PotentialPointSurveyQueryReq":{
							"approvalStatus":"",
							"potentialPointBelongTown":"",
							"potentialPointId":"",
							"potentialPointName":"",
							"potentialPointSurveyId":"",
							"potentialPointType":"",
							"submitStatus":""
						},
						"QueryPagingParamsReq":{
							"offset":0,
							"queryCount":10
						}
					}
				})
				.then(res=>{
					console.log("@res@",res)
				})
				.catch(error=>{
					console.log(error)
				})
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
