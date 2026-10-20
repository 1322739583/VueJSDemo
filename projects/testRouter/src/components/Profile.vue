<template>
 <div>
   <h1>Profile</h1>
   <span>{{$route.query.name}}</span>
   <span>{{$route.query.age}}</span>
 </div>
</template>

<script>
export default {
  name: "Profile"
}
</script>

<style scoped>

</style>
