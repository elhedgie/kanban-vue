<template>
  <VCalendar />
  <VDatePicker
    :max-date="disabled ? new Date() : null"
    v-model="selectedDate"
    @update:modelValue="updateDate"
  />
</template>

<script setup>
import VCalendar from 'v-calendar'
import { ref, watch } from 'vue'
const props = defineProps({
  modelValue: { type: Date, required: true },
  disabled: {
    type: Boolean,
    default: false,
  },
})

// Эмит для отправки обновленного значения даты в родительский компонент
const emit = defineEmits(['update:modelValue'])

// Локальная переменная для выбранной даты
const selectedDate = ref(props.modelValue)

// Функция для обновления выбранной даты
const updateDate = (newDate) => {
  // Эмитим обновленное значение даты обратно в родительский компонент
  emit('update:modelValue', newDate)
  selectedDate.value = newDate
}

watch(
  () => props.modelValue,
  (newDate) => {
    selectedDate.value = newDate
  },
)
</script>

<style lang="scss">
:root {
  --vc-text-sm: 12px;
  --vc-gray-900: #94a6be;
}
.vc-pane {
  min-width: 168px;
}
.vc-week,
.vc-weekdays {
  grid-template-columns: repeat(7, 23px);
}

.vc-bordered {
  border: none;
}
</style>
