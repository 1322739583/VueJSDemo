<template>

</template>

<script>
import {onBeforeMount, onBeforeUpdate, onMounted, onUpdated} from "vue";

export default {
  setup() {
    onMounted(() => {
      console.log("onMounted")
    })
    onBeforeMount(() => {
      console.log("onBeforeMount")
    })
    onUpdated(()=>{
      console.log("onUpdated")
    })
    onBeforeUpdate(()=>{
      console.log("onBeforeUpdate")
    })
  }
}
</script>

<style scoped>

</style>