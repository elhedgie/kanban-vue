export function getColor(topic) {
  switch (topic) {
    case 'Research':
      return {
        text: '#06B16E',
        bg: '#B4FDD1',
      }
    case 'Web Design':
      return {
        text: '#FF6D00',
        bg: '#FFE4C2',
      }
    case 'Copywriting':
      return {
        text: '#9A48F1',
        bg: '#E9D4FF',
      }
    default:
      return {
        text: '#FFFFFF',
        bg: '#94A6BE',
      }
  }
}
