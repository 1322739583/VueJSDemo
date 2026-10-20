<template>
  <div id="app">
    count:{{this.$store.state.count}}   <br>
    sum:{{this.$store.state.sum}}  <br>
    school:{{this.$store.state.school}}   <br>
    <br>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{
      increment(){
        this.$store.commit("increment")
      },
      decrement(){
        this.$store.commit("decrement")
      }
   }
}
</script>
