<template>
  <div class="wrapper">
      <div :class="{active:curIndex===index}" @click="tabClick(index)" class="tabItem" v-for="(title,index) of titles" :key="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
      // isActive:true,
      curIndex:0
    }
  },
  methods: {
    tabClick(index) {
      this.curIndex=index
      this.$emit("tabSelect",index)
      console.log(index)
    }
  }
}
</script>

<style scoped>
   .tabItem{
     height: 42px;
     line-height: 42px;
     text-align: center;
     font-weight: bold;
     margin: 0 10px;
     flex: 1;
   }
   .wrapper{
     display: flex;
   }
   .active{
     color: #ff8198;
     border-bottom: 3px solid #ff8198;
   }
</style>