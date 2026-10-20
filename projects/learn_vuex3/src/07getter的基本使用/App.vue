<template>
  <div id="app">
    doubleCount:{{ doubleCount }} <br>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';


export default {
  name: 'App',
  methods: {
    increment() {
      this.$store.commit("increment")
      console.log(mapState({ count: 'count', sum: 'sum', school: 'school' }));
    },
    decrement() {
      this.$store.commit("decrement")
    }
  },
  computed: {
    ...mapGetters(['doubleCount'])
  }
}
</script>
