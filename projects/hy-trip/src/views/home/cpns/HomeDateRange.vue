<template>
  <div class="date-range" @click="showCalender=true">
    <div>
      <div class="date-tag">入住</div>
      <div class="date-time">{{ formatDate(enterTime,"M月DD日") }}</div>
    </div>
    <div class="date-total">共{{countDays}}晚</div>
    <div>
      <div class="date-tag">离开</div>
      <div class="date-time">{{ formatDate(leaveTime,"M月DD日") }}</div>
    </div>
  </div>
  <van-calendar v-model:show="showCalender" @confirm="onConfirm" color="#ff9854" type="range" />
</template>

<script setup>
import dayjs from 'dayjs'
import {ref} from 'vue'
import {formatDate} from "@/utils/timeUtil";
import {storeToRefs} from "pinia";
import {useHomeStore} from "@/stores/modules/home";
const homeStore=useHomeStore()
const {enterTime,leaveTime} = storeToRefs(homeStore)
const showCalender = ref(false)
const countDays=ref(1)
const onConfirm=(date)=>{
  enterTime.value=formatDate(date[0],"M.DD")
  leaveTime.value=formatDate(date[1],"M.DD")
  countDays.value=dayjs(date[1]).diff(date[0],'day')
  showCalender.value=false
}
</script>

<style lang="less" scoped>
.date-range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px;

  .date-tag {
    color: #cfcfcf;
  }

  .date-time {
    margin-top: 5px;
  }
}
</style>