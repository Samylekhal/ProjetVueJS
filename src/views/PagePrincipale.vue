<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()

const startGame = (level: number) => {
  router.push({ name: 'jeu', params: { level } }) 
}

const Tableauscores = () => {
  router.push({ name: 'score' })
}

</script>

<template>
  <div>
    <header>
      <NavBar />
    </header>
    <h1>Demineur</h1>
    <h3>Choisissez un niveau</h3>
    <button @click="startGame(1)">Facile</button>
    <button @click="startGame(2)">Moyen</button>
    <button @click="startGame(3)">Difficile</button>
    <br>
    <button @click="Tableauscores">Tableau des scores</button>   
  </div>
</template>
<style scoped>
div {

  justify-content: center;
  align-items: center;
  height: 100vh; 
  text-align: center;
  background-color: #f4f4f4; 
}
h1 {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}
button {
  margin: 10px;
  padding: 12px 24px;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background-color: #45a049;
}
</style>
