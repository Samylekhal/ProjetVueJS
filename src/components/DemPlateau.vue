<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Cell from './DemCase.vue'

interface Cell {
  isOpen: boolean
  isMine: boolean
  adjacentMines: number
}

const rows = 10
const cols = 10
const mineCount = 10

const board = ref<Cell[][]>([])

const createBoard = () => {
  const newBoard: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isOpen: false,
      isMine: false,
      adjacentMines: 0,
    })),
  )

  // Placer les mines
  let minesPlaced = 0
  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * cols)
    if (!newBoard[row][col].isMine) {
      newBoard[row][col].isMine = true
      minesPlaced++
    }
  }

  // Calculer les mines adjacentes
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (newBoard[r][c].isMine) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = r + i
            const newCol = c + j
            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < cols &&
              !(i === 0 && j === 0)
            ) {
              newBoard[newRow][newCol].adjacentMines++
            }
          }
        }
      }
    }
  }

  return newBoard
}

const handleCellClick = (rowIndex: number, colIndex: number) => {
  const cell = board.value[rowIndex][colIndex]
  if (!cell.isOpen) {
    cell.isOpen = true
    // Logique pour gérer le clic sur la cellule
  }
}

onMounted(() => {
  board.value = createBoard()
})
</script>

<template>
  <div class="board">
    <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
      <Case
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :cell="cell"
        @cell-click="handleCellClick(rowIndex, colIndex)"
      />
    </div>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
}
</style>
