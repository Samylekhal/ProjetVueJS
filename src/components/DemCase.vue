<template>
    <button class="case" @click="reveal" @contextmenu.prevent="flag" :class="{ revealed, flagged }">
      {{ revealed ? (mine ? '💣' : adjacentMines || '') : (flagged ? '🚩' : '') }}
    </button>
  </template>
  
  <script>
  export default {
    props: ['mine', 'adjacentMines'],
    data() {
      return { revealed: false, flagged: false };
    },
    methods: {
      reveal() {
        if (!this.flagged) this.revealed = true;
      },
      flag() {
        if (!this.revealed) this.flagged = !this.flagged;
      }
    }
  };
  </script>


<style>
    .case {
        width: 30px;
        height: 30px;
        border: 1px solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #c0c0c0;
        color: #000000;
    }
    
    .revealed {
        background-color: #f0f0f0;
    }
    
    .flagged {
        background-color: #c0c0c0;
    }

</style>