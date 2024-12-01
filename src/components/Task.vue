<template>
  <div class="wrapper">
    <div class="task">
      <div class="task-wrapper">
        <div class="theme" :style="{ backgroundColor: bgColor }">
          <p :style="{ color: textColor }">{{ task?.topic }}</p>
        </div>

        <button
          @click="$router.push({ name: 'task', params: { id: task._id } })"
          class="button-show"
        >
          <div></div>
          <div></div>
          <div></div>
        </button>
      </div>
      <div class="content">
        <a href="" target="_blank">
          <h3 class="title">{{ task?.title }}</h3>
        </a>
        <div class="date">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
          >
            <g clip-path="url(#clip0_1_415)">
              <path
                d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                stroke="#94A6BE"
                stroke-width="0.8"
                stroke-linejoin="round"
              />
              <path
                d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                stroke="#94A6BE"
                stroke-width="0.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_415">
                <rect width="13" height="13" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p>{{ new Date(task?.date).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTopicColor } from '@/composables/useTopicColor'
const props = defineProps({
  task: Object,
})

const { textColor, bgColor } = useTopicColor(props.task.topic)
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 5px;
  animation-name: card-animation;
  animation-duration: 500ms;
  animation-timing-function: linear;
}
.task {
  width: 220px;
  height: 130px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  &-wrapper {
    width: 100%;
    height: 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.theme {
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;

  & p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }
}

.button-show {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  border: none;
  background-color: transparent;

  & div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94a6be;
  }
}
.title {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000000;
  margin-bottom: 10px;
}

.content {
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.date {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & svg {
    width: 13px;
  }

  & p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: #94a6be;
    letter-spacing: 0.2px;
  }
}
</style>
