<template>
  <TaskColumn
    v-for="title of columnTitles"
    :key="title"
    :title="title"
    :tasks="tasks.filter((e) => e.status === title)"
  />
</template>

<script setup>
import { inject } from 'vue'
import TaskColumn from './TaskColumn.vue'
const columnTitles = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

const tasks = inject('tasks')
</script>

<style lang="scss" scoped></style>
