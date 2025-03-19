<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import { auth } from '@/firebase'; // Importez l'authentification Firebase

// URL de l'API REST Firestore
const projectId = "demineur-d2cb5"; // Remplacez par l'ID de votre projet Firebase
const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/scores`;

// Stocker les scores récupérés
const scores = ref([]);

// Stocker la difficulté sélectionnée (par défaut : "facile")
const selectedDifficulty = ref("facile");

// Stocker l'état des checkboxes
const showOnlyMyScores = ref(false);
const sortByDate = ref(false);

// Fonction pour récupérer les scores
const getData = async () => {
  try {
    const response = await axios.get(url); // Utilisation correcte de axios.get
    scores.value = response.data.documents.map(doc => ({
      id: doc.name.split('/').pop(), // Extraire l'ID du document
      pseudo: doc.fields.pseudo.stringValue,
      temps: doc.fields.temps.integerValue,
      difficulte: doc.fields.difficulte.stringValue,
      date: doc.fields.date.stringValue,
    }));
    console.log("Scores récupérés :", scores.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des scores :", error);
  }
};

// Appeler la fonction pour récupérer les scores
getData();

// Propriété calculée pour filtrer et trier les scores
const filteredScores = computed(() => {
  let filtered = scores.value;

  // Filtrer par difficulté
  filtered = filtered.filter(score => score.difficulte === selectedDifficulty.value);

  // Filtrer par scores du joueur connecté si la checkbox est cochée
  if (showOnlyMyScores.value && auth.currentUser.email) {
    filtered = filtered.filter(score => score.pseudo === auth.currentUser.displayName);
  }

  // Trier par temps ou par date
  if (sortByDate.value) {
    filtered = filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } else {
    filtered = filtered.sort((a, b) => a.temps - b.temps);
  }

  return filtered;
});
</script>

<template>
  <header>
    <div>
    <h1 class="title">ScoreBoard</h1>
  </div>
  </header>

    <div>
      <label>
        <input type="radio" value="facile" v-model="selectedDifficulty" />
        Facile
      </label>
      <label>
        <input type="radio" value="normal" v-model="selectedDifficulty" />
        Normal
      </label>
      <label>
        <input type="radio" value="difficile" v-model="selectedDifficulty" />
        Difficile
      </label>
    </div>

    <!-- Afficher les checkboxes uniquement si un utilisateur est connecté -->
    <div v-if="auth.currentUser">
      <label>
        <input type="checkbox" v-model="showOnlyMyScores" />
        Voir uniquement mes scores
      </label>
      <label>
        <input type="checkbox" v-model="sortByDate" />
        Trier par date
      </label>
    </div>

    <table>
      <thead>
        <tr>
          <th>N°</th>
          <th>Pseudo</th>
          <th>Temps</th>
          <th>Difficulté</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in filteredScores" :key="score.id">
          <td>{{ index + 1 }}</td>
          <td>{{ score.pseudo }}</td>
          <td>{{ score.temps }} s</td>
          <td>{{ score.difficulte }}</td>
          <td>{{ score.date }}</td>
        </tr>
      </tbody>
    </table>
</template>

<style>
.title {
  font-size: 2rem;
  background-color: #333;
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #333;
  margin-top: 20px;
}

th, td {
  border: 1px solid #333;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
h1 {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}
label {
  margin-right: 15px;
  font-size: 14px;
}
</style>