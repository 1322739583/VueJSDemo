<template>
    <van-tabs v-model:active="curIndex" @click-tab="onTabClick" @rendered="onRendered" lazy-render	>
        <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
    </van-tabs>
</template>
<script setup>
     import { ref } from 'vue';
     const curIndex= ref(0)
     console.log("......onTabClick......")
      const onTabClick = res=>{
       // console.log(res.name)
       // console.log(res.event.type)
       // console.log(res.title)
       // console.log(res.disabled)
       // console.log("curIndex:"+curIndex.value)
      }
     console.log("......onRendered......")

     const onRendered = (name,title)=>{
       console.log(name)
       console.log(title)
     }







</script>
<style scoped>
 
</style>