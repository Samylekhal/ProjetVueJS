import { defineStore } from 'pinia';
import { db, auth, collection, addDoc, getDocs, query, orderBy, limit } from '../firebase';
import { ref } from 'vue';

export const useFirebaseStore = defineStore('firebase', () => {
  const scores = ref([]); // Stocker les scores récupérés
  const currentUser = ref(auth.currentUser); // Stocker l'utilisateur actuel

  // Fonction pour récupérer les scores depuis Firestore
  const fetchScores = async () => {
    try {
      const scoresCollection = collection(db, 'scores');
      const scoresQuery = query(scoresCollection, orderBy('score', 'desc'), limit(10));
      const querySnapshot = await getDocs(scoresQuery);
      scores.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Erreur lors de la récupération des scores :', error);
    }
  };

  // Fonction pour ajouter un score dans Firestore
  const addScore = async (score: number, difficulty: string) => {
    try {
      const scoresCollection = collection(db, 'scores');
      await addDoc(scoresCollection, {
        score, // Temps réalisé
        user: currentUser.value?.email || 'Anonyme', // Adresse e-mail
        timestamp: new Date(), // Date de fin de partie
        difficulty, // Niveau de difficulté (facile, normal, difficile)
      });
      await fetchScores(); // Mettre à jour les scores après ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout du score :', error);
    }
  };

  // Fonction pour surveiller l'utilisateur connecté
  const watchAuthState = () => {
    auth.onAuthStateChanged(user => {
      currentUser.value = user;
    });
  };

  return {
    scores,
    currentUser,
    fetchScores,
    addScore,
    watchAuthState,
  };
});