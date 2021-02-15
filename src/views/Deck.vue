<template>
  <main class="deck">
    <Header right="gameList"></Header>
    <GameList v-bind:class="{ show: showGameList }"></GameList>
    <hgroup>
      <h5>{{gameId}}</h5>
      <h1>Songs you sing in the shower</h1>
    </hgroup>
    <p>Description of this deck goes here.</p>
    <div class="play-deck">
      <router-link to="play" append><img src="@/assets/icons/play.svg" width="30" height="30" alt="Play icon"></router-link>
      <span>Play</span>
    </div>
  </main>
</template>


<script>
import GameList from '@/components/GameList'
import Header from '@/components/Header'

export default {
  components: { GameList, Header },
  data() {
    return {
      showGameList: false,
      gameId: this.$route.params.gameId,
    }
  },
  created() {
    localStorage.setItem('currentDeck', this.$route.params.deckId)
  },
}
</script>

<style scoped>

</style>