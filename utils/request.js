const REQUEST_BASEURL = 'http://47.107.42.236:8082'
const REQUEST_AUTHORITY_BASEURL = 'http://47.107.42.236:8081'
const HTTP_REG = /^https?:/
const token = uni.getStorageSync('token')||" "

export async function request(config){
	config.url = HTTP_REG.test(config.url)?config.url:`${REQUEST_BASEURL}/${config.url}`
	config.header={
		"Content-Type": "application/json;charset=utf-8",
		"gsb-Token": token,
		...config.header
	}
	console.log("request config", config);
	const response = await uni.request(config)
	console.log("response", response);
	if(response[0]){
		console.log('出错了')
	}
	else{
		const res = response[1].data
		//console.log("request config", config);
		return res
	}
}

export function requestAuthority(config){
	config.url = HTTP_REG.test(config.url)?config.url:`${REQUEST_AUTHORITY_BASEURL}/${config.url}`
	return request(config)
}