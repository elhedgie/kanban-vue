<template>
  <component
    :is="tag"
    :class="tag === 'textarea' ? 'area' : 'input'"
    :type="tag === 'input' ? type : null"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    v-bind="attrs"
    :value="modelValue"
    @input="updateValue($event)"
  />
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: 'input', // input или textarea
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '', // Значение по умолчанию для v-model
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text', // Для input
  },
  attrs: {
    type: Object,
  },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
  // Обрабатываем изменение и эмитим обновление
  emit('update:modelValue', event.target.value.trim())
}
</script>

<style lang="scss" scoped>
.input,
.area {
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
  }
}
.area {
  min-height: 200px;
}

.error {
  outline: 0.7px solid $error;
}
</style>
