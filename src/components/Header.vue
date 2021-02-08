<template>
  <header>
      <a class="left" @click="$router.go(-1)">Back</a>
      <router-link to="/" class="logo"><img class="logo" alt="Social.gg logo" width="34" height="34" src="../assets/logo.svg" /></router-link>
      <a class="right" v-on:click="$parent.showGameList = !$parent.showGameList">All games</a>
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
