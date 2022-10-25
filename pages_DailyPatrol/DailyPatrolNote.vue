<template>
	<view>
		<u-sticky bgColor="#fff">
			<u-tabs :list="list" :scrollable="false" @click="handleTabsClick"></u-tabs>
		</u-sticky>
		<NotePotentialMode v-show="!textShow" :currentPage="officePageInfo.currentPage"></NotePotentialMode>
		<NoteUserMode v-show="textShow" :currentPage="officePageInfo.currentPage"></NoteUserMode>
	</view>
</template>

<script>
	import {request} from '@/utils/request.js'
	
	import NotePotentialMode from '@/components/DailyPatrol/NotePotentialMode.vue'
	import NoteUserMode from '@/components/DailyPatrol/NoteUserMode.vue'
	export default {
		components:{
			NotePotentialMode,
			NoteUserMode
		},
		data() {
			return {
				officePageInfo:{
					dataAmount:0,
					offset:0,
					queryCount:4,
					currentPage:1,
				},
				textShow:true,
				list:[{name:'按用户查看',},{name:'按隐患点查看',}]
			}
		},
		onReachBottom() {
			this.officePageInfo.currentPage++
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
				if(index.name==='按用户查看'){
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
