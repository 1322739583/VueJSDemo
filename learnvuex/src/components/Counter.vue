<template>
  <div>
    <p>求和的结果为:{{counter}}</p>
    <!--可以将字符串转数字，或者给option都加上绑定值-->
    <select v-model.number="offset">
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
    <button @click="increament()">+</button>
    <button @click="decreament()">-</button>
    <button @click="increamentOdd()">是奇数才加</button>
    <button @click="increamentDelay()">延时加</button>
  </div>
</template>

<script>
export default {
  name: "Counter"
}
</script>

<style scoped>

</style>
