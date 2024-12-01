<template>
  <BaseModal class="task-title" style="min-width: 630px" :title="task.title">
    <TaskTopic class="task-topic" :topic="task.topic" :key="task.topic" />
    <div class="status">
      <p class="title">Статус</p>
      <div class="themes">
        <template v-if="editMode">
          <label
            class="theme"
            :class="{ active: task.status === status }"
            v-for="status in statuses"
            :key="status"
          >
            <input type="radio" :value="status" v-model="task.status" />
            <p :class="{ _gray: status === 'Нужно сделать' }">{{ status }}</p>
          </label>
        </template>
        <template v-else>
          <div class="theme active">
            <p>{{ task.status }}</p>
          </div>
        </template>
      </div>
    </div>
    <div class="wrap">
      <form class="form" id="formBrowseCard" action="#">
        <div class="block">
          <label for="textArea01" class="title">Описание задачи</label>
          <BaseInput
            :class="[{ error: errorFields.description }]"
            tag="textarea"
            class="area"
            name="text"
            id="textArea01"
            :readonly="!editMode"
            placeholder="Введите описание задачи..."
            v-model="task.description"
          ></BaseInput>
        </div>
      </form>
      <TaskCalendar :disabled="editMode" v-model="task.date" :key="task.date" />
    </div>

    <div class="button-wrapper">
      <template v-if="!editMode">
        <div class="button-group">
          <BaseButton :onClick="setEditMode" type="secondary" class="button-edit">
            Редактировать задачу
          </BaseButton>
          <BaseButton :onClick="handleDeleteTask" type="secondary" class="button-delete"
            >Удалить задачу</BaseButton
          >
        </div>
      </template>
      <template v-else>
        <div class="button-group">
          <BaseButton :onClick="handleEditTask" class="button-save">Сохранить</BaseButton>
          <BaseButton :onClick="resetEdition" type="secondary" class="button-edit"
            >Отменить</BaseButton
          >
          <BaseButton
            :onClick="handleDeleteTask"
            type="secondary"
            class="button-delete"
            id="btnDelete"
          >
            Удалить задачу
          </BaseButton>
        </div>
      </template>
      <p>{{ error }}</p>
      <RouterLink to="/"><BaseButton class="button-close">Закрыть</BaseButton></RouterLink>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseModal from '@/components/BaseModal.vue'
import TaskCalendar from '@/components/TaskCalendar.vue'
import TaskTopic from '@/components/TaskTopic.vue'
import { deleteTask, editTask } from '@/services/api'
import { watch } from 'vue'
import { ref } from 'vue'
import { inject } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: String,
})
const router = useRouter()
const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']
const editMode = ref(false)
const tasks = inject('tasks')
const userInfo = inject('userInfo')
const error = ref('')
const errorFields = ref({
  description: false,
})
const task = ref({
  title: '',
  description: '',
  date: '',
  status: '',
  topic: '',
})
const currentTaskDefault = ref(task.value)
function setEditMode() {
  editMode.value = !editMode.value
}

function resetEdition() {
  editMode.value = false
  error.value = ''
  errorFields.value.description = false
  task.value = { ...currentTaskDefault.value }
}

async function handleEditTask(event) {
  event.preventDefault()
  errorFields.value.title = false
  errorFields.value.description = false
  error.value = ''
  console.log(task.value)
  try {
    if (!task.value.description) {
      error.value = 'Заполните все поля'

      errorFields.value.description = true

      return
    }
    const data = await editTask({
      token: userInfo?.value.token,
      id: props.id,
      task: task.value,
    })
    tasks.value = data
    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}

async function handleDeleteTask(event) {
  event.preventDefault()
  try {
    const data = await deleteTask({
      token: userInfo?.value.token,
      id: task.value._id,
    })
    tasks.value = data
    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}
watch(
  () => tasks.value,
  (newTasks) => {
    if (newTasks.length) {
      const currentTask = newTasks.find((t) => t._id === props.id)
      if (!currentTask) return router.push('/')
      task.value = { ...currentTask, date: new Date(currentTask.date) }
      currentTaskDefault.value = { ...currentTask }
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.task-title {
  text-align: left;
}
.task-topic {
  margin-left: auto;
  width: fit-content;
}
.theme {
  text-align: right;
  opacity: 1;
}

.top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.title {
  margin-bottom: 14px;
  font-size: 14px;
  letter-spacing: -0.14px;
  font-weight: 600;
}

.wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;

  .block {
    display: flex;
    flex-direction: column;
  }
}

.button-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  & button {
    height: 30px;
    margin-bottom: 10px;
    padding: 0 14px;
  }
}
.button-group {
  display: flex;
  gap: 8px;
}
.status {
  margin-bottom: 11px;

  .themes {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 7px;
  }

  .theme {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 0 16px;
    border-radius: 24px;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    color: #94a6be;
    font-size: 14px;

    & input {
      appearance: none;
    }
    &.active {
      background-color: #94a6be;
      color: #ffffff;
    }
  }
}
</style>
