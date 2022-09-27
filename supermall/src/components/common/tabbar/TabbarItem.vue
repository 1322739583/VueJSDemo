<template>
      <div class="tabbar-item" @click="itemClick()">
        <!--需要给每个slot套一个div，因为我们需要添加v-if判断，这些东西不能写在slot上，被替换的时候就没有了-->
        <div v-if="!isActive">
          <slot name="item-icon"></slot>
        </div>
        <div v-else>
          <slot name="item-icon-active"></slot>
        </div>
        <!--通过改变.active选择器的样式来修改文字样式-->
        <div :style="styleColor">
          <slot name="item-text"></slot>
        </div>

      </div>
</template>

<script>
export default {
  name: "TabbarItem",
  props:{
    path:{
      type:String,
      required:true
    },
    activeColor:{
      type:String,
      default:"dodgerblue"
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  },
  computed:{
    isActive(){
      // console.log(this.$route.path.contains(this.path))
     console.log("tag1 "+this.$route.path)
    //  console.log("tag1 "+this.path)
      return this.$route.path.indexOf(this.path)!==-1
    },
    styleColor(){
      return this.isActive?{color:this.activeColor}:{}
    }
  }
}
</script>

<style scoped>
.tabbar-item {
  height: 49px;
  text-align: center;
  flex: 1;
  font-size: 14px;
  margin-top: 3px;

  /*flex-grow: 1;*/
}

.tabbar-item img {
  width: 24px;
  height: 24px;
  /*去除图片本身的边距*/
  vertical-align: middle;
  margin-bottom: 2px;
}

/*.active{*/
/*   color: dodgerblue;*/
/*}*/
</style>
