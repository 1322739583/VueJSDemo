<template>
  <div>
    counter:{{counterStore.count}} in Home.vue
  </div>
</template>

<script setup>
  import {useCounter} from "@/store/counter";
  const counterStore = useCounter()
</script>

<style scoped>

</style>