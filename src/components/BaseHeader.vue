<template>
  <header class="header">
    <BaseContainer>
      <div class="wrapper">
        <div class="logo">
          <RouterLink to="/"><img src="/src/assets/images/logo.png" alt="logo" /></RouterLink>
        </div>
        <HeaderNav />
      </div>
    </BaseContainer>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import BaseContainer from './BaseContainer.vue'
import HeaderNav from './HeaderNav.vue'
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
}
.wrapper {
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
}

.logo {
  & img {
    width: 85px;
  }
}
</style>
