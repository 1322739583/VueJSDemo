<template>
  <div id="app">
    count:{{ this.$store.state.count }} <br>
    <button @click="increment({amount:10})">increment</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'App' ,
  methods:{
    ...mapMutations(['increment'])
  }
}
</script>
