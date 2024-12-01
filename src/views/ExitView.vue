<template>
  <BaseModal class="title" title="Выйти из аккаунта?">
    <form class="form" id="formExit" action="#">
      <div class="form-group">
        <BaseButton :onClick="logout" style="min-width: 153px"> Да, выйти </BaseButton>
        <RouterLink to="/"
          ><BaseButton style="min-width: 153px" type="secondary">
            Нет, остаться
          </BaseButton></RouterLink
        >
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const removeUserInfo = inject('removeUserInfo')
const router = useRouter()

function logout() {
  removeUserInfo()
  router.push('/sign-in')
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.form-group {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}
</style>
