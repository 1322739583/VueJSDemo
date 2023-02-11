<template>
  <div>
      <p>求和的结果为:{{counter}}</p>
      <!--可以将字符串转数字，或者给option都加上绑定值-->
      <select v-model.number="offset">
        <option>1</option>
        <option>2</option>
        <option>3</option>
<!--        <option :="1">1</option>-->
<!--        <option :="1">2</option>-->
<!--        <option :="1">3</option>-->
      </select>
      <button @click="increament()">+</button>
      <button @click="decreament()">-</button>
      <button @click="increamentOdd()">是奇数才加</button>
      <button @click="increamentDelay()">延时加</button>
  </div>

</template>

ssh -p22 root@47.87.195.180


<script>
export default {
  name: "Counter",
  methods: {
    increament() {
      console.log("click")
      this.counter+=this.offset
    },
    decreament() {
      this.counter-=this.offset
    },
    increamentOdd() {
      if (this.counter%2===1){
        this.counter+=this.offset
      }
    },

    increamentDelay() {
      setTimeout(()=>{
          this.counter+=this.offset
      }
    ,1000)
    }
  },
  data() {
    return {
      counter: 0,
      offset:1
    }
  }
}
</script>

<style scoped>

</style>
