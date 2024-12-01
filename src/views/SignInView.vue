<template>
  <AuthForm :errorFields="errorFields" :error="error" :isSignUp="false" :onClick="handleSignIn" />
</template>

<script setup>
import AuthForm from '@/components/AuthForm.vue'
import { signIn } from '@/services/auth'
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
async function handleSignIn({ login, password }) {
  try {
    error.value = ''
    errorFields.value.login = false
    errorFields.value.password = false
    if (!login || !password) {
      error.value = 'Заполните все поля'
      if (!login) {
        errorFields.value.login = true
      }
      if (!password) {
        errorFields.value.password = true
      }
      return
    }
    const data = await signIn({ login, password })
    setUserInfo(data)
    await router.push('/')
  } catch (err) {
    error.value = err.message
    errorFields.value.login = true
    errorFields.value.password = true
  }
}
</script>

<style lang="scss" scoped></style>
