import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
const cpn={
  template:`<div>{{message}}</div>`,
  data(){
    return {
      message:"Hello"
    }
  }
}

new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>'
  render: function (createElement) {
    return createElement(App)
  }
})
