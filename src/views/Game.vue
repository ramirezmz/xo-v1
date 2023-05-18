<template>
    <div class="game-container">
        <GoBack />
        <h2 class="game-title paragraph">{{ statusText }}</h2>
        <div class="cell-container">
            <div
                class="cell"
                v-for="cell in cells"
                :key="cell"
                @click="cellClicked(cell)"
                @keydown="handleKeyDown"
                :tabindex="cell"
                :class="{ selected: cell === selectedCellIndex }"
            >
                <span
                    v-if="options[cell] !== ''"
                    :class="options[cell] === 'O' ? 'o-text' : 'x-text'"
                    >{{ options[cell] }}</span
                >
            </div>
        </div>
        <Timer :start="startTime" />
        <button @click="restart">Restart</button>
        <div
            v-if="showBlurWins"
            class="win-blur-background"
            @click="removeBlur"
        >
            <h1>{{ whoWins }}</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch } from 'vue'
import Timer from '../components/Timer.vue'
import GoBack from '../components/GoBack.vue'

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // horizontal
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // vertical
  [0, 4, 8],
  [2, 4, 6] // diagonal
]
const cells = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8])
const options = ref(['', '', '', '', '', '', '', '', ''])
const turn = ref('')
const currentPlayer = ref('X')
const selectedCellIndex = ref(0)
const startTime = ref(false)
const showBlurWins = ref(false)

onMounted(() => {
  startTime.value = true
  currentPlayer.value = 'X'
  selectedCellIndex.value = -1
})

const statusText = computed(() => {
  if (startTime.value) {
    return `É a vez de ${currentPlayer.value}`
  } else {
    return `${turn.value} ganhou, parabéns!`
  }
})
const whoWins = computed(() => {
  if (startTime.value) {
    return ''
  } else {
    return `${turn.value} ganhou, parabéns!`
  }
})

function removeBlur () {
  showBlurWins.value = false
}

function cellClicked (value: number) {
  if (options.value[value] !== '' || !startTime.value) return
  updateCell(value)
}
function updateCell (value: number) {
  options.value[value] = currentPlayer.value
  checkWinCondition()
  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
}

function checkWinCondition () {
  for (let i = 0; i < winCondition.length; i++) {
    const [a, b, c] = winCondition[i]
    if (
      options.value[a] &&
            options.value[a] === options.value[b] &&
            options.value[a] === options.value[c]
    ) {
      startTime.value = false
      showBlurWins.value = true
      turn.value = options.value[a]
    }
  }
}

function restart () {
  startTime.value = true
  currentPlayer.value = 'X'
  options.value = ['', '', '', '', '', '', '', '', '']
}

function handleKeyDown (event: KeyboardEvent) {
  const keysAbleToUse = [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Enter'
  ]
  if (!keysAbleToUse.includes(event.key)) return
  if (!startTime.value) return
  if (event.key === 'ArrowUp') {
    if (selectedCellIndex.value - 3 < 0) return
    selectedCellIndex.value -= 3
  }
  if (event.key === 'ArrowDown') {
    if (selectedCellIndex.value + 3 > 8) return
    selectedCellIndex.value += 3
  }
  if (event.key === 'ArrowLeft') {
    if (selectedCellIndex.value - 1 < 0) return
    selectedCellIndex.value -= 1
  }
  if (event.key === 'ArrowRight') {
    if (selectedCellIndex.value + 1 > 8) return
    selectedCellIndex.value += 1
  }
  if (event.key === 'Enter') {
    cellClicked(selectedCellIndex.value)
  }
}

watch(statusText, () => {
  const title = document.querySelector('.game-title') as HTMLElement
  title?.classList.remove('paragraph')
  void title?.offsetWidth
  title?.classList.add('paragraph')
})
</script>

<style scoped>
.game-title {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    padding: 32px 0 42px;
}

.win-blur-background {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 0;
}
.win-blur-background h1 {
    color: #ffffff;
}
.paragraph {
    display: block;
    opacity: 0;
    animation: reveal 0.5s forwards 0s;
}
@keyframes reveal {
    from {
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: none;
    }
}
.cell-container {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, auto);
    width: 225px;
    margin: auto;
    margin-top: 24px;
}
.cell {
    width: 92px;
    height: 92px;
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    font-size: 50px;
    cursor: pointer;
    font-weight: 700;
    padding-top: 15px;
}
.cell:nth-child(3n) {
    border-right: none;
}
.cell:nth-child(n + 7) {
    border-bottom: none;
}
.cell:hover,
.cell:focus {
    box-shadow: inset 2px 2px 1px #ffffff, inset -2px -2px 1px #ffffff;
    transition: box-shadow 0.2s ease-in-out;
}
.selected {
    box-shadow: inset 2px 2px 1px #ffffff, inset -2px -2px 1px #ffffff;
    transition: box-shadow 0.2s ease-in-out;
}

.button-game {
    padding: 20px;
    background-color: red;
}

.o-text {
    color: #6c8e9d;
}
.x-text {
    color: #d3d089;
}
</style>
