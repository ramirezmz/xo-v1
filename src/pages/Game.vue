<template>
  <div>
    <h1>XO</h1>
    <div id="cellContainer">
        <div class="cell" v-for="cell in cells" :key="cell" @click="cellClicked(cell)">
            <span v-if="options[cell] !== ''">{{ options[cell] }}</span>
        </div>
    </div>
    <h2>{{ statusText }}</h2>
    <button @click="restart">Restart</button>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, reactive } from 'vue'

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

onMounted(() => {
  running.value = true
  currentPlayer.value = 'X'
})

const statusText = computed(() => {
  if (running.value) {
    return `It's ${currentPlayer.value}'s turn`
  } else {
    return `${turn.value} won!`
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

</script>

<style scoped>
.cell {
    width: 75px;
    height: 75px;
    border: 2px solid #ffffff;
    box-shadow: 0 0 0 2px;
    font-size: 50px;
    cursor: pointer;
}
#cellContainer {
    display: grid;
    grid-template-columns: repeat(3, auto);
    width: 225px;
    margin: auto;
}
</style>
