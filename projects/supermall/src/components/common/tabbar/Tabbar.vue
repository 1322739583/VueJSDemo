<template>
  <div id="tabbar">
     <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabbar"
}
</script>

<style scoped>
#tabbar {
  display: flex;
  position: fixed;
  left: 0;
  /*这个是必须要写的，不写在存在多个子元素的时候，不能填充整个宽度*/
  right: 0;
  bottom: 0;
  background-color: #f6f6f6;
  text-align: center;
  padding-top:3px;
  box-shadow: 0 -2px 1px rgba(100,100,100,0.1);
}
</style>
