<template>
    <div>
        count:{{actionsStore.count}}  <br>
        <button @click="actionsStore.increment">increment</button>
    </div>
  
</template>
<script setup>
    import {useActions} from '@/store/actions.js'
    const actionsStore=useActions()
</script>
<style scoped>
</style>