<template>
   <counter></counter>
</template>

<script>
import HelloVuex from "./components/HelloVuex";
import Counter from "./components/Counter";
export default {
  name: 'App',
  components: {Counter, HelloVuex},
  data(){
    return{
      counter:0
    }
  },
  mounted(){
    console.log("App",this)
  }
}
</script>

<style>
#app {
}
</style>
