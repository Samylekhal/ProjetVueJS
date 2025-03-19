<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DemCase from './DemCase.vue';
import DemTimer from './DemTimer.vue';
import { useRouter, useRoute } from 'vue-router';
import { useDataScoreStore } from '@/stores/firebaseStore';
import { db, auth } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Fonction pour ajouter un score dans Firestore
async function addScoreToFirestore(pseudo, temps, difficulte, date) {
  try {
    const scoresCollection = collection(db, "scores"); // Collection "scores"
    await addDoc(scoresCollection, {
      pseudo: pseudo,
      temps: temps,
      difficulte: difficulte,
      date: date,
    });
    console.log("Score ajouté avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout du score :", error);
  }
}

const dataScoreStore = useDataScoreStore();
const difficultes = ["facile", "moyen", "difficile"];

const route = useRoute();
const levelId = ref(Number(route.params.level));

const difficulte = difficultes[levelId.value - 1];
dataScoreStore.setDifficile(difficulte);

if (auth.currentUser) {
  dataScoreStore.setPseudo(auth.currentUser.displayName);
} else {
  dataScoreStore.setPseudo("Anonyme");
}

const props = defineProps<{
  rows: number;
  cols: number;
  minesCount: number;
}>();

interface CaseType {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  minesAround: number;
}

// Grille de jeu
const grid = ref<CaseType[][]>([]);
const router = useRouter();
// Compteur de drapeaux
const flagsLeft = ref(props.minesCount);
// configure le timer
const isRunning = ref(false);
const hasLost = ref(false);
const hasWon = ref(false);

// Fonction d'initialisation de la grille vide
const initGrid = () => {
  grid.value = Array.from({ length: props.rows }, (_, y) =>
    Array.from({ length: props.cols }, (_, x) => ({
      x, y, isMine: false, isRevealed: false, isFlagged: false, minesAround: 0
    }))
  );
  flagsLeft.value = props.minesCount; // Réinitialisation des drapeaux
};

// Retourne les cases adjacentes d'une position (x, y)
const getAdjacentCells = (x: number, y: number) => {
  return [
    { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
    { x: -1, y: 0 },                   { x: 1, y: 0 },
    { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
  ].map(({ x: dx, y: dy }) => {
    const nx = x + dx, ny = y + dy;
    return (nx >= 0 && nx < props.cols && ny >= 0 && ny < props.rows) ? grid.value[ny][nx] : null;
  }).filter(cell => cell !== null) as CaseType[];
};

// Placement des mines après le premier clic
const placeMines = (firstX: number, firstY: number) => {
  let placedMines = 0;

  while (placedMines < props.minesCount) {
    // choisi une position aléatoire
    const x = Math.floor(Math.random() * props.cols);
    const y = Math.floor(Math.random() * props.rows);

    // Si la case n'est pas déjà une mine et n'est pas adjacente à la première case cliquée
    if (!grid.value[y][x].isMine && !(Math.abs(x - firstX) <= 1 && Math.abs(y - firstY) <= 1)) {
      grid.value[y][x].isMine = true;
      placedMines++;
    }
  }
  // Calculer le nombre de mines autour de chaque case
  grid.value.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!cell.isMine) {
        cell.minesAround = getAdjacentCells(x, y).filter(c => c.isMine).length;
      }
    });
  });
};

// Fonction pour révéler une case
const revealCase = async (x: number, y: number) => {
  const cell = grid.value[y][x];

  if (!isRunning.value) {
    isRunning.value = true;
  }

  if (cell.isMine) {
    hasLost.value = true;
    isRunning.value = false;
  }

  // Si c'est le premier clic, placer les mines
  if (grid.value.flat().every(c => !c.isRevealed)) {
    cell.isRevealed = true;
    placeMines(x, y);

    revealAdjacentCells(x, y);
    // Attendre que Vue mette à jour la grille
    grid.value = grid.value.map(row => row.map(cell => ({ ...cell })));

    return;
  }

  if (cell.isRevealed || cell.isFlagged) return;

  cell.isRevealed = true;

  if (cell.isMine) {
    grid.value.forEach(row => {
      row.forEach(cell => {
        if (cell.isMine) cell.isRevealed = true;
      });
    });
    router.push('/');
    alert("Perdu !");
    return;
  }

  // Révéler les cases adjacentes
  if (cell.minesAround === 0) {
    revealAdjacentCells(x, y);
  }

  checkWin();
};

// Révélation récursive des cases adjacentes
const revealAdjacentCells = (x: number, y: number) => {
  getAdjacentCells(x, y).forEach(adjCell => {
    if (!adjCell.isRevealed && !adjCell.isMine) {
      adjCell.isRevealed = true;
      if (adjCell.minesAround === 0) {
        revealAdjacentCells(adjCell.x, adjCell.y);
      }
    }
  });
};

// Fonction pour poser/enlever un drapeau
const flagCase = (x: number, y: number) => {
  const cell = grid.value[y][x];

  if (!cell.isRevealed) {
    if (!cell.isFlagged) {
      if (flagsLeft.value === 0) {
        return;
      } else {
        cell.isFlagged = true;
        flagsLeft.value--;
      }
    } else {
      cell.isFlagged = false;
      flagsLeft.value++;
    }
  }
};

const checkWin = () => {
  console.log("Vérification de la victoire...");
  const allRevealedOrMines = grid.value.flat().every(cell => cell.isRevealed || cell.isMine);
  console.log("Toutes les cases révélées ou mines :", allRevealedOrMines);

  if (allRevealedOrMines) {
    hasWon.value = true;
    isRunning.value = false;

    // Récupérer la date actuelle en string
    const date = new Date().toLocaleString();
    dataScoreStore.setDate(date);

    // Récupérer les valeurs des getters
    const pseudo = dataScoreStore.getPseudo();
    const score = dataScoreStore.getScore();
    const difficulte = dataScoreStore.getDifficile();
    const formattedDate = dataScoreStore.getDate();

    console.log("Pseudo :", pseudo);
    console.log("Score :", score);
    console.log("Difficulté :", difficulte);
    console.log("Date :", formattedDate);

    // Valider le score
    addScoreToFirestore(pseudo, score, difficulte, formattedDate);
    alert("Bravo, vous avez gagné !");

    router.push('/');
  }
};

onMounted(() => {
  initGrid();
});
</script>

<template>
  <div class="game-container">
    <div class="header">
      <div class="timer-container">
        <DemTimer :isRunning="isRunning" :hasLost="hasLost" :hasWon="hasWon" />
      </div>
      <div class="flags-counter">
        ⛳ Mines restantes : {{ flagsLeft }}
      </div>
    </div>

    <div class="grid">
      <div v-for="(row, y) in grid" :key="y" class="row">
        <DemCase
          v-for="(cell, x) in row"
          :key="x"
          :mine="cell.isMine"
          :adjacentMines="cell.minesAround"
          :revealed="cell.isRevealed"
          :flagged="cell.isFlagged"
          @click="() => revealCase(cell.x, cell.y)"
          @contextmenu.prevent="() => flagCase(cell.x, cell.y)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh; /* Assure que tout rentre sans scroll */
  overflow: hidden;
  background-color: #f4f4f4;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
}

.grid {
  display: grid;
  gap: 2px;
  border: 2px solid #333;
}

.row {
  display: contents;
}

.case {
  width: 25px;
  height: 25px;
  border: 1px solid #888;
  background-color: #1a1818;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.revealed {
  background-color: #b1dd9a;
}

.grid {
  grid-template-columns: repeat(v-bind(cols), 25px);
  grid-template-rows: repeat(v-bind(rows), 25px);
}
</style>
