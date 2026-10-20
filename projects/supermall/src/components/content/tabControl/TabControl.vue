<template>
   <div class="tab-control">
     <div v-for="(item,index) in titles" class="tab-control-item" :class="{active:index===curIndex}" @click="itemClick(index)">
       <span>{{item}}</span>
     </div>
   </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      curIndex:0
    }
  },
  methods: {
    itemClick(index) {
      this.curIndex=index
      //将tab点击传给父组件
      this.$emit("tabClick",index)
    }
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    background-color: white;
    position: sticky;
    top: 44px;

  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span{
    padding: 3px 3px 5px;
  }

  .active{
    color: var(--color-tint);

  }

  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
