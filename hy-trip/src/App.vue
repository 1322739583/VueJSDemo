<template>
  <div class="app">
    <router-view/><br>
    <!-- <router-link to="/home">首页</router-link>
    <router-link to="/favor">收藏</router-link>
    <router-link to="/order">订单</router-link>
    <router-link to="/message">消息</router-link> -->   
    <TabbarVant />    
  </div>

</template>


<script setup>
import { useRouter } from 'vue-router';
import TabbarVant from './components/tabbar/TabbarVant.vue';
const router=useRouter()
</script>
<style scoped>
</style>
