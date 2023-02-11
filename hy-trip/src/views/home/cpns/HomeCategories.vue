<template>
    <div class="categories">
      <template v-for="item in categories">
        <div class="wrapper">
          <img :src="item.pictureUrl" alt=""/>
          <span>{{ item.title }}</span>
        </div>
      </template>
    </div>
</template>

<script setup>
   defineProps({
     categories:{
       type:Array,
       default:()=>[]
     }
   })
</script>

<style lang="less" scoped>
.categories{
  display: flex;
  overflow-x: auto;
  align-items: center;
  overscroll-behavior: none;
  &::-webkit-scrollbar{display:none}
  .wrapper{
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    margin: 0 8px;
    img{
      width: 32px;
      height: 32px;
    }
    span{
       margin-top: 3px;
    }
  }
}
</style>