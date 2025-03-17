<template>
  <div class="timer">⏳ {{ time }}s</div>
</template>

<script>
export default {
  data() {
    return { time: 0, interval: null };
  },
  methods: {
    start() {
      this.interval = setInterval(() => this.time++, 1000);
    },
    reset() {
      clearInterval(this.interval);
      this.time = 0;
    }
  },
  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>

