<template>
    <div>
      counter:{{counterStore.count}} in OptionStore.vue
    </div>
</template>

<script setup>
  import {useCounter} from "@/store/option_store";
  const counterStore = useCounter();
</script>

<style scoped>

</style>