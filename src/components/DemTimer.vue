<template>
  <div class="timer">⏳ {{ time }}s</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const time = ref(0);
let timer: NodeJS.Timeout;

// Démarrer le timer lorsque l'événement 'start-timer' est émis
const startTimer = () => {
  if (!timer) {
    timer = setInterval(() => time.value++, 1000);
  }
};

// Arrêter le timer
const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

// Réinitialiser le timer
const reset = () => {
  stopTimer();
  time.value = 0;
};

// Écouter l'événement 'start-timer'
onMounted(() => {
  window.addEventListener('start-timer', startTimer);
  window.addEventListener('reset-timer', reset);
});

onUnmounted(() => {
  window.removeEventListener('start-timer', startTimer);
  window.removeEventListener('reset-timer', reset);
});
</script>
