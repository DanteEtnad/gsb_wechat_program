<template>
	<view >
		<view>
			<u-row gutter="10">
			    <u-col span=8>
			        <view class="demo-layout bg-pure-write">
						<u--image class="logo" src="/static/user.svg" width="20px" height="12px"></u--image>
					</view>
			    </u-col>
				<u-col span=4>
				    <view class="demo-layout bg-pure-write">
						<text style="font-size: 14px;">{{name}}</text>
					</view>
				</u-col>
			</u-row>
		</view>
		<view  class="alert bg-purple-light">
		<u--text margin=20px text="预警预报" size=16px></u--text>
		</view>
	</view>
</template>

<style lang="scss">
    .wrap {
        padding: 12px;
    }

    .demo-layout {
        height: 25px;
        border-radius: 4px;
    }

    .bg-pure-write {
        background: #ffffff;
    }

	.bg-purple-light {
        background: #e5e9f2;
    }
	

</style>

<script>
	
	export default {		
	  onLoad:function(options){

		this.name = options.name;
	  },
	  data() {
				return {  
	  		            user_id: "adfa1", 
						 name: "123"
	  		            }
	  			}
	}
</script>

<style>

</style>
