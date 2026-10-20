<template>
     <home></home>
  <div>
    counter:{{counterStore.count}} in App.vue
  </div>

</template>

<script setup>
   import {useCounter} from "@/store/counter";
   import Home from "./Home";
   const counterStore=useCounter()
</script>

<style>

</style>
