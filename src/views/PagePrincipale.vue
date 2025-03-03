<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 10x8 et 10mines / 18x14 et 40 mines / 24x20 et 99 mines
const difficult = ['Facile', 'Moyen', 'Difficile']

const bouton = ref(false)
const router = useRouter()

const jouer = () => {
  bouton.value = !bouton.value
}

const goToJeu = (index: number) => {
  router.push({ name: 'jeu', params: { level: index + 1 } })
}
</script>

<template>
  <body>
    <header></header>
    <br />
    <main>
      <div class="wrapper">
        <div>connexion</div>
        <div>inscription</div>
        <br />
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
            <li v-for="(n, index) in difficult" :key="n">
              <button @click="goToJeu(index)">{{ n }}</button>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <footer></footer>
  </body>
</template>
