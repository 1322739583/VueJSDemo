<template>
  <div id="app">
    count:{{jisuan}}   <br>
    sum:{{sum}}  <br>
    school:{{school}}   <br>
    <br>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
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
   },
   computed:{
     ...mapState({jisuan:'count'}),
     ...mapState(['sum','school'])
   }
}
</script>
