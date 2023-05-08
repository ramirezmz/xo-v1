<template>
  <div class="game-container">
    <RouterLink to="/" class="turn-back">
        <img src="../assets/ArrowBackIosNewFilled.svg"/>
        <span>Voltar</span>
    </RouterLink>
    <h2 class="game-title paragraph">{{ statusText }}</h2>
    <div class="cell-container">
        <div class="cell" v-for="cell in cells" :key="cell" @click="cellClicked(cell)" @keydown="handleKeyDown" :tabindex="cell" :class="{selected: cell === selectedCellIndex}">
            <span v-if="options[cell] !== ''" :class="options[cell] === 'O' ? 'o-text' : 'x-text'">{{ options[cell] }}</span>
        </div>
    </div>
    <Timer />
    <button class="button-game" @click="restart">Restart</button>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, reactive, watch } from 'vue'
import Timer from '../components/Timer.vue'

const winCondition = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
  [0, 4, 8], [2, 4, 6] // diagonal
]
const cells = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8])
const options = ref(['', '', '', '', '', '', '', '', ''])
const turn = ref('')
const running = ref(true)
const currentPlayer = ref('X')
const selectedCellIndex = ref(0)

onMounted(() => {
  running.value = true
  currentPlayer.value = 'X'
  selectedCellIndex.value = -1
})

const statusText = computed(() => {
  if (running.value) {
    return `É a vez de ${currentPlayer.value}`
  } else {
    return `${turn.value} ganhou, parabéns!`
  }
})

function cellClicked (value: number) {
  if (options.value[value] !== '' || !running.value) return
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
    if (options.value[a] && options.value[a] === options.value[b] && options.value[a] === options.value[c]) {
      running.value = false
      turn.value = options.value[a]
    }
  }
}

function restart () {
  running.value = true
  currentPlayer.value = 'X'
  options.value = ['', '', '', '', '', '', '', '', '']
}

function handleKeyDown (event: KeyboardEvent) {
  const keysAbleToUse = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter']
  if (!keysAbleToUse.includes(event.key)) return
  if (!running.value) return
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
.paragraph {
    display: block;
    opacity: 0;
    animation: reveal 0.5s forwards 0s;
}
@keyframes reveal {
    from { transform: translateY(20px);}
    to { opacity: 1; transform: none;}
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
    height:92px;
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
.cell:nth-child(n+7) {
    border-bottom: none;
}
.cell:hover,
.cell:focus {
  box-shadow: inset 6px 6px 1px  #ffffff, inset -6px -6px 1px  #ffffff;
  transition: box-shadow 0.2s ease-in-out;
}
.selected {
    box-shadow: inset 6px 6px 1px  #ffffff, inset -6px -6px 1px  #ffffff;
    transition: box-shadow 0.2s ease-in-out;
}
.turn-back{
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 20px -30px 24px;
}
.turn-back img {
    width: 24px;
    height: 24px;
    margin: 0 8px 0 0;
}
.turn-back span {
    margin-left: -5px;
    color: #ffffff;
}

.button-game {
  padding: 20px;
  background-color: red;
}

.o-text {
    color: #6C8E9D;
}
.x-text {
    color: #D3D089;
}
</style>
