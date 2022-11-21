<template>
  <div id="app">

    <router-view/>
    count:{{count}} in App.vue
    <br>
    <button @click="increment">increment</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
      increment(){
        this.$store.state.count++
      }
   },
  computed:{
    count(){
      return this.$store.state.count
    }
  }
}
</script>

<style>

</style>
