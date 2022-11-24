<template>
  <div class="tabbar">
    <div
    class="tabbar-item" 
    :class="{active:index===curIndex}" 
    v-for="(item,index) of tabbarDate" 
    :key="index"
    @click="itemClick(index,item)"
    >
      
      <img v-if="curIndex!==index" :src="getAssetsUrl(item.imgUrl)" alt="" />
      <img v-else :src="getAssetsUrl(item.imgActiveUrl)" alt="" />
      <span>{{ item.title }}</span>  
    </div>
  </div>

</template>

<script setup>
   import {tabbarDate} from '@/assets/data/tabbar.js'
   import {getAssetsUrl} from '@/utils/assetsUtil.js'
   import { ref } from 'vue';
   import {useRouter} from 'vue-router'

   const curIndex=ref(0);
   const router=useRouter()
   function itemClick(index,item){
         curIndex.value=index
         router.push(item.path)
   }
</script>

<style lang="less" scoped>
.tabbar{
  display: flex;
  justify-content:space-around;
  height: 48px;
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #f3f3f3;
  .tabbar-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      height: 28px;
      width: 28px;
    }
    .active{
      color: rgb(218, 224, 46);
    }
  }
}


</style>
