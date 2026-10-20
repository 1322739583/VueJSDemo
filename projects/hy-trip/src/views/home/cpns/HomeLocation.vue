<template>
  <div class="location">
    <span class="city" @click="cityClick">{{ curCity.cityName }}</span>
    <div class="position" @click="locationClick">
      <span class="my-location">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">
    </div>
  </div>
</template>
<script setup>

import {useRouter} from 'vue-router';
import {useCityStore} from "@/stores/modules/city";

const router = useRouter()
const cityStore = useCityStore()
const curCity = cityStore.curCity

function cityClick() {
  router.push('/city')
}

function locationClick() {
  navigator.geolocation.getCurrentPosition(
      res => {
        console.log("请求成功", res);
      }, err => {
        console.log("请求失败", err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      })
}
</script>
<style lang="less" scoped>
.location {
  display: flex;
  align-items: center;
  margin: 5px 10px;

  .position {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  img {
    width: 24px;
    height: 24px;
    margin-left: 5px;
  }
}
</style>