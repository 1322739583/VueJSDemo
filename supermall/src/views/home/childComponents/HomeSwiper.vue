<template>
  <swiper>
    <swiper-item v-for="item in banner" key="item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem";
export default {
  name: "HomeSwiper",
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,SwiperItem
  }
}
</script>

<style scoped>

</style>
