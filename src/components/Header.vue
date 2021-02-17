<template>
  <header>
    <div class="header-wrap">
      <a class="left" v-show="!hideLeft" @click="$router.go(-1)"><img src="@/assets/icons/arrow-left.svg" width="9" height="17" alt="Back arrow icon">Back</a>
      <router-link to="/" class="logo"><img class="logo" alt="Social.gg logo" width="34" height="34" src="@/assets/logo.svg" /></router-link>
      <a class="right" v-if="right === 'gameList'" v-on:click="toggleGameList"><img src="@/assets/icons/all-games.svg" width="16" height="17" alt="All games icon">All games</a>
      <a class="right" v-else-if="right === 'howToPlay'" v-on:click="toggleHowToPlay">How to play</a>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState({
      hideLeft: state => state.header.hideLeft,
      right: state => state.header.right,
    }),
  },
  methods: {
    ...mapMutations({
      toggleGameList: 'header/toggleGameList',
      toggleHowToPlay: 'header/toggleHowToPlay',
      setRight: 'header/setRight',
      setHideLeft: 'header/setHideLeft',
    }),
  },
}
</script>

<style scoped>

</style>
