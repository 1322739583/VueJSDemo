<template>
  <div id="app">
    doubleCount:{{this.$store.getters.doubleCount}}   <br>
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
  name: 'App',
  methods:{
      increment(){
        this.$store.commit("increment")
        console.log(mapState({count:'count',sum:'sum',school:'school'}));
      },
      decrement(){
        this.$store.commit("decrement")
      }
   } 
   
}
</script>
