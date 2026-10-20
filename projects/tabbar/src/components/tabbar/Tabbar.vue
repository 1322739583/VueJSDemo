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
#tabbar{
  display: flex;
  background-color: #cccccc;
  height: 49px;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
