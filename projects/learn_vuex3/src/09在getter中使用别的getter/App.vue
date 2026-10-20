<template>
  <div id="app">
    doubleCount:{{ this.$store.getters.doubleCount }} <br>
    showCount:{{ this.$store.getters.showCount }} <br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App' ,
  computed:{
    ...mapGetters(['doubleCount','showCount'])
  }
}
</script>
