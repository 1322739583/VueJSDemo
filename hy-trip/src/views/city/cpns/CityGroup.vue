<template>
  <div class="city-group">
    <van-index-bar class="index-bar" :index-list="indexList">
      <!-- 数组 -->
      <van-index-anchor :index="hotCityIndex"/>

        <div class="hotCities">
          <template v-for="(city,index) in groupData.hotCities" :key="index">
          <div class="hotCity" @click="cityClick(city)">
            {{ city.cityName }}
          </div>
          </template>
        </div>


      <template v-for="(cities,i) in groupData.cities" :key="i">
        <van-index-anchor :index="cities.group"/>
        <!-- 数组 -->
        <template v-for="innerCity in cities.cities">
          <van-cell :title="innerCity.cityName" @click="cityClick(innerCity)"/>
        </template>
      </template>

    </van-index-bar>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useCityStore} from "@/stores/modules/city";
import {router} from "@/router";

const props=defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

const cityStore=useCityStore()

const hotCityIndex="热门"
const indexList=computed(()=>{
  let list=props.groupData.cities?.map(item=>item.group)
  list?.unshift('#')
  return list
})

const cityClick=(city)=>{
  console.log(city)
  cityStore.curCity=city
  router.back()
}

</script>

<style lang="less" scoped>


.hotCities {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;

  .hotCity {
    background-color: rgba(255, 187, 0, 0.52);
    border-radius: 0.5rem;
    padding: 5px 20px;
    margin: 3px 5px;
  }
}


</style>