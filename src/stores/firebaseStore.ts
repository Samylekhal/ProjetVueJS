import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDataScoreStore = defineStore('DataScore', () => {

  // State
  const pseudo = ref('');
  const score = ref(0);
  const date = ref('');
  const difficile = ref('');

  // Getters
  const getPseudo = () => pseudo.value;
  const getScore = () => score.value;
  const getDate = () => date.value;
  const getDifficile = () => difficile.value;

  // Actions
  const setPseudo = (value: string) => pseudo.value = value;
  const setScore = (value: number) => score.value = value;  
  const setDate = (value: string) => date.value = value;
  const setDifficile = (value: string) => difficile.value = value;

  const removeallData = async () => {
    pseudo.value = '';
    score.value = 0;
    date.value = '';
    difficile.value = '';
  }

  // retourner les fonctions et datas
  return {
    getPseudo,
    getScore,
    getDate,
    getDifficile,
    setPseudo,
    setScore,
    setDate,
    setDifficile,
    removeallData
  }

});