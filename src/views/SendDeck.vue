<template>
  <div class="send-deck">
    <h1>{{ $t('Deck sent!') }}</h1>
    <p>{{ $t('We’ll take a look at it and publish it as soon as possible, promise.') }}</p>
    <p>{{ $t('Thank you, you’re the best!') }} <img width="14" height="17" src="../assets/icons/text-heart.svg" :alt="$t('Heart icon')"></p>
    <div class="button-container">
      <localized-link class="button" :to="{ name: 'Game', params: { gameId: this.gameId } }"><img src="@/assets/icons/arrow-left.svg" width="9" height="17" :alt="$t('Back arrow icon')">{{ $t('Sing together') }}</localized-link>
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