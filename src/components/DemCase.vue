<script setup lang="ts">
import { defineProps } from 'vue'
import { ref } from 'vue'

// Définition des props
const props = defineProps<{
  mine: boolean
  adjacentMines: number
}>()

// États internes (équivalent de `data()`)
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
  <button class="case" @click="reveal" @contextmenu.prevent="flag" :class="{ revealed, flagged }">
    {{ revealed ? (mine ? '💣' : adjacentMines || '') : (flagged ? '🚩' : '') }}
  </button>
</template>

