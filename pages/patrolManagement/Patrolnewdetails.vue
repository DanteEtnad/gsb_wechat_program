<template>
	
		
			<view class="u-demo-block__content">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				
				<view class="report-info-container">
					<view style="flex:12">
						<text>所属行政区<text style="color: red;">*</text></text>
					</view>
					<view style="flex:12">
						{{dataCodeAreaTransform(PatrolData.administrativeRegion,"potentialPointBelongTowns")}}
					</view>	
				</view>
				
				<view class="report-info-container">
				<!-- 巡查开始时间 -->
				
						<view style="flex:12">
							<view style="flex:16"><text>巡查开始时间<text style="color: red;">*</text></text></view>
						</view>
						<view  style="flex:12">
							{{PatrolData.patrolStartDate}}
						</view>
				</view>
				<view class="report-info-container">
				<!-- 巡查结束时间 -->
				
						<view style="flex:12">
							<view style="flex:16"><text>巡查结束时间<text style="color: red;">*</text></text></view>
						</view>
				
						<view style="flex:12">
							{{PatrolData.patrolEndDate}}
						</view>
				
				</view>
				
				
				<view class="report-info-container">
					<view style="flex:12">
						<text>出动巡排查<text style="color: red;">*</text></text>
					</view>
					<view style="flex:12">
						{{PatrolData.patrolNumber}}
					</view>	
				</view>
				
				<view class="report-info-container">
					<view style="flex:12">
						<text>巡排查隐患<text style="color: red;">*</text></text>
					</view>
					<view style="flex:12">
						{{PatrolData.patrolPotentialPointNumber}}
					</view>	
				</view>
				
				
				<view class="report-info-container">
					<view style="flex:12">
					<text>上报人<text style="color: red;">*</text></text>
					</view>
					<view style="flex:12">
					{{PatrolData.reportPersonName}}
					</view>
				</view>
				<view class="report-info-container">
					<view style="flex:12">
						<text>上报人手机号<text style="color: red;">*</text></text>
					</view>
					<view style="flex:12">
						{{PatrolData.reportPersonMobile}}
					</view>	
				</view>
				
				
				
				<view class="report-input-container">
					<view style="flex:8">
						<text>转移人数</text>
					</view>	
					<view style="flex:16">
						{{PatrolData.numberOfPeopleTransferred}}
					</view>	
				</view>
				
				<view class="report-input-container">
					<view style="flex:8">
						<text>转移位置</text>
					</view>	
					<view style="flex:16">
						{{PatrolData.transferPosition}}
					</view>	
				</view>
				<view class="report-input-container">
					<view style="flex:8">
						<text>转移原因</text>
					</view>	
					<view style="flex:16">
						{{PatrolData.reasonForTransfer}}
					</view>	
				</view>
				
				
				
				<u-code
					ref="uCode"
					@change="codeChange"
					seconds="20"
					@start="disabled1 = true"
					@end="disabled1 = false"
				></u-code>
				<u-datetime-picker
					:show="showBirthday"
					:value="birthday"
					mode="date"
					closeOnClickOverlay
					@confirm="birthdayConfirm"
					@cancel="birthdayClose"
					@close="birthdayClose"
				></u-datetime-picker>
			</view>
			
		
</template>

