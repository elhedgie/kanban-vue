<template>
  <BaseModal style="min-width: 630px" title="Создание задачи">
    <RouterLink to="/" class="button-close">&#10006;</RouterLink>
    <div class="wrapper">
      <form @submit="submitTask" class="form" id="formNewCard" action="#">
        <div class="block">
          <label for="formTitle" class="title">Название задачи</label>
          <BaseInput
            :class="[{ error: errorFields.title }]"
            tag="input"
            class="input"
            type="text"
            name="name"
            id="formTitle"
            placeholder="Введите название задачи..."
            autofocus
            v-model="title"
          />
        </div>
        <div class="block">
          <label for="textArea" class="title">Описание задачи</label>
          <BaseInput
            :class="[{ error: errorFields.description }]"
            tag="textarea"
            class="area"
            name="text"
            id="textArea"
            placeholder="Введите описание задачи..."
            v-model="description"
          ></BaseInput>
        </div>
      </form>
      <TaskCalendar v-model="date" />
    </div>
    <div class="categories">
      <p class="title">Категория</p>
      <div class="categories-wrapper">
        <TaskTopic
          v-for="topic of topicList"
          :topic="topic"
          :key="topic"
          :style="{ opacity: selectedTopic === topic ? 1 : 0.4 }"
          v-model="selectedTopic"
          isInput
        />
      </div>
    </div>
    <p class="error-text">{{ error }}</p>
    <BaseButton :onClick="submitTask" class="button-add">Создать задачу</BaseButton>
  </BaseModal>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseModal from '@/components/BaseModal.vue'
import TaskCalendar from '@/components/TaskCalendar.vue'
import TaskTopic from '@/components/TaskTopic.vue'
import { postTask } from '@/services/api'
import { inject } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

const selectedTopic = ref('Web Design')
const topicList = ['Web Design', 'Research', 'Copywriting']
const errorFields = ref({
  title: false,
  description: false,
})
const error = ref('')
const title = ref('')
const description = ref('')
const date = ref(new Date())
const router = useRouter()
const tasks = inject('tasks')
const userInfo = inject('userInfo')

async function submitTask(event) {
  event.preventDefault()
  errorFields.value.title = false
  errorFields.value.description = false
  error.value = ''
  if (!title.value || !description.value) {
    error.value = 'Заполните все поля'
    if (!title.value) {
      errorFields.value.title = true
    }
    if (!description.value) {
      errorFields.value.description = true
    }
    return
  }
  try {
    const data = await postTask({
      token: userInfo?.value.token,
      task: {
        title: title.value,
        description: description.value,
        date: date.value,
        topic: selectedTopic.value,
        status: 'Без статуса',
      },
    })
    router.push('/')
    console.log(data)
    tasks.value = data
  } catch (err) {
    error.value = err
  }
}
</script>

<style lang="scss" scoped>
.button-close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: #94a6be;
  cursor: pointer;

  &:hover {
    color: #000000;
  }
}

.wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.form {
  width: 370px;
  display: block;
  margin-bottom: 20px;
}

.block {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input {
  margin: 20px 0;
}
.area {
  max-width: 370px;
  margin-top: 14px;
  height: 200px;
}

.button-add {
  margin-left: auto;
}

.title {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.categories {
  margin-bottom: 20px;

  & p {
    margin-bottom: 14px;
  }

  &-wrapper {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
  }
}

.error-text {
  color: $error;
}
</style>
