import Vue from 'vue'
import store from '@/store'

Vue.prototype.$isLogin = () =>{
	return store.state.isLogin;//是否登录
}
Vue.prototype.$userinfo = () =>{
	return store.state.userinfo;//用户信息
}


Vue.prototype.$setisLogin = (isLogin) =>{
	 store.state.isLogi = isLogin//设置是否登录
}
Vue.prototype.$setUserinfo = (Userinfo) =>{
	store.state.userinfo = userinfo;//是否需要授权
}

Vue.prototype.$login = ()=>{
	return new Promise((resolve,reject) =>{
		Vue.prototype.$store.dispatch('login').then(res=>{
			resolve(res);
		}).catch(err=>{
			reject(err);
		})
	})
}