<template>
  <div class="content">
    <img class="house-img" :src="itemData.image.url" alt="">
    <div class="house-info">
      <div class="location">
        <img src="@/assets/img/home/location.png">
        <div class="text">{{itemData.location}}</div>
      </div>

      <div class="houseName">{{ itemData.houseName }}</div>
      <div class="summary">{{ itemData.summaryText }}</div>
      <div>
        <span class="finalPrice">¥{{ itemData.finalPrice }}</span>
        <span class="productPrice">¥{{ itemData.productPrice }}</span>
        <span class="priceText">{{ itemData?.priceTipBadge?.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,computed} from "vue";
import {useCityStore} from "@/stores/modules/city";

const props=defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="less" scoped>
.content {
  position: relative;
  width: 47%;
  border-radius: 1em;
  border: 1px solid #cccccc;
  margin: 2px 0;
}

.location{
  display: flex;
  align-items: center;
  img{
    width: 14px;
    height: 14px;
    padding-right: 3px;
  }
  .text{
    color: #666666;
  }
}

.summary{
  color: #666666;
}

.house-img{
  width: 100%;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}

.house-info {
  //position: absolute;
  //bottom: 0;
  margin:3px 10px;
  color: black;
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


  .finalPrice{
    font-size: 14px;
    color: var(--primary-color);
  }
  .productPrice{
    display: inline-block;

    font-size: 12px;
    text-decoration: line-through;
    margin: 0 3px;
    color: #ccc;
  }

  .priceText{
    padding:2px 10px;
    color:white;
    border-radius: 1em;
    background-image: linear-gradient(90deg,#fa8c1d,#fcaf3f);
  }

}
</style>