<template>
  <div>
    <DemTimer ref="timer" />
    <div class="grid">
      <DemCase 
        v-for="(cell, index) in grid" 
        :key="index"
        :mine="cell.mine" 
        :adjacentMines="cell.adjacentMines" 
      />
    </div>
  </div>
</template>

<script>
import DemTimer from './DemTimer.vue';
import DemCase from './DemCase.vue';

export default {
  components: { DemTimer, DemCase },
  props: {
    rows: { type: Number, required: true },
    cols: { type: Number, required: true },
    mines: { type: Number, required: true }
  },
  data() {
    return { grid: this.generateGrid(this.rows, this.cols, this.mines) };
  },
  methods: {
    generateGrid(rows, cols, mines) {
      let grid = Array.from({ length: rows * cols }, () => ({ mine: false, adjacentMines: 0 }));

      // Place mines randomly
      for (let i = 0; i < mines; i++) {
        let index;
        do { index = Math.floor(Math.random() * grid.length); }
        while (grid[index].mine);
        grid[index].mine = true;
      }

      // Calculate adjacent mines
      grid.forEach((cell, i) => {
        if (!cell.mine) {
          let adjacent = [i - cols - 1, i - cols, i - cols + 1, i - 1, i + 1, i + cols - 1, i + cols, i + cols + 1]
            .filter(idx => grid[idx] && !grid[idx].mine).length;
          cell.adjacentMines = adjacent;
        }
      });

      return grid;
    }
  }
};
</script>

<style>
.grid { 
  display: grid; 
  grid-template-columns: repeat(v-bind(cols), 30px); /* Ajuste dynamiquement les colonnes */
}
</style>
