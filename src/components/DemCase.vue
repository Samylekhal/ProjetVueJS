<script setup lang="ts">
import { defineProps } from 'vue'
import { ref } from 'vue'

// Définition des props
const props = defineProps<{
  mine: boolean
  adjacentMines: number
}>()

// États des cases par défaut
const revealed = ref(false)
const flagged = ref(false)

// Méthodes
const reveal = () => {
  if (!flagged.value) {
    revealed.value = true
  }
}

const flag = () => {
  if (!revealed.value) {
    flagged.value = !flagged.value
  }
}


</script>

<template>
  <!-- Un clique gauche révèle la case, un clique droit pose un drapeau -->
  <button class="case" @click="reveal" @contextmenu.prevent="flag" :class="{ revealed, flagged }">
    {{ revealed ? (mine ? '💣' : adjacentMines || '') : (flagged ? '🚩' : '') }}
  </button>
</template>

