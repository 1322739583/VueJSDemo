<template>
  <div class="recommands">
    <div v-for="item in recommands" class="recommands-item">
        <div>
          <a :href="item.link">
            <img :src="item.image" alt="">
          </a>
        </div>
        <span>{{item.title}}</span>
    </div>

  </div>

</template>

<script>
export default {
  name: "RecommandView",
  props:{
    recommands:{
      type:Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
   .recommands{
     display: flex;
     text-align: center;
     font-size: 10px;
   }

   .recommands-item{
     flex: 1;
     margin-top: 10px;
     padding-bottom: 20px;
     border-bottom: 8px solid #eee;
   }

   .recommands img{
     width: 65px;
     height: 65px;
     margin-bottom: 8px;
   }




</style>
