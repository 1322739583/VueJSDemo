<template>
  <div id="app">
    count:{{count}}   <br>
    sum:{{sum}}  <br>
    school:{{school}}   <br>
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
   },
   computed:{
    count(){
      return this.$store.state.count
    },
    sum(){
      return this.$store.state.sum
    },
    school(){
      return this.$store.state.school
    }
   }
}
</script>
