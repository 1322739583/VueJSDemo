<template>
  <div id="app">
    count:{{this.$store.state.count}} in App.vue <br>
    <br>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
  </div>
</template>

<script>
import store from '../store';
export default {
  name: 'App',
  methods:{
      increment(){
        //this.$store.commit("increment")
        store.commit("increment")
      },
      decrement(){
        //this.$store.commit("decrement")
        store.commit("decrement")
      }
   }
}
</script>