<script>
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins} from "@/utils/mixins.js"
	export default {
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,timeTransformMixins],
		data() {
			return {
				fileList1: [],
				disabled1: false,
				tips: '',
				value: '',
				showCalendar: false,
				showBirthday: false,
				model1: {
					userInfo: {
						name: '广东省汕头市',
						number1:'0次',
						number2:'0次',
						birthday1: '2022年6月06日',
						birthday2: '2022年6月10日',
						people: 'test',
						phone:'13512345678',
						peoplenumber:'test',
						where:'test',
						reason:'test'
						
						
					},
					radiovalue1: '苹果',
					checkboxValue1: [],
					intro: '',
					code: ''
				},
				showSex: false,
				birthday: Number(new Date()),
				rules: {
					'userInfo.name': [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.chinese(value);
						},
						message: "姓名必须为中文",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
					'userInfo.birthday1': {
						type: 'string',
						required: true,
						message: '请选择时间',
						trigger: ['change']
					},
					'userInfo.birthday2': {
						type: 'string',
						required: true,
						message: '请选择时间',
						trigger: ['change']
					},
				},
				city:[
					{value:'1',text:'汕头市'},
					{value:'2',text:'长沙市'},
				],
				district:[
					{value:'1',text:'金平区'},
					{value:'2',text:'龙湖区'},
					{value:'3',text:'澄海区'},
					{value:'4',text:'濠江区'},
					{value:'5',text:'潮阳区'},
					{value:'6',text:'潮南区'},
					{value:'7	',text:'南澳县'},
				],
				
				PatrolData:{},
				
				memberData:[],
				
				potentialData:[
					{
						potential:'',
						type:'',
						number:0,
				
					},
					{
						type:'',
						potential:'',
						number:1,
					}
				],
				
			}
		},
		
		onLoad: function(option) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('openCheckDialog',data=>{
				this.PatrolData= data.item
				console.log("this.PatrolData",this.PatrolData)
			})
		},
		
		created(){
			this.getInfo();
		},
		mounted() {
				this.getInfo();
				
		
		},	
		
		
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			afterRead(event) {
				this.fileList1.push({
					url: event.file,
					status: 'uploading',
					message: '上传中'
				})
			},
			groupChange(n) {
				// console.log('groupChange', n);
			},
			radioChange(n) {
				// console.log('radioChange', n);
			},
			navigateBack() {
				uni.navigateBack()
			},
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
			},
			change(e) {
				// console.log(e);
			},
			formatter(day) {
				const d = new Date()
				let month = d.getMonth() + 1
				const date = d.getDate()
				if (day.month == month && day.day == date + 3) {
					day.bottomInfo = '有优惠'
					day.dot = true
				}
				return day
			},
			calendarConfirm(e) {
				this.showCalendar = false
				this.model1.hotel = `${e[0]} / ${e[e.length - 1]}`
				this.$refs.form1.validateField('hotel')
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			calendarClose() {
				this.showCalendar = false
				this.$refs.form1.validateField('hotel')
			},
			birthdayClose() {
				this.showBirthday = false
				this.$refs.form1.validateField('userInfo.birthday')
			},
			birthdayConfirm(e) {
				this.showBirthday = false
				this.model1.userInfo.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.$refs.form1.validateField('userInfo.birthday')
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				const validateList = ['userInfo.name', 'userInfo.sex', 'radiovalue1', 'checkboxValue1', 'intro',
				'hotel', 'code', 'userInfo.birthday']
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
				setTimeout(()=>{
					this.$refs.form1.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
				},10)
			},
			add(){
				this.potentialData.push({
						type:'',
						potential:'',
						number:this.potentialData.length,
					})
					console.log(this.potentialData);
			},
			minus(item){
				for(var i=item.number+1; i<this.potentialData.length; i++){
					this.potentialData[i].number-=1;
				}
				console.log(item.number);
				console.log(this.potentialData);
				this.potentialData.splice(item.number,1);
			},
			getMemberData(){
				request({
					method:'GET',
					url:'member/getAllMembersIdAndName',
				})
				.then(res=>{
					if(res.code===2000){
						this.memberData=res.data.MembersIdAndNameRsp
					}else{
						this.$message.error(res.message)
					}
					console.log("成员",this.memberData)
					for(var j=0; j<this.officeData.length; j++){
						for(var i=0; i<this.memberData.length; i++){
							if(this.officeData[j].reportPerson==this.memberData[i].memberId){
								this.officeData[j].reportPersonName=this.memberData[i].memberName
							}
			
						}
					}
					console.log("成员",this.officeData)
				})
			},
			getInfo(){
				request({
					method:'POST',
					url:'patrolManage/patrolResultQuery',
					data:{
						PatrolResultQueryReq:{
							patrolResultId:'',
							administrativeRegion:'',
							potentialType:'',
							reportPerson:'',
							reportPersonMobile:'',
							patrolStartDate:'',
							patrolEndDate:'',
							approvalRemarks:'',
							approvalResults:'',
						},
						QueryPagingParamsReq:{
							offset:this.officePageInfo.offset,
							queryCount:this.officePageInfo.queryCount
								
							
							
						}
						
					}
				})
				.then(res=>{
					this.officeData=res.data.PatrolResultQueryRsp
					this.officePageInfo.dataAmount=res.data.QuerySummaryRsp.dataAmount
					console.log("总数",this.officePageInfo.dataAmount)
					this.totalpage=Math.floor(parseInt(this.officePageInfo.dataAmount)/parseInt(this.officePageInfo.queryCount));
					if(this.totalpage==0){
						this.bdown=true
						console.log("总页数",this.totalpage)
					}
					console.log("@res@",res)
					this.getMemberData()
				})
				.catch(error=>{
					console.log(error)
				})
				console.log(this.officeData)
			
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		},
	}
</script>

<style lang="scss">

	text{
		font-size: 13px;
	}
	.button-base{
		background: #2E9BFF;
		border-radius: 6px;
		font-size: 16px;
		color: #fff;
		padding: 0;
		margin: 0;
	}
	button{
		display: flex;
		justify-content: space-around;
		padding: 0 10px;
		width: 70rpx;
		height: 36px;
		line-height: 36px;
		background-color: #2E9BFF;
		color: white;
	}
	textarea{
		margin-top: 5px;
		font-size: 13px;
		background-color: rgb(247,247,248);
		border-radius: 8px;
		padding: 10px;
		height: 200px;
	}
	.submit-container{
		padding: 15px;
		.submit-content{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
			.submit-input{
				margin: 10px 0;
			}
			.form-button{
				@extend .button-base;
				width: 80px;
				height: 36px;
				line-height: 36px;
			}
			.submit-button{
				@extend .button-base;
				width: 343px;
				height: 40px;
				line-height: 40px;
				position: absolute;
				bottom: 20px;
			}
		}
		
	}
</style>
