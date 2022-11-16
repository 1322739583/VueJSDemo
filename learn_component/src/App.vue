<template>
   <Main/>
</template>

<script>


import Counter from "@/组件通信/子传父/CounterDemo/Counter";
import Main from "@/组件通信/综合案例/TabControl/Main";

export default {
  name: 'App',
  components: {
    Main,
    Counter
  }
}
</script>

<style>

</style>
