<template>
  <div class="content">
    <img class="house-bg" :src="itemData.image.url" alt="">
    <div class="house-info">
      <div>{{ itemData.summaryText }}</div>
      <div class="houseName">{{ itemData.houseName }}</div>
      <div><van-rate class="rate" v-model="houseRate" size="18" color="#ff9854" void-color="#ffffff" readonly allow-half /><span class="price">¥{{ itemData.finalPrice }}</span></div>
    </div>
  </div>
</template>

<script setup>
import {ref,computed} from "vue";

const props=defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }

})

const houseRate=computed(()=>
  Number(props.itemData.commentScore)
 )


</script>

<style lang="less" scoped>
.content {
  position: relative;
  width: 47%;
  margin: 2px 0;

}

.house-bg {
  width: 100%;
  border-radius: 1em;
  //border: 1px solid #cccccc;
}

.house-info {
  position: absolute;
  bottom: 0;
  margin:3px 10px;
  color: white;
  font-size: 12px;

  div {
    margin: 3px 0;
  }
  .houseName{
    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .rate{

  }
  .price{
    font-size: 14px;
    margin-left: 10px;
  }

}


</style>