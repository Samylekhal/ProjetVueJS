<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  isRunning: boolean
  hasLost: boolean
  hasWon: boolean
}>()

const time = ref(0)
let timer: ReturnType<typeof setInterval> | null = null


// Fonction pour démarrer le timer
const startTimer = () => {
  if (!timer) {
    timer = setInterval(() => {
      time.value++
    }, 1000)
  }
}

// Fonction pour arrêter le timer
const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// Surveille les changements d'état du jeu
watch(() => props.isRunning, (newVal) => {
  if (newVal) {
    startTimer()
  }
})

watch(() => [props.hasLost, props.hasWon], ([lost, won]) => {
  if (lost || won) {
    stopTimer()
  }
})
</script>

<template>
  <div class="timer">
    ⏳ Temps écoulé : {{ time }}s
  </div>
</template>


