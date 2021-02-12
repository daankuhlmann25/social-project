<template>
  <main class="deck">
    <Header right="gameList"></Header>
    <GameList v-bind:class="{ show: showGameList }"></GameList>
    <hgroup>
      <h5>{{gameId}}</h5>
      <h1>Songs you sing in the shower</h1>
    </hgroup>
    <p>Description of this deck goes here.</p>
    <router-link :to="{ name: 'Play', params: {id: 1} }">Play</router-link>
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
  }
}
</script>

<style scoped>

</style>