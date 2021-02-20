<template>
  <div class="send-deck">
    <h1>Deck Send!</h1>
    <p>We’ll take a look at it and publish it as soon as possible, promise.</p>
    <p>Thank you, you’re the best! ❤</p>
    <div class="button-container">
      <!-- TODO: make arrow-left-black version -->
      <!-- TODO: Change link to correct position, whats that? Current game main page. -->
      <a class="white-button" @click="$router.go(-1)"><img src="@/assets/icons/arrow-left.svg" width="9" height="17" alt="Back arrow icon">Sing Together</a>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {

    }
  },
}
</script>

<style scoped>

</style>