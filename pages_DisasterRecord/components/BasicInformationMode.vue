<template>
	<view style="padding: 20px 5px;margin-top:15px; background-color: white;">
		<view class="item-container">
			<!-- 发灾时间 -->
			<uni-row>
				<uni-col :span="7">
					<view style="display: flex;">
						<view class="Select-right">发灾时间</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
				</uni-col>
				<uni-col :span="16">
					<view class="Select-left">
						<picker class="time" mode="date" :value="date" :start="startDate" :end="endDate" @change="DateChange">
					            <view>{{ date }}</view>
						</picker>
					</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="item-container">
			<!-- 市县 -->
			<uni-row >
				<uni-col :span="7">
					<view style="display: flex;">
						<view class="Select-right">市县镇村</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
				</uni-col>
				<uni-col :span="16">
					<view class="select-input">
						<uni-data-picker
						:localdata="options"
						popup-title="请选择地区"
						@change="areaChange" 
						style="flex:6;background-color:  #F7F7F8;"
						>
						<!-- @nodeclick="onnodeclick" -->
						</uni-data-picker>
						
					</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="item-container">
			<!-- 发灾地点 -->
			<uni-row >
				<uni-col :span="7">
					<view style="display: flex;">
						<view class="Select-right">发灾地点</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
				</uni-col>
				<uni-col :span="16">
					<view class="select-input">
						<uni-easyinput
						placeholder="请输入地点" 
						@change="locationText"
						>
						</uni-easyinput>
						
					</view>
					
				</uni-col>
			</uni-row>
		</view>
		<view class="item-container">
			<!-- 关联隐患点 -->
			<uni-row >
				<uni-col :span="7">
					<view class="Select-right">关联隐患点</view>
				</uni-col>
				<uni-col :span="16">
					<view class="select-input">		
						<uni-data-picker 
						v-model="getPotentialIdForm.potentialPointId" 
						@change="potentionIdChange"
						:localdata="potentionIdData" >
						</uni-data-picker>
					</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="item-container">
			<!-- 灾害类型 -->
			<uni-row >
				<uni-col :span="7">
					<view style="display: flex;">
						<view class="Select-right">灾害类型</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
				</uni-col>
				<uni-col :span="6">
					<view class="button-input">
						<u-button  text="不稳定斜坡"  type="primary":plain=list[0].unselected style="border-color: #2E9BFF;" @click="Typechoice(0)" :class="[list[0].selected?'select':'unselect']" > </u-button>
					</view>
				</uni-col>
				<uni-col :span="5">
					<view class="button-input">
						<!-- <u-button type="primary" text="地面塌陷" plain="false"></u-button> -->
						<u-button  text="地面塌陷"  type="primary":plain=list[1].unselected style="border-color: #2E9BFF;" @click="Typechoice(1)" :class="[list[1].selected?'select':'unselect']" > </u-button>
					</view>
				</uni-col>
				<uni-col :span="5">
					<view class="button-input">
						<u-button  text="地面沉降"  type="primary":plain=list[2].unselected style="border-color: #2E9BFF;" @click="Typechoice(2)" :class="[list[2].selected?'select':'unselect']" > </u-button>
					</view>
				</uni-col>
			</uni-row>
			<uni-row >
				<uni-col :span="6">
					<text>   </text>
				</uni-col>
				<uni-col :span="3" :push="7">
					<view class="button-input">
						<u-button  text="滑坡"  type="primary":plain=list[3].unselected style="border-color: #2E9BFF;" @click="Typechoice(3)" :class="[list[3].selected?'select':'unselect']" > </u-button>
						<!-- <u-button  type="primary" text="滑坡" plain="false" ></u-button> -->
					</view>
				</uni-col>
				<uni-col :span="3":push="7">
					<view class="button-input">
						<u-button  text="崩塌"  type="primary":plain=list[4].unselected style="border-color: #2E9BFF;" @click="Typechoice(4)" :class="[list[4].selected?'select':'unselect']" > </u-button>
						<!-- <u-button  type="primary" text="崩塌" plain="false" ></u-button> -->
					</view>
				</uni-col>
				<uni-col :span="5":push="7">
					<view class="button-input">
						<u-button  text="泥石流"  type="primary":plain=list[5].unselected style="border-color: #2E9BFF;" @click="Typechoice(5)" :class="[list[5].selected?'select':'unselect']" > </u-button>
						<!-- <u-button type="primary" text="泥石流" plain="false"></u-button> -->
					</view>
				</uni-col>
				<uni-col :span="5":push="7">
					<view class="button-input">
						<u-button  text="地裂缝"  type="primary":plain=list[6].unselected style="border-color: #2E9BFF;" @click="Typechoice(6)" :class="[list[6].selected?'select':'unselect']" > </u-button>
						
					</view>
				</uni-col>
			</uni-row>
			</view>
			<view class="item-container">
			<!-- 经度 -->
			<uni-row>
				<uni-col :span="7">
					<view style="display: flex;">
						<view class="Select-right">经度</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
					<view style="display: flex;">
						<view class="Select-right">纬度</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
				</uni-col>
				<uni-col :span="5">
						<view style="padding-right: 5px;font-size: 10px;padding-bottom: 5px;">
							<uni-easyinput
							placeholder="请输入" 
							@change="longitudetext1">
							</uni-easyinput>
						</view>
						<view style="padding-right: 5px;">
							<uni-easyinput
							placeholder="请输入" 
							@change="latitudetext1">
							</uni-easyinput>
						</view>
				</uni-col>
				<uni-col :span="5">
						<view style="padding-right: 5px;padding-bottom: 5px;">
							<uni-easyinput
							placeholder="请输入" 
							@change="longitudetext2">
							</uni-easyinput>
						</view>
						<view style="padding-right: 5px;padding-bottom: 5px;">
							<uni-easyinput
							placeholder="请输入" 
							@change="latitudetext2">
							</uni-easyinput>
						</view>
				</uni-col>
				<uni-col :span="5">
						<view style="padding-right: 2px;">
							<uni-easyinput
							placeholder="请输入" 
							@change="longitudetext3">
							</uni-easyinput>
						</view>
						<view style="padding-right: 2px;">
							<uni-easyinput
							placeholder="请输入" 
							@change="latitudetext3">
							</uni-easyinput>
						</view>
				</uni-col>
				<uni-col :span="2">
					<view >
						<button @click="refreshMap(e)" style="width: 75%;height:50%">
							<text >更新地图</text>
						</button>
			
					</view>
				</uni-col>
				
			</uni-row>
			</view>
			<view class="item-container">
			<!-- 灾害规模 -->
			<uni-row >
				<uni-col :span="7">
					<view style="display: flex;">
						<view class="Select-right">灾害规模</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
				</uni-col>
				<uni-col :span="4">
					<view class="scale-input">
						<u-button  text="微型"  type="primary":plain=list1[0].unselected1 style="border-color: #2E9BFF;" @click="Scalechoice(0)" :class="[list1[0].selected1?'select':'unselect']" > </u-button>
					</view>
				</uni-col>
				<uni-col :span="4" >
					<view class="scale-input">
						<u-button  text="小型"  type="primary":plain=list1[1].unselected1 style="border-color: #2E9BFF;" @click="Scalechoice(1)" :class="[list1[1].selected1?'select':'unselect']" > </u-button>
						<!-- <u-button  type="primary" text="小型" plain="false" ></u-button> -->
					</view>
				</uni-col>
				<uni-col :span="4">
					<view class="scale-input">
						<u-button  text="中型"  type="primary":plain=list1[2].unselected1 style="border-color: #2E9BFF;" @click="Scalechoice(2)" :class="[list1[2].selected1?'select':'unselect']" > </u-button>
					</view>
				</uni-col>
			
				
			</uni-row>		
			<uni-row >
				<uni-col :span="7">
					<text>   </text>
				</uni-col>

				<uni-col :span="4" :push="9">
					<view class="scale-input">
						<u-button  text="大型"  type="primary":plain=list1[3].unselected1 style="border-color: #2E9BFF;" @click="Scalechoice(3)" :class="[list1[3].selected1?'select':'unselect']" > </u-button>
					</view>
				</uni-col>
				<uni-col :span="4" :push="9">
					<view class="scale-input">
						<u-button  text="巨型"  type="primary":plain=list1[4].unselected1 style="border-color: #2E9BFF;" @click="Scalechoice(4)" :class="[list1[4].selected1?'select':'unselect']" > </u-button>
					</view>
				</uni-col>
			</uni-row>
			</view>
			<view class="item-container">
			<!-- 引发因素 -->
			<uni-row >
				<uni-col :span="7">
					<view style="display: flex;">
						<view class="Select-right">引发因素</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
				</uni-col>
				<uni-col :span="16" >
					<view class="select-input">
						<uni-data-select
						v-model="getfactorData.factorData" 
						@change="factorPickerChange"
						:localdata="FactorsDisaster" 
						>
						</uni-data-select>
					</view>
				</uni-col>
			
			</uni-row>
			</view>
			<view class="item-container">
			<!-- 灾害等级 -->
			<uni-row >
				<uni-col :span="7">
					<view style="display: flex;">
						<view class="Select-right">灾害等级</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
				</uni-col>
				<uni-col :span="4" >
					<view class="level-input">
						<u-button  text="一级"  type="primary":plain=list3[0].unselected3 style="border-color: #2E9BFF;" @click="Levelchoice(0)" :class="[list3[0].selected3?'select':'unselect']" > </u-button>
						<!-- <u-button  type="primary" text="一级" plain="false" ></u-button> -->
					</view>
				</uni-col>
				<uni-col :span="4">
					<view class="level-input">
						<u-button  text="二级"  type="primary":plain=list3[1].unselected3 style="border-color: #2E9BFF;" @click="Levelchoice(1)" :class="[list3[1].selected3?'select':'unselect']" > </u-button>
					</view>
				</uni-col>
				<uni-col :span="4">
					<view class="level-input">
						<u-button  text="三级"  type="primary":plain=list3[2].unselected3 style="border-color: #2E9BFF;" @click="Levelchoice(2)" :class="[list3[2].selected3?'select':'unselect']" > </u-button>
					</view>
				</uni-col>
				<uni-col :span="4">
					<view class="level-input">
						<u-button  text="四级"  type="primary":plain=list3[3].unselected3 style="border-color: #2E9BFF;" @click="Levelchoice(3)" :class="[list3[3].selected3?'select':'unselect']" > </u-button>
					</view>
				</uni-col>
			</uni-row>
			</view>
			<view class="item-container">
			<!-- 填报人 -->
			<uni-row >
				<uni-col :span="7">
					<view style="display: flex;">
						<view class="Select-right">填报人</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
				</uni-col>
				<uni-col :span="16">
					<view class="select-input">
					<!-- 	<uni-easyinput
						placeholder="请输入填报人" 
						@change="NameText"
						> -->
						<!-- </uni-easyinput> -->
						<uni-data-select  v-model="telephoneNumber" :localdata="members" placeholder="请选择填报人" @change="NameText"/>
					</view>
				</uni-col>
			</uni-row>
			</view>
			<view class="item-container">
			<!-- 联系电话 -->
			<uni-row :rules="rules">
				<uni-col :span="7">
					<view style="display: flex;">
						<view class="Select-right">联系电话</view>
						<view style="color: red;font-size: 14px;margin-right: 2px;">*</view>
					</view>
				</uni-col>
				<uni-col :span="16">
					<view class="select-input"  name="phone" >
						<uni-easyinput
						placeholder="请输入联系号码" 
						v-model="fromdata.phone"
						@blur="phonerules"
						>
						<!-- @change="PhontText" -->
						</uni-easyinput>
					</view>
					
				</uni-col>
			</uni-row>
			</view>
		</view>
		
	</view>
		
	
