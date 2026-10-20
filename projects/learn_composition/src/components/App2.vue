<template>
  账号：<input type="text" :value="account.name"><br>
  密码：<input type="password" :value="account.password"><br>
  <!--并没有双向绑定-->
  账号:{{account.name}} 密码：{{account.password}}
</template>

<script>


import {reactive, ref} from "vue";

export default {
  name: 'App',
  components: {

  },
  setup(){

   let account= ref({
     name:"Tom",
     password:"123456"
   })

    return {
        account
    }
  }
}
</script>

<style>

</style>
