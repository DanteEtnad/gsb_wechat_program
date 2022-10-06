import {request,requestAuthority} from './request.js'

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
						let list = {}
						this.memberOptions.map(member=>{
							list[member.memberId] = member.memberName
						})
						this.memberList = {...list}
						console.log(this.memberList);
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