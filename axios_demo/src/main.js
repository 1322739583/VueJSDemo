import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

import axios from "axios"

axios({
  url:"http://123.207.32.32:8000/home/multidata",
  //method:"get"
}).then(res=>{
  console.log(res)
})


axios({
  url:"http://123.207.32.32:8000/home/data",
  //method:"get",
  params:{
    type:"pop",
    page:1
  }
}).then(res=>{
  console.log(res)
})
