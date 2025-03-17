<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const startGame = (level: number) => {
  router.push({ name: 'jeu', params: { level } }) 
}

</script>

<template>
  <div>
    <h1>Demineur</h1>
    <h1>Choisissez un niveau</h1>
    <button @click="startGame(1)">Facile</button>
    <button @click="startGame(2)">Moyen</button>
    <button @click="startGame(3)">Difficile</button>
  </div>
</template>





