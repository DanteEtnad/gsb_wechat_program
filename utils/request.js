const BASEURL = 'http://47.107.42.236'
// const BASEURL = 'https://stdzpt.com'

export const REQUEST_BASEURL = `${BASEURL}:8082`
export const REQUEST_AUTHORITY_BASEURL = `${BASEURL}:8081`
export const REQUEST_AUTHORITY_BASEURL1 = `${BASEURL}:8084`

// 验证是否http或https开头的请求地址
const HTTP_REG = /^https?:/

// 获取并暴露token
export const token = uni.getStorageSync('token')||" "

export async function request(config){
	// 若传入的url为http或https开头，则使用该url，否则使用REQUEST_BASEURL的接口
	config.url = HTTP_REG.test(config.url)?config.url:`${REQUEST_BASEURL}/${config.url}`
	config.header={
		"Content-Type": "application/json;charset=utf-8",
		// 请求头设置token
		"gsb-Token": uni.getStorageSync('token')||" ",
		...config.header
	}
	console.log("request config", config);
	console.log("request config url", config.url);
	// 向url发送请求 返回一个数组 第一个元素为错误对象 第二个元素为响应对象
	const [err,res] = await uni.request(config)
	console.log("res", res);
	if(err){
		console.log('出错了')
	}
	else{
		return res.data
	}
}

export function requestAuthority(config){
	config.url = HTTP_REG.test(config.url)?config.url:`${REQUEST_AUTHORITY_BASEURL}/${config.url}`
	return request(config)
}

export function requestAuthority1(config){
	config.url = HTTP_REG.test(config.url)?config.url:`${REQUEST_AUTHORITY_BASEURL1}/${config.url}`
	return request(config)
}