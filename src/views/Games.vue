<template>
  <main class="games">
    <Header />
    <GameList :class="{ show: showGameList }" />
    <transition :name="transitionName" mode="out-in">
      <!-- TODO: Add nice error message if gameId is wrong -->
      <router-view :name="$route.params.gameId" />
      <router-view /> <!-- This is used by EditDeck -->
    </transition>
  </main>
</template>

<script>
import Header from '@/components/Header'
import GameList from '@/components/GameList'

export default {
  name: 'Games',
  components: { GameList, Header },
  data() {
    return {
      niceGameName: {
        ['sing-together']: "Sing together",
        trivia: "Trivia"
      },
      transitionName: 'forward',
    }
  },
  computed: {
    showGameList () { return this.$store.state.header.showGameList }
  },
  created() {
    // Set header right
    this.$store.commit('header/setRight', 'gameList')
  },
  watch: {
    '$route' (to, from) {
      if (to.matched.some(m => m.meta.transitionName))
        this.transitionName = to.meta.transitionName
      else {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'back' : 'forward'
      }
    }
  },
}
</script>

<style scoped>

</style>