<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
<!--    <router-view/>-->
    <router-link to="/home" tag="button" replace   >主页</router-link>
    <router-link to="/about" tag="button" replace   >关于</router-link>
<!--    <router-link :to="'/user/'+userId" tag="button" replace   >用户</router-link>-->
<!--    <router-link :to="{path:'/profile',query:{name:'tom',age:22} }" tag="button" replace   >档案</router-link>-->
<!--    <button @click="homeClick">主页</button>-->
<!--    <button @click="aboutClick">关于</button>-->
        <button @click="userClick">用户</button>
        <button @click="profileClick">档案</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userId: "zhangsan"
    }
  },
  created(){
    console.log("created")
    document.title="首页"
  },
  methods:{
    homeClick(){
      //不要写这个，这样是跳过router系统了。
      //history.pushState({},"","/home")
      this.$router.push("/home")
      console.log("home click")
    },
    aboutClick(){
      this.$router.push("/about")
      console.log("about click")
    },
    userClick(){
      this.$router.push("/user/"+this.userId)
    },
    profileClick(){
      this.$router.push({
        path:"/profile",
        query:{
          name:"Tom",
          age:"23"
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/*.router-link-active{*/
/*    color: orange;*/
/*}*/
.active{
  color: orange
}
</style>
