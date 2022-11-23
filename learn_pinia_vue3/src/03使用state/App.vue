<template>
 <div>
   user name:{{name}} <br>
   user age:{{age}} <br>
   <button @click="changeUser">改变数据</button>
   <button @click="reset">重置数据</button>
   <button @click="changeUserByPatch">通过$patch改变数据</button>
   <button @click="changeUserByNewState">通过$stae创建新state</button>
   <br>in App.vue
 </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUser } from '../store/user';

    //1.state基本的使用
    const userStore=useUser()
    //解构对象，方便直接使用，
    //解构对象默认是没有响应式的，需要调用storeToRefs支持
    const {name,age}=storeToRefs(userStore)
    function changeUser(){
        //不可以使用解构对象
        userStore.name="Mike",
        userStore.age=19
    }

    //2.内部功能reset重置state
    function reset(){
        userStore.$reset()
    }

    //3.改变state的多个属性
    function changeUserByPatch(){
        userStore.$patch({
            name:"Jack",
            age:20
        })
    }

    //4.改变state为新的对象
    //经测试，并没有新对象，和原来的对象是一样的。
    //但从语法看，我们确实是声明了新对象，pinia内部可能是对原对象内存进行了复用。
    function changeUserByNewState(){
        const oldVal=userStore.$state
        userStore.$state={
            name:"Tom",
            age:99
        }
        console.log(oldVal===userStore.$state);
    }


</script>

<style>

</style>
