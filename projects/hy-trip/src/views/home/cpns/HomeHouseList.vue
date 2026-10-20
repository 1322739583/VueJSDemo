<template>
  <div class="houselist" >
    <template v-for="(item,index) in houseList">
      <template v-if="item.discoveryContentType===3">
        <HomeItemType3 :item-data="item.data" @click="itemClick(item.data)"/>
      </template>
      <template v-if="item.discoveryContentType===9">
        <HomeItemType9 :item-data="item.data" @click="itemClick(item.data)"/>
      </template>
    </template>
  </div>
</template>

<script setup>
import HomeItemType3 from "@/components/home-item/HomeItemType3.vue";
import HomeItemType9 from "@/components/home-item/HomeItemType9.vue";
import {useRouter} from "vue-router";

defineProps({
  houseList: {
    type: Array,
    default: () => []
  }
})

const router=useRouter()
const itemClick=itemData=>{
  router.push("/detail/"+itemData.houseId)
}

</script>

<style scoped>
.houselist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>