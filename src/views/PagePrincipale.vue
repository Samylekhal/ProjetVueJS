<script setup lang="ts">
import { ref } from 'vue'
import DemPlateau from '@/components/DemPlateau.vue'
const difficult = ['Facile', 'Moyen', 'Difficile']

const bouton = ref(false)

const jouer = () => {
  bouton.value = !bouton.value
}
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Démineur</h1>
      <p>Un projet de Samy Lekhal</p>
      <br />
      <nav>
        <ul>
          <li>
            <button @click="jouer">Jouer</button>
          </li>
        </ul>
      </nav>

      <div v-if="bouton">
        <h4>Difficulté</h4>
        <ul>
          <li v-for="n in difficult" :key="n">
            <button>{{ n }}</button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
