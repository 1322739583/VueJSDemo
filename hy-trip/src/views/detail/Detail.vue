<template>
  <van-nav-bar
      title="房间详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="mainPart" v-if="mainPart">
    <DetailSwipe :housePics="mainPart?.topModule?.housePicture?.housePics"/>
  </div>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {useDetailStore} from "@/stores/modules/detail"
import {storeToRefs} from "pinia";
import {computed} from "vue";
import DetailSwipe from "@/views/detail/cpns/DetailSwipe.vue";

const route = useRoute()
const router = useRouter()
const detailStore = useDetailStore()

//获取详情数据
detailStore.fetchHouseDetail(route.params.id)
const {detailInfo}=storeToRefs(detailStore)
//数据太复杂，分离出一部分
const mainPart=computed(()=>detailInfo.value.mainPart)
console.log("mainPart:",mainPart)

//返回
const onClickLeft = () => {
  router.back()
}
</script>

<style lang="less" scoped>

</style>