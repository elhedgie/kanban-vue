<template>
  <div class="modal">
    <div class="wrapper">
      <h2 class="title">{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
      <form class="form" id="form" action="#" @submit="handleSubmit">
        <div class="input-wrapper">
          <BaseInput
            tag="input"
            :class="[{ error: nameFieldError }]"
            v-show="isSignUp"
            class="auth-input"
            type="text"
            name="name"
            id="formname"
            placeholder="Имя"
            v-model="name"
          />
          <BaseInput
            tag="input"
            :class="[{ error: loginFieldError }]"
            class="auth-input"
            type="text"
            name="login"
            id="formlogin"
            placeholder="Эл. почта"
            v-model="login"
          />
          <BaseInput
            tag="input"
            :class="[{ error: passwordFieldError }]"
            class="auth-input"
            type="password"
            name="password"
            id="formpassword"
            placeholder="Пароль"
            v-model="password"
          />
          <p v-show="error" class="error-text">
            {{ error }}
          </p>
        </div>

        <BaseButton :onClick="onClick" type="primary" :fullWidth="true" class="button-enter">
          {{ isSignUp ? 'Зарегистрироваться' : 'Войти' }}
        </BaseButton>
        <div v-show="!isSignUp" class="form-group">
          <p>Нужно зарегистрироваться?</p>
          <RouterLink to="/sign-up">Регистрируйтесь здесь</RouterLink>
        </div>
        <div v-show="isSignUp" class="form-group">
          <p>Уже есть аккаунт?<RouterLink to="/sign-in">Войдите здесь</RouterLink></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import BaseButton from './BaseButton.vue'
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
const props = defineProps({
  isSignUp: Boolean,
  onClick: Function,
  error: String,
  errorFields: Object,
})

const name = ref('')
const login = ref('')
const password = ref('')

const nameFieldError = ref(false)
const loginFieldError = ref(false)
const passwordFieldError = ref(false)

async function handleSubmit(event) {
  event.preventDefault()
  const userData = props.isSignUp
    ? { name: name.value, login: login.value, password: password.value }
    : { login: login.value, password: password.value }
  await props.onClick(userData)
}

watch(props.errorFields, () => {
  nameFieldError.value = false
  loginFieldError.value = false
  passwordFieldError.value = false

  if (props.errorFields?.name) {
    nameFieldError.value = true
  }
  if (props.errorFields?.login) {
    loginFieldError.value = true
  }
  if (props.errorFields?.password) {
    passwordFieldError.value = true
  }
})
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrapper {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}

.title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 20px;
}

.button-enter {
  margin-bottom: 20px;
}
.form-group {
  text-align: center;

  & p,
  a {
    color: rgba(148, 166, 190, 0.4);
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.14px;
  }
  & a {
    text-decoration: underline;
  }
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 7px;
  margin-bottom: 20px;
}

.error-text {
  color: $error;
}

.auth-input {
  height: 30px;
}
</style>
