<script setup lang="ts">
import { ref } from 'vue'
import DemGrille from '@/components/DemGrille.vue'
import { useRoute } from 'vue-router'
const difficult = ['Facile', 'Moyen', 'Difficile']

// Récupéré l'id de la route pour définir le niveau
const route = useRoute()
const levelId = ref(Number(route.params.level))

const currentdifficulty = difficult[levelId.value - 1]

</script>

<template>
  <div class = title>
    <h1>Page de Jeu</h1>
    <p>Niveau: {{ difficult[levelId - 1] }}</p>

    <!-- la difficulté est déterminé par le nombre de lignes, de colonnes et de mines de la grille. Les informations sont transmises à la grille via des props.  -->
    <div v-if="levelId === 1">
      <DemGrille :cols=" 10" :rows="10 " :minesCount="20" :difficulty= "currentdifficulty"/>
    </div>
    <div v-else-if="levelId === 2">
      <DemGrille :cols="18" :rows="14" :minesCount="40" :difficulty="currentdifficulty" />
    </div>
    <div v-else-if="levelId === 3">
      <DemGrille :cols="24" :rows="20" :minesCount="99" :difficulty="currentdifficulty"/>
    </div>
  </div>

</template>

<style scoped>
.row {
  display: flex;
}
.title {
  height: 100vh;
  text-align: center;
}
</style>
