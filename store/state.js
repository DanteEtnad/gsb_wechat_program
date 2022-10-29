//声明一个默认的token
let defaultToken = "null"

if(localStorage.token){  // 判断localStorage是否存在该值
//声明一个默认的token
  defaultToken = localStorage.token
}

export default {
  token:defaultToken
}