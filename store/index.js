import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations:{  // 声明函数，改变vuex中的值
    changeToken(state,token){
		// 更改vuex中值
		state.token = token
		// 更改本地存储的值
		localStorage.token = token
    }
  }
})

export default store
