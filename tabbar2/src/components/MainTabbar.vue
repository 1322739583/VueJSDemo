<template>
  <tabbar>
    <tabbar-item path="/home"   >
      <img slot="item-icon" src="@/assets/img/home_normal.svg" alt="">
      <img slot="item-icon-active" src="@/assets/img/home_selected.svg" alt="">
      <div slot="item-text">
        首页
      </div>
    </tabbar-item>
    <tabbar-item path="/category"   >
      <img slot="item-icon" src="@/assets/img/category_normal.svg" alt="">
      <img slot="item-icon-active" src="@/assets/img/category_selected.svg" alt="">
      <div slot="item-text">
        分类
      </div>
    </tabbar-item>
    <tabbar-item path="/shopcar"  >
      <img slot="item-icon" src="@/assets/img/shopcar_normal.svg" alt="">
      <img slot="item-icon-active" src="@/assets/img/shopcar_selected.svg" alt="">
      <div slot="item-text">
        购物车
      </div>
    </tabbar-item>
    <tabbar-item path="/profile"  >
      <img slot="item-icon" src="@/assets/img/user_normal.svg" alt="">
      <img slot="item-icon-active" src="@/assets/img/user_selected.svg" alt="">
      <div slot="item-text">
        我的
      </div>
    </tabbar-item>
  </tabbar>
</template>

<script>

import Tabbar from "@/components/tabbar/Tabbar";
import TabbarItem from "@/components/tabbar/TabbarItem";

export default {
  name: "MainTabbar",
  components:{
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped>

</style>
