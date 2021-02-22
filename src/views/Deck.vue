<template>
  <div class="deck">
    <hgroup>
      <h5>{{gameId}}</h5>
      <h1>Songs you sing in the shower</h1>
    </hgroup>
    <p>Description of this deck goes here.</p>
    <div class="play-deck">
      <router-link to="play" append><img src="@/assets/icons/play.svg" width="30" height="30" alt="Play icon"></router-link>
      <span>Play</span>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      gameId: this.$route.params.gameId,
    }
  },
  created() {
    // Set header right
    this.$store.commit('header/setRight', 'gameList')
  },
}
</script>

<style scoped>

</style>