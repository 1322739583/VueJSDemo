<template>
<!--  <router-view>-->
<!--  </router-view>-->
  <div class="home">
    <navbar class="nav-home">
      <div slot="center" >购物街</div>
    </navbar>

    <home-swiper  :banner="banner"/>

  </div>

<!--  <div>home</div>-->
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import {getHomeMultiData} from "@/network/home";
import HomeSwiper from "@/views/home/childComponents/HomeSwiper";

export default {
  name: "Home",
  components: {HomeSwiper, Navbar},
  data(){
    return {
       banner:[],
      recommend:[]
    }
  },
  created() {
    console.log("create");
    getHomeMultiData().then(res=>{
      console.log(res)
      //可以做一些细化
        this.banner=res.data.banner.list
        this.recommend=res.data.recommend.list
    })

  }
}
</script>

<style scoped>
.nav-home{
  background-color: var(--color-tint);
  color: white;
}

</style>
