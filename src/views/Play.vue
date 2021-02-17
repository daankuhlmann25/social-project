<template>
  <div class="play">
    <HowToPlay v-bind:class="{ show: showHowToPlay }"></HowToPlay>
    <router-view :name="$route.params.gameId"/>
  </div>
</template>

<script>
import HowToPlay from '@/components/HowToPlay'

export default {
  components: { HowToPlay },

  computed: {
    showHowToPlay () { return this.$store.state.header.showHowToPlay }
  },
  
}
</script>

<style scoped>

</style>