<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<script setup>
import { checkLs } from '@/utils/checkLs'
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'
const userInfo = ref(checkLs())
function setUserInfo(value) {
  userInfo.value = value
  localStorage.userInfo = JSON.stringify(value)
}

function removeUserInfo() {
  userInfo.value = null
  localStorage.removeItem('userInfo')
}
provide('setUserInfo', setUserInfo)
provide('removeUserInfo', removeUserInfo)
provide('userInfo', userInfo)
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f1f1f1;
}
</style>
