<template>

</template>

<script>
export default {
  name: "App",
  //1.创建数据之前
  beforeCreate() {
    console.log("beforeCreate")
  },
  created() {
    console.log("created")
    //1.请求网络数据
    console.log("1.请求网络数据")
    //2.监听eventBus事件
    console.log("2.监听eventBus事件")
    //3.watch数据
    console.log("3.watch数据")
  },
  beforeMount() {
    console.log("beforeMount")
  },
  mounted() {
    console.log("mounted")
    //1.获取DOM
    console.log("1.获取DOM")
    //2.操作DOM
    console.log("2.操作DOM")
  },
  beforeUpdate() {
    console.log("beforeUpdate")
  },
  updated() {
    console.log("updated")
  },
  beforeUnmount() {
    console.log("beforeUnmount")
  },
  unmounted() {
    console.log("unmounted")
  }
}
</script>

<style scoped>

</style>