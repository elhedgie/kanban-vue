<template>
  <div class="popup-bg" id="popExit">
    <div class="container">
      <div :style="$attrs.style" class="block">
        <h2 :class="$attrs.class" class="title">{{ title }}</h2>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
defineProps({
  title: String,
})

onMounted(() => {
  document.body.style = 'overflow-y: hidden'
})

onUnmounted(() => {
  document.body.style = 'overflow-y: auto'
})
</script>

<style lang="scss" scoped>
.popup-bg {
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}

.container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}

.block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 370px;
  width: 100%;
  padding: 40px 30px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  position: relative;
}

.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.4px;
  margin-bottom: 20px;
}
</style>
