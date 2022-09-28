<template>
<!--  <router-view>-->
<!--  </router-view>-->
  <div class="home">
    <navbar class="nav-home">
<!--      <div slot="right">123</div>-->
      <div slot="center" >购物街</div>
<!--      <div slot="left">123</div>-->
    </navbar>
  </div>

<!--  <div>home</div>-->
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
export default {
  name: "Home",
  components: {Navbar}
}
</script>

<style scoped>
.nav-home{
  background-color: var(--color-tint);
  color: white;
}

</style>
