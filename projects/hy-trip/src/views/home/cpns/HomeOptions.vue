<template>
  <div class="options">
    <div class="price-and-nums">
      <div>价格不限</div>
      <div>人数不限</div>
    </div>

    <div class="hotHouse">关键字/位置/民宿名</div>
    <div class="hot-suggusts">
      <template v-for="item in hotSuggests">
        <div class="suggest">{{ item.tagText.text }}</div>
      </template>
    </div>
  </div>
  <div class="search">
    <button class="search_btn" @click="onSearchClick">开始搜索</button>
  </div>

</template>

<script setup>
import dataRequest from "@/services/request";
import {ref} from "vue";
import {router} from "@/router";

// const hotSuggest=ref([])

defineProps({
  hotSuggests: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => []
  }
})
const onSearchClick = () => {
  router.push('/search')
}

</script>

<style lang="less" scoped>

.options {
  color: #cfcfcf
}

.price-and-nums {
  display: flex;
  justify-content: space-between;
  margin: 10px 25px 10px 20px;
}

.hotHouse {
  margin: 10px 0 10px 20px;
}

.hot-suggusts {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 10px;

  .suggest {
    padding: 5px;
    margin: 3px 5px;
    color: #000000;
    border-radius: 1rem;
    background-color: #f1f3f5;
  }
}

.search {
  display: flex;
  justify-content: center;

  .search_btn {
    background-image: var(--theme-linear-gradient);
    width: 300px;
    height: 38px;
    font-size: 18px;
    font-weight: 500;
    margin: 10px auto;
    border-radius: 1rem;
    color: #ffffff;
    border: 1px solid #cccccc;
  }

}


</style>