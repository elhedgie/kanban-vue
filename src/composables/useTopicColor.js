import { ref, watch } from 'vue'
import { getColor } from '@/utils/getColor'

export function useTopicColor(topic) {
  const textColor = ref('')
  const bgColor = ref('')

  const updateColors = (newTopic) => {
    if (newTopic) {
      const colors = getColor(newTopic)
      textColor.value = colors.text
      bgColor.value = colors.bg
    } else {
      textColor.value = ''
      bgColor.value = ''
    }
  }

  watch(
    () => topic,
    (newTopic) => {
      updateColors(newTopic)
    },
    { immediate: true },
  )

  return { textColor, bgColor }
}
