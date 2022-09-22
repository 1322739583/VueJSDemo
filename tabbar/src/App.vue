<template>
  <div id="app">
    <tabbar>
      <tab-item>
        <span slot="text">首页</span>
        <img slot="icon" src="./assets/img/svg/home_normal.svg" alt="">
      </tab-item>
    </tabbar>
  </div>
</template>

<script>

import Tabbar from "./components/tabbar/Tabbar";
import TabItem from "./components/tabbar/TabItem";
export default {
  name: 'App',
  components: {TabItem, Tabbar},
}
</script>

<style>
@import "assets/css/base.css";

img{
  width: 24px;
  height: 24px;
}

</style>
