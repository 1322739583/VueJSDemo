<template>
  <div id="tabitem">
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  name: "TabItem"
}
</script>

<style scoped>
  #tabitem{
    flex: 1;
    height: 49px;
    text-align: center;
  }

  #tabitem img{
    height: 24px;
    width: 24px;
  }
</style>
