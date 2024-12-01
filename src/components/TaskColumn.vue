<template>
  <div class="column">
    <div class="title">
      <p>{{ title }}</p>
    </div>
    <div class="tasks">
      <Task v-for="task of tasks" :key="task._id" :task="task" />
    </div>
  </div>
</template>

<script setup>
import Task from './Task.vue'
defineProps({
  title: String,
  tasks: Array,
})
</script>

<style lang="scss" scoped>
.column {
  width: 20%;
  margin: 0 auto;
  display: block;
}
.title {
  padding: 0 10px;
  margin: 15px 0;

  & p {
    color: #94a6be;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
  }
}
.tasks {
  width: 100%;
  display: block;
  position: relative;
}
</style>
