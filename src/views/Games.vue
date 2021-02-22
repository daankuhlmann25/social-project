<template>
  <main class="games">
    <Header />
    <GameList :class="{ show: showGameList }" />
    <!-- TODO: Add nice error message if gameId is wrong -->
    <router-view :name="$route.params.gameId" />
    <router-view /> <!-- This is used by EditDeck -->
  </main>
</template>

<script>
import Header from '@/components/Header'
import GameList from '@/components/GameList'

export default {
  name: 'Games',
  components: { GameList, Header },
  computed: {
    showGameList () { return this.$store.state.header.showGameList }
  },
  created() {
    // Set header right
    this.$store.commit('header/setRight', 'gameList')
  },
}
</script>

<style scoped>

</style>