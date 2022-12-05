<template>
  
        <div class="city top-page"   id="top">
            <div class="top ">
                <van-search v-model="searchValue" @clear="onClear" @cancel="onCancel" shape="round" show-action
                    placeholder="/城市/区域/位置" />


                <van-tabs v-model:active="tabActive" color="#ff9854" sticky="true">
                    <!-- 解构的是对象 -->
                    <template v-for="cityGroup in allCities">
                        <van-tab :title="cityGroup.title" teleport="top">
                            <van-index-bar sticky="false" z-index="9" sticky-offset-top="100" @select="onIndexSelect" @change="onIndexChange">
                            <template v-for="(cities, index) in cityGroup.cities" :key="index">
                                <van-index-anchor :index="cities.group" />
                                <template v-for="(innerCity, i) in cities.cities" :key="i">
                                    <van-cell :title="innerCity.cityName" />
                                </template>
                            </template>
                        </van-index-bar>
                        </van-tab>
                    </template> 
                </van-tabs>
            </div>
        </div>
  
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { getCityAll } from '@/services'
import { useCityStore } from '@/stores/modules/city.js'
import { storeToRefs } from 'pinia';

const router = useRouter()
const searchValue = ref("")
const tabActive = ref({})

//获取数据
const cityStore = useCityStore()
cityStore.fetchAllCities()
const { allCities } = storeToRefs(cityStore)

// console.log("the result:" + allCities);

const onIndexChange=()=>{
   console.log("onIndexChange");
}

//点击索引
const onIndexSelect=(index)=>{
    console.log(index);

    console.log("onIndexSelect");
}



const onCancel = () => {
    router.back()
}

</script>
<style lang="less" scoped>
 
.top {
 
    // position: relative;

    // z-index: 9;
}

// van-index-bar {
//     position: relative;

//      z-index: 10; 
// }

.city-list {
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // margin-top: 98px;
    // height:calc(100vh-200px);
    // overflow-y:auto;
}
</style>