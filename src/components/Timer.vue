<template>
  <div class="timer-container">
    <h1>{{ timeString }}</h1>
    <span>{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, computed } from 'vue'

const props = defineProps<{
  start?: boolean
}>()

const time = ref(0)
const timerInterval = ref(null) as any
const timeString = ref('00:00')

const title = computed(() => {
  return props.start ? 'TEMPO PASSADO' : 'FIM DO JOGO⌛'
})

function formatTime (seconds: number): string {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainingSeconds}`
}

function updateTime () {
  time.value++
  timeString.value = formatTime(time.value)
}

function startTimer () {
  if (!timerInterval.value) {
    timerInterval.value = setInterval(updateTime, 1000)
  }
}

function stopTimer () {
  clearInterval(timerInterval.value)
  timerInterval.value = null
}

function restartTimer () {
  time.value = 0
  timeString.value = formatTime(time.value)
}

watch(() => props.start, (value) => {
  console.log(props.start)
  if (value) {
    startTimer()
  } else {
    stopTimer()
    if (time.value > 0) {
      restartTimer()
    }
  }
})
</script>
<style scoped>
.timer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
}
.timer-container h1 {
    font-weight: 100;
    font-size: 3.5rem;
}
.timer-container span {
    font-size: 1.1rem;
    font-weight: 100;
    margin-top: -20px;
}
</style>
