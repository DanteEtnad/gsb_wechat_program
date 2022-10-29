import { request } from "@/utils/request.js";
import { requestAuthority } from "@/utils/request.js";
// 抽成共用方法

// 分页相关
export const paginationMixins = {
  data() {
    return {
      pageInfo: {
        pageSize: 10,
        currentPage: 1,
        dataAmount: 0
      }
    };
  },
  methods: {
    handleSearchType(ifCondition) {
      // 条件查询
      if (ifCondition) {
        this.pageInfo.offset = 0;
        this.pageInfo.currentPage = 1;
      }
      // 普通查找数据
      else {
        this.pageInfo.offset = (this.pageInfo.currentPage - 1) * this.pageInfo.pageSize;
      }
    }
  }
};
// 参数映射
export const dataCodeTransformMixins = {
  methods: {
    dataCodeTransform(code, type) {
			const globalParams = getApp().globalData.globalParams
      var result = "";
      if (globalParams[type]) {
        result = globalParams[type].find(item => item.paramSubCode === code);
      }
      return (result && result.paramSubDescription) || code;
    }
  }
};
// 时间格式转换
export const timeTransformMixins = {
  methods: {
    timeTransform(time) {
      try {
        const length = time.length;
        var timeTransform;
        if (length === 8) {
          timeTransform = time.slice(0, 4) + "-" + time.slice(4, 6) + "-" + time.slice(6, 8);
        }
        if (length === 12){
          time =
            time.slice(0, 4) +
            "-" +
            time.slice(4, 6) +
            "-" +
            time.slice(6, 8) +
            " " +
            time.slice(8, 10) +
            ":" +
            time.slice(10, 12);
        }
        if (length === 14) {
          timeTransform =
            time.slice(0, 4) +
            "-" +
            time.slice(4, 6) +
            "-" +
            time.slice(6, 8) +
            " " +
            time.slice(8, 10) +
            ":" +
            time.slice(10, 12) +
            ":" +
            time.slice(12, 14);
        }
        return (timeTransform && timeTransform) || time;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
// 供隐患点扩展信息表单内部使用
export const potentialPointExpandMixins = {
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    potentialPointExpandData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      expandData: this.potentialPointExpandData,
      formName: "detailForm",
      // 一般输入框的最大输入长度
      maxlength: 100,
      // date-picker选择日期后显示出来的格式
      dateFormat: "yyyy-MM-dd"
    };
  },
  methods: {
    // 进行表单验证
    // 在验证通过时，将数据传送到父组件，在父组件进行数据操作
    validateForm() {
      var flag = null;
      this.$refs[this.formName].validate(valid => {
        if (valid) {
          this.$emit("handleExpandData", this.expandData);
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    }
  },
  watch: {
    potentialPointExpandData() {
      if (this.potentialPointExpandData) {
        this.expandData = this.potentialPointExpandData;
      }
    }
  }
};
// 供隐患点扩展信息表单的弹窗使用
export const potentialPointExpandSelectedMixins = {
  data() {
    return {
      members:{},
      potentialPointExpandData: null,
      potentialPointExpandDataType: "001",
      // 隐患点扩展信息表单中的【基本信息】
      baseInfoForm: [
        {
          value: "Point",
          label: "点"
        },
        {
          value: "BaseInfo",
          label: "基本信息"
        },
        {
          value: "Disaster",
          label: "灾害"
        },
        {
          value: "Potential",
          label: "隐患"
        }
      ],
      // 隐患点扩展信息表单中的【地质数据】
      geologyForm: {
        slope: {
          label: "不稳定斜坡",
          value: "Slope"
        },
        sliding: {
          label: "滑坡",
          value: "Sliding"
        },
        collapse: {
          label: "崩塌",
          value: "Collapse"
        },
        debris: {
          label: "泥石流",
          value: "Debris"
        },
        fissure: {
          label: "地面沉降与地裂缝",
          value: "Fissure"
        },
        hillside: {
          label: "边坡数据",
          value: "Hillside"
        },
        geology: {
          label: "地质",
          value: "Geology"
        },
        rock: {
          label: "岩层",
          value: "Rock"
        },
        undergroundWater: {
          label: "地下水",
          value: "UndergroundWater"
        },
        relativeRiverPosition: {
          label: "地灾点与河流位置",
          value: "RelativeRiverPosition"
        },
        soil: {
          label: "土体",
          value: "Soil"
        },
        weatherZone: {
          label: "全风化带深度",
          value: "WeatherZone"
        },
        underlying: {
          label: "下伏基岩",
          value: "Underlying"
        },
        transformationSign: {
          label: "变形迹象",
          value: "TransformationSign"
        }
      },
      // 隐患点扩展信息表单中的【其他人员和资料】
      personForm: [
        {
          value: "Person",
          label: "其他人员和资料"
        }
      ],
      // selectedForm: 根据对应的隐患点类型，去渲染不同的【地质数据】表单
      selectedForm: null

    };
  },
  created() {
    // 001不稳定斜坡，002滑坡，003崩塌，004泥石流，005地面塌陷与地裂缝
    this.selectedForm = {
      "001": [
        this.geologyForm.slope,
        this.geologyForm.hillside,
        this.geologyForm.geology,
        this.geologyForm.rock,
        this.geologyForm.undergroundWater,
        this.geologyForm.relativeRiverPosition,
        this.geologyForm.soil,
        this.geologyForm.weatherZone,
        this.geologyForm.underlying,
        this.geologyForm.transformationSign
      ],
      "002": [
        this.geologyForm.sliding,
        this.geologyForm.hillside,
        this.geologyForm.geology,
        this.geologyForm.rock,
        this.geologyForm.undergroundWater,
        this.geologyForm.relativeRiverPosition,
        this.geologyForm.soil,
        this.geologyForm.weatherZone,
        this.geologyForm.underlying,
        this.geologyForm.transformationSign
      ],
      "003": [
        this.geologyForm.collapse,
        this.geologyForm.hillside,
        this.geologyForm.geology,
        this.geologyForm.rock,
        this.geologyForm.undergroundWater,
        this.geologyForm.relativeRiverPosition,
        this.geologyForm.soil,
        this.geologyForm.weatherZone,
        this.geologyForm.underlying,
        this.geologyForm.transformationSign
      ],
      "004": [
        this.geologyForm.debris,
        this.geologyForm.hillside,
        this.geologyForm.geology,
        this.geologyForm.undergroundWater,
        this.geologyForm.relativeRiverPosition,
        this.geologyForm.transformationSign
      ],
      "005": [
        this.geologyForm.fissure,
        this.geologyForm.hillside,
        this.geologyForm.geology,
        this.geologyForm.undergroundWater,
        this.geologyForm.relativeRiverPosition,
        this.geologyForm.underlying,
        this.geologyForm.transformationSign
      ]
    };
  },
  methods: {
    openPotentialPointExpandDialog(potentialPointId) {
      this.getPotentialPointExpandData(potentialPointId);
    },
    closePotentialPointExpandDialog() {
      this.potentialPointExpandData = null;
    },
    handleExpandData(data) {
      this.potentialPointExpandData = {
        ...this.potentialPointExpandData,
        data
      };
    },
    // 通过不同的组件名称，去渲染不同的组件
    handleExpandComponent(form) {
      return "hideDangerExpand" + form.value + "Form";
    },
    async getPotentialPointExpandData(potentialPointId) {
      const MemberQueryReq = {
        memberId:'',
        unitId:'',
        memberName:'',
        memberMobile:'',
        isLeader:'',
        memberPosition:'',
        memberStatus:'',
        memberGender:'',
        memberIdentityCard:''
      }
      const AlertResponsibilitySystemQueryReq = {
        potentialPointBelongCounty:'',
        potentialPointBelongTown:'',
        potentialPointId:potentialPointId,
        potentialPointType:'',
        hangingPointLead:'',
        responsible:'',
        administrator:'',
        manager:'',
      }
      const QueryPagingParamsReq = {
        queryCount: 10000000,
        offset: 0
      }
      try {
        const res = await request({
          method: "post",
          url: "potentialPointInfo/expandQuery",
          data: {
            PpExpandQueryReq: {
              potentialPointId: potentialPointId
            }
          }
        });
        const resMember = await requestAuthority({
          method:'post',
          url:'member/query',
          data:{
            MemberQueryReq:MemberQueryReq,
            QueryPagingParamsReq:QueryPagingParamsReq
          }
        })
        const resAlert = await request({
          url: "alertResponsibilitySystem/query",
          method: "post",
          data: {
            AlertResponsibilitySystemQueryReq,
            QueryPagingParamsReq
          }
        })
        if (res && res.code === 2000) {
          if (!res.data.PpExpandQueryRsp) {
            throw new Error("无隐患点扩展信息！");
          }
          console.log("@resMember@",resMember)
          console.log("@resAlert@",resAlert)
          if(resMember && resMember.code === 2000){
            console.log("@memberLists@",resMember.data.MemberQueryRsp)
            const memberLists = resMember.data.MemberQueryRsp
            memberLists.map(member=>{
              this.members[member.memberId] = {
                memberName:member.memberName,
                memberMobile:member.memberMobile,
                memberPhone:member.memberPhone
              }
            })
          }
          this.potentialPointExpandData = res.data.PpExpandQueryRsp;
          this.potentialPointExpandDataType = this.potentialPointExpandData.potentialPointType;
          if(resAlert && resAlert.code === 2000){
            const alertResponsibilityData = resAlert.data.AlertResponsibilitySystemQueryRsp[0];
            console.log('@alertResponsibilityData@',alertResponsibilityData)
            this.potentialPointExpandData.hangingPointLead=this.isHasId(alertResponsibilityData.hangingPointLead)?this.members[alertResponsibilityData.hangingPointLead].memberName:''
            this.potentialPointExpandData.hangingPointLeadPhone=this.isHasId(alertResponsibilityData.hangingPointLead)?this.members[alertResponsibilityData.hangingPointLead].memberPhone:''
            this.potentialPointExpandData.hangingPointLeadTelephone=this.isHasId(alertResponsibilityData.hangingPointLead)?this.members[alertResponsibilityData.hangingPointLead].memberMobile:''
            this.potentialPointExpandData.responsible=this.isHasId(alertResponsibilityData.responsible)?this.members[alertResponsibilityData.responsible].memberName:''
            this.potentialPointExpandData.responsiblePhone=this.isHasId(alertResponsibilityData.responsible)?this.members[alertResponsibilityData.responsible].memberPhone:''
            this.potentialPointExpandData.responsibleTelephone=this.isHasId(alertResponsibilityData.responsible)?this.members[alertResponsibilityData.responsible].memberMobile:''
            this.potentialPointExpandData.administrator=this.isHasId(alertResponsibilityData.administrator)?this.members[alertResponsibilityData.administrator].memberName:''
            this.potentialPointExpandData.administratorPhone=this.isHasId(alertResponsibilityData.administrator)?this.members[alertResponsibilityData.administrator].memberPhone:''
            this.potentialPointExpandData.administratorTelephone=this.isHasId(alertResponsibilityData.administrator)?this.members[alertResponsibilityData.administrator].memberMobile:''
            this.potentialPointExpandData.manager=this.isHasId(alertResponsibilityData.manager)?this.members[alertResponsibilityData.manager].memberName:''
            this.potentialPointExpandData.managerPhone=this.isHasId(alertResponsibilityData.manager)?this.members[alertResponsibilityData.manager].memberPhone:''
            this.potentialPointExpandData.managerTelephone=this.isHasId(alertResponsibilityData.manager)?this.members[alertResponsibilityData.manager].memberMobile:''
            console.log('@potentialPointExpandData@',this.potentialPointExpandData)
          }
        }
      } catch (error) {
        this.$message(error.message);
      }
    },
    isHasId(id){
      return id!==null&&id!==''&&id!==undefined
    }
  }
};

// 获取三级地区的options
export const getAreaOptionsMixins = {
  methods: {
    getAreaOptions() {
		const globalParams = getApp().globalData.globalParams
      var city = [];
      var area = [];
      var town = [];
      globalParams["potentialPointBelongCitys"].forEach(item => {
        city = [
          ...city,
          {
            text: item.paramSubDescription,
            value: item.paramSubCode,
            children: []
          }
        ];
      });
		globalParams["potentialPointBelongCountys"].forEach(item => {
        area = [
          ...area,
          {
            text: item.paramSubDescription,
            value: item.paramSubCode,
            children: []
          }
        ];
      });
	globalParams["potentialPointBelongTowns"].forEach(item => {
        town = [
          ...town,
          {
            text: item.paramSubDescription,
            value: item.paramSubCode
          }
        ];
      });

      area.map(item => {
        item.children = town.filter(data => {
          const dataHead = data.value.slice(0, 6);
          return dataHead === item.value;
        });
      });

      city[0].children = area;
      return city;
    }
  }
};
// 通过行政区编号返回来映射出相应的地点
export const dataCodeAreaTransformMixins = {
  methods: {
    dataCodeAreaTransform(area) {
      var city = "",
        county = "",
        town = "";
      var cityCode = area.slice(0, 4);
      var countyCode = area.slice(0, 6);
      city = this.dataCodeTransform(cityCode, "potentialPointBelongCitys");
      county = this.dataCodeTransform(countyCode, "potentialPointBelongCountys");
      town = this.dataCodeTransform(area, "potentialPointBelongTowns");
      if (area.length === 4) {
        return city;
      } else if (area.length === 6) {
        return city + "-" + county;
      } else if (area.length === 9) {
        return city + "-" + county + "-" + town;
      } else {
        return area;
      }
    }
  }
};
// 获取所有的隐患点信息，可用于下拉框等
export const getPpiOptionsMixins = {
  data() {
    return {
      loadingPpiSelector: false,
      ppiOptions: []
    };
  },
  methods: {
    getPpiOptions(name) {
      this.loadingPpiSelector = true;
      request({
        url: "potentialPointInfo/queryList",
        method: "post",
        data: {
          PotentialPointInfoQueryListReq: {
            potentialPointName: name
          },
          QueryPagingParamsReq: {
            offset: 0,
            queryCount: 9999
          }
        }
      })
        .then(res => {
          this.loadingPpiSelector = false;
          if (res.code === 2000) {
            this.ppiOptions = res.data.PotentialPointInfoQueryListRsp;
          } else {
            console.log(res.message);
          }
        })
        .catch(
          error =>
            function() {
              console.log(error);
            }
        );
    }
  }
};
// 获取所有的成员信息，可用于下拉框等
export const getMemberOptionsMixins = {
  methods: {
	getMembersOptions() {
		
     request({
        url: "member/getAllMembersIdAndName",
        method: "get"
      })
        .then(res => {
          if (res.code === 2000) {
            this.memberOptions = res.data.MembersIdAndNameRsp;
			console.log("猪头2",this.memberOptions)
          } else {
            console.log(res.message);
          }
		console.log("猪头3",this.memberOptions)
        }
		)
        .catch(
          error =>
            function() {
              console.log(error);
            }
        );
		console.log("猪头",this.memberOptions)
		return this.memberOptions
    }
	
  }
};

// 下拉框滚到最下面
export const scrollDownMixins = {
  methods: {
    scrollDown(id) {
      const ele = document.getElementById(id);
      console.log(ele);
      ele.scrollTop = ele.scrollHeight;
      console.log(ele.scrollTop, ele.scrollHeight);
    }
  }
};

// 用来判断某个表单字段是否是必填，是则加个*（前提是规则对象叫rules）
export const vaildStarMixins = {
  methods: {
    star(name) {
      return this.rules[name] ? "*" : "";
    }
  }
};
// 获取d天后日期
export const getNowDateMixins = {
  methods: {
    getNowDate(d) {
      const timeOne = new Date();
      timeOne.setTime(timeOne.getTime() + 3600 * 1000 * 24 * d);
      const year = timeOne.getFullYear();
      let month = timeOne.getMonth() + 1;
      let day = timeOne.getDate();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      const NOW_MONTHS_AGO = `${year}-${month}-${day}`;
      return NOW_MONTHS_AGO;
    }
  }
};