</template>

<script>
	import {dataCodeAreaTransformMixins,dataCodeTransformMixins,getAreaOptionsMixins} from "@/utils/mixins.js"
	
	import {request,requestAuthority} from '@/utils/request.js'
	function getDate(type) {
	    const date = new Date();
	    let year = date.getFullYear();
	    let month = date.getMonth() + 1;
	    let day = date.getDate();
	    if (type === 'start') {
	        year = year - 10;
	    } else if (type === 'end') {
	        year = year + 10;
	    }
	    month = month > 9 ? month : '0' + month;
	    day = day > 9 ? day : '0' + day;
	    return `${year}-${month}-${day}`;
	}
	export default {
		mixins: [dataCodeAreaTransformMixins,dataCodeTransformMixins,getAreaOptionsMixins],
		props: {
			DisasterRecordForm: {}
		},
		data() {
			return {
				date: getDate({ format: true}),
				startDate: getDate('start'),
				endDate: getDate('end'),
				selectedId:-1,
				selectedId1:-1,
				selectedId3:-1,
				options:[],
				longitudeText1:0,
				longitudeText2:0,
				longitudeText3:0,
				latitudeText1:0,
				latitudeText2:0,
				latitudeText3:0,
				
				members:[],
				telephoneNumber:'',
				getfactorData:{factorData:''},
				list: [
					{selected: false,unselected:true,value:"007",title: '不稳定斜坡'},
				    {selected: false,unselected:true,value:"004",title: '地面塌陷'},
				    {selected: false,unselected:true,value:"006",title: '地面沉降'},
				    {selected: false,unselected:true,value:"002",title: '滑坡'},
				    {selected: false,unselected:true,value:"001",title: '崩塌'}, 
					{selected: false,unselected:true,value:"003",title: '泥石流'},
					{selected: false,unselected:true,value:"005",title: '地裂缝'}
				],
				list1: [
					{selected1: false,unselected1:true,value:"005",title: '微型' },
					{selected1: false,unselected1:true,value:"004",title: '小型' },
				    {selected1: false,unselected1:true,value:"003",title: '中型' },
					{selected1: false,unselected1:true,value:"002",title: '大型'},
					{selected1: false,unselected1:true,value:"001",title: '巨型'}
				],
				FactorsDisaster: [
					{value:'降雨',text:'降雨'},{value:'地震',text:'地震'},{value:'开挖坡脚',text:'开挖坡脚'},{value:'坡脚冲刷',text:'坡脚冲刷'},
					{value:'坡脚浸润',text:'坡脚浸润'},{value:'坡体切割',text:'坡体切割'},{value:'动水压力',text:'动水压力'},{value:'卸荷',text:'卸荷'},
					{value:'风化',text:'风化'},{value:'爆破振动',text:'爆破振动'},
					],
				list3: [
					{selected3: false,unselected3:true,value:"1",title: '一级'},
					{selected3: false,unselected3:true,value:"2",title: '二级'},
					{selected3: false,unselected3:true,value:"3",title: '三级' },
					{selected3: false,unselected3:true,value:"4",title: '四级'}
					],
				potentionIdData: [],
				getPotentialIdForm:{
					potentialPointId:'',
					potentialPointName:'',
					potentialPointType:'',
					potentialPointStatus:'',
					potentialPointBelongCity:'',
					potentialPointBelongCounty:'',
					potentialPointBelongTown:'',
					
				},		
				
			}
		},
		created() {
			this.options = this.getAreaOptions();
			this.getPotentialIdData();
			this.gerMembers();
		
			
		},
		methods: {
			submit(data){
				let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
				let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
				if(!phoneReg.test(this.fromdata.phone)|| !this.fromdata.phone){
					uni.showToast({
						title:"名字不能为空",
						icon:"none"
					})
				}else if(!phoneReg.test(this.fromdata.phone)|| !this.fromdata.phone){
					uni.showToast({
						title:"手机格式不正确",
						icon:"none"
					})
				}
			},
		
			//市县选择
			areaChange(e) {
				this.$emit("getCity",e.detail.value[2].value)
			},
			//发灾时间
			DateChange: function(e) {
			    this.date =e.detail.value
				this.$emit("getDate",e.detail.value)
			        },
			//时间映射
			timeTypeChange(Date){
				var timeTransform;
				timeTransform = Date.slice(0, 4)  + Date.slice(5, 7) + Date.slice(8, 10);
				return timeTransform;
			},
			//发灾地点获取
			locationText(e) {
				this.$emit("getLocal",e)				
			},
			//关联隐患点Id获取
			potentionIdChange(e){
				this.$emit("getPotentialId",e.detail.value[0].value)
				
			},
			//灾害类型获取
			Typechoice(index) {
				var value;
				value=this.list[index].value
				//当再次被选中时，取消当前选中项
			    if (this.list[index].selected == true) {
			        this.list[index].selected = false;
					this.list[index].unselected = true;
			        //取消选中时删除数组中的值
			        this.selectedId =-1;
			        }
			    else {
					if (this.selectedId===-1){
						this.list[index].selected=true;
						this.list[index].unselected=false;
						this.selectedId=index;
					}
					else{
			        this.list[this.selectedId].selected = false;
					this.list[this.selectedId].unselected = true;
					this.list[index].selected=true;
					this.list[index].unselected=false;
			        this.selectedId=index;
					value=this.list[index].value
					}
			    }
				this.$emit("getType",value)
			},
			//灾害规模获取
			Scalechoice(index) {
				var value;
				value=this.list1[index].value
				//当再次被选中时，取消当前选中项
			    if (this.list1[index].selected1 == true) {
			        this.list1[index].selected1 = false;
					this.list1[index].unselected1 = true;
			        //取消选中时删除数组中的值
			        this.selectedId1 =-1;
			        }
			    else {
					if (this.selectedId1===-1){
						this.list1[index].selected1=true;
						this.list1[index].unselected1=false;
						this.selectedId1=index;
					}
					else{
			        this.list1[this.selectedId1].selected1 = false;
					this.list1[this.selectedId1].unselected1 = true;
					this.list1[index].selected1=true;
					this.list1[index].unselected1=false;
			        this.selectedId1=index;
					value=this.list1[index].value
					}
			    }
				this.$emit("getScale",value)
			},
			//引发因素获取
			factorPickerChange(e) {
				this.$emit("getFactors",e)
			},
			// 灾害等级获取
			Levelchoice(index) {
				var value;
				value=this.list3[index].value
				//当再次被选中时，取消当前选中项
			    if (this.list3[index].selected3 == true) {
			        this.list3[index].selected3 = false;
					this.list3[index].unselected3= true;
			        //取消选中时删除数组中的值
			        this.selectedId3 =-1;
			        }
			    else {
					if (this.selectedId3===-1){
						this.list3[index].selected3=true;
						this.list3[index].unselected3=false;
						this.selectedId3=index;
					}
					else{
			        this.list3[this.selectedId3].selected3 = false;
					this.list3[this.selectedId3].unselected3 = true;
					this.list3[index].selected3=true;
					this.list3[index].unselected3=false;
			        this.selectedId3=index;
					value=this.list3[index].value
					}
			    }
				this.$emit("getLevel",value)
			},
			//经度获取
			longitudetext1(e) {
				this.longitudeText1=e
				this.$emit("longitude1",e)
			},
			longitudetext2(e) {
				this.longitudeText2=e
				this.$emit("longitude2",e)
			},
			longitudetext3(e) {
				this.longitudeText3=e
				this.$emit("longitude3",e)
			},
			//纬度获取
			latitudetext1(e) {
				this.latitudeText1=e
				this.$emit("latitude1",e)
			},
			latitudetext2(e) {
				this.latitudeText2=e
				this.$emit("latitude2",e)
			},
			latitudetext3(e) {
				this.latitudeText3=e
				this.$emit("latitude3",e)
			},
			//填报人获取
			NameText(e) {
				this.$emit("getName",e)				
			},
			phonerules(e){
				this.$emit("getPhone",e.detail.value)	//发送给父组件
				
			},
			//联系电话获取
			PhontText(e){
				this.$emit("getPhone",e)				
			},
		
			async refreshMap(e){
					const response = await uni.navigateTo({
						url:'/pages_DisasterRecord/map',
					})
					response[1].eventChannel.emit('openCheckDialog',{
						// 		//度分秒(DMS)换算成度(DDD)
						latitude: Number(this.latitudeText1)+Number(this.latitudeText2/60)+Number(this.latitudeText3/3600), //要去的纬度-地址
						longitude:Number(this.longitudeText1)+Number(this.longitudeText2/60)+Number(this.longitudeText3/3600), //要去的经度-地址
					})
					
			},
			//获取成员id
			gerMembers(){
				request({
					method:'GET',
					url:'member/getAllMembersIdAndName',
				})
				.then(res=>{
					if(res.code===2000){
						this.members = res.data.MembersIdAndNameRsp.map(item=>{
							return {
								value:item.memberId,
								text:item.memberName,
							}
						})
					
						console.log("members",this.members)
					}else{
						this.$message.error(res.message)
					}
					
				})
			},

			getPotentialIdData(){
				request({
					method:'POST',
					url:'potentialPointInfo/queryList ',
					data:{
						PotentialPointInfoQueryListReq  :this.getPotentialIdForm,
						QueryPagingParamsReq:{
							offset:0,
							queryCount:1000000,	
						}
					}
				})
				.then(res=>{
					if(res.code===2000){
						for(var i=0; i<res.data.PotentialPointInfoQueryListRsp.length;i++){
							this.potentionIdData.push({
								value:res.data.PotentialPointInfoQueryListRsp[i].potentialPointId,
								text:res.data.PotentialPointInfoQueryListRsp[i].potentialPointLocation+'  '+res.data.PotentialPointInfoQueryListRsp[i].potentialPointId,
							})
						}
						
					}else{
						this.$message.error(res.message)
					}
					console.log("@res@",res)
				})
				
			},
			
		},
	}
