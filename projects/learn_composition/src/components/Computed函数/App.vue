<template>
  fullname:{{ fullname }}
  <br><button @click="setFullname">setname</button>
</template>

<script>
import {reactive, computed} from "vue";

export default {
  setup() {
    const names = reactive({
      firstname: "Tom",
      lastname: "Mike"
    })

    //1.写法一
    // const fullname=computed(()=>{
    //   return names.firstname+" "+names.lastname
    // })

    //2.写法二
    const fullname = computed({
      get: function () {
        return names.firstname + " " + names.lastname
      },
      set: function (newValue) {
        const temp = newValue.split(" ")
        names.firstname = temp[0]
        names.lastname = temp[1]
      }
    })

    //3.修改名字，默认调用set函数
    function setFullname(){
       fullname.value="Jack Tomson"
    }

    //4.返回的是一个ref
    console.log(fullname)

    return {
      fullname,
      setFullname
    }
  }
}
</script>

<style scoped>

</style>