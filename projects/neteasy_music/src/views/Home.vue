<template>
   <Navbar/>
    <div class="box">
      <span class="s1">
          a span
      </span>
    </div>
</template>

<script>
// @ is an alias to /src


import Navbar from "@/components/home/Navbar";

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style lang="less" scoped>
   .box{
     .s1{
       background: #ff8198;
     }
   }
</style>
