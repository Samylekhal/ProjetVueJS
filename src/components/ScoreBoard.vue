<script setup lang="ts">
import { ref, onMounted } from 'vue';

const scores = ref([]);

const fetchScores = async () => {
  const projectId = 'demineur-d2cb5'; // Remplacez par l'ID de votre projet Firebase
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/scores`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const data = await response.json();
    scores.value = data.documents.map(doc => ({
      id: doc.name.split('/').pop(), // Extraire l'ID du document
      email: doc.fields.user.stringValue, // Adresse e-mail
      difficulté: doc.fields.difficulty.stringValue, // Niveau de difficulté
      date: doc.fields.timestamp.timestampValue, // Date de fin de partie
      temps: doc.fields.score.integerValue, // Temps réalisé (en secondes)
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des scores :', error);
  }
};

onMounted(() => {
  fetchScores();
});
</script>

<template>
  <div>
    <h1>ScoreBoard</h1>
    <ul>
      <li v-for="score in scores" :key="score.id">
        {{ score.email }} : {{ score.temps }} secondes ({{ score.difficulté }}) - {{ new Date(score.date).toLocaleString() }}
      </li>
    </ul>
  </div>
</template>