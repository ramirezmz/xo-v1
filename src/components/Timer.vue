<template>
  <div class="timer-container">
    <h1>{{ timeString }}</h1>
    <span>TEMPO PASSADO</span>
    <button @click="startTimer">start</button>
    <button @click="stopTimer">stop</button>
    <button @click="resetTimer">reset</button>
    {{ start }}
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'

const props = defineProps<{
  start?: boolean
}>()

const time = ref(0)
const timerInterval = ref(null) as any
const timeString = ref('00:00')

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

function resetTimer () {
  stopTimer()
  time.value = 0
  timeString.value = '00:00'
}

watch(() => props.start, (value) => {
  if (value) {
    startTimer()
  } else {
    stopTimer()
  }
})
</script>
