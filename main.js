import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import dayjs from "@/utils/dayjs.min.js"
Vue.prototype.dayjs = dayjs

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()