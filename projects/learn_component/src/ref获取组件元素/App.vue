<template>
  <h1 ref="title" class="title">Hello</h1>
  <banner ref="banner"/>
</template>

<script>
import Banner from "@/ref获取组件元素/Banner";
export default {
  name: "App",
  components: {Banner},
  methods:{
    getEl(){
     let title= document.querySelector(".title")
    }
  },
  mounted() {
    console.log(this.$refs.title)
    //组件实例代理对象
    console.log(this.$refs.banner)
    //调用组件方法
    this.$refs.banner.showBanner()
    //组件元素
    console.log(this.$refs.banner.$el)
  }
}
</script>

<style scoped>

</style>