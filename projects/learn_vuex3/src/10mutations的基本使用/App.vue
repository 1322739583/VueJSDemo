<template>
  <div id="app">
    count:{{ this.$store.state.count }} <br>
    <button @click="increment">increment</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapState } from 'vuex';

export default {
  name: 'App' ,
  methods:{
     increment(){
        //1.普通方式commit
        // this.$store.commit('increment',{amount:10})
        //2.对象形式commit
          this.$store.commit({type:'increment',amount:10})
        
     }
  } 
   
}
</script>
