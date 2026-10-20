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
import {request} from "./network/request";

// axios({
//   url: "http://123.207.32.32:8000/home/multidata",
//   //method:"get"
// }).then(res => {
//   console.log(res)
// })
//
//
// axios({
//   url: "http://123.207.32.32:8000/home/data",
//   //method:"get",
//   params: {
//     type: "pop",
//     page: 1
//   }
// }).then(res => {
//   console.log(res)
// })

// axios.defaults.baseURL="http://123.207.32.32:8000"
// axios.defaults.timeout=10000
// axios.all([
//   axios({
//     url:"/home/multidata"
//   }),
//   axios({
//     url: "/home/data",
//     params: {
//       type: "pop",
//       page: 1
//     }
//   })
// ]).then(results => {
//   console.log(results);
// })


// axios.all([
//   axios({
//     url:"/home/multidata"
//   }),
//   axios({
//     url: "/home/data",
//     //method:"get",
//     params: {
//       type: "pop",
//       page: 1
//     }
//   })
// ]).then(axios.spread((res1,res2)=>{
//   console.log(res1)
//   console.log(res2)
// }))

const instance1=axios.create({
  baseURL:"http://123.207.32.32:8000",
  timeout:5000
})

// instance1({
//   url:"/home/data",
//   params:{
//     type:"pop",
//     page:1
//   }
// }).then(res=>{
//   console.log(res)
// })
//
// instance1({
//   url:"/home/multidata"
// }).then(res=>{
//   console.log(res)
// })

request({
  url:"/home/multidata"
}).then(res=>{
  console.log(res)
}).catch(err=>{
  console.log(err)
})
