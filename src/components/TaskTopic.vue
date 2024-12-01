<template>
  <div v-if="isInput">
    <label
      class="topic"
      :style="{
        backgroundColor: bgColor,
      }"
    >
      <input
        class="topic-input"
        type="radio"
        :value="topic"
        :checked="modelValue === topic"
        @change="selectTopic"
      />
      <p class="topic-text" :style="[$attrs.style, { color: textColor }]">{{ topic }}</p>
    </label>
  </div>
  <div v-else class="topic" :style="{ backgroundColor: bgColor }">
    <p class="topic-text" :style="{ color: textColor }">{{ topic }}</p>
  </div>
</template>

<script setup>
import { useTopicColor } from '@/composables/useTopicColor'
import { onMounted, ref, watch } from 'vue'
const props = defineProps({
  topic: String,
  isInput: Boolean,
  modelValue: String,
})
const { textColor, bgColor } = useTopicColor(props.topic)
const emit = defineEmits(['update:modelValue'])
const selectTopic = () => {
  emit('update:modelValue', props.topic) // Обновляем значение родительского компонента
}
onMounted(() => {
  console.log(textColor.value, 'check')
})
</script>

<style lang="scss" scoped>
.topic {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
}

.topic-text {
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
}

.topic-input {
  appearance: none;
}
</style>
