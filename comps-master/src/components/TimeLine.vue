<template>
   <div class="timeline">
     <div class="time-wrapper">
       <div class="dot"/>
       <span>2022-6-6</span>
     </div>
   </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .dot{
     background-color: lightblue;
     height: 20px;
     width: 20px;
     border-radius: 50%;
   }
</style>
