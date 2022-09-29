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