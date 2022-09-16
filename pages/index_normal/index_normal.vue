<template>
	<view>
		<view>
			<uni-row>
				<uni-col>
					<view class="demo-layout bg-pure-write">
						<view style="display: flex;">
							<u--image class="logo" src="/static/user.svg" width="17px" height="20px"></u--image>
							<text style="font-size: 16px;margin-left: 5px;">{{name}}</text>
						</view>
						<view>
							<text style="font-size: 16px;margin-left: 5px;color:gray;">13500000000</text>
						</view>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="padding: 0 10px;font-size: 14px;margin: 10px 0 5px;">
						<text>预警预报</text>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="background-color: white;margin: 0 10px;border-radius: 8px;">
						<uni-row>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('alertManagement/DaliyAlert')">
									<view class="index-icon">
										<u--image class="logo" src="/static/Component 1.svg" width="35px" height="35px" mode="aspectFit"></u--image>
									</view>
									<text>今日预警</text>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('alertManagement/SubmitDisaster')">
									<view class="index-icon">
										<u--image src="/static/Component 1.svg" width="35px" height="35px" mode="aspectFit"></u--image>
									</view>
									<text>险情上报</text>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('alertManagement/ProfessionDetect')">
									<view class="index-icon">
										<u--image class="logo" src="/static/Component 1.svg" width="35px" height="35px" mode="aspectFit"></u--image>
									</view>
									<text>专业检测</text>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('alertManagement/AroundPotential')">
									<view class="index-icon">
										<u--image class="logo" src="/static/Component 1.svg" width="35px" height="35px" mode="aspectFit"></u--image>
									</view>
									<text>周边隐患</text>
								</view>
							</uni-col>
						</uni-row>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="padding: 0 10px;font-size: 14px;margin: 10px 0 5px;">
						<text>预警单管理</text>
					</view>
				</uni-col>
			</uni-row>
			<uni-row>
				<uni-col>
					<view style="background-color: white;margin: 0 10px;border-radius: 8px;">
						<uni-row>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('alertManagement/AlertCreate')">
									<view class="index-icon">
										<u--image class="logo" src="/static/Component 1.svg" width="35px" height="35px" mode="aspectFit"></u--image>
									</view>
									<text>预警单创建</text>
								</view>
							</uni-col>
							<uni-col :span="6">
								<view class="index-icon-font" @click="toPages('alertManagement/AlertCheck')">
									<view class="index-icon">
										<u--image class="logo" src="/static/Component 1.svg" width="35px" height="35px" mode="aspectFit"></u--image>
									</view>
									<text>预警单审批</text>
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
	export default {
		data() {
			return {
				user_id: "adfa1",
				name: "123"
			}
		},
		methods:{
			toPages(pageName){
				console.log(pageName)
				uni.navigateTo({
          url:`/pages/${pageName}`
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
