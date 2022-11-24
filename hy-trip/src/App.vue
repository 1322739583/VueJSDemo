<template>
  <div class="app">
    <router-view/><br>
    <!-- <router-link to="/home">首页</router-link>
    <router-link to="/favor">收藏</router-link>
    <router-link to="/order">订单</router-link>
    <router-link to="/message">消息</router-link> -->
    <Tabbar/> 
  </div>
  <div>
    
  </div>

</template>


<script setup>
import Tabbar from './components/tabbar/Tabbar.vue';

</script>



<style scoped>
 

</style>
