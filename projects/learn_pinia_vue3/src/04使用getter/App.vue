<template>
   <div>
      counter:{{getterStore.count}}<br/>
      doubleCount:{{getterStore.doubleCount}}<br/>
      doubleCountPlus:{{getterStore.doubleCountPlus}}<br/>
      findFriend:{{getterStore.findFriend(2)}}<br/>
      showMessage:{{getterStore.showMessage}}<br/>
   </div>
</template>
<script setup>
      import {useGetter} from '../store/getter.js'
      const getterStore=useGetter()
</script>
<style scoped>
</style>