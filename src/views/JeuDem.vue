<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DemGrille from '@/components/DemGrille.vue'
import { useRoute } from 'vue-router'


const difficult = ['Facile', 'Moyen', 'Difficile']

// Récupéré l'id de la route pour définir le niveau
const route = useRoute()
const levelId = ref(Number(route.params.level))

</script>

<template>
  <div>
    <h1>Page de Jeu</h1>
    <p>Niveau: {{ difficult[levelId - 1] }}</p>
    <div v-if="levelId === 1">
      <DemGrille :cols=" 10" :rows="10 " :minesCount="20" />
    </div>
    <div v-else-if="levelId === 2">
      <DemGrille :cols="18" :rows="14" :minesCount="40" />
    </div>
    <div v-else-if="levelId === 3">
      <DemGrille :cols="24" :rows="20" :minesCount="99" />
    </div>


  </div>

</template>

<style scoped>
.row {
  display: flex;
}

</style>
