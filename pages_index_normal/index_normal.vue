<template>
	<view>
		<view>
			<uni-row>
				<uni-col>
					<view class="demo-layout bg-pure-write">
						<view style="display: flex;">
							<u--image class="logo" src="http://47.107.42.236:9000/index_normal/user.svg" width="17px" height="20px"></u--image>
							<text style="font-family: Microsoft YaHei;font-size: 14px;font-weight: 400;line-height: 20px;letter-spacing: 0px;text-align: left;">{{memberName}}</text>
						</view>
						<view>
							<text style="font-family: Microsoft YaHei;font-size: 14px;font-weight: 400;line-height: 20px;letter-spacing: 0px;text-align: left;">{{memberPhone}}</text>
						</view>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="padding: 0 10px;margin: 10px 0 5px;">
						<text style="font-size: 16px;font: Microsoft YaHei;font-weight: 400">预警预报</text>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="padding: 0 10px;font-size: 14px;margin: 10px 0 5px;">
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="background-color: white;margin: 0 10px;border-radius: 8px;">
						<uni-row>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_alertManagement/DaliyAlert')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/jinriyujing.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_alertManagement/SubmitDisaster')">
									<view class="index-icon">
										<u--image src="http://47.107.42.236:9000/index_normal/xianqingshangbao.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_alertManagement/ProfessionDetect')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/zhuanyejiance.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_alertManagement/AroundPotential')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/zhoubianyinhuan.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="background-color: white;margin: 0 10px;border-radius: 8px;">
						<uni-row>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_alertManagement/AlertCreate')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/yujingdanchuangjian.svg" width="60px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_alertManagement/AlertCheck')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/yujingdanshenpi.svg" width="60px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="padding: 0 10px;font-size: 14px;margin: 10px 0 5px;">
						<text style="font-size: 16px;margin-left: 5px;">灾情查询</text>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="background-color: white;margin: 0 10px;border-radius: 8px;">
						<uni-row>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_DisasterRecord/DisasterDetails')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/zaiqingxiangqing.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_DisasterRecord/DisasterCount')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/zaiqingtongji.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_DisasterRecord/DisasterFillHistory')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/zaiqingtianbao.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_DisasterRecord/DisasterCheck')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/zaiqingshenhe.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</uni-col> 	
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="padding: 0 10px;font-size: 14px;margin: 10px 0 5px;">
						<text style="font-size: 16px;margin-left: 5px;">巡排查汇总</text>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="background-color: white;margin: 0 10px;border-radius: 8px;">
						<uni-row>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_patrolManagement/Patrolquery')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/shujvchaxun.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_patrolManagement/PatrolStatics')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/xunchatongji.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_patrolManagement/Patrolfill')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/shujvtianbao.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_patrolManagement/PatrolResultApproval')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/shujvshenpi.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="padding: 0 10px;font-size: 14px;margin: 10px 0 5px;">
						<text style="font-size: 16px;margin-left: 5px;">日常巡查</text>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="background-color: white;margin: 0 10px;border-radius: 8px;">
						<uni-row>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_DailyPatrol/DailyPatrol')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/kaizhanxuncha.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_DailyPatrol/DailyPatrolCount')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/xunchatongji1.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('pages_DailyPatrol/DailyPatrolNote')">
									<view class="index-icon">
										<u--image class="logo" src="http://47.107.42.236:9000/index_normal/xunchajilu.svg" width="48px" height="68px" mode="aspectFit"></u--image>
									</view>
								</view>
							</uni-col>	
						</uni-row>
						</view>
				</uni-col>
			</uni-row>
		</view>
	</view>
</template>

<script>
	import {requestAuthority,request,requestAuthority1} from '@/utils/request.js'
	export default {
		data() {
			return {
				code:'',
				user_id: "adfa1",
				memberData:[],
				memberList:{},
				memberName: "",
				memberPhone:"",
				MemberQuery:{
					memberId:"",
					unitId:"",
					memberName:"",
					memberStatus:"",
					memberGender:"",
					memberIdentityCard:"",
				},
				QueryPagingParams:{
					queryCount:9999,
					offset:0,
				},
				
			}
		},
		onLoad(options){
			this.code=options.phone
			this.getUserInfo()
			console.log("this.MemberQuery.memberId",this.MemberQuery.memberId)
		},
		mounted() {
			this.getUserInfo()
		},
		methods:{
			toPages(pageName){
				console.log(pageName)
				uni.navigateTo({
	      url:`/${pageName}`
	    })
			},
			getname(){
				
			},
			getUserInfo(){
				requestAuthority({
						method:'post',
						url:'member/query',
						data:{
							MemberQueryReq:this.MemberQuery,
							QueryPagingParamsReq:this.QueryPagingParams
						}
					})
					.then(res=>{
						this.memberData=res.data.MemberQueryRsp
						let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
						if(phoneReg.test(this.code)){
							console.log("是电话")
							console.log("Data",this.memberData)
							for(var i=0;i<this.memberData.length;i++){
								
								if(this.memberData[i].memberMobile==this.code){
									console.log("找到了",i)
									this.memberName=this.memberData[i].memberName
									this.memberPhone=this.memberData[i].memberMobile
								}
							}
							
						}else{
							console.log("是编号")
							for(var i=0;i<this.memberData.length;i++){
								if(this.memberData[i].memberId==this.code){
									console.log("找到了",i)
									this.memberName=this.memberData[i].memberName
									this.memberPhone=this.memberData[i].memberMobile
								}
							}
						
						}
							console.log("@res@",res)
							console.log("this.memberData",this.memberData)
						})
			}
		}
	}
</script>

<style lang="scss">
	body{
		background-color: rgb(247,247,248);
	}
	
	.wrap {
		padding: 12px;
	}

	.demo-layout {
		height: 35px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
	}

	.bg-pure-write {
		background: #ffffff;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.index-icon-font {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 10px;
		margin: 5px;
		.index-icon{
			margin: 5px 0;
		}
	}
	
</style>