</script>

<style lang="scss">
	button {
		position:relative;
		display:block;
		margin-left:auto;
		margin-right:auto;
		margin-bottom:auto;
		padding-left:2px;
		padding-right:11px;
		padding-top: 7px;
		padding-bottom:7px;
		font-size:15px;
		text-align:center;
		text-decoration:none;
		line-height:1;
		border-radius:5px;
		-webkit-tap-highlight-color:transparent;
		overflow:hidden;
		color:white;
		background-color:#2E9BFF;
	}
	.item-container {
		// padding: 10px 5px;
		background-color: white;
		border-bottom: 1px solid black;
		.Select-right {
			margin-top: 5px;
			margin-bottom: 20px;
			margin-left: 5px;
			font-size: 14px;
		}
		.Select-left {
			background-color: #F7F7F8;
			margin-bottom: 12px;
			font-size: 14px;
			height: 30px;
			border-radius: 8px; /*圆角*/
			.time{
				padding-left:12px;
				padding-top:5px;
			}	
		}
		.select-input{
			// align-items: center
			margin-right: 5px;
			margin-bottom: 12px;
			background-color: #F7F7F8;
			border-radius: 8px; /*圆角*/
		}
		
		.button-input {
			margin-right: 5px;
			margin-bottom: 12px;
			border-radius: 125px;
			.select{
				font-size: 12px; 
				font-weight: 700;
				color: #000000;
				text-align: left;
				
				background-color: #CEE8FF;
			}
			.unselect{
				font-size: 12px;
				font-weight: 700;
				background-color: #F7F7F8;
				text-align: left;
				color: #000000;
			}
			.button {
				width: 200px;
				height: 50rpx;
				border-radius: 125px;
			}
			
		}
		.longitude-input {
			padding-right: 15px;
		}
		.level-input {
			margin-right: 2px;
			font-size: 14px;
			margin-bottom: 12px;
			border-radius: 15px; /*圆角*/
			
		}
		.scale-input {
			margin-right: 8px;
			font-size: 14px;
			margin-bottom: 12px;
			border-radius: 15px; /*圆角*/
		}
		
	}
</style>