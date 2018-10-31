<template>
  <div id="app">
    <Authority/>
  </div>
</template>

<script>
import Authority from '@/components/Authority.vue'

export default {
  name: 'app',
  components: {
    Authority
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
