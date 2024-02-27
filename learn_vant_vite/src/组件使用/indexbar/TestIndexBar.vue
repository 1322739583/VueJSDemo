<template>
 <van-index-bar :index-list="indexList">
  <van-index-anchor index="A" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />

  <van-index-anchor index="B" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />

  <van-index-anchor index="C" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />

  <van-index-anchor index="D" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-index-anchor index="E" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />

  
</van-index-bar>

</template>
<script setup>
    import {ref} from 'vue'
    const indexList=ref(['A','B','C','D','E'])
</script>
<style scoped>

</style>