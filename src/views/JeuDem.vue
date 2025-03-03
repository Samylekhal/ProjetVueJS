<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Cell {
  mine: boolean
  revealed: boolean
  adjacentMines: number
}

interface Game {
  level: number
  size: [number, number]
  mines: number
}

const currentGame = ref<Game | null>(null)
const grid = ref<Cell[][]>([])

const initializeGrid = (rows: number, cols: number) => {
  grid.value = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      mine: false,
      revealed: false,
      adjacentMines: 0,
    })),
  )
}

const placeMines = () => {
  if (currentGame.value) {
    let minesToPlace = currentGame.value.mines
    while (minesToPlace > 0) {
      const row = Math.floor(Math.random() * currentGame.value.size[0])
      const col = Math.floor(Math.random() * currentGame.value.size[1])
      if (!grid.value[row][col].mine) {
        grid.value[row][col].mine = true
        minesToPlace--
      }
    }
  }
}

const gameset: Game[] = [
  { level: 1, size: [10, 10], mines: 20 },
  { level: 2, size: [18, 14], mines: 40 },
  { level: 3, size: [24, 20], mines: 99 },
]

const route = useRoute()

const startGame = (level: number) => {
  const game = gameset.find((game) => game.level === level)
  if (game) {
    currentGame.value = game
    initializeGrid(game.size[0], game.size[1])
    placeMines()
  }
}

onMounted(() => {
  const level = Number(route.params.level)
  startGame(level)
})
</script>

<template>
  <div>
    <h1>Page de Jeu</h1>
    <div v-if="currentGame">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell">
          {{ cell.mine ? 'M' : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
}

.cell {
  width: 20px;
  height: 20px;
  border: 1px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
