<template>
  <div class="cell" @click="revealCell" :class="{ revealed: isRevealed, mine: isMine }">
    <span v-if="isRevealed && !isMine">{{ adjacentMines > 0 ? adjacentMines : '' }}</span>
    <span v-if="isRevealed && isMine">💣</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  isRevealed: boolean
  isMine: boolean
  adjacentMines: number
  revealCell: () => void
}>()
</script>

<style scoped>
.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f0f0f0;
}

.cell.revealed {
  background-color: #fff;
}

.cell.mine {
  background-color: red;
}
</style>
