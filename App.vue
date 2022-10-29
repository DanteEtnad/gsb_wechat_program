<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
<script>
	import {queryAll} from "./utils/global.js"
	export default {
		onLaunch: function() {
			// if(uni.getStorageSync('token')){
			// 	uni.redirectTo({
			// 		url:'/pages_index_normal/index_normal'
			// 	})
			// }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			globalParams:queryAll()
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
