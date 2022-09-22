<template>
  <div>
    <h2> {{counter}}</h2>
  </div>

</template>

<script>
export default {
  name: "HelloVuex",
  //props是支持物的意思
  props:{
    counter:Number
  }
}
</script>

<style scoped>

</style>
