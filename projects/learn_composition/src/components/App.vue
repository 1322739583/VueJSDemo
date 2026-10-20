<template>
  <!--1.-->
  {{message}}<br>
  <button @click="changeMessage">改变数据</button>
  <br>
  <!--2.-->
  姓名:{{userInfo.name}}<br>
  年龄:{{userInfo.age}}<br>
  <button @click="changeUserInfo">改变数据</button>
  <br>
  <!--3.-->
   {{info.counter}}
  <button @click="increment">+1</button>
  <button @click="info.counter">+1</button>
</template>

<script>


import {reactive, ref} from "vue";

export default {
  name: 'App',
  components: {

  },
  setup(){
    //1.定义普通数据
    //缺点：不能响应式
    let message="Message"
    function changeMessage(){
      message="New Message"
      console.log(message)
    }

    //2.定义响应式数据
    //reactive只能传复杂类型
    //如果把简单类型写到对象里面，调用的时候比较麻烦
    let userInfo=reactive({
      name:"Tom",
      age:18
    })

    function changeUserInfo(){
      //不可以整个替换
      // userInfo={name:"Mike",age:19}
      userInfo.name="Mike"
      userInfo.age=19
    }

    //3.通过ref简单类型数据
    //ref也可以处理复杂数据
     let counter=ref(0)
     const info={
        counter
     }


    function increment(){
      counter.value++
    }


    return {
      message,
      changeMessage,
      userInfo,
      changeUserInfo,
      counter,
      increment,
      info
    }
  }
}
</script>

<style>

</style>
