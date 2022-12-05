<script setup>
    import TestIndexBar from './组件使用/indexbar/TestIndexBar.vue'
    import TestButton from './组件使用/button/TestButton.vue'
    import TestTabbar from './组件使用/tabbar/TestTabbar.vue'
    import Box from './Box.vue'

</script>

<template>
      <!-- <TestIndexBar></TestIndexBar> -->
      <!-- <TestButton></TestButton> -->
      <TestTabbar></TestTabbar>
      <Box class="box"></Box>
</template>

<style scoped>
 .box{
    background-color: lightcoral;
 }
</style>
