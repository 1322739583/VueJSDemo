<template>
  <div class="time_item">
    <div class="time_line">{{timeblock}}</div>
  </div>
</template>

<script>
export default {
  name: "TimeTrack",
  data(){
    return{
        firstBlockTime:"6:00"
    }
  },
  methods:{

  },
  computed:{
    timeblock(){
      console.log("timeblock")
    }
  }
}
</script>

<style scoped>
    .time_item{
      display: flex;
      height: 50px;
    }
    .time_line{

    }
</style>