<template>
  <div class="searchbar">
    <div class="wrapper">
      <div class="time">
        <div><span>住</span><span>{{ formatDate(enterTime, "M.DD") }}</span></div>
        <div><span>离</span>{{ formatDate(leaveTime, "M.DD") }} <span class="search_dot"></span></div>
      </div>
      <div class="search">
        <input type="search" placeholder="关键字/位置/民宿">
        <i class="search_icon"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useHomeStore} from "@/stores/modules/home";
import {storeToRefs} from "pinia";
import {formatDate} from "@/utils/timeUtil";

const homeStore = useHomeStore()
const {enterTime, leaveTime} = storeToRefs(homeStore)

</script>

<style lang="less" scoped>
.searchbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  border-bottom: 1px solid #ccc;
  background-color: white;
}

.wrapper {
  display: flex;
  align-items: center;
  color: #999999;
  border-radius: 0.5em;
  background-color: #f2f4f6;
  margin: 15px 20px 10px 20px;

  .time {
    padding: 0 5px 0 10px;

    .search_dot {
      display: inline-block;
      background: url('@/assets/img/home/home-sprite.png') no-repeat -402px -314px;
      transform: scale(0.5, 0.5) translate(5px, 5px);
      width: 10px;
      height: 10px;
    }
  }

}

.search {
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    border: 0;
    color: #999999;
    background-color: #f2f4f6;
  }

  .search_icon {
    display: inline-block;
    background: url('@/assets/img/home/home-sprite.png')   no-repeat -62px -307px;
    transform: scale(0.5, 0.5) translate(70px, 0);
    width: 38px;
    height: 38px;
  }
}


</style>