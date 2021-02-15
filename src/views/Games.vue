<template>
  <main class="games">
    <Header right="gameList" />
    <GameList v-bind:class="{ show: showGameList }" />
    <!-- TODO: Add nice error message if gameId is wrong -->
    <router-view :name="$route.params.gameId" />
  </main>
</template>

<script>
import Header from '@/components/Header'
import GameList from '@/components/GameList'

export default {
  components: { GameList, Header },
  data() {
    return {
      showGameList: false,
    }
  },
  created() {
    localStorage.setItem('currentGame', this.$route.params.gameId)
  }
}
</script>

<style scoped>

</style>