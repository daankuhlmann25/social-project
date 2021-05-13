<template>
  <div class="game sing-together">
    <header class="top">
      <img class="game-icon" width="50" height="50" :alt="$t('music icon')" src="@/assets/icons/game-icon-music.svg">
      <h1>{{ $t('Sing together') }}</h1>
      <h4>{{ $t('Team up, finish the lyrics') }}</h4>
    </header>
    <ExpandableSection>
      <h2>{{ $t('How to play') }}</h2>
      <p>Divide your group into two teams. The team with the phone sings the first part. If the other team can sing the second part, they get one point.</p>
      <p>Pass the phone to the other team and let them go to the next card.</p>
    </ExpandableSection>
    <ListDecks />
  </div>
</template>


<script>
import ListDecks from '@/components/ListDecks'
import ExpandableSection from '@/components/ExpandableSection'

export default {
  components: { ListDecks, ExpandableSection },

  created() {
    this.$store.commit('header/setTransparent', true)
  },
}
</script>

<style scoped>
header.top::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .03;
  background-image: url('../../assets/images/white-noise.png');
  background-repeat: repeat;
  background-position: center;
  pointer-events: none;
}
</style>