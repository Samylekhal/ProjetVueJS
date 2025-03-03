<template>
  <div>{{ theTime.toFixed(1) }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const theTime = ref(0)

const timer = setInterval(() => {
  theTime.value += 0.1
}, 100)

onUnmounted(() => {
  clearInterval(timer)
})
</script>
