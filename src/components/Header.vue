<template>
  <header>
      <a class="left" @click="$router.go(-1)"><img src="@/assets/icons/arrow-left.svg" width="9" height="17" alt="Back arrow icon">Back</a>
      <router-link to="/" class="logo"><img class="logo" alt="Social.gg logo" width="34" height="34" src="@/assets/logo.svg" /></router-link>
      <a class="right" v-on:click="$parent.showGameList = !$parent.showGameList"><img src="@/assets/icons/all-games.svg" width="16" height="17" alt="All games icon">All games</a>
  </header>
</template>

<script>
export default {
  name: 'HeaderComp',
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>
