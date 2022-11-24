<script setup></script>

<template>
  <div class="tabbar">
    <div class="tabbar-item">
      <span>首页</span>
      <img src="@/assets/img/tabbar/tab_home.png" alt="" />
    </div>
    <div class="tabbar-item">
      <span>收藏</span>
      <img src="@/assets/img/tabbar/tab_favor.png" alt="" />
    </div>
    <div class="tabbar-item">
      <span>订单</span>
      <img src="@/assets/img/tabbar/tab_order.png" alt="" />
    </div>
    <div class="tabbar-item">
      <span>消息</span>
      <img src="@/assets/img/tabbar/tab_message.png" alt="" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tabbar{
  display: flex;
  justify-content:space-around;
  height: 48px;
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
 
}


</style>
