<template>
  <div class="navBar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.navBar{
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100,100,100,0.1);
  position: fixed;
   top: 0;
   left: 0;
  right: 0;
  z-index: 9;

  /*background-color: var(--color-tint);*/
}

.left ,.right{
  width: 60px;
  height: 44px;
  /*background-color: lightgreen;*/
}

.center{
  flex: 1;
  /*flex-grow: 1;*/
  /*background-color: lightblue;*/
}


</style>
