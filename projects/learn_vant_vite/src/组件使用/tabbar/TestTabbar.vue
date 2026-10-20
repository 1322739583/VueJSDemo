<template>
    <van-tabbar v-model="active" class="tabbar">
        <van-tabbar-item icon="home-o"><span>标签</span></van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
import { ref } from 'vue';
const active=ref(0)
</script>
<style scoped>
   van-tabbar span{
    color: rgb(26, 255, 0);
   }
</style>