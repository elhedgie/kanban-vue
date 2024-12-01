<template>
  <nav class="nav">
    <BaseButton :onClick="goToAddTask"> Создать новую задачу </BaseButton>
    <button @click="isPopupShown = !isPopupShown" class="user-button">{{ userInfo.name }}</button>
    <div v-show="isPopupShown" class="user-menu" id="user-set-target">
      <p class="user-name">{{ userInfo.name }}</p>
      <p class="user-login">{{ userInfo.login }}</p>
      <RouterLink to="/exit">
        <BaseButton class="button-sign-in" type="secondary">Выйти</BaseButton></RouterLink
      >
    </div>
  </nav>
</template>

<script setup>
import { inject, ref } from 'vue'
import BaseButton from './BaseButton.vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()
const userInfo = inject('userInfo')
const isPopupShown = ref(false)

const goToAddTask = () => {
  router.push('/task/add')
}
</script>

<style lang="scss" scoped>
.nav {
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.user {
  &-button {
    height: 20px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 20px;
    color: #565eef;
    border: none;
    background-color: transparent;

    &::after {
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 1px;
      border-left: 1.9px solid #565eef;
      border-bottom: 1.9px solid #565eef;
      transform: rotate(-45deg);
      margin: -6px 0 0 5px;
      padding: 0;
    }
  }
  &-menu {
    position: absolute;
    top: 61px;
    right: 0;
    width: 213px;
    height: 205px;
    border-radius: 10px;
    border: 0.7px solid rgba(148, 166, 190, 0.4);
    background: #fff;
    box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
    padding: 34px;
    text-align: center;
    z-index: 2;
  }
  &-name {
    color: #000;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.14px;
    margin-bottom: 4px;
  }

  &-login {
    color: #94a6be;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
    margin-bottom: 30px;
  }
}

.button-sign-in {
  margin: 0 auto;
}
</style>
