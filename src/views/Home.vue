<template>
  <main class="home">
    <img class="logo" alt="Social.gg logo" src="../assets/logo.svg" />
    <h1>Play social games at home with your friends.</h1>
    <game-list></game-list>
  </main>
</template>

<script>
// @ is an alias to /src
import GameList from './GameList.vue';

export default {
  components: { GameList },
}
</script>

<style scoped>

</style>