<template>
    <div class="addTask">
       <input type="text" placeholder="添加任务">
    </div>
</template>

<script>
export default {
  name: "TaskAdd"
}
</script>

<style scoped>
.addTask{
  border-radius: 2px;
  border: 1px solid #ccc;
}
input{
  height: 47px;
  width: 80%;
  border: none;
}
</style>