<template>
  <div class="home">
    <HomeNavbar/>
    <HomeBanner/>
    <HomeLocation/>
    <HomeDateRange/>
    <HomeOptions :hot-suggests="hotSuggests"/>
    <HomeCategories :categories="categories"/>
    <HomeHouseList :house-list="houseList"/>
    <template v-if="showSearchBar">
      <HomeSearchBar/>
    </template>
    <Loading/>
  </div>
</template>

<script setup>
import HomeNavbar from './cpns/HomeNavbar.vue';
import HomeBanner from './cpns/HomeBanner.vue';
import HomeLocation from './cpns/HomeLocation.vue';
import HomeDateRange from "./cpns/HomeDateRange.vue";
import HomeOptions from "@/views/home/cpns/HomeOptions.vue";
import {useHomeStore} from "@/stores/modules/home";
import {storeToRefs} from "pinia";
import HomeCategories from "@/views/home/cpns/HomeCategories.vue";
import HomeHouseList from "@/views/home/cpns/HomeHouseList.vue";
import userScroll from "@/hook/scroll";
import {watch, ref, computed} from "vue";
import HomeSearchBar from "@/views/home/cpns/HomeSearchBar.vue";
import Loading from "@/components/loading/Loading.vue";

const homeStore = useHomeStore()
const loadHouse = () => {
  curPage++
  homeStore.fetchHouseList(curPage)
}
//获取热门建议
homeStore.fetchHotSuggests()
const {hotSuggests} = storeToRefs(homeStore)
//获取分类列表
homeStore.fetchCategories()
const {categories} = storeToRefs(homeStore)
//获取房间列表
let curPage = 1
homeStore.fetchHouseList(curPage)
const {houseList} = storeToRefs(homeStore)
//底部监听 方式一
// userScroll(()=>{
//   loadHouse()
// })
//方式二
const {isReachBottom, scrollTop} = userScroll()
watch(isReachBottom, newValue => {
  // console.log("newValue"+newValue)
  if (newValue) {
    // console.log("更新数据",newVaule)
    loadHouse()
    isReachBottom.value = false
  }
})
const showSearchBar = computed(() => {
  return scrollTop.value >= 350
})
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
  height: 100%;
}
</style>