<template>
  <header>
      <a class="left" v-show="!hideLeft" @click="$router.go(-1)"><img src="@/assets/icons/arrow-left.svg" width="9" height="17" alt="Back arrow icon">Back</a>
      <router-link to="/" class="logo"><img class="logo" alt="Social.gg logo" width="34" height="34" src="@/assets/logo.svg" /></router-link>
      <a class="right" v-if="right === 'gameList'" v-on:click="$parent.showGameList = !$parent.showGameList"><img src="@/assets/icons/all-games.svg" width="16" height="17" alt="All games icon">All games</a>
      <a class="right" v-else-if="right === 'howToPlay'" v-on:click="$parent.showHowToPlay = !$parent.showHowToPlay">How to play</a>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    hideLeft: {
      type: Boolean,
      default: false,
      },
    right: String,
  },
}
</script>

<style scoped>

</style>
