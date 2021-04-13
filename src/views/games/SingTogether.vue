<template>
  <div class="game sing-together">
    <hgroup>
      <h1>Sing together</h1>
      <h4>Team up, finish the lyrics</h4>
    </hgroup>
    <!-- TODO: Convert to component - for example ExpandableSection -->
    <section
      ref="howToPlay"
      class="how-to-play-section"
      @click="showHowToPlay">
      <h2>How to play</h2>
      <p>Divide your group into two teams. The team with the phone sings the first part. If the other team can sing the second part, they get one point.</p>
      <p>Pass the phone to the other team and let them go to the next card.</p>
    </section>
    <ListDecks />
  </div>
</template>


<script>
import ListDecks from '@/components/ListDecks'

export default {
  components: { ListDecks },

  methods: {
    showHowToPlay: function () {
      if (this.$refs.howToPlay.classList.contains('minimized')) {
        this.$refs.howToPlay.classList.replace('minimized', 'expanded')
        this.$refs.howToPlay.style.overflowY = 'scroll'
        this.$refs.howToPlay.style.maxHeight = `${this.$refs.howToPlay.scrollHeight}px`
        this.$refs.howToPlay.style.overflowY = ''
      }
    },
  },

  mounted() {
    this.$refs.howToPlay.style.overflowY = 'scroll'
    
    if ((this.$refs.howToPlay.scrollHeight - this.$refs.howToPlay.offsetHeight) > 40)
      this.$refs.howToPlay.classList.add('minimized')
    else
      this.$refs.howToPlay.classList.add('expanded')

    this.$refs.howToPlay.style.overflowY = ''
  },
}
</script>

<style scoped>

</style>