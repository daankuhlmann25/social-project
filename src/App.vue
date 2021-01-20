<template>
  <div id="app">
    <img alt="Social.gg logo" src="./assets/logo.svg">
    <Start msg="Play social games at home with your friends."/>
    <Game msg="Song battle"/>
  </div>
</template>

<script>
import Start from './components/Start.vue'
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Start,
    Game
  }
}
</script>

<style>
body {
  background-color: #2F383E;
}

h1 {
  font-weight: bold;
  font-size: 28px;
  color: #FFEF65;
}

#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #C7C7C7;
  margin-top: 60px;
}
</style>
