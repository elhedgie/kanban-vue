<template>
  <div class="not-found">
    <div class="animation-wrapper">
      <div class="bubble">
        <p>404</p>
      </div>
    </div>
    <h1>Ой, страница потерялась 😿</h1>
    <p>
      Кажется, вы свернули не туда. Попробуйте вернуться на <RouterLink to="/">главную</RouterLink>.
    </p>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  background: #fef6e4;
  color: #ff6f61;
  font-family: 'Poppins', sans-serif;
  animation: fadeIn 1s ease-in-out;

  h1 {
    font-size: 2rem;
    margin: 1rem 0;
  }

  p {
    font-size: 1.2rem;

    a {
      text-decoration: none;
      color: #007bff;
      font-weight: bold;
      transition: color 0.3s;

      &:hover {
        color: #0056b3;
      }
    }
  }
}

.animation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin-bottom: 2rem;
}

.bubble {
  background: #ff6f61;
  color: #fff;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  animation: bounce 2s infinite;
}

/* Keyframe Animations */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
