<template>
  <div class="home">
    <!--<TaskAdd/>-->
    <!--<TaskList/>-->
    <!--<TaskStatus/>-->
    <TimeTrack/>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskAdd from "@/components/todo/TaskAdd";
import TaskList from "@/components/todo/TaskList";
import TaskStatus from "@/components/todo/TaskStatus";
import TimeTrack from "@/components/track/TimeTrack";

export default {
  name: 'Home',
  components: {
    TimeTrack,
    TaskAdd, TaskList,TaskStatus
  }
}
</script>
