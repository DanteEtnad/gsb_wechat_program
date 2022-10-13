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

// 获取三级地区的options
export const getAreaOptionsMixins = {
  methods: {
    getAreaOptions() {
      var city = [];
      var area = [];
      var town = [];
			const globalParams = getApp().globalData.globalParams
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