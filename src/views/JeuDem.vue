<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DemGrille from '@/components/DemGrille.vue'
import { useRoute } from 'vue-router'


// Définition des niveaux
const gameset = [
  { level: 1, size: [10, 10], mines: 20 },
  { level: 2, size: [18, 14], mines: 40 },
  { level: 3, size: [24, 20], mines: 99 }
]
const difficult = ['Facile', 'Moyen', 'Difficile']

// Récupéré l'id de la route pour définir le niveau
const route = useRoute()
const levelId = ref(Number(route.params.level))



</script>

<template>
  <div>
    <h1>Page de Jeu</h1>
    <p>Niveau: {{ difficult[levelId - 1] }}</p>

    <DemGrille v-if="levelId" :rows="gameset[levelId - 1].size[0]" :cols="gameset[levelId - 1].size[1]" :mines="gameset[levelId - 1].mines" />


  
  </div>

</template>

<style scoped>
.row {
  display: flex;
}

.cell {
  width: 20px;
  height: 20px;
  border: 1px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
