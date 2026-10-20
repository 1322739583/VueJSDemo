<template>
     <home></home>
     <option-store></option-store>
     <setup-store></setup-store>
  <div>
    counter:{{counterStore.count}} in App.vue
  </div>

</template>

<script setup>
   import {useCounter} from "@/store/counter";
   import Home from "./Home";
   import OptionStore from "./OptionStore";
   import SetupStore from "@/02使用store/SetupStore";
   const counterStore=useCounter()
</script>

<style>

</style>
