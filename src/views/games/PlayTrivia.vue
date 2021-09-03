<template>
  <div class="play-container play-game">
    <HowToPlay v-bind:class="{ show: showHowToPlay }"></HowToPlay>
    <h1>{{ $t('Play Trivia') }}</h1>
    <p>{{ $t('Under construction') }}</p>
  </div>
</template>

<script>
import HowToPlay from '@/components/HowToPlay'

export default {
  components: { HowToPlay },

  data() {
    return {
      showHowToPlay: false,
    }
  },
  
  created() {
    // Set header right
    this.$store.commit('header/setRight', 'howToPlay')
  }
}
</script>

<style scoped>

</style>