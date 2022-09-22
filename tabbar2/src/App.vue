<template v-slot>
  <div id="app">
     <tabbar>
          <tabbar-item>
            <img slot="item-icon" src="./assets/img/home_normal.svg">
            <div slot="item-text">
              首页
            </div>
          </tabbar-item>
          <tabbar-item>
            <img slot="item-icon" src="./assets/img/category_normal.svg">
            <div slot="item-text">
              分类
            </div>
          </tabbar-item>
          <tabbar-item>
            <img slot="item-icon" src="./assets/img/shopcar_normal.svg">
            <div slot="item-text">
              购物车
            </div>
          </tabbar-item>
          <tabbar-item>
            <img slot="item-icon" src="./assets/img/user_normal.svg">
            <div slot="item-text">
              我的
            </div>
          </tabbar-item>
     </tabbar>
  </div>
</template>

<script>


import Tabbar from "./components/tabbar/Tabbar";
import TabbarItem from "./components/tabbar/TabbarItem";
export default {
  name: 'App',
  components: {
    TabbarItem,
    Tabbar
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}



</style>
