import Vue from 'vue'
import App from './01基本使用/practice/Test.vue'
import router from './router'
// import store from "./store";

//导入默认导出的Vuex.Store
import mystore from './01基本使用/practice/createStore'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //挂载Vuex.Store到Vue对象上
  store:mystore,
  router,
  render: h => h(App)
})
