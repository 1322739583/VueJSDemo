<template>
  <tabbar>
    <tabbar-item path="/home"   >
      <img slot="item-icon" src="@/assets/img/tabbar/home_normal.svg" alt="">
      <img slot="item-icon-active" src="@/assets/img/tabbar/home_selected.svg" alt="">
      <div slot="item-text">
        首页
      </div>
    </tabbar-item>
    <tabbar-item path="/category"   >
      <img slot="item-icon" src="@/assets/img/tabbar/category_normal.svg" alt="">
      <img slot="item-icon-active" src="@/assets/img/tabbar/category_selected.svg" alt="">
      <div slot="item-text">
        分类
      </div>
    </tabbar-item>
    <tabbar-item path="/shopcar"  >
      <img slot="item-icon" src="@/assets/img/tabbar/shopcar_normal.svg" alt="">
      <img slot="item-icon-active" src="@/assets/img/tabbar/shopcar_selected.svg" alt="">
      <div slot="item-text">
        购物车
      </div>
    </tabbar-item>
    <tabbar-item path="/profile"  >
      <img slot="item-icon" src="@/assets/img/tabbar/user_normal.svg" alt="">
      <img slot="item-icon-active" src="@/assets/img/tabbar/user_selected.svg" alt="">
      <div slot="item-text">
        我的
      </div>
    </tabbar-item>
  </tabbar>
</template>

<script>

import Tabbar from "@/components/common/tabbar/Tabbar";
import TabbarItem from "@/components/common/tabbar/TabbarItem";

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
