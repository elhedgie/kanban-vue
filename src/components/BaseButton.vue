<template>
  <button
    :style="$attrs.style"
    @click="onClick"
    :class="[type ?? 'primary', { fullWidth: fullWidth }]"
    class="button"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  fullWidth: {
    require: false,
    type: Boolean,
  },
  type: String,
  onClick: Object,
})
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  height: 30px;
  border-radius: 4px;
}
.primary {
  background-color: $button-primary-bg;
  color: $button-primary-text;
}
.secondary {
  background-color: $button-secondary-bg;
  color: $button-secondary-text;
  border: $button-secondary-border;
}

.fullWidth {
  width: 100%;
}

.disabled {
  background-color: $button-disabled-bg;
  color: $button-disabled-text;
  border: none;
}
</style>
