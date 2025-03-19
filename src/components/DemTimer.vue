<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDataScoreStore } from '@/stores/firebaseStore';

const props = defineProps<{
  isRunning: boolean;
  hasLost: boolean;
  hasWon: boolean;
}>();

const time = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;
const dataScoreStore = useDataScoreStore();

// Fonction pour démarrer le timer
const startTimer = () => {
  if (!timer) {
    timer = setInterval(() => {
      time.value++;
      dataScoreStore.setScore(time.value); // Mettre à jour le score dans le store
    }, 1000);
  }
};

// Fonction pour arrêter le timer
const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    dataScoreStore.setScore(time.value); // Mettre à jour le score final dans le store
  }
};

// Surveille les changements d'état du jeu
watch(() => props.isRunning, (newVal) => {
  if (newVal) {
    startTimer();
  } else {
    stopTimer();
  }
});

watch(() => [props.hasLost, props.hasWon], ([lost, won]) => {
  if (lost || won) {
    stopTimer();
  }
});
</script>

<template>
  <div class="timer">
    ⏳ Temps écoulé : {{ time }}s
  </div>
</template>
