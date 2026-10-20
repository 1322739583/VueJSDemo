<template>
  <div>
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item,index) in housePics">
        <van-swipe-item>
          <img class="itemImg" :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total }">
        <div class="indicator" >
          <!--挺巧妙，也挺复杂的-->
          <template v-for="(value,key,index) in categoryData" :key="key">
            <div class="item" :class="{active:housePics[active]?.enumPictureCategory==key}">
              <span>{{ value[0]?.title }}</span>
              <span v-if="housePics[active]?.enumPictureCategory==key">{{ getCategoryIndex(housePics[active]) }}/{{ value.length }}</span>
            </div>
          </template>
        </div>
        <!--<div class="indicator" :class="{active:true}">{{ active + 1 }}/{{ total }}</div>-->
      </template>
    </van-swipe>
  </div>

</template>

<script setup>
const props = defineProps({
  housePics: {
    type: Array,
    default: () => []
  }
})
console.log("props.housePics:", props.housePics)
//对数据进行分类转化
const categoryData = {}//定义最终转化对象
//方式一：
// for(const item of props.housePics){
//   //key是数字，value是数组
//    categoryData[item.enumPictureCategory]=[]
// }
// console.log(categoryData)
// for(const item of props.housePics){
//   //根据数字取出对应数组
//  const valueArray= categoryData[item.enumPictureCategory]
//   //往数组加东西
//   valueArray.push(item)
// }

//方式二:
for (const item of props.housePics) {
  let valueArray = categoryData[item.enumPictureCategory]
  if (!valueArray) {
    valueArray = []
    categoryData[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}

const getCategoryIndex = (item) => {
  const valueArray = categoryData[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}
console.log(categoryData)
</script>

<style lang="less" scoped>
.swipe-list {
  .itemImg {
    width: 100%;
  }
}

.indicator {
  display: flex;
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);

  .item {
    &.active {
      background: white;
      color: black;
    }
  }
}
</style>