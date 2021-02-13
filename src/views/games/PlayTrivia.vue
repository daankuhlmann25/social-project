<template>
  <main class="play play-container play-game">
    <Header right="howToPlay"></Header>
    <HowToPlay v-bind:class="{ show: showHowToPlay }"></HowToPlay>
    <h1>Play Trivia</h1>
  </main>
</template>


<script>
  import Header from '@/components/Header'
  import HowToPlay from '@/components/HowToPlay'

  export default {
    components: { HowToPlay, Header },

    data() {
      return {
        showHowToPlay: false,
      }
    },
  }
</script>

<style scoped>

</style>