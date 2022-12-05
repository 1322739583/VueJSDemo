<template>
  <!-- 用组件就不要自己写样式，文档怎么说就怎么用。 -->
  <van-tabbar class="tabbar" v-model="curIndex" active-color="#ff9853" @change="onChange">
    <van-tabbar-item v-for="(item, index) of tabbarDate" :to="item.path" dot="true">
      <span>{{ item.title }}</span>
      <template #icon="props">
        <img :src="props.active ? getAssetsUrl(item.imgActiveUrl) : getAssetsUrl(item.imgUrl)" />
      </template>
    </van-tabbar-item>
  </van-tabbar>

</template>

<script setup>
import { tabbarDate } from '@/assets/data/tabbar.js'
import { getAssetsUrl } from '@/utils/assetsUtil.js'
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const curIndex = ref(0);

</script>

<style lang="less" scoped>
// van-tabbar {
//   --van-tabbar-item-icon-size: 50px
// }
 

// :deep(.van-tabbar-item_icon){
//    font-size:50px
// }

//1.如果使用了自定义插槽，那么修改起来非常的简单，直接修改就可以了。
.tabbar{
  
  span{
    font-size: 14px;
  }
  img{
    height: 24px;
    width: 24px;
  }
}

</style>
