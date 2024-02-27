<template >
  <div class="loading" v-show="mainStore.isLoading" >
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt=""/>
    </div>
  </div>
</template>

<script setup>
import {useMainStore} from "@/stores/modules/main";
import {storeToRefs} from "pinia";

const mainStore=useMainStore()

</script>

<style lang="less" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 104px;
    height: 104px;
    background: url("@/assets/img/home/loading-bg.png") 0 0 / 100% 100%;
    img {
      width: 70px;
      height: 70px;
      //图片问题
      margin-bottom: 9px;
    }
  }
}
</style>