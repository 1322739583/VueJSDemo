<template>
   <span>{{count}}</span><br>
   <AddCounter @add="requestAdd"/><br>
   <SubCounter @sub="requestSub"/>
</template>

<script>
import AddCounter from "@/组件通信/子传父/CounterDemo/AddCounter";
import SubCounter from "@/组件通信/子传父/CounterDemo/SubCounter";
export default {
  name: "Counter",
  components: {SubCounter, AddCounter},
  data(){
    return{
      count:0
    }
  },
  methods: {
    requestAdd(count) {
      this.count+=count
    },
    requestSub(count) {
      this.count-=count
    }
  }
}
</script>

<style scoped>

</style>