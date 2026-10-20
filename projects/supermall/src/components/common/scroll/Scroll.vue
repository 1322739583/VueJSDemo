<template>
  <!--这里添加ref是为了防止别的地方有相同的类名-->
  <div class="wrapper" ref=".wrapper">
    <div class="content">
      <slot ></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data(){
    return {
        scroll:null
    }
  },
  mounted() {
    this.scroll=new BScroll(this.$refs.wrapper,{
      probeType:3,
      click:true,
      pullUpLoad:true
    })
    this.scroll.on("scroll",pos=>{

    })
    this.scroll.on("pullingUp",()=>{

    })
  }
}
</script>

<style scoped>
     .content{

     }
</style>
