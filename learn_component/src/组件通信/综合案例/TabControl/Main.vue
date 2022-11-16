<template>
  <TabControl @tabSelect="tabSelect" :titles="titles"/>
  <p >{{titles[curretIndex]}}</p>
</template>

<script>
import TabControl from "@/组件通信/综合案例/TabControl/TabControl";

export default {
  name: "Main",
  components: {TabControl},
  data(){
    return{
      titles:['电脑','手机','显示器'],
      curretIndex:0
    }
  },
  methods: {
    tabSelect(index) {
      this.curretIndex=index
    }
  }
}
</script>

<style scoped>

</style>