import {request,requestAuthority} from './request.js'
export function queryAll() {
  const globalParams = {};
  const hasToken = uni.getStorageSync('token')||" "
  if (hasToken) {
    const queryConditions = {
      paramCode: "",
      paramType: "T",
      paramCacheFlag: ""
    };
    requestAuthority({
      method: "post",
      url: "systemConfigParam/queryAll",
      data: {
        SystemConfigParamQueryReq: queryConditions
      }
    }).then(response => {
      if (response.code === 2000) {
        let rsps = response.data.SystemConfigParamQueryRsp;
        console.log("系统配置参数结果：", response);
        for (let i = 0; i < rsps.length; ++i) {
          if (globalParams[rsps[i].paramCode]) {
            globalParams[rsps[i].paramCode].push(rsps[i]);
          } else {
            globalParams[rsps[i].paramCode] = [];
            globalParams[rsps[i].paramCode].push(rsps[i]);
          }
        }
      }
    });
  }
  return globalParams;
}