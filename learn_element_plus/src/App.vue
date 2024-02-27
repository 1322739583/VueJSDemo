<template>
  <div id="app">
    indexbar:
  <van-index-bar :indexList="indexList">
    <template v-for="item in 'ABC'">
      <van-index-anchor :index="item" />
      <template v-for="i in 3">
        <van-cell :title="i" />
      </template>
    </template>
  </van-index-bar>
  </div>
</template>

<script >
export default{
  setup(){
    
    const  indexList= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return {
       indexList
    }
  } 
}

</script>

<style scoped>
   van-index-bar{
     height: 200px;
    }

    van-cell{
      height: 20px;
    }
</style>


