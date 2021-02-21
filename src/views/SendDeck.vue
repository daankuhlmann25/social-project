<template>
  <div class="send-deck">
    <h1>Deck sent!</h1>
    <p>We’ll take a look at it and publish it as soon as possible, promise.</p>
    <p>Thank you, you’re the best! <img width="14" height="17" src="../assets/icons/text-heart.svg" alt="Heart icon"></p>
    <div class="button-container">
      <router-link class="button" :to="{ name: 'Game', params: { gameId: this.gameId } }"><img src="@/assets/icons/arrow-left.svg" width="9" height="17" alt="Back arrow icon">Sing Together</router-link>
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
}
</script>

<style scoped>

</style>