import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const router=new VueRouter({
  routes:[
    {
      path: "",
      redirect:"/home"
    },
    {
      path:"/home",
      component:()=>import("../views/home/Home"),
      meta:{
        title:"主页"
      }
    },
    {
      path:"/category",
      component:()=>import("../views/category/Category"),
      meta:{
        title:"目录"
      }
    },
    {
      path: "/shopcar",
      component:()=>import("../views/shopcar/Shopcar"),
      meta:{
        title:"购物车"
      }
    },
    {
      path: "/profile",
      component:()=>import("../views/profile/Profile"),
      meta:{
        title:"我的"
      }
    }
  ],
  mode:"history"
})

export default router


