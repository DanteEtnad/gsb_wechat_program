<template>
	<view class="picture-container">
		
	</view>
</template>

<script>
	import {request} from "@/utils/request.js"
	export default{
		props:['selectedPotentialPoint'],
		name:'DetectPicture',
		data(){
			return{
				pictureData:""
			}
		},
		watch:{
			selectedPotentialPoint:{
				deep:true,
				handler(newValue,oldValue){
					const id = newValue.potentialPointId
					this.getPictureData(id)
				}
			}
		},
		mounted() {
			const id = this.selectedPotentialPoint.potentialPointId
			this.getPictureData(id)
		},
		method:{
			getPictureData(id){
				request({
					url:'potentialPointInfo/queryList',
					method:'post',
					data:{
						PotentialPointInfoQueryListReq:{
							potentialPointId:id
						},
						QueryPagingParamsReq: {
							offset: 0,
							queryCount: 9999
						}
					}
				})
				.then(res=>{
					this.pictureUrl = res.data.PotentialPointInfoQueryListRsp[0].potentialPointAccessoryUrl
				})
			}
		}
	}
</script>

<style lang="scss">
	.picture-container{
		padding: 10px;
		border-top: 1px solid #E8E8E8;
	}
</style>