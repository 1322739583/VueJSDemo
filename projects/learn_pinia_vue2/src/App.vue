<template>
  <div id="app">
       {{counterStore.count}}
  </div>
</template>

<script setup>
   import useCounter from '@/store/counter.js'

   const counterStore= useCounter()

</script>

<style>

</style>
