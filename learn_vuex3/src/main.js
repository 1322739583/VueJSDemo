import Vue from 'vue'
import App from './11mapMutations的使用/App'
import router from './router'
import store from "./store";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
