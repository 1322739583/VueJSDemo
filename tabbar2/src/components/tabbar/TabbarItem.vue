<template>
      <div class="tabbar-item">
        <!--一定要写当前目录下，不写图片裂开-->
        <slot name="item-icon"></slot>
        <slot name="item-text"></slot>
      </div>
</template>

<script>
export default {
  name: "TabbarItem"
}
</script>

<style scoped>
.tabbar-item {
  height: 49px;
  text-align: center;
  flex: 1;
  font-size: 14px;
  margin-top: 3px;

  /*flex-grow: 1;*/
}

.tabbar-item img {
  width: 24px;
  height: 24px;
  /*去除图片本身的边距*/
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
