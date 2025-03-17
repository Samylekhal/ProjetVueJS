<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DemCase from './DemCase.vue'

// Définition des props
const props = defineProps<{
  rows: number
  cols: number
  minesCount: number
}>()

// Interface pour une case
interface CaseType {
  x: number
  y: number
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  minesAround: number
}

// Initialisation de la grille vide
const grid = ref<CaseType[][]>([])

const initGrid = () => {
  grid.value = Array.from({ length: props.rows }, (_, y) =>
    Array.from({ length: props.cols }, (_, x) => ({
      x,
      y,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      minesAround: 0
    }))
  )
} 

// Fonction pour révéler une case
const revealCase = (x: number, y: number) => {
  const cell = grid.value[y][x]
  if (!cell.isRevealed) {
    cell.isRevealed = true
  }
}

// Fonction pour poser/enlever un drapeau
const flagCase = (x: number, y: number) => {
  const cell = grid.value[y][x]
  if (!cell.isRevealed) {
    cell.isFlagged = !cell.isFlagged
  }
}



onMounted(() => {
  initGrid();
});

</script>

<template>
  <div class="grid" >
    <div v-for="(row, y) in grid" :key="y" class="row">
    <DemCase
      v-for="(cell, x) in row"
      :key="x"
      :mine="cell.isMine"
      :adjacentMines="cell.minesAround"
      @click="() => revealCase(cell.x, cell.y)"
      @contextmenu.prevent="() => flagCase(cell.x, cell.y)"

    />
  </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 30px); /* Nombre de colonnes dynamiques */
  margin: 0 auto;
}

.row {
  display: grid;
  grid-template-columns: repeat(100%, 1fr); /* Un seul élément par ligne */
}

.case {
  width: 30px;
  height: 30px;
  border: 1px solid #b1dd9a;
  background-color: #1a1818;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.revealed {
  background-color: #b1dd9a;
}

.flagged {
  background-color: #1a1818;
}
</style>
