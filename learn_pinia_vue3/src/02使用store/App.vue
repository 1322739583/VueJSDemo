<template>
     <home></home>
     <OptionStore></OptionStore>
  <div>
    counter:{{counterStore.count}} in App.vue
  </div>

</template>

<script setup>
   import {useCounter} from "@/store/counter";
   import Home from "./Home";
   import OptionStore from "./OptionStore";
   const counterStore=useCounter()
</script>

<style>

</style>
