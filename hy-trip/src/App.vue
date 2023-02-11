<template>
  <div class="app">
    <router-view/><br>
    <!-- <router-link to="/home">首页</router-link>
    <router-link to="/favor">收藏</router-link>
    <router-link to="/order">订单</router-link>
    <router-link to="/message">消息</router-link> -->   
    <TabbarVant v-if="!route.meta.hideTabbar"/>
  </div>
</template>


<script setup>

import { useRoute } from 'vue-router';
import TabbarVant from './components/tabbar/TabbarVant.vue';
const route=useRoute()
</script>
<style scoped>
</style>
