import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import About from "../components/About";
// import Home from "../components/Home";
// import User from "../components/User";
//第一步安装插件
Vue.use(Router)

// const Home=()=>import ("../components/Home")
// const About=()=>import ("../components/About")
// const User=()=>import ("../components/User")




//第二步.创建路由对象
const router= new Router({
  routes: [
    {
      path: '',
      name: 'Index',
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'Home',
      meta:{
        title:"首页"
      },
      component: () => import ("../components/Home"),
      children: [
        {
          path: "",
          redirect:"news"
        },
        {
          path:"news",
          component:()=>import("../components/News")
        },
        {
          path:"message",
          component:()=>import("../components/Message")
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      meta:{
        title:"关于"
      },
      component: () => import ("../components/About")
    },
    {
      path: '/user/:userid',
      name: 'User',
      meta:{
        title:"用户"
      },
      component: () => import ("../components/User")
    },
    {
      path: '/profile',
      name: 'Profile',
      meta:{
        title:"档案"
      },
      component: () => import ("../components/Profile")
    }
  ],
  //默认用的hash
  mode: "history",
  linkActiveClass: "active"
})

router.beforeEach((to,from,next)=>{
  document.title=to.matched[0].meta.title
  next()

})
export default router
