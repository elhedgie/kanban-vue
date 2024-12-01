<template>
  <BaseHeader />
  <main class="main">
    <BaseContainer>
      <div class="wrapper">
        <div class="content">
          <TaskDesk v-if="tasks.length && !loading" />
          <div class="no-tasks-message" v-else-if="!loading">Нет задач. Пока что. :)</div>
        </div>
      </div>
    </BaseContainer>
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>
    <RouterView />
  </main>
</template>

<script setup>
import BaseContainer from '@/components/BaseContainer.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import { fetchTasks } from '@/services/api'
import { inject } from 'vue'
import { provide } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
const tasks = ref([])
const loading = ref(false)
const error = ref('')
provide('tasks', tasks)
const userInfo = inject('userInfo')
onMounted(async () => {
  try {
    console.log(userInfo.value.token)
    loading.value = true
    tasks.value = await fetchTasks({ token: userInfo.value.token })
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.no-tasks-message {
  font-size: 24px;
  font-weight: 600;
  color: #94a6be;
  text-align: center;
  margin: auto;
  margin-top: 50px;
}

.no-tasks-message::before {
  content: '🙈';
  display: block;
  font-size: 36px;
  margin-bottom: 20px;
}

.main {
  width: 100%;
  background-color: #eaeef6;
}

.wrapper {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 25px 0 49px;
}

.content {
  width: 100%;
  display: flex;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Занимает всю высоту экрана */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* Полупрозрачный фон */
  z-index: 999;
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

/* Анимация для крутилки */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
