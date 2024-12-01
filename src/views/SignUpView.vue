<template>
  <AuthForm :errorFields="errorFields" :error="error" :onClick="handleSignUp" :isSignUp="true" />
</template>

<script setup>
import AuthForm from '@/components/AuthForm.vue'
import { signUp } from '@/services/auth'
import { ref } from 'vue'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const error = ref('')
const errorFields = ref({
  login: false,
  password: false,
})
const router = useRouter()
const setUserInfo = inject('setUserInfo')
async function handleSignUp({ login, name, password }) {
  try {
    error.value = ''
    errorFields.value.login = false
    errorFields.value.name = false
    errorFields.value.password = false
    if (!login || !name || !password) {
      error.value = 'Заполните все поля'
      if (!login) {
        errorFields.value.login = true
      }
      if (!name) {
        errorFields.value.name = true
      }
      if (!password) {
        errorFields.value.password = true
      }
      return
    }
    const data = await signUp({ login, name, password })
    setUserInfo(data)
    await router.push('/')
  } catch (err) {
    error.value = err.message
    errorFields.value.login = true
    errorFields.value.name = true
    errorFields.value.password = true
  }
}
</script>

<style lang="scss" scoped></style>
