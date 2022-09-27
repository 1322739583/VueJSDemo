<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
    <router-view/>
    <main-tabbar></main-tabbar>
  </div>
</template>

<style>
  /* 这个是不支持动态路径写法的 */
  @import "./assets/css/base.css";
</style>
<script>
import MainTabbar from "@/components/content/mainTabbar/MainTabbar";
export default {
  components: {
    MainTabbar
  }
}
</script>
