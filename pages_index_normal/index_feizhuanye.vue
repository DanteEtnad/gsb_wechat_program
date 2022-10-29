<template>
	<view>
		<view>
			<uni-row>
				<uni-col>
					<view class="demo-layout bg-pure-write">
						<view style="display: flex;">
							<u--image class="logo" src="http://47.107.42.236:9000/index_normal/user.svg" width="17px" height="20px"></u--image>
							<text style="font-family: Microsoft YaHei;font-size: 14px;font-weight: 400;line-height: 20px;letter-spacing: 0px;text-align: left;">{{name}}</text>
						</view>
						<view>
							<text style="font-family: Microsoft YaHei;font-size: 14px;font-weight: 400;line-height: 20px;letter-spacing: 0px;text-align: left;">{{phonenum}}</text>
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
				name: "游客",
				phonenum:"非专业模式"
			}
		},
		methods:{
			toPages(pageName){
				console.log(pageName)
				uni.navigateTo({
          url:`/${pageName}`
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
