<template v-slot>
  <div id="app">
<!--      <router-link to="/home" replace></router-link>-->
      <router-view></router-view>
      <main-tabbar></main-tabbar>
  </div>
</template>

<script>



import TabbarItem from "@/components/tabbar/TabbarItem";
import Tabbar from "@/components/tabbar/Tabbar";
import MainTabbar from "@/components/MainTabbar";

export default {
  name: 'App',
  components: {
    MainTabbar,
    TabbarItem,
    Tabbar
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}



</style>
