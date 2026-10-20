<template>

  <div class="city" >
    <div class="top ">
      <van-search v-model="searchValue" @cancel="onCancel" shape="round" show-action
                  placeholder="/城市/区域/位置"/>

      <van-tabs class="tabs" v-model:active="tabActive" color="#ff9854"   >
        <!-- 解构的是对象 -->
        <template v-for="(cityGroup,key,index) in allCities">
          <van-tab :title="cityGroup.title" :name="key"  >

          </van-tab>
        </template>
      </van-tabs>
      <!-- 注意要实现show的优化效果，:group-data传的值是不一样的 -->
      <!--<city-group  :group-data="curGroup"/>-->
    </div>
    <!--下面这种优化方案实际上是写了两个group.两个group表示国内和海外。
     直接传value可以，value就是allCities里面的国内和海外的值。-->
    <div class="content">
      <template v-for="(value,key,index) in allCities">
        <city-group v-show="tabActive===key" :group-data="value"/>
      </template>
    </div>

  </div>

</template>
<script setup>
import {computed,ref} from 'vue'
import {useRouter} from 'vue-router';
import {useCityStore} from '@/stores/modules/city.js'
import {storeToRefs} from 'pinia';
import CityGroup from "@/views/city/cpns/CityGroup.vue";

const router = useRouter()
const searchValue = ref("")
const tabActive = ref( )
//获取数据
const cityStore = useCityStore()
cityStore.fetchAllCities()
const {allCities} = storeToRefs(cityStore)
//这里是获取不到值的，因为是异步的
console.log(allCities.value)
const curGroup=computed(()=>allCities.value[tabActive.value])
// console.log(curGroup.value)


const onCancel = () => {
  router.back()
}

</script>
<style lang="less" scoped>
 //.top{
 //  position: fixed;
 //  left: 0;
 //  right: 0;
 //  top: 0;
 //}
 .top{
   position: relative;
   z-index: 9;
 }
 .content{
    //margin-top: 98px;
   height: calc(100vh - 98px);
   overflow-y: auto;
 }
 .city{

 }
</style>