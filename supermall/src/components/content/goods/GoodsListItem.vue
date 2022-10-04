<template>
   <div class="goods-item">
         <img :src="goodsItem.show.img" alt="">
        <p>{{goodsItem.title}}</p>
     <div class="container">
       <span class="price">¥{{goodsItem.price}}</span>
       <i class="fa fa-star" />
       <span> {{goodsItem.cfav+0}}</span>
     </div>


   </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
   }
}
</script>

<style scoped>
    .goods-item, img{
      width: 165px;
      border-radius: 5px;
    }

    .goods-item{
         margin:5px 0;
    }
    .goods-item p{
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 5px;
      white-space: nowrap;
    }


    .goods-item i{
      line-height: 20px;
      text-align: center;
      padding-left: 5px;
      padding-right: 2px;
      color: orange;
    }

    .price{
      color: #ff8198;

    }

    .container{
      display: flex;
      justify-content: center;

      margin-top: 5px;
      font-size: 13px;
      line-height: 20px;
      text-align: center;
    }

</style>
