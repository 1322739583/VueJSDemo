import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from "vuex"
import store from "./store";

Vue.config.productionTip = false

Vue.use(Vuex)

/* eslint-disable no-new */
const vm=new Vue({
  el: '#app',
  //这个配置项只有在调用了Vue.use(Vuex)才会在vm中能查看到。
  store,
  router,
  render: h => h(App)
})

console.log(vm)
